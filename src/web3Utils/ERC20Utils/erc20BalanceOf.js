import ABI from "./erc20ABI.json";
import getContract from "../ContractUtils/getContract";
/**
 *
 * @param contractAddress{String} - The address of the ERC20 contract
 * @param signerOrProvider{ import("@wagmi/core").Provider || import("@wagmi/core").Signer } - ethers.js provider or signer
 * @param user{String} - The address of the user
 * @returns {Promise<import('ethers').BigNumber>}
 * @constructor
 */
const ERC20BalanceOf = async (contractAddress, signerOrProvider, user) => {
  const contract = getContract(contractAddress, signerOrProvider, ABI);
  return await contract.balanceOf(user);
};

export default ERC20BalanceOf;
