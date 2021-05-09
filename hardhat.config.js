require("solidity-coverage");
require("@nomiclabs/hardhat-truffle5");


const mnemonic="juice oyster rapid else bag youth aspect round path cruel peanut trash";
// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  // This is a sample solc configuration that specifies which version of solc to use
  solidity: {
    version: "0.6.12",
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },

  networks: {
    hardhat: {
      blockGasLimit: 12000000,
      accounts: {
        mnemonic
      }
    },
    development: {
      url: "http://127.0.0.1:7545",
      port: 7545,
      network_id: "101",
    },
    test: {
      url: "http://127.0.0.1:7545",
      port: 7545,
      network_id: "*",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};