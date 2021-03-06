var USDT = artifacts.require("test/USDT");
var HBTC = artifacts.require("test/HBTC");
var NEST = artifacts.require("test/NEST");
var WETH9 = artifacts.require("test/WETH9");
var NestPriceOracle = artifacts.require("mock/NEST36PriceOracleAutoUpdateConstMock");
var CoFiXFactory = artifacts.require("CoFiXV2Factory");
var CoFiXController = artifacts.require("CoFiXV2Controller");
var CoFiXPair = artifacts.require("CoFiXV2Pair");
var CoFiXRouter = artifacts.require("CoFiXV2Router");
const CoFiXVaultForLP = artifacts.require("CoFiXV2VaultForLP");
var CoFiXVaultForTrader = artifacts.require("CoFiXV2VaultForTrader");
const CoFiXVaultForCNode = artifacts.require("CoFiXV2VaultForCNode");
const CoFiXDAO = artifacts.require("CoFiXV2DAO");
var CoFiToken = artifacts.require("CoFiToken");
var CoFiXNode = artifacts.require("CoFiXNode");
const CoFiXStakingRewards = artifacts.require("CoFiXV2StakingRewards.sol");
const CNodeStakingRewards = artifacts.require("V2CNodeStakingRewards.sol");

module.exports = async function (deployer, network) {

    console.log(`truffle deploy CoFiXV2 to ${network} network`);

    const supportedNetwork = [ "mainnet", "mainnet-fork", "ropsten", "ropsten-fork", "rinkeby", "rinkeby-fork"];

    if (!supportedNetwork.includes(network)) {
        console.log(`skip, only for ${supportedNetwork} network`);
        return;
    }

    if (network == "mainnet" || network == "mainnet-fork") {
        USDT = await USDT.at("0xdAC17F958D2ee523a2206206994597C13D831ec7");
        HBTC = await HBTC.at("0x0316EB71485b0Ab14103307bf65a021042c6d380");
        NEST = await NEST.at("0x04abEdA201850aC0124161F037Efd70c74ddC74C");
        WETH9 = await WETH9.at("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
        NestPriceOracle = await NestPriceOracle.at("0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A"); // nest 3.6: NestPriceFacade 
        CoFiToken = await CoFiToken.at("0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1");
        UniswapFactory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
        CoFiXNode = await CoFiXNode.at("0x558201DC4741efc11031Cdc3BC1bC728C23bF512");

        // CoFiXFactory
        await deployer.deploy(CoFiXFactory, WETH9.address);

        // CoFiXRouter
        await deployer.deploy(CoFiXRouter, CoFiXFactory.address, UniswapFactory, WETH9.address);

        // CoFiXController
        await deployer.deploy(CoFiXController, NestPriceOracle.address, NEST.address, CoFiXFactory.address);

        // VaultForLP
        await deployer.deploy(CoFiXVaultForLP, CoFiToken.address, CoFiXFactory.address);

        // VaultForTrader
        await deployer.deploy(CoFiXVaultForTrader, CoFiToken.address, CoFiXFactory.address);

        // VaultForCNode
        await deployer.deploy(CoFiXVaultForCNode, CoFiToken.address, CoFiXFactory.address);

        // CoFiXDAO
        await deployer.deploy(CoFiXDAO, CoFiToken.address, CoFiXFactory.address);

        let controller = await CoFiXController.deployed();

        // add caller
        await controller.addCaller(CoFiXDAO.address);

        // set theta
        const theta = "200000";
        console.log(`setting theta for ${USDT.address}`);
        await controller.setTheta(USDT.address, theta);
        console.log(`setting theta for ${HBTC.address}`);
        await controller.setTheta(HBTC.address, theta);
        console.log(`setting theta for ${NEST.address}`);
        await controller.setTheta(NEST.address, theta);

        // set controller in factory
        let factory = await CoFiXFactory.deployed();
        await factory.setController(CoFiXController.address);
        await factory.setVaultForLP(CoFiXVaultForLP.address);
        await factory.setVaultForTrader(CoFiXVaultForTrader.address);
        await factory.setVaultForCNode(CoFiXVaultForCNode.address);
        await factory.setDAO(CoFiXDAO.address);
        await factory.setFeeReceiver(CoFiXDAO.address);

        // allowRouter
        console.log(`start allowRouter`);
        let vaultForTrader = await CoFiXVaultForTrader.deployed();
        await vaultForTrader.allowRouter(CoFiXRouter.address);
        console.log("allowRouter successfully for CoFiXRouter03");

        // set cnode pool
        await deployer.deploy(CNodeStakingRewards, CoFiToken.address, CoFiXNode.address, CoFiXFactory.address);
        let vaultForCNode = await CoFiXVaultForCNode.deployed();
        await vaultForCNode.setCNodePool(CNodeStakingRewards.address);
        const cnodePool = await vaultForCNode.cnodePool();
        console.log(`setCNodePool, CNodeStakingRewards.address: ${CNodeStakingRewards.address}, cnodePool: ${cnodePool}`);

        // set genesisBlock , follow v1
        console.log(`set genesisBlock`);
        let valutForLP = await CoFiXVaultForLP.deployed();
        await valutForLP.setGenesisBlock();
        await vaultForCNode.setGenesisBlock();

        console.log(`setting controller of CoFiXFactory`);
        // creat and set pair
        await factory.createPair(USDT.address, "1000000000000000000", "3000000000"); // ETH/USDT 1:3000
        await factory.createPair(HBTC.address, "20000000000000000000", "1000000000000000000"); // ETH/HBTC  20:1
        await factory.createPair(NEST.address, "1000000000000000000", "20000000000000000000000"); // ETH/nest  1???20000
        const usdtPair = await factory.getPair(USDT.address);
        const hbtcPair = await factory.getPair(HBTC.address);
        const nestPair = await factory.getPair(NEST.address);
        await factory.setTradeMiningStatus(USDT.address, true);
        await factory.setTradeMiningStatus(HBTC.address, true);
        await factory.setTradeMiningStatus(NEST.address, true);

        // set CGamma of token
        await controller.setCGamma(USDT.address, "1");
        await controller.setCGamma(HBTC.address, "1");
        await controller.setCGamma(NEST.address, "100");

        // set minter of cofiToken
        // let cofiToken = await CoFiToken.deployed();
        // await cofiToken.addMinter(CoFiXVaultForTrader.address);
        // await cofiToken.addMinter(CoFiXVaultForLP.address);
        // await cofiToken.addMinter(CoFiXVaultForCNode.address);

        // deploy USDT HBTC NEST LP Token Rewards Pool (deployCoFiXStakingRewards)
        let CoFiXStakingRewardsForUSDT = await CoFiXStakingRewards.new(CoFiToken.address, usdtPair, CoFiXFactory.address);
        let CoFiXStakingRewardsForHBTC = await CoFiXStakingRewards.new(CoFiToken.address, hbtcPair, CoFiXFactory.address);
        let CoFiXStakingRewardsForNEST = await CoFiXStakingRewards.new(CoFiToken.address, nestPair, CoFiXFactory.address);

        // add pool and set pool weight
        let vaultForLP = await CoFiXVaultForLP.deployed();
        console.log(`CoFiXStakingRewardsForUSDT.address: ${CoFiXStakingRewardsForUSDT.address}, CoFiXStakingRewardsForHBTC: ${CoFiXStakingRewardsForHBTC.address}, CoFiXStakingRewardsForNEST: ${CoFiXStakingRewardsForNEST.address}`);
        await vaultForLP.addPool(CoFiXStakingRewardsForUSDT.address);
        await vaultForLP.addPool(CoFiXStakingRewardsForHBTC.address);
        await vaultForLP.addPool(CoFiXStakingRewardsForNEST.address);
        await vaultForLP.batchSetPoolWeight([CoFiXStakingRewardsForUSDT.address, CoFiXStakingRewardsForHBTC.address, CoFiXStakingRewardsForNEST.address], ["25", "25", "50"]);
        const usdtPoolInfo = await vaultForLP.getPoolInfo(CoFiXStakingRewardsForUSDT.address);
        console.log(`getPoolInfo, CoFiXStakingRewardsForUSDT.address: ${CoFiXStakingRewardsForUSDT.address}, state: ${usdtPoolInfo.state}, weight: ${usdtPoolInfo.weight}`);
        const hbtcPoolInfo = await vaultForLP.getPoolInfo(CoFiXStakingRewardsForHBTC.address);
        console.log(`getPoolInfo, CoFiXStakingRewardsForHBTC.address: ${CoFiXStakingRewardsForHBTC.address}, state: ${hbtcPoolInfo.state}, weight: ${hbtcPoolInfo.weight}`);
        const nestPoolInfo = await vaultForLP.getPoolInfo(CoFiXStakingRewardsForNEST.address);
        console.log(`getPoolInfo, CoFiXStakingRewardsForNEST.address: ${CoFiXStakingRewardsForNEST.address}, state: ${nestPoolInfo.state}, weight: ${nestPoolInfo.weight}`);

        console.log(`| ETH/USDT V2Pair | ${usdtPair} |`);
        console.log(`| ETH/HBTC V2Pair | ${hbtcPair} |`);
        console.log(`| ETH/NEST V2Pair | ${nestPair} |`);

        console.log(`| CoFiXV2StakingRewards ETH/USDT Pair | ${CoFiXStakingRewardsForUSDT.address} |`);
        console.log(`| CoFiXV2StakingRewards ETH/HBTC Pair | ${CoFiXStakingRewardsForHBTC.address} |`);
        console.log(`| CoFiXV2StakingRewards ETH/NEST Pair | ${CoFiXStakingRewardsForNEST.address} |`);

        console.log(`Contract Deployed Summary\n=========================`);
    
        console.log(`| CoFiToken | ${CoFiToken.address} |`);
        console.log(`| CoFiXNode | ${CoFiXNode.address} |`);

        console.log(`| CoFiXV2Factory | ${CoFiXFactory.address} |`);
        console.log(`| CoFiXV2Router | ${CoFiXRouter.address} |`);
        console.log(`| CoFiXV2Controller | ${CoFiXController.address} |`);

        console.log(`| CoFiXV2VaultForLP | ${CoFiXVaultForLP.address} |`);
        console.log(`| CoFiXV2VaultForTrader | ${CoFiXVaultForTrader.address} |`);
        console.log(`| CoFiXV2VaultForCNode | ${CoFiXVaultForCNode.address} |`);

        console.log(`| V2CNodeStakingRewards CNode | ${CNodeStakingRewards.address} |`);

        // check deploying results
        const pairCnt = await factory.allPairsLength();
        for (let i = 0; i < pairCnt; i++) {
            const pair = await factory.allPairs(i);
            // await controller.addCaller(pair);
            const allowed = await controller.callerAllowed(pair);
            const CPair = await CoFiXPair.at(pair);
            const token = await CPair.token1();
            const kInfo = await controller.getKInfo(token);
            console.log(`pair: ${pair}, allowed: ${allowed}, token: ${token}, k: ${kInfo.k}, theta: ${kInfo.theta.toString()}`);
        }
    }
};