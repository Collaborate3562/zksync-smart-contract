import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const vault = { address: "0x489ee077994B6658eAfA855C308275EAd8097C4A" }
  const orderBook = { address: "0x09f77E8A13De9a35a7231028187e9fD5DB8a2ACB" }
  await deployContract(hre, "OrderExecutor", [vault.address, orderBook.address])
}