import ABI from "./erc20ABI.json";
import getContract from "../ContractUtils/getContract";

const erc20Symbol = async (tokenAddress, providerOrSigner) => {
  const contract = getContract(tokenAddress, providerOrSigner, ABI);
  return await contract.symbol();
};

export default erc20Symbol;
