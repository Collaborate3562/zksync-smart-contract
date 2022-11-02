import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as ethers from "ethers";
import { deployContract, expandDecimals } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const initialSupply = expandDecimals(401 * 1000, 18)
  const gmt = await deployContract(hre, "GMT", [initialSupply])
  return { gmt }
}