const acceptedTokensBSC = [
  {
    name: "Binance Coin",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    icon: new URL("../../public/images/tokens/bnb.svg", import.meta.url).href,
    symbol: "BNB",
  },
  {
    name: "USD Tether",
    symbol: "USDT",
    address: "0x55d398326f99059fF775485246999027B3197955",
    icon: new URL("../../public/images/tokens/usdt.svg", import.meta.url).href,
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    icon: new URL("../../public/images/tokens/busd.svg", import.meta.url).href,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    icon: new URL("../../public/images/tokens/usdc.svg", import.meta.url).href,
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    icon: new URL("../../public/images/tokens/dai.svg", import.meta.url).href,
  },
];

/**
 * @type {[{symbol: string, address: string, name: string, icon: string},{symbol: string, address: string, name: string, icon: string},{symbol: string, address: string, name: string, icon: string},{symbol: string, address: string, name: string, icon: string},{symbol: string, address: string, name: string, icon: string},null]}
 */
// eslint-disable-next-line no-unused-vars
const acceptedTokens = [
  {
    name: "Binance Coin",
    address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    icon: new URL("../../public/images/tokens/bnb.svg", import.meta.url).href,
    symbol: "BNB",
    decimals: 18,
  },
  {
    name: "USD Tether",
    symbol: "USDT",
    address: "0xF326A720a6Ec43EE10Ba1f046A4C981919F046b0",
    icon: new URL("../../public/images/tokens/usdt.svg", import.meta.url).href,
    decimals: 18,
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
    address: "0xc5070FEFe62A9944d609DBbe01EaFc34dD982951",
    icon: new URL("../../public/images/tokens/busd.svg", import.meta.url).href,
    decimals: 18,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    address: "0xb24A7d4FDB0835bDe41fa92Cd6aB676Ab47C52b9",
    icon: new URL("../../public/images/tokens/usdc.svg", import.meta.url).href,
    decimals: 18,
  },
  {
    name: "Dai Stablecoin",
    symbol: "DAI",
    address: "0xC76FE5B059140D1EDCF0EeF6Ea157F2c0d0aBb97",
    icon: new URL("../../public/images/tokens/dai.svg", import.meta.url).href,
    decimals: 18,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    address: "0x8cf600e75531D1c2912Fe8240E83a22099591CA9",
    icon: new URL("../../public/images/tokens/doge.svg", import.meta.url).href,
    decimals: 18,
  },
];

export default process.env.REACT_APP_CHAIN_ID === "56"
  ? acceptedTokensBSC
  : acceptedTokens;
