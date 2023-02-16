import ABI from "./erc20ABI.json";
import getContract from "../ContractUtils/getContract";

const erc20TotalSupply = async (tokenAddress, providerOrSigner) => {
  const contract = getContract(tokenAddress, providerOrSigner, ABI);
  return await contract.totalSupply();
};

export default erc20TotalSupply;
