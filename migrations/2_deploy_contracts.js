var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MeinBlock = artifacts.require("./MeinBlock.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(MeinBlock);
};
