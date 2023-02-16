import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {String} - address of presale factory
 * @param provider{import('ethers').Provider}
 * @param index{Number}
 * @returns {Promise<String>}
 */
const presaleFactoryGetPresaleAt = async ({ address, provider, index }) => {
  const contract = await getContract(address, provider, abi);
  return await contract.presales(index);
};

export default presaleFactoryGetPresaleAt;
