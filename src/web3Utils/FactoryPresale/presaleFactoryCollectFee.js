import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {String} - address of presale factory
 * @param signer {import('ethers').Signer} - signer
 * @returns {Promise<*>}
 */
const presaleFactoryCollectFee = async ({ address, signer }) => {
  const contract = await getContract(address, signer, abi);
  return await contract.collectFee();
};

export default presaleFactoryCollectFee;
