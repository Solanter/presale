/**
 *
 * @param providerOrSigner{import('ethers').providers.Web3Provider | import('ethers').providers.JsonRpcSigner | import('ethers').providers.Provider} - ethers.js provider or signer
 * @returns {Number}
 */
const extractChainId = (providerOrSigner) => {
  return providerOrSigner?._isSigner
    ? providerOrSigner?.provider?._network?.chainId
    : providerOrSigner?._network?.chainId;
};

export default extractChainId;
