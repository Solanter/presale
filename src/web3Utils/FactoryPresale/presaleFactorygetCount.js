import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {String} - address of presale factory
 * @param provider {import('ethers').Provider} - provider
 * @returns {Promise<import('ethers').BigNumber>} - count of presales
 */
const presaleFactorygetCount = async ({ address, provider }) => {
  const contract = await getContract(address, provider, abi);
  return await contract.presalesCount();
};

export default presaleFactorygetCount;
