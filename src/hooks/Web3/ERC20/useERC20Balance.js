/**
 *
 * @param tokenAddress{String} - ERC20 token address
 * @param userAddress{String} - user address
 * @param provider{import("@wagmi/core").Provider || import("@wagmi/core").Signer} - ethers.js provider or signer
 */
import useERC20Decimals from "./useERC20Decimals";
import erc20BalanceOf from "../../../web3Utils/ERC20Utils/erc20BalanceOf";
import useQuery from "../../Query/useQuery";
import ethers from "../../../web3Utils/ethers";

/**
 *
 * @param tokenAddress{String} - ERC20 token address
 * @param userAddress{String} - user address
 * @param provider{import("@wagmi/core").Provider || import("@wagmi/core").Signer} - ethers.js provider or signer
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: undefined | {value: import('ethers').BigNumber, formatted: String, decimals: import('ethers').BigNumber}, isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<{amount: BigNumber, formatted: *, decimals: ?}, unknown>>, error: unknown, remove: () => void, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useERC20Balance = ({ tokenAddress, userAddress, provider }) => {
  const chainId = provider?._isSigner
    ? provider?.provider?._network?.chainId
    : provider?._network?.chainId;

  const decimals = useERC20Decimals({ tokenAddress, provider });

  const balance = useQuery(
    ["erc20", "balance", tokenAddress, userAddress, chainId],
    async () => {
      const balance = await erc20BalanceOf(tokenAddress, provider, userAddress);

      return {
        value: balance,
        formatted: ethers.utils.formatUnits(balance, decimals.data),
        decimals: decimals.data,
      };
    },
    {
      enabled:
        decimals?.isSuccess && !!userAddress && !!provider && !!tokenAddress,
    }
  );

  return { ...balance };
};

export default useERC20Balance;
