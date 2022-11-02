import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  await deployContract(hre, "MintableBaseToken", ["VestingOption", "ARB:GMX", 0], "")
  await deployContract(hre, "MintableBaseToken", ["VestingOption", "ARB:GLP", 0], "")
  await deployContract(hre, "MintableBaseToken", ["VestingOption", "AVAX:GMX", 0], "")
  await deployContract(hre, "MintableBaseToken", ["VestingOption", "AVAX:GLP", 0], "")
}