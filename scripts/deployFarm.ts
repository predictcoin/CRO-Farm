import { ethers, upgrades } from "hardhat";
const { WALLET, CRP } = process.env;
import { MasterCRPWallet } from "../src/types/MasterCRPWallet";

async function main() {
  // We get the contract to deploy
  const predPerBlock = 10000000000;

  const wallet: MasterCRPWallet = (await ethers.getContractAt("MasterCRPWallet", WALLET!)) as MasterCRPWallet;
  const Farm = await ethers.getContractFactory("MasterCRP");
  const farm = await upgrades.deployProxy(Farm, [CRP, predPerBlock, 0, wallet.address], {kind: "uups"})
  await wallet.setMasterCRP(farm.address);

  console.log(`Farm deployed to:${farm.address}, wallet deployed to:${wallet.address}`,
  `implementation deployed to:${await ethers.provider.getStorageAt(
    farm.address,
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
    )}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
