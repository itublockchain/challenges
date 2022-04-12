const { expect } = require("chai");
const { ethers } = require("hardhat");

let challenge0;
let deployer;
let stranger;

beforeEach(async function () {
  [deployer, stranger] = await ethers.getSigners();
  const Challenge0 = await ethers.getContractFactory("Challenge0");
  challenge0 = await Challenge0.connect(deployer).deploy();
  await challenge0.deployed();
});

describe("Challenge0", function () {
  it("owner should be deployer", async function () {
    expect(await challenge0.owner()).to.equal(deployer.address);
  });
  it("setWithdrawAmount should set correctly", async function () {
    await challenge0.setWithdrawAmount(ethers.utils.parseEther("1"));
    expect(await challenge0.withdrawAmount()).to.equal(
      ethers.utils.parseEther("1")
    );
  });
  it("setUserBalance and getUserBalance should work with deployer", async function () {
    await challenge0.setUserBalance(ethers.utils.parseEther("1"));
    expect(await challenge0.connect(deployer).getUserBalance()).to.equal(
      ethers.utils.parseEther("1")
    );
  });
  it("getUserBalance should not work with stranger", async function () {
    await challenge0.setUserBalance(ethers.utils.parseEther("1"));
    expect(await challenge0.connect(stranger).getUserBalance()).to.equal(
      ethers.utils.parseEther("0")
    );
  });
  it("canWithdraw should be true", async function () {
    await challenge0.setUserBalance(ethers.utils.parseEther("1"));
    await challenge0.setWithdrawAmount(ethers.utils.parseEther("0.5"));
    await challenge0.checkWithdraw();
    expect(await challenge0.canWithdraw()).to.equal(true);
  });
  it("canWithdraw should be false", async function () {
    await challenge0.setUserBalance(ethers.utils.parseEther("0.5"));
    await challenge0.setWithdrawAmount(ethers.utils.parseEther("1"));
    await challenge0.checkWithdraw();
    expect(await challenge0.canWithdraw()).to.equal(false);
  });
});
