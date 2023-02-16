import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {String} - address of presale factory
 * @param signer {import('ethers').Signer} - signer
 * @param fee {import('ethers').BigNumberish} - fee
 * @returns {Promise<*>}
 */
const presaleFactorySetFee = async ({ address, signer, fee }) => {
  const contract = await getContract(address, signer, abi);
  return await contract.setFee(fee);
};

export default presaleFactorySetFee;
