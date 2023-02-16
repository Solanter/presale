import useQuery from "../../Query/useQuery";
import erc20Name from "../../../web3Utils/ERC20Utils/erc20Name";

/**
 *
 * @param tokenAddress{String} - ERC20 token address
 * @param provider{import("@wagmi/core").Provider || import("@wagmi/core").Signer} - ethers.js provider or signer
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: unknown, isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<unknown, unknown>>, error: unknown, remove: () => void, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useERC20Name = ({ tokenAddress, provider }) => {
  const chainId = provider?._isSigner
    ? provider?.provider?._network?.chainId
    : provider?._network?.chainId;

  const name = useQuery(
    ["erc20", "name", tokenAddress, chainId],
    async () => {
      return await erc20Name(tokenAddress, provider);
    },
    {
      enabled: !!provider && !!tokenAddress,
    }
  );

  return { ...name };
};

export default useERC20Name;
