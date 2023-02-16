import { useQuery } from "react-query";
import extractChainId from "../../web3Utils/ChainUtils/extractChainId";
import UniPairgetReserves from "../../web3Utils/pairUtils/UniPairgetReserves";

/**
 *
 * @param address
 * @param provider
 * @returns {import("react-query").UseQueryResult<{reserve0, reserve1, blockTimestampLast}, unknown>}
 */
const usePairReserves = ({ address, provider }) => {
  const chainId = extractChainId(provider);

  return useQuery(
    [chainId, address, "pair", "reserves"],
    async () => {
      return await UniPairgetReserves(address, provider);
    },
    {
      enabled: !!address && !!provider && !!chainId,
    }
  );
};

export default usePairReserves;
