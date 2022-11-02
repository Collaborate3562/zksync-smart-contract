import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, sendTxn } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const admin = { address: "0x44f0380dF7113ec30ae72ce96A50320Dd903dEdB" }
  const token = await deployContract(hre, "SnapshotToken", ["GMX Snapshot 1", "GMX 1", 0])
  await sendTxn(token.setInPrivateTransferMode(true), "token.setInPrivateTransferMode")
  await sendTxn(token.setMinter(admin.address, true), "token.setMinter")
}