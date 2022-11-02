import { ethers } from "ethers"

export function toUsd(value) {
    const normalizedValue = parseInt((value * Math.pow(10, 10)).toString())
    return ethers.BigNumber.from(normalizedValue).mul(ethers.BigNumber.from(10).pow(20))
}

export const toNormalizedPrice = toUsd
  