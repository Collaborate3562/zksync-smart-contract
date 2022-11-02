import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const admin = "0x49B373D422BdA4C6BfCdd5eC1E48A9a26fdA2F8b"
  const buffer = 24 * 60 * 60

  const tokenManager = { address: "0xddDc546e07f1374A07b270b7d863371e575EA96A" }

  const timelock = await deployContract(hre, "PriceFeedTimelock", [
    admin,
    buffer,
    tokenManager.address
  ], "Timelock")
}
