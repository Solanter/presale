import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {String} - address of presale factory
 * @param signer {import('ethers').Signer} - signer
 * @param feeAddress {String} - fee address
 * @returns {Promise<*>} - transaction
 */
const presaleFactorySetFeeAddress = async ({ address, signer, feeAddress }) => {
  const contract = await getContract(address, signer, abi);
  return await contract.setFeeAddress(feeAddress);
};

export default presaleFactorySetFeeAddress;
