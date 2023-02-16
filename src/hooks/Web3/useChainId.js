import { useEffect, useState } from "react";

/**
 * @param provider{import('ethers').providers.Web3Provider | import('ethers').Signer}
 * @returns {number}
 */
const useChainId = ({ provider }) => {
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (provider?._isSigner) {
      provider.getChainId().then((chainId) => {
        setChainId(chainId);
      });
    } else {
      provider.getNetwork().then((network) => {
        setChainId(network.chainId);
      });
    }
  }, [provider]);

  return chainId;
};

export default useChainId;
