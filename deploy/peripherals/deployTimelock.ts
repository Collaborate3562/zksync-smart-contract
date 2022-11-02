import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, expandDecimals } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const admin = "0x49B373D422BdA4C6BfCdd5eC1E48A9a26fdA2F8b"
  const buffer = 24 * 60 * 60
  const maxTokenSupply = expandDecimals("13250000", 18)

  const tokenManager = { address: "0x8b25Ba1cAEAFaB8e9926fabCfB6123782e3B4BC2" }
  const glpManager = { address: "0xe1ae4d4b06A5Fe1fc288f6B4CD72f9F8323B107F" }
  const mintReceiver = tokenManager

  const timelock = await deployContract(hre, "Timelock", [
    admin,
    buffer,
    tokenManager.address,
    mintReceiver.address,
    glpManager.address,
    maxTokenSupply,
    10, // marginFeeBasisPoints 0.1%
    500 // maxMarginFeeBasisPoints 5%
  ], "Timelock")
}