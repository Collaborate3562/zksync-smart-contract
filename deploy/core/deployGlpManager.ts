import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, sendTxn } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {

  const vault = { address: "0xDE3590067c811b6F023b557ed45E4f1067859663" }
  const usdg = { address: "0x45096e7aA921f27590f8F19e457794EB09678141" }
  const glp = { address: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258" }
  const short_tracker = { address: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258" }

  const glpManager = await deployContract(hre, "GlpManager", [vault.address, usdg.address, glp.address, short_tracker.address, 15 * 60])

  await sendTxn(glpManager.setInPrivateMode(true), "glpManager.setInPrivateMode")

  // await sendTxn(glp.setMinter(glpManager.address, true), "glp.setMinter")
  // await sendTxn(usdg.addVault(glpManager.address), "usdg.addVault")
  // await sendTxn(vault.setManager(glpManager.address, true), "vault.setManager")

  // writeTmpAddresses({
  //   glpManager: glpManager.address
  // })
}