import erc20Symbol from "../../../web3Utils/ERC20Utils/erc20Symbol";
import useQuery from "../../Query/useQuery";

/**
 *
 * @param tokenAddress{String} - ERC20 token address
 * @param provider{import("ethers").Provider || import("ethers").Signer} - ethers.js provider or signer
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: unknown, isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: {<TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<unknown, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<unknown, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<unknown, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<unknown, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<unknown, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<*, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<*, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<*, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<*, unknown>>, <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)): Promise<QueryObserverResult<*, unknown>>}, error: unknown, remove: {(): void, (): void, (): void, (): void, (): void, (): void, (): void, (): void, (): void, (): void}, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useERC20Symbol = ({ tokenAddress, provider }) => {
  const chainId = provider?._isSigner
    ? provider?.provider?._network?.chainId
    : provider?._network?.chainId;

  const symbol = useQuery(
    ["erc20", "symbol", tokenAddress, chainId],
    async () => {
      return await erc20Symbol(tokenAddress, provider);
    },
    {
      enabled: !!tokenAddress && !!provider,
    }
  );

  return { ...symbol };
};

export default useERC20Symbol;
