import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const addresses = {}
  // addresses.BTC = (await callWithRetries(deployContract, ["FaucetToken", ["Bitcoin", "BTC", 18, expandDecimals(1000, 18)]])).address
  // addresses.USDC = (await callWithRetries(deployContract, ["FaucetToken", ["USDC Coin", "USDC", 18, expandDecimals(1000, 18)]])).address
  // addresses.USDT = (await callWithRetries(deployContract, ["FaucetToken", ["Tether", "USDT", 18, expandDecimals(1000, 18)]])).address

  // writeTmpAddresses(addresses)
}