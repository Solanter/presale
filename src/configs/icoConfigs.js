const icoConfigsGoerli = {
  router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  ico: "0x47A10234C402A02e0f4c4853402e9AC408B6e3da",
  usdt: {
    address: "0xA61D4858b6171a47f5b6478Ce37bE643B52101Cf",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 18,
    coinGekoId: "tether",
  },
  wbnbUsdtLP: {
    address: "0x2A5085C4c40a9Ce02f0a0C6851767Cf37756797D",
    symbol: "WBNB-USDT",
    name: "WBNB-USDT",
    decimals: 18,
  },
  wbnb: {
    address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    symbol: "WBNB",
    name: "Wrapped Ether",
    decimals: 18,
    coinGekoId: "binance-coin",
  },
  solanter: {
    address: "0xd798223170365db0015b36A61D882e1C7298C55c",
    symbol: "SOLT",
    name: "Solanter",
    decimals: 18,
  },
};

// eslint-disable-next-line no-unused-vars
const icoConfigsBSC = {
  router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  ico: "0xBF41E8E871E96dAC3819367861a6AC50F633EDC2",
  wbnb: {
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    symbol: "WBNB",
    name: "Wrapped Ether",
    decimals: 18,
    coinGekoId: "binance-coin",
  },
  usdt: {
    address: "0x55d398326f99059fF775485246999027B3197955",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 18,
    coinGekoId: "tether",
  },
  wbnbUsdtLP: {
    address: "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE",
    symbol: "WBNB-USDT",
    name: "WBNB-USDT",
    decimals: 18,
  },
  solanter: {
    address: "0xEE52bb1E2f5d2B4D5b9713EE32F6AF229e233948",
    symbol: "SOLT",
    name: "Solanter",
    decimals: 18,
  },
};
const icoConfigs =
  process.env.REACT_APP_CHAIN_ID === "56" ? icoConfigsBSC : icoConfigsGoerli;
export default icoConfigs;
