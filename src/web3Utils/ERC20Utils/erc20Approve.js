import ABI from "./erc20ABI.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param tokenAddress{String} - The address of the ERC20 contract
 * @param providerOrSigner{ import("@wagmi/core").Provider || import("@wagmi/core").Signer } - ethers.js provider or signer
 * @param spenderAddress{String} - The address of the spender
 * @param amount{String | Number | import('ethers').BigNumber} - The amount to send
 * @returns {Promise<*>}
 */
const erc20Approve = async (
  tokenAddress,
  providerOrSigner,
  spenderAddress,
  amount
) => {
  const contract = getContract(tokenAddress, providerOrSigner, ABI);
  return await contract.approve(spenderAddress, amount);
};

export default erc20Approve;
