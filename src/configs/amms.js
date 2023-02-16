const pancakeIcon = new URL(
  "../../public/images/amms/pancakeswap.svg",
  import.meta.url
).href;

const sushiswapIcon = new URL(
  "../../public/images/amms/sushiswap.svg",
  import.meta.url
).href;

const bakerySwapIcon = new URL(
  "../../public/images/amms/bakerySwap.svg",
  import.meta.url
).href;

const finamIcon = new URL("../../public/favicon.png", import.meta.url).href;

/**
 *
 * @type {[{factory: string, website: string, router: string, name: string, wbnb: string, icon: string},{factory: string, website: string, router: string, name: string, wbnb: string, icon: string},{factory: string, website: string, router: string, name: string, wbnb: string, icon: string}]}
 */
export const supportedAMMsBSC = [
  {
    name: "Finanomy Dex",
    website: "https://app.sushi.com/swap?chainId=56",
    router: "0xb516B83037EA3A6ac539cD3187F4FD64EE2c0F34",
    factory: "0xf6eFE2C5b1343Ba574aC77C2685b7fd8D22b4b2a",
    wbnb: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    icon: finamIcon,
  },
  {
    name: "PancakeSwap",
    website: "https://pancakeswap.finance/",
    router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    wbnb: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    icon: pancakeIcon,
  },
  {
    name: "BakerySwap",
    website: "https://www.bakeryswap.org/",
    router: "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F",
    factory: "0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7",
    wbnb: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    icon: bakerySwapIcon,
  },
  {
    name: "SushiSwap",
    website: "https://app.sushi.com/swap?chainId=56",
    router: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    factory: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    wbnb: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    icon: sushiswapIcon,
  },
];

/**
 *
 * @type {[{factory: string, website: string, router: string, name: string, wbnb: string, icon: string},{factory: string, website: string, router: string, name: string, wbnb: string, icon: string},{factory: string, website: string, router: string, name: string, wbnb: string, icon: string}]}
 */
// eslint-disable-next-line no-unused-vars
const supportedAMMs = [
  {
    name: "PancakeSwap",
    website: "https://pancakeswap.finance/",
    router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    wbnb: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    icon: pancakeIcon,
  },
  {
    name: "BakerySwap",
    website: "https://www.bakeryswap.org/",
    router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    wbnb: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    icon: bakerySwapIcon,
  },
  {
    name: "SushiSwap",
    website: "https://app.sushi.com/swap?chainId=56",
    router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    wbnb: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    icon: sushiswapIcon,
  },
];

export default process.env.REACT_APP_CHAIN_ID === "56"
  ? supportedAMMsBSC
  : supportedAMMs;
