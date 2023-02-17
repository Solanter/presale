import useERC20Decimals from "../Web3/ERC20/useERC20Decimals";
import { useQuery } from "react-query";
import uniGetAmountOut from "../../web3Utils/UniRouterUtils/uniGetAmountOut";
import { ethers } from "ethers";

/**
 * @param routerAddress
 * @param provider
 * @param pathToUsdt
 * @param chainId
 * @returns {import('react-query').UseQueryResult<{formatted: *, decimals: number, value: BigNumber.BigNumber}, *>}
 */
const useOutPrice = ({ routerAddress, provider, pathToUsdt, chainId }) => {
  const startTokenDecimals = useERC20Decimals({
    tokenAddress: pathToUsdt?.[0],
    provider,
  });

  const endTokenDecimals = useERC20Decimals({
    tokenAddress: pathToUsdt?.[pathToUsdt?.length - 1],
    provider,
  });

  /**
   * @type {import('react-query').UseQueryResult<{formatted: *, decimals: number, value: BigNumber}, unknown>}
   */
  const price = useQuery(
    [chainId, "price", pathToUsdt],
    async () => {
      if (
        pathToUsdt.length === 2 &&
        pathToUsdt[0].toLowerCase() === pathToUsdt[1].toLowerCase()
      ) {
        return {
          formatted: "1.0",
          value: ethers.utils.parseUnits("1.0", endTokenDecimals.data),
          decimals: endTokenDecimals.data,
        };
      }
      let amounts = await uniGetAmountOut(
        routerAddress,
        provider,
        ethers.utils.parseUnits("0.01", startTokenDecimals.data),
        pathToUsdt
      );

      amounts = amounts.map((a) => a.mul(100));
      const amountOut = amounts[amounts.length - 1];
      const amountOutFormatted = ethers.utils.formatUnits(
        amountOut,
        endTokenDecimals.data
      );
      return {
        value: amountOut,
        formatted: amountOutFormatted,
        decimals: Number(endTokenDecimals.data),
      };
    },
    {
      enabled:
        !!routerAddress &&
        !!pathToUsdt &&
        pathToUsdt.length >= 2 &&
        !!provider &&
        startTokenDecimals.isSuccess &&
        endTokenDecimals.isSuccess,
    }
  );

  return price;
};

export default useOutPrice;
