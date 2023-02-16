import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 *
 * @param address{String}
 * @param provider{import('ethers').Provider}
 * @returns {Promise<String>}
 */
const presaleFactoryGetFeeAddress = async ({ address, provider }) => {
  const contract = await getContract(address, provider, abi);
  return await contract.feeAddress();
};

export default presaleFactoryGetFeeAddress;
