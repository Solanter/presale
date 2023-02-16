import { useQuery } from "react-query";
import { ethers } from "ethers";

const useETHBalance = ({ address, provider, chainId }) => {
  const { data: balance, isLoading } = useQuery(
    [chainId, "eth", "balance", address],
    async () => {
      const balance = await provider.getBalance(address);
      return {
        value: balance,
        formatted: ethers.utils.formatEther(balance),
        decimals: 18,
      };
    },
    {
      enabled: !!address && !!provider && !!chainId,
    }
  );

  return { balance, isLoading };
};

export default useETHBalance;
