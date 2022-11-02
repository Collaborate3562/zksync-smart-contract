import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, sendTxn } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const usdg = { address: "0x85E76cbf4893c1fbcB34dCF1239A91CE2A4CF5a7" }
  const wbnb = { address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" }
  const xgmt = { address: "0xe304ff0983922787Fd84BC9170CD21bF78B16B10" }

  const gmtUsdgPair = { address: "0xa41e57459f09a126F358E118b693789d088eA8A0" }
  const gmtUsdgFarm = await deployContract(hre, "YieldFarm", ["GMT-USDG Farm", "GMT-USDG:FARM", gmtUsdgPair.address], "gmtUsdgFarm")

  const xgmtUsdgPair = { address: "0x0b622208fc0691C2486A3AE6B7C875b4A174b317" }
  const xgmtUsdgFarm = await deployContract(hre, "YieldFarm", ["xGMT-USDG Farm", "xGMT-USDG:FARM", xgmtUsdgPair.address], "xgmtUsdgFarm")

  const usdgYieldTracker = await deployContract(hre, "YieldTracker", [usdg.address], "usdgYieldTracker")
  const usdgRewardDistributor = await deployContract(hre, "TimeDistributor", [], "usdgRewardDistributor")

  // await sendTxn(usdg.setYieldTrackers([usdgYieldTracker.address]), "usdg.setYieldTrackers")
  await sendTxn(usdgYieldTracker.setDistributor(usdgRewardDistributor.address), "usdgYieldTracker.setDistributor")
  await sendTxn(usdgRewardDistributor.setDistribution([usdgYieldTracker.address], ["0"], [wbnb.address]), "usdgRewardDistributor.setDistribution")

  const xgmtYieldTracker = await deployContract(hre, "YieldTracker", [xgmt.address], "xgmtYieldTracker")
  const xgmtRewardDistributor = await deployContract(hre, "TimeDistributor", [], "xgmtRewardDistributor")

  // await sendTxn(xgmt.setYieldTrackers([xgmtYieldTracker.address]), "xgmt.setYieldTrackers")
  await sendTxn(xgmtYieldTracker.setDistributor(xgmtRewardDistributor.address), "xgmtYieldTracker.setDistributor")
  await sendTxn(xgmtRewardDistributor.setDistribution([xgmtYieldTracker.address], ["0"], [wbnb.address]), "xgmtRewardDistributor.setDistribution")

  const gmtUsdgFarmYieldTrackerXgmt = await deployContract(hre, "YieldTracker", [gmtUsdgFarm.address], "gmtUsdgFarmYieldTrackerXgmt")
  const gmtUsdgFarmDistributorXgmt = await deployContract(hre, "TimeDistributor", [], "gmtUsdgFarmDistributorXgmt")

  await sendTxn(gmtUsdgFarmYieldTrackerXgmt.setDistributor(gmtUsdgFarmDistributorXgmt.address), "gmtUsdgFarmYieldTrackerXgmt.setDistributor")
  await sendTxn(gmtUsdgFarmDistributorXgmt.setDistribution([gmtUsdgFarmYieldTrackerXgmt.address], ["0"], [xgmt.address]), "gmtUsdgFarmDistributorXgmt.setDistribution")

  const gmtUsdgFarmYieldTrackerWbnb = await deployContract(hre, "YieldTracker", [gmtUsdgFarm.address], "gmtUsdgFarmYieldTrackerWbnb")
  const gmtUsdgFarmDistributorWbnb = await deployContract(hre, "TimeDistributor", [], "gmtUsdgFarmDistributorWbnb")

  await sendTxn(gmtUsdgFarmYieldTrackerWbnb.setDistributor(gmtUsdgFarmDistributorWbnb.address), "gmtUsdgFarmYieldTrackerWbnb.setDistributor")
  await sendTxn(gmtUsdgFarmDistributorWbnb.setDistribution([gmtUsdgFarmYieldTrackerWbnb.address], ["0"], [wbnb.address]), "gmtUsdgFarmDistributorWbnb.setDistribution")

  await sendTxn(gmtUsdgFarm.setYieldTrackers([gmtUsdgFarmYieldTrackerXgmt.address, gmtUsdgFarmYieldTrackerWbnb.address]), "gmtUsdgFarm.setYieldTrackers")

  const xgmtUsdgFarmYieldTrackerXgmt = await deployContract(hre, "YieldTracker", [xgmtUsdgFarm.address], "xgmtUsdgFarmYieldTrackerXgmt")
  const xgmtUsdgFarmDistributorXgmt = await deployContract(hre, "TimeDistributor", [], "xgmtUsdgFarmDistributorXgmt")

  await sendTxn(xgmtUsdgFarmYieldTrackerXgmt.setDistributor(xgmtUsdgFarmDistributorXgmt.address), "xgmtUsdgFarmYieldTrackerXgmt.setDistributor")
  await sendTxn(xgmtUsdgFarmDistributorXgmt.setDistribution([xgmtUsdgFarmYieldTrackerXgmt.address], ["0"], [xgmt.address]), "xgmtUsdgFarmDistributorXgmt.setDistribution")

  const xgmtUsdgFarmYieldTrackerWbnb = await deployContract(hre, "YieldTracker", [xgmtUsdgFarm.address], "xgmtUsdgFarmYieldTrackerWbnb")
  const xgmtUsdgFarmDistributorWbnb = await deployContract(hre, "TimeDistributor", [], "xgmtUsdgFarmDistributorWbnb")

  await sendTxn(xgmtUsdgFarmYieldTrackerWbnb.setDistributor(xgmtUsdgFarmDistributorWbnb.address), "xgmtUsdgFarmYieldTrackerWbnb.setDistributor")
  await sendTxn(xgmtUsdgFarmDistributorWbnb.setDistribution([xgmtUsdgFarmYieldTrackerWbnb.address], ["0"], [wbnb.address]), "gmtUsdgFarmDistributorWbnb.setDistribution")

  await sendTxn(xgmtUsdgFarm.setYieldTrackers([xgmtUsdgFarmYieldTrackerXgmt.address, xgmtUsdgFarmYieldTrackerWbnb.address]), "xgmtUsdgFarm.setYieldTrackers")
}