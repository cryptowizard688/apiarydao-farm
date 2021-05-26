const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const signers = await hre.ethers.getSigners()

  // We get the contract to deploy
  const honeyCombToken = await hre.ethers.getContractFactory("HoneyCombToken")
  const HoneyCombToken = await honeyCombToken.deploy();
  const wBNBToken = await hre.ethers.getContractFactory("WBNB");
  const WBNBToken = await wBNBToken.deploy();
  const pancakeFactory = await hre.ethers.getContractFactory("PancakeFactory");
  const PancakeFactory = await pancakeFactory.deploy(signers[0].address);
  const pancakePair = await hre.ethers.getContractFactory("PancakePair");

  await HoneyCombToken.deployed();
  await WBNBToken.deployed();
  await PancakeFactory.deployed()

  const result = await PancakeFactory.createPair(WBNBToken.address,HoneyCombToken.address);
  //get first pair
  const pairAddress = await PancakeFactory.allPairs(0);
  const PancakePair = pancakePair.attach(pairAddress);
  console.log(await PancakePair.token0(),await PancakePair.token1());
  

  console.log(result)

  console.log("Greeter deployed to:", HoneyCombToken.address);
  console.log("WBNB deployed to",WBNBToken.address);
  console.log("PancakeFactory deployed to",PancakeFactory.address);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });