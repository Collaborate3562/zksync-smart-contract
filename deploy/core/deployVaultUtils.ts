const network = (process.env.HARDHAT_NETWORK || 'mainnet');
const tokens = require('./tokens')[network];

async function main() {
  const signer = await getFrameSigner()
  const vault = await contractAt("Vault", "0x9ab2De34A33fB459b538c43f251eB825645e8595")
  const timelock = await contractAt("Timelock", await vault.gov(), signer)
  const vaultUtils = await deployContract("VaultUtils", [vault.address])
  await sendTxn(timelock.setVaultUtils(vault.address, vaultUtils.address), "timelock.setVaultUtils")
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getFrameSigner, deployContract, contractAt, sendTxn } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  await deployContract(hre, "Governable", [], "Governable");
}