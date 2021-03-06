/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
const utils = require('web3-utils');
// const { execSync } = require("child_process")

// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

// const commitHash = execSync("git describe --always --long").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    // use this network if we like to debug interactively or test migrations
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gasPrice: 0,
      gas: 7000000
    },
    // Another network with more advanced options...
    // advanced: {
      // port: 8777,             // Custom port
      // network_id: 1342,       // Custom network
      // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      // from: <address>,        // Account to send txs from (default: accounts[0])
      // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },

    mainnet: {
      provider: () => new HDWalletProvider({privateKeys: [process.env.mainnetMnemonic], providerOrUrl: `wss://mainnet.infura.io/ws/v3/`+ process.env.INFURA_PROJECT_ID, chainId: 1}),
      network_id: 1,
      gas: 6000000,
      gasPrice: utils.toWei('40', 'gwei'),
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: false
    },


    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () => new HDWalletProvider({privateKeys: [process.env.mnemonic], providerOrUrl: `wss://ropsten.infura.io/ws/v3/`+ process.env.INFURA_PROJECT_ID, chainId: 3}),
      network_id: 3,       // Ropsten's id
      gas: 7000000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false     // Skip dry run before migrations? (default: false for public nets )
    },

    kovan: {
      provider: () => new HDWalletProvider({privateKeys: [process.env.mnemonic], providerOrUrl: `wss://kovan.infura.io/ws/v3/`+ process.env.INFURA_PROJECT_ID, chainId: 42}),
      network_id: '42',
      gas: 7000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: false
    },

    rinkeby: {
      provider: () => new HDWalletProvider({privateKeys: [process.env.mnemonic], providerOrUrl: `wss://rinkeby.infura.io/ws/v3/`+ process.env.INFURA_PROJECT_ID, chainId: 4}),
      network_id: 4,
      gas: 7000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },

    // Useful for private networks
    // private: {
      // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
      // network_id: 2111,   // This network is yours, in the cloud.
      // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  plugins: ['solidity-coverage', 'truffle-plugin-verify'],

  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },

//   verify: {
//     preamble: `
// Author: CoFiX Core, https://cofix.io
// Commit hash: ${commitHash}
// Repository: https://github.com/Computable-Finance/CoFiX
// Issues: https://github.com/Computable-Finance/CoFiX/issues
// `
//   },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      excludeContracts: ['Migrations'],
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true,
          runs: 6666
        }
      },
      version: "0.6.12",
      evmVersion: "istanbul"
    }
  }
}
