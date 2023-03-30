const { } = require("../prod/lib/spCoinReadMethods");
const { } = require("../prod/lib/spCoinDeleteMethods");
const { } = require("../prod/lib/spCoinAddMethods");

const {
    LOG_MODE,
    logSetup,
    setLogMode,
    log
  } = require("../prod/lib/utils/logging");

  let spCoinContractDeployed;

  deploySpCoinContract = async () => {
    spCoinContractDeployed = await deployContract();
    injectContract(spCoinContractDeployed);
    return spCoinContractDeployed;
  }

  injectContract = (spCoinContractDeployed) => {
    setContractReadMethods(spCoinContractDeployed);
    setContractDeleteMethods(spCoinContractDeployed);
    setContractAddMethods(spCoinContractDeployed);
    return spCoinContractDeployed;
  }
  
  deployContract = async () => {
    //setLogMode(LOG_MODE.LOG_SETUP, true);

    logSetup("deployContract = async ()");

    logSetup("JS => spCoinContract retrieved from Factory");
    let spCoinContract = await hre.ethers.getContractFactory("SPCoin");

    logSetup("JS => Deploying spCoinContract to Network");
    spCoinContractDeployed = await spCoinContract.deploy();
    logSetup("JS => spCoinContract is currently being mined");

    await spCoinContractDeployed.deployed();
    logSetup("JS => spCoinContract is mined and Deployed to the BlockChain Network");
//    let msgSender = await spCoinContractDeployed.msgSender();
     return spCoinContractDeployed;
}

module.exports = {
  deployContract,
  injectContract,
  deploySpCoinContract,
  spCoinContractDeployed
}