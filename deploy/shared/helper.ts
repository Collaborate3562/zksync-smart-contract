import { utils, Wallet, Contract, Web3Provider, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { PRIVATE_KEY } from "./contants";

const network = (process.env.HARDHAT_NETWORK || 'mainnet');

// An example of a deploy script that will deploy and call a simple contract.
export async function deployContract (hre: HardhatRuntimeEnvironment, name: string, args : any, label?: any, options?: any) {
  console.log(`Running deploy script for the ${name} contract`);
  if (!options && typeof label === "object") {
    label = null
    options = label
  }
  let info = name
  if (label) { info = name + ":" + label }

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
  const gContract = await deployer.deploy(artifact, [...args]);

  // Show the contract info.
  const contractAddress = gContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
  return gContract;
}

export async function sendTxn(txnPromise, label) {
    const txn = await txnPromise
    console.info(`Sending ${label}...`)
    await txn.wait()
    console.info(`... Sent! ${txn.hash}`)
    await sleep(1000)
    return txn
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function bigNumberify(n) {
  return ethers.BigNumber.from(n)
}

export function expandDecimals(n, decimals) {
  return bigNumberify(n).mul(bigNumberify(10).pow(decimals))
}

export async function getFrameSigner() {
  try {
    const frame = new ethers.providers.JsonRpcProvider("http://127.0.0.1:1248")
    const signer = frame.getSigner()
    if (getChainId(network) !== await signer.getChainId()) {
      throw new Error("Incorrect frame network")
    }
    return signer
  } catch (e) {
    throw new Error(`getFrameSigner error: ${e.toString()}`)
  }
}

function getChainId(network) {
  if (network === "arbitrum") {
    return 42161
  }

  if (network === "avax") {
    return 43114
  }

  throw new Error("Unsupported network")
}

// export async function contractAt(name, address, provider) {
//   let contractFactory = await ethers.getContractFactory(name)
//   if (provider) {
//     contractFactory = contractFactory.connect(provider)
//   }
//   return await contractFactory.attach(address)
// }