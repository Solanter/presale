import useERC20Decimals from "./useERC20Decimals";
import useQuery from "../../Query/useQuery";
import erc20Allowance from "../../../web3Utils/ERC20Utils/erc20Allowance";
import ethers from "../../../web3Utils/ethers";

/**
 * @param tokenAddress
 * @param provider
 * @param ownerAddress
 * @param spenderAddress
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: undefined | {formatted: *, decimals: ?, value: BigNumber}, isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<{formatted: *, decimals: ?, value: BigNumber}, unknown>>, error: unknown, remove: () => void, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useERC20Allowance = ({
  tokenAddress,
  provider,
  ownerAddress,
  spenderAddress,
}) => {
  const chainId = provider?._isSigner
    ? provider?.provider?._network?.chainId
    : provider?._network?.chainId;

  const decimals = useERC20Decimals({ tokenAddress, provider });

  const allowance = useQuery(
    ["erc20", "allowance", tokenAddress, ownerAddress, spenderAddress, chainId],
    async () => {
      const allowance = await erc20Allowance(
        tokenAddress,
        provider,
        ownerAddress,
        spenderAddress
      );

      return {
        value: allowance,
        formatted: ethers.utils.formatUnits(allowance, decimals.data),
        decimals: decimals.data,
      };
    },
    {
      enabled: decimals?.isSuccess,
    }
  );

  return { ...allowance };
};

export default useERC20Allowance;
