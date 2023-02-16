import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address{string}
 * @param provider{import('ethers').Provider}
 * @returns {Promise<import('ethers').BigNumber>}
 */
const presaleFactoryGetFee = async ({ address, provider }) => {
  const contract = await getContract(address, provider, abi);
  return await contract.fee();
};

export default presaleFactoryGetFee;
