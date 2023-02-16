import ABI from "./erc20ABI.json";
import getContract from "../ContractUtils/getContract";

const erc20Decimals = async (tokenAddress, providerOrSigner) => {
  const contract = getContract(tokenAddress, providerOrSigner, ABI);
  return await contract.decimals();
};

export default erc20Decimals;
