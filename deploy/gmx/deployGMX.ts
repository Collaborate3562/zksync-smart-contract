import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, sendTxn } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  await deployContract(hre, "GMX", [])
}
