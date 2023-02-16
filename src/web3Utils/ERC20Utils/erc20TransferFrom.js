import ABI from "./erc20ABI.json";
import getContract from "../ContractUtils/getContract";

/**
 *
 * @param tokenAddress{String} - The address of the ERC20 contract
 * @param providerOrSigner{ import("@wagmi/core").Provider || import("@wagmi/core").Signer } - ethers.js provider or signer
 * @param fromAddress{String} - The address of the sender
 * @param toAddress{String} - The address of the recipient
 * @param amount{String | Number | import('ethers').BigNumber} - The amount to send
 * @returns {Promise<*>}
 */
const erc20TransferFrom = async (
  tokenAddress,
  providerOrSigner,
  fromAddress,
  toAddress,
  amount
) => {
  const contract = getContract(tokenAddress, providerOrSigner, ABI);
  return await contract.transferFrom(fromAddress, toAddress, amount);
};

export default erc20TransferFrom;
