import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const gmx = { address: "0xb57E4CC05Db9b54493525B2820A54A81d3de8a32" }
  const wGmx = { address: "0x0337103A30103E7D0d6Fb5513F3E162664f8c849" }
  await deployContract(hre, "Bridge", [gmx.address, wGmx.address], "Bridge")
}