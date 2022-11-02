import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "../shared/helper";

async function getValues() {
  // const signer = await getFrameSigner()

  // const esGmx = await contractAt("EsGMX", "0xFf1489227BbAAC61a9209A08929E4c2a526DdD17")
  // const esGmxGov = await contractAt("Timelock", await esGmx.gov(), signer)
  // const gmxVester = await contractAt("Vester", "0x472361d3cA5F49c8E633FB50385BfaD1e018b445")
  // const gmxVesterGov = await contractAt("Timelock", await gmxVester.gov(), signer)
  // const glpVester = await contractAt("Vester", "0x62331A7Bd1dfB3A7642B7db50B5509E57CA3154A")
  // const glpVesterGov = await contractAt("Timelock", await glpVester.gov(), signer)

  // return { esGmx, esGmxGov, gmxVester, gmxVesterGov, glpVester, glpVesterGov }
  const esGmx = "";
  return { esGmx }
}

export default async function (hre: HardhatRuntimeEnvironment) {
  const { esGmx } = await getValues()
  const esGmxBatchSender = await deployContract(hre, "EsGmxBatchSender", [esGmx])
}