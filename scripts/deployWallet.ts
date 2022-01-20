import { ethers } from "hardhat";
const { CRP} = process.env;
import { MasterCRPWallet } from "../src/types/MasterCRPWallet";

async function main() {
  const Wallet = await ethers.getContractFactory("MasterCRPWallet")
  const wallet: MasterCRPWallet = 
    (await Wallet.deploy(CRP)) as MasterCRPWallet;

  console.log(`Wallet deployed to:${wallet.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
