import { expandDecimals } from "./utilities"
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { PRIVATE_KEY } from "../../deploy/shared/contants";
import { utils, Wallet, Contract, Web3Provider, Provider } from "zksync-web3";
import * as ethers from "ethers";

export async function deployContract (hre: HardhatRuntimeEnvironment, name: string, args : any) {
    let info = name
  
    // Initialize the wallet.
    const wallet = new Wallet(PRIVATE_KEY);
  
    // Create deployer object and load the artifact of the contract we want to deploy.
    const deployer = new Deployer(hre, wallet);
    const artifact = await deployer.loadArtifact(name);
  
    // Deposit some funds to L2 in order to be able to perform L2 transactions.
    const depositAmount = ethers.utils.parseEther("0.001");
    const depositHandle = await deployer.zkWallet.deposit({
      to: deployer.zkWallet.address,
      token: utils.ETH_ADDRESS,
      amount: depositAmount,
    });
    // Wait until the deposit is processed on zkSync
    await depositHandle.wait();
  
    // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
    return await deployer.deploy(artifact, [...args]);
}