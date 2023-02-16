import abi from "../abis/presale-factory.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {String} - address of presale factory
 * @param signer {import('ethers').Signer} - signer
 * @param saleToken {String} - address of sale token
 * @param raisedToken {String} - address of raised token
 * @param router {String} - address of router
 * @param fee {import('ethers').BigNumberish} - fee
 * @returns {Promise<*>} - transaction
 */
const presaleFactorycreatePresale = async ({
  address,
  signer,
  saleToken,
  raisedToken,
  router,
  fee,
}) => {
  const contract = await getContract(address, signer, abi);
  return await contract.createPresale(saleToken, raisedToken, router, {
    value: fee,
  });
};

export default presaleFactorycreatePresale;
