/**
 *
 * @type {[{name: string, explorer: string, currency: {symbol: string, decimals: number, name: string}, id: number, rpcUrl: string}]}
 */
export const chains = [
  {
    id: 1,
    name: "Ethereum Mainnet",
    currency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrl: "https://cloudflare-eth.com",
    explorer: "https://etherscan.com/",
  },
  {
    id: 5,
    name: "Goerli Testnet",
    currency: {
      name: "Goerli Ether",
      symbol: "GOETH",
      decimals: 18,
    },
    rpcUrl:
      "https://eth-goerli.g.alchemy.com/v2/bkvJFs36mxKLjTwbkfKx10NCPBgNQf3D", //`https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
    explorer: "https://goerli.etherscan.io/",
  },
  {
    id: 56,
    name: "Binance Smart Chain",
    shortName: "BSC",
    currency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrl: `https://bsc-dataseed.binance.org/`,
    explorer: "https://bscscan.com/",
  },
];
/**
 * @param chainId
 * @returns {{name: string, explorer: string, currency: {symbol: string, decimals: number, name: string}, id: number, rpcUrl: string}}
 */
export const getChain = (chainId) => {
  chainId = Number(chainId);
  return chains.find((chain) => chain.id === chainId);
};
