import erc20TotalSupply from "../../../web3Utils/ERC20Utils/erc20TotalSupply";
import useERC20Decimals from "./useERC20Decimals";
import useQuery from "../../Query/useQuery";
import ethers from "../../../web3Utils/ethers";

/**
 * @param tokenAddress{String} - ERC20 token address
 * @param provider{import("ethers").Provider || import("ethers").Signer} - ethers.js provider or signer
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: undefined | {value: import('ethers').BigNumber, formatted: String, decimals: import('ethers').BigNumber}, isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<{amount: *, formatted: *, decimals: *}, unknown>>, error: unknown, remove: () => void, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useERC20TotalSupply = ({ tokenAddress, provider }) => {
  const chainId = provider?._isSigner
    ? provider?.provider?._network?.chainId
    : provider?._network?.chainId;

  const decimals = useERC20Decimals({ tokenAddress, provider });

  const totalSupply = useQuery(
    ["erc20", "totalSupply", tokenAddress, chainId],
    async () => {
      const supply = await erc20TotalSupply(tokenAddress, provider);

      return {
        value: supply,
        formatted: ethers.utils.formatUnits(supply, decimals.data),
        decimals: decimals.data,
      };
    },
    {
      enabled: decimals?.isSuccess && !!tokenAddress && !!provider,
    }
  );

  return { ...totalSupply };
};

export default useERC20TotalSupply;
