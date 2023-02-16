import ethers from "../ethers";

/**
 * @param contractAddress{string}
 * @param providerOrSigner{import('ethers').Provider | import('ethers').Signer}
 * @param abi {Array}
 * @returns {import('ethers').Contract}
 */
const getContract = (contractAddress, providerOrSigner, abi) => {
  return new ethers.Contract(contractAddress, abi, providerOrSigner);
};

export default getContract;
