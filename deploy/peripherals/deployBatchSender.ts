import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const batchSender = await deployContract(hre, "BatchSender", [])
  return { batchSender }
}