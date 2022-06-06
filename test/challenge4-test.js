const { expect } = require("chai");
const { ethers } = require("hardhat");

let challenge4;
let deployer;
let user;


beforeEach("deploy", async function () {
  [deployer, user] = await ethers.getSigners();
  const Challenge4 = await ethers.getContractFactory("Challenge4");
  challenge4 = await Challenge4.deploy("ITUBlockchain", "ITUBC", 1000);
  await challenge4.deployed();
  await challenge4.mint();
});

describe("Challenge4", async function () {
    it("currentSupply increases correctly", async function () {
        expect(await challenge4.currentSupply()).to.equal(1);
        await challenge4.mint()
        expect(await challenge4.currentSupply()).to.equal(2);
    });

    it("currentSupply decreases correctly", async function () {
        expect(await challenge4.currentSupply()).to.equal(1);
        await challenge4.burn(0)
        expect(await challenge4.currentSupply()).to.equal(0);
    });

    it("currentSupply does not change", async function () {
        await challenge4.transferFrom(deployer.address, user.address, 0)
        expect(await challenge4.currentSupply()).to.equal(1);
    });

    it("only owner can burn", async function () {
        await expect(challenge4.connect(user).burn(0)).to.be.reverted;
    });
});