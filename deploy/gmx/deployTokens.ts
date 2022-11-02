import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  // await deployContract("EsGMX", [])
  // await deployContract("GLP", [])
  await deployContract(hre, "MintableBaseToken", ["esGMX IOU", "esGMX:IOU", 0])

  await deployContract(hre, "Governable", [], "Governable");
}