import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {String} - address of presale factory
 * @param provider {import('ethers').Provider} - provider
 * @returns {Promise<*>} - percentage fee collected for this presale
 */
const presaleFactoryLaunchpadFee = async ({ address, provider }) => {
  const contract = await getContract(address, provider, abi);
  return await contract.LAUNCHPAD_FEE();
};

export default presaleFactoryLaunchpadFee;
