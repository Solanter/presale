import useERC20Decimals from "./useERC20Decimals";
import useQuery from "../../Query/useQuery";
import erc20Allowance from "../../../web3Utils/ERC20Utils/erc20Allowance";
import ethers from "../../../web3Utils/ethers";

/**
 * hook to get allowances for multiple spenders for a single token and a single owner
 * TODO: improve this with a multicall to reduce the number of requests
 * @param tokenAddress{string} - ERC20 token addresses
 * @param provider{import("@wagmi/core").Provider || import("@wagmi/core").Signer} - ethers.js provider or signer
 * @param ownerAddress{string} - owner address
 * @param spenders{string[] | undefined} - spenders addresses
 * @returns {{isLoadingError: false | true, errorUpdateCount: number, data: undefined | Awaited<unknown>[{value: import('ethers').BigNumber, formatted: string,decimals:import('ethers').BigNumber}], isRefetching: boolean, isRefetchError: false | true, isFetching: boolean, isPlaceholderData: boolean, refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>)) => Promise<QueryObserverResult<Awaited<unknown>[], unknown>>, error: unknown, remove: () => void, isFetchedAfterMount: boolean, isLoading: false | true, errorUpdatedAt: number, dataUpdatedAt: number, isError: false | true, isPreviousData: boolean, isFetched: boolean, isIdle: true | false, isStale: boolean, failureCount: number, isSuccess: false | true, status: "idle" | "error" | "loading" | "success"}}
 */
const useERC20MultiAllowances = ({
  tokenAddress,
  provider,
  ownerAddress,
  spenders,
}) => {
  const chainId = provider?._isSigner
    ? provider?.provider?._network?.chainId
    : provider?._network?.chainId;

  const decimals = useERC20Decimals({ tokenAddress: tokenAddress, provider });

  const allowances = useQuery(
    ["erc20", "allowance", tokenAddress, ownerAddress, spenders, chainId],
    async () => {
      const al = {};
      for (let spender of spenders) {
        const allowance = await erc20Allowance(
          tokenAddress,
          provider,
          ownerAddress,
          spender
        );
        al[spender] = {
          value: allowance,
          formatted: ethers.utils.formatUnits(allowance, decimals.data),
          decimals: decimals.data,
        };
      }
      return al;
    },
    {
      enabled:
        decimals?.isSuccess &&
        spenders?.length > 0 &&
        !!ownerAddress &&
        !!tokenAddress &&
        !!provider,
    }
  );

  return { ...allowances };
};
export default useERC20MultiAllowances;
