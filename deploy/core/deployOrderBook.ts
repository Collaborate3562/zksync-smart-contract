import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployContract, sendTxn, expandDecimals } from "../shared/helper";

export default async function (hre: HardhatRuntimeEnvironment) {
  const nativeToken = { address: "0x000000000000000000000000000000000000800A" }

  const orderBook = await deployContract(hre, "OrderBook", []);

  // Arbitrum mainnet addresses
  // await sendTxn(orderBook.initialize(
  //   "0x5F719c2F1095F7B9fc68a68e35B51194f4b6abe8", // router
  //   "0x9ab2De34A33fB459b538c43f251eB825645e8595", // vault
  //   nativeToken.address, // weth
  //   "0xc0253c3cC6aa5Ab407b5795a04c28fB063273894", // usdg
  //   "10000000000000000", // 0.01 AVAX
  //   expandDecimals(10, 30) // min purchase token amount usd
  // ), "orderBook.initialize");

  // writeTmpAddresses({
  //   orderBook: orderBook.address
  // })
}