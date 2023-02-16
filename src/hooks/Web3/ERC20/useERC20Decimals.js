import useQuery from "../../Query/useQuery";
import erc20Decimals from "../../../web3Utils/ERC20Utils/erc20Decimals";

/**
 * @param tokenAddress{String} - ERC20 token address
 * @param provider{import("@wagmi/core").Provider || import("@wagmi/core").Signer} - ethers.js provider or signer
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: unknown, isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<unknown, unknown>>, error: unknown, remove: () => void, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useERC20Decimals = ({ tokenAddress, provider }) => {
  const chainId = provider?._isSigner
    ? provider?.provider?._network?.chainId
    : provider?._network?.chainId;

  const decimals = useQuery(
    ["erc20", "decimals", tokenAddress, chainId],
    async () => {
      return await erc20Decimals(tokenAddress, provider);
    },
    {
      enabled: !!tokenAddress && !!provider,
    }
  );

  return { ...decimals };
};

export default useERC20Decimals;
