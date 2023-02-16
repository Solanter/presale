import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import UniPairgetReserves from "../../web3Utils/pairUtils/UniPairgetReserves";
import uniPairToken0 from "../../web3Utils/pairUtils/UniPairtoken0";
import uniPairToken1 from "../../web3Utils/pairUtils/UniPairToken1";
import useERC20TotalSupply from "../Web3/ERC20/useERC20TotalSupply";

const usePair = ({ address, provider }) => {
  const [price0, setPrice0] = useState(null);
  const [price1, setPrice1] = useState(null);
  const [priceLpInToken1, setPriceLpInToken1] = useState(null);
  const [priceLpInToken0, setPriceLpInToken0] = useState(null);

  const reserves = useQuery(
    ["pair", address, "reserves"],
    async () => {
      const _reserves = await UniPairgetReserves(address, provider).catch(
        (error) => {
          console.log(error);
        }
      );
      if (!_reserves) throw new Error("reserves not found");
      return {
        reserve0: _reserves["reserve0"],
        reserve1: _reserves["reserve1"],
      };
    },
    { enabled: !!address && !!provider }
  );

  useEffect(() => {
    if (reserves.data) {
      setPrice0(reserves.data.reserve1 / reserves.data.reserve0);
      setPrice1(reserves.data.reserve0 / reserves.data.reserve1);
    }
  }, [reserves?.data?.reserve0, reserves?.data?.reserve1]);

  const token0 = useQuery(
    ["pair", address, "token0"],
    async () => {
      return await uniPairToken0(address, provider);
    },
    { enabled: !!address && !!provider }
  );

  const token1 = useQuery(
    ["pair", address, "token1"],
    async () => {
      return await uniPairToken1(address, provider);
    },
    { enabled: !!address && !!provider }
  );

  const totalSupply = useERC20TotalSupply({ tokenAddress: address, provider });

  useEffect(() => {
    if (totalSupply.data?.value && reserves.data) {
      setPriceLpInToken0(reserves.data.reserve0 / totalSupply.data?.value);
      setPriceLpInToken1(reserves.data.reserve1 / totalSupply.data?.value);
    }
  }, [totalSupply.data, reserves.data?.reserve0, reserves.data?.reserve1]);

  const getPriceInToken = (token) => {
    if (token === token0.data) return priceLpInToken0;
    if (token === token1.data) return priceLpInToken1;
  };

  return {
    reserves,
    token0,
    token1,
    price0,
    price1,
    totalSupply,
    priceLpInToken0,
    priceLpInToken1,
    getPriceInToken,
  };
};

export default usePair;
