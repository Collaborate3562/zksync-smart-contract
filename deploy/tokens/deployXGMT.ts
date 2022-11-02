import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, expandDecimals } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const initialSupply = expandDecimals(100 * 1000, 18)
  const xgmt = await deployContract(hre, "YieldToken", ["xGambit", "xGMT", initialSupply])
  return { xgmt }
}
