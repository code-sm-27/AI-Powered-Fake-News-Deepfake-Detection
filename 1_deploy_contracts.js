const NewsVerification = artifacts.require("NewsVerification");

module.exports = function (deployer) {
  deployer.deploy(NewsVerification);
};
