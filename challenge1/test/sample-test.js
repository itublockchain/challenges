const { expect } = require("chai");
const { ethers } = require("hardhat");

let challenge1;
let owner;
let user;
let randomPerson;

beforeEach("deploy", async function () {
  [owner, user, randomPerson] = await ethers.getSigners();
  const Challenge1 = await ethers.getContractFactory("Challenge1");
  challenge1 = await Challenge1.deploy();
  await challenge1.deployed();
});

describe("Challenge1", async function () {
  it("owner is correct", async function () {
    expect(await challenge1.owner()).to.equal(owner.address);
  });

  it("only owner can whitelist", async function () {
    await expect(
      challenge1.connect(randomPerson).whitelist(user.address)
    ).to.be.revertedWith("not owner");
  });

  it("only whitelisted can create warrior", async function () {
    expect(
      challenge1.connect(user).createWarrior("achilles", 50, 200)
    ).to.be.revertedWith("Only whitelisted users can create warriors");
  });

  it("only valid parameters work", async function () {
    challenge1.whitelist(user.address);
    expect(
      challenge1.connect(user).createWarrior("achilles", 2000, 2000)
    ).to.be.revertedWith("Invalid attributes");
  });

  it("whitelisted can create warrior correctly", async function () {
    challenge1.whitelist(user.address);
    await challenge1.connect(user).createWarrior("achilles", 50, 200);
    let tokenId = (await challenge1.tokenId()) - 1;
    let warrior = await challenge1.getWarrior(tokenId);

    expect(warrior.name).to.equal("achilles");
    expect(warrior.attack).to.equal(50);
    expect(warrior.defense).to.equal(200);
  });

  it("gets owner of warrior correctly", async function () {
    challenge1.whitelist(user.address);
    await challenge1.connect(user).createWarrior("achilles", 50, 200);
    let tokenId = (await challenge1.tokenId()) - 1;
    let ownerOfWarrior = await challenge1.getOwnerOfWarrior(tokenId);

    expect(ownerOfWarrior).to.equal(user.address);
  });

  it("emits event correctly", async function () {
    challenge1.whitelist(user.address);
    let tx = await challenge1.connect(user).createWarrior("achilles", 50, 200);
    let transferSingleEvent = (await tx.wait()).events.find(
      (e) => e.event === "WarriorCreated"
    );
    expect(transferSingleEvent.args.name.toLowerCase()).to.equal("achilles");
    expect(transferSingleEvent.args.attack).to.equal(50);
    expect(transferSingleEvent.args.defense).to.equal(200);
  });
});
