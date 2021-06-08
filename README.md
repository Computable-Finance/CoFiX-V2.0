<h1 align=center><a href="https://cofix.io"><code>CoFiX V2.0</code></a></h1>

<p align=center> <i>A computable financial transaction model</i> </p>
<p align=center> <i>The Future of On-Chain Market Making is Here 🤑 📈📉💰</i> </p>


<p align="center">
  <a href="https://github.com/Computable-Finance/CoFiX/actions?query=workflow%3ACoFiX">
    <img src="https://github.com/Computable-Finance/CoFiX/workflows/CoFiX/badge.svg" />
  </a>
  <a href="https://travis-ci.org/Computable-Finance/CoFiX">
    <img src="https://travis-ci.org/Computable-Finance/CoFiX.svg?branch=master" />
  </a>
  <a href="https://coveralls.io/github/Computable-Finance/CoFiX?branch=master">
    <img src="https://coveralls.io/repos/github/Computable-Finance/CoFiX/badge.svg?branch=master" />
  </a>
  <a href="https://www.gnu.org/licenses/gpl-3.0">
    <img src="https://img.shields.io/badge/License-GPLv3-green.svg" />
  </a>
</p>

<!-- # [CoFiX](https://cofix.io/)

*A computable financial transaction model*

![CoFiX](https://github.com/Computable-Finance/CoFiX/workflows/CoFiX/badge.svg)
[![Build Status](https://travis-ci.org/Computable-Finance/CoFiX.svg?branch=master)](https://travis-ci.org/Computable-Finance/CoFiX)
[![Coverage Status](https://coveralls.io/repos/github/Computable-Finance/CoFiX/badge.svg?branch=master)](https://coveralls.io/github/Computable-Finance/CoFiX?branch=master) -->

## Whitepaper

**[https://cofix.io/doc/CoFiX_White_Paper.pdf](https://cofix.io/doc/CoFiX_White_Paper.pdf)**

## Documentation

**[https://docs.cofix.io/](https://docs.cofix.io/)**

**[https://github.com/Computable-Finance/Doc](https://github.com/Computable-Finance/Doc)**

**[Guide: How to Integrate with CoFiX](./docs/how_to_integrate_cofix.md)**

## Smart Contract Diagrams

![CoFiX Smart Contract](docs/cofix-smart-contract.svg)

<p align=center> <i>thanks 🦄 for great contract architecture</i> </p>

## Usage

### Run test

```shell
npm install

npm run test
```

### Compile

Run `truffle compile`, get build results in `build/contracts` folder, including `ABI` json files.

or

Use `npx oz compile` to adopt `@openzeppelin/cli` toolchain.

### Deploy

Deploy with `truffle` and you will get a contract deployement summary on contract addresses.

```shell
truffle migrate --network ropsten
```

You may need to `activate()` the price oracle through `CoFiXController` contract manually and set kTable with the help of [scripts/setKTable.js](scripts/setKTable.js).

### Scripts

There are several scripts used to invoke with the protocol in [`scripts/`](scripts) folder. Simplely run `truffle exec scripts/SPECIFIC_SCRIPT.JS` with flags to execute. Here are some [examples](docs/change_controller.md).

### Generate ABI

```shell
npm run genabi
```

## Mainnet

### Governance

CoFiX Governance (Multi-Sig) https://gnosis-safe.io/app/#/safes/0xF51d8FdF98286e1EA846c79f1526ECC95b93AbB8/balances

Check *Record of Governance Authority Transfer to Multi-Sig Wallet* and *Details on CoFiX Multi-Sig Governance Contract* [here](docs/transfer_governance_record.md).

*Governance ownership will be transferred to the CoFiX DAO in the next stage when the CoFi token is widely distributed.*

### 🎉 Release 🎉

|       Contract       |                  Address                   |
| :------------------: | :----------------------------------------: |
| USDT | 0xdAC17F958D2ee523a2206206994597C13D831ec7 |
| HBTC | 0x0316EB71485b0Ab14103307bf65a021042c6d380 |
| NEST | 0x04abEdA201850aC0124161F037Efd70c74ddC74C |
| WETH | 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 |
| NestPriceFacade | 0xB5D2890c061c321A5B6A4a4254bb1522425BAF0A |
| NestVote | 0xDa52f53a5bE4cb876DE79DcfF16F34B95e2D38e9 |
| CoFiToken | 0x1a23a6BfBAdB59fa563008c0fB7cf96dfCF34Ea1 |
| CoFiXNode | 0x558201DC4741efc11031Cdc3BC1bC728C23bF512 |
| CoFiXV2Factory | 0x39816B841436a57729723d9DA127805755d2CB51 |
| CoFiXV2Router | 0x72A63055b9AA997A4311D0D068170e38F5455b82 |
| CoFiXV2Controller(Abandoned) | 0xdE9972fe2567b7eEb3C015D7DCAefA8580877f7d |
| CoFiXV2Controller | 0xf471bFd6c0A1Ab79cAD54B9608652B85638ceD97 |
| CoFiXV2VaultForLP | 0x618B7b93b07Bf78D04B2e8FB2B1C3B48049F8ED5 |
| CoFiXV2VaultForTrader | 0xb29A8d980E1408E487B9968f5E4f7fD7a9B0CaC5 |
| CoFiXV2VaultForCNode | 0x3881292cE52AeD0EdAFF1AC7A40DA12AB2453B84 |
| ETH/USDT V2Pair | 0x9DF98Ef91148fb0F2b9321D07f57C9bD0Ff8c381 |
| ETH/HBTC V2Pair | 0xe1162b20847117ACcB66C46C9bFabBa45c44bD4d |
| ETH/NEST V2Pair | 0xB8F9218536870eeC443aEBF7C15dE59E535d0e0a |
| CoFiXV2StakingRewards ETH/USDT Pair | 0x3C41B1bEAf0a3c0929233009bb49cF00Fd2E8D07 |
| CoFiXV2StakingRewards ETH/HBTC Pair | 0x50B48B17ee1E4d96113aaD5e3fa561495FAA23eB |
| CoFiXV2StakingRewards ETH/NEST Pair | 0x74246388De82e5c40A01F640c7cab678ac1C5C13 |
| V2CNodeStakingRewards CNode | 0x810c0379d3215c4109F203E1C802A09008f7EbA2 |
| CoFiXDAO | 0x278f5d08bEa1989BEfcC09A20ad60fB39702D556 |

