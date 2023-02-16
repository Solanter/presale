import { useQuery } from "react-query";
import { ethers } from "ethers";
import extractChainId from "../../web3Utils/ChainUtils/extractChainId";
import uniGetAmountOut from "../../web3Utils/UniRouterUtils/uniGetAmountOut";
import useERC20MultiDecimals from "../Web3/ERC20/useERC20MultiDecimals";

/**
 *
 * @param routerAddress{string}
 * @param provider{import('ethers').providers.BaseProvider | import('ethers').providers.Web3Provider | import('ethers').providers.JsonRpcProvider}
 * @param path{[string]}
 * @param amountIn{BigInt | import('ethers').BigNumber | Number | undefined}
 */
const useTokensPrice = ({ routerAddress, provider, path, amountIn }) => {
  if (!path || path.length < 2)
    console.warn("[useTokenPrice]: need to be length >= 2");
  const chainId = extractChainId(provider);
  const decimals = useERC20MultiDecimals({ tokenAddresses: path, provider });

  return useQuery(
    [
      chainId,
      routerAddress,
      "price",
      path,
      amountIn ? ethers.BigNumber.from(amountIn) : undefined,
    ],
    async () => {
      const amounts = await uniGetAmountOut(
        routerAddress,
        provider,
        amountIn,
        path
      );
      const amountsOut = [];
      amounts.forEach((amount, index) => {
        const amountObject = {
          amount,
          formatted: ethers.utils.formatUnits(
            amount,
            decimals?.decimals?.data[index]
          ),
          decimals: Number(decimals?.decimals?.data[index]),
          amountIn,
        };
        amountsOut[index] = amountObject;
        amountsOut[path[index]] = amountObject;
      });

      return amountsOut;
    },
    {
      enabled:
        !!routerAddress &&
        !!path &&
        path.length >= 2 &&
        !!provider &&
        decimals.decimals.isSuccess &&
        !!amountIn,
    }
  );
};

export default useTokensPrice;
