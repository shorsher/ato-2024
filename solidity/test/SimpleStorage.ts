import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { SimpleStorage } from "../typechain";
import { ethers } from "hardhat";

chai.use(solidity);

describe("SimpleStorage", function () {
  let SimpleStorage;
  let instance: SimpleStorage;

  beforeEach(async () => {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    instance = await SimpleStorage.deploy(0);

    await instance.deployed();
  });

  it("Should set the value", async () => {
    await instance.set(42);
    expect(await instance.get()).to.equal(42);
  });
});