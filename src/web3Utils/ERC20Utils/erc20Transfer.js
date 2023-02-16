import ABI from "./erc20ABI.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param tokenAddress{String} - The address of the ERC20 contract
 * @param providerOrSigner{ import("@wagmi/core").Provider || import("@wagmi/core").Signer } - ethers.js provider or signer
 * @param toAddress{String} - The address of the recipient
 * @param amount{String | Number | import('ethers').BigNumber} - The amount to send
 * @returns {Promise<*>}
 */
const erc20Transfer = async (
  tokenAddress,
  providerOrSigner,
  toAddress,
  amount
) => {
  const contract = getContract(tokenAddress, providerOrSigner, ABI);
  return contract.transfer(toAddress, amount);
};

export default erc20Transfer;
