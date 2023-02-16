import ABI from "./erc20ABI.json";
import getContract from "../ContractUtils/getContract";

const erc20Name = async (tokenAddress, providerOrSigner) => {
  const contract = getContract(tokenAddress, providerOrSigner, ABI);
  return await contract.name();
};

export default erc20Name;
