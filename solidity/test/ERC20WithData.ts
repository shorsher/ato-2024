import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import { ERC20WithData } from "../typechain";

chai.use(solidity);

describe("ERC20WithData", function () {
  let ERC20WithData;
  let ttCoin: ERC20WithData;

  let orgA: SignerWithAddress;
  let orgB: SignerWithAddress;

  beforeEach(async () => {
    [orgA, orgB] = await ethers.getSigners();
    ERC20WithData = await ethers.getContractFactory("ERC20WithData");
    ttCoin = await ERC20WithData.deploy("ttCoin", "TT");

    await ttCoin.deployed();
  });

  it("Should mint tokens", async () => {
    await ttCoin.connect(orgA).mintWithData(orgA.address, 1000, "0x00");
    expect(await ttCoin.balanceOf(orgA.address)).to.equal(1000);
  });

  it("Should transfer tokens from orgA to orgB", async () => {
    await ttCoin.connect(orgA).mintWithData(orgA.address, 1000, "0x00");
    expect(await ttCoin.balanceOf(orgA.address)).to.equal(1000);

    await ttCoin.connect(orgA).transferWithData(orgA.address, orgB.address, 1000, "0x00");
    expect(await ttCoin.balanceOf(orgA.address)).to.equal(0);
    expect(await ttCoin.balanceOf(orgB.address)).to.equal(1000);
  });
});