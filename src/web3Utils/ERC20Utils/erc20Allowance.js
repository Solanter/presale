import getContract from "../ContractUtils/getContract";
import ABI from "./erc20ABI.json";

/**
 * @param tokenAddress{string}
 * @param providerOrSigner{import("ethers").Provider || import("ethers").Signer}
 * @param ownerAddress{string}
 * @param spenderAddress{string}
 * @returns {Promise<import('ethers').BigNumber>}
 */
const erc20Allowance = async (
  tokenAddress,
  providerOrSigner,
  ownerAddress,
  spenderAddress
) => {
  const contract = getContract(tokenAddress, providerOrSigner, ABI);
  return await contract.allowance(ownerAddress, spenderAddress);
};

export default erc20Allowance;
