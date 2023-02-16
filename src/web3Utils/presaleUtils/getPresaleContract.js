import presaleABI from "../abis/presale-abi.json";
import getContract from "../ContractUtils/getContract";

/**
 * @param address {string} - Presale contract address
 * @param providerOrSigner {import('ethers').providers.Provider | import('ethers').Signer} - ethers.js provider or signer
 * @returns {Contract}
 */
const getPresaleContract = ({ address, providerOrSigner }) => {
  return getContract(address, providerOrSigner, presaleABI);
};

export default getPresaleContract;
