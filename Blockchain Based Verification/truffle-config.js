require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Local network (Ganache)
    development: {
      host: "127.0.0.1",  // Localhost (default)
      port: 8545,         // Standard Ethereum port
      network_id: "*",    // Any network
    },

    // Goerli Testnet (if deploying to real blockchain)
    goerli: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC, 
        `https://goerli.infura.io/v3/${process.env.PROJECT_ID}`
      ),
      network_id: 5,       // Goerli's network ID
      gas: 5500000,        // Gas limit
      confirmations: 2,    // Number of confirmations to wait
      timeoutBlocks: 200,  // Timeout before failing deployment
      skipDryRun: true     // Skips test before deployment
    }
  },

  compilers: {
    solc: {
      version: "0.8.21", // Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
      }
    }
  },

  mocha: {
    timeout: 100000
  }
};
