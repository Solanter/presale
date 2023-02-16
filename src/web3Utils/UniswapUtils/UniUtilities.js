import getContract from "../ContractUtils/getContract";
import factoryABI from "../abis/factory-abi.json";
import uniPairGetReserves from "../pairUtils/UniPairgetReserves";

/**
 *
 * @param token0 {String} - address of token0
 * @param token1 {String} - address of token1
 * @param routers {Array} - [{factory: string, website: string, router: string, name: string, wbnb: string, icon: string}]
 * @param provider {import('ethers').Provider} - provider
 * @returns {Promise<[{router: {factory: string, website: string, router: string, name: string, wbnb: string, icon: string}, pairAddress: String,  hasLP: Boolean}]>}
 */
const pairHasLP = async ({ token0, token1, routers, provider }) => {
  /**
   * @type {Awaited<unknown>[{router: {factory: string, website: string, router: string, name: string, wbnb: string, icon: string}, pairAddress: String,  hasLP: Boolean}]}
   */
  const lps = Promise.all(
    routers.map(async (router) => {
      const factory = getContract(router.factory, provider, factoryABI);
      const pairAddress = await factory.getPair(token0, token1);
      if (pairAddress !== "0x0000000000000000000000000000000000000000") {
        const { reserve0, reserve1 } = await uniPairGetReserves(
          pairAddress,
          provider
        );
        const has = Number(reserve0) > 0 && Number(reserve1) > 0;
        return {
          router,
          pairAddress,
          hasLP: has,
        };
      } else {
        return {
          router: router.router,
          pairAddress: pairAddress,
          hasLP: false,
        };
      }
    })
  );

  return lps;
};

export default pairHasLP;
