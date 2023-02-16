import useERC20Decimals from "./useERC20Decimals";
import useERC20MultiAllowances from "./useERC20MultiAllowances";
import useERC20Name from "./useERC20Name";
import useERC20Symbol from "./useERC20Symbol";
import useERC20Balance from "./useERC20Balance";
import useERC20TotalSupply from "./useERC20TotalSupply";
import useERC20Calls from "./useERC20Calls";
/**
 *
 * @param tokenAddress{string}  - ERC20 token address
 * @param provider{import("@wagmi/core").Provider || import("@wagmi/core").Signer} - ethers.js provider or signer
 * @param user{string} - The address of the user
 * @param spenders{string[]} - An array of spender addresses
 * @returns {{symbol: {isLoadingError: boolean, errorUpdateCount: number, data: *, isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: {<TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>, <TPageData>((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>}, error: *, remove: {(): void, (): void, (): void, (): void, (): void, (): void, (): void, (): void, (): void, (): void}, isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, transfer: (function(String, import("@wagmi/core").Signer, String, (String|Number|import('ethers').BigNumber)): Promise<import('@ethersproject/abstract-provider').TransactionReceipt>), balance: {balance: UseQueryResult<{amount: import('ethers').BigNumber, formatted: {String}, decimals: import('ethers').BigNumber}, *>}, totalSupply: {isLoadingError: boolean, errorUpdateCount: number, data: ({amount: import('ethers').BigNumber, formatted: String, decimals: import('ethers').BigNumber}|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<{amount: *, formatted: *, decimals: *}, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, decimals: {isLoadingError: boolean, errorUpdateCount: number, data: *, isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, name: {isLoadingError: boolean, errorUpdateCount: number, data: *, isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<*, *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}, allowances: {isLoadingError: boolean, errorUpdateCount: number, data: (Awaited<*>[{amount: import('ethers').BigNumber, formatted: string, decimals: import('ethers').BigNumber}]|undefined), isRefetching: boolean, isRefetchError: boolean, isFetching: boolean, isPlaceholderData: boolean, refetch: (<TPageData>function((RefetchOptions&RefetchQueryFilters<TPageData>)=): Promise<QueryObserverResult<Awaited<*>[], *>>), error: *, remove: (function(): void), isFetchedAfterMount: boolean, isLoading: boolean, errorUpdatedAt: number, dataUpdatedAt: number, isError: boolean, isPreviousData: boolean, isFetched: boolean, isIdle: boolean, isStale: boolean, failureCount: number, isSuccess: boolean, status: ("idle"|"error"|"loading"|"success")}}}
 */
const useERC20 = ({ tokenAddress, provider, user, spenders }) => {
  const decimals = useERC20Decimals({ tokenAddress, provider });
  const name = useERC20Name({ tokenAddress, provider });
  const symbol = useERC20Symbol({ tokenAddress, provider });

  const allowances = useERC20MultiAllowances({
    tokenAddress,
    provider,
    ownerAddress: user,
    spenders: spenders,
  });
  const balance = useERC20Balance({
    tokenAddress,
    provider,
    userAddress: user,
  });
  const totalSupply = useERC20TotalSupply({ tokenAddress, provider });

  const calls = useERC20Calls();

  return {
    address: tokenAddress,
    decimals,
    name,
    symbol,
    allowances,
    balance,
    totalSupply,
    ...calls,
  };
};

export default useERC20;
