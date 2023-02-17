import abi from "./abi.json";
// eslint-disable-next-line no-unused-vars
import { BigNumber, ethers } from "ethers";

/**
 * @param provider {ethers.providers.Provider} - ethers provider
 * @param address {string} - contract address
 * @returns {import('ethers').Contract}
 */
export const getIcoContract = ({ provider, address }) => {
  return new ethers.Contract(address, abi, provider);
};
/**
 * @param address
 * @param provider
 * @returns {Promise<{vestingRatio: BigNumber, totalUsdtInvested: BigNumber, listingTime: BigNumber, vestingPeriod, totalUSDValueRaised: BigNumber, vestingInterval: BigNumber, totalBnbInvested: BigNumber, maxBuy: BigNumber, totalUsdtReferralRewards: BigNumber, minBuy: BigNumber, totalSold: BigNumber, usdtPrice: BigNumber, referralCommissionRate: BigNumber, isVestingEnabled: boolean, totalPresale: BigNumber, startTime: BigNumber, endTime: BigNumber, totalBnbReferralRewards: BigNumber}>}
 */
const getPresaleData = async ({ address, provider }) => {
  const contract = getIcoContract({ address, provider });

  const data = await contract.getPresaleData();

  return {
    /**
     * @type {ethers.BigNumber}
     */
    totalPresale: data.totalPresale,
    /**
     * @type {ethers.BigNumber}
     */
    totalSold: data.totalSold,
    /**
     * @type {ethers.BigNumber}
     */
    usdtPrice: data.usdtPrice,
    /**
     * @type {ethers.BigNumber}
     */
    maxBuy: data.maxBuy,
    /**
     * @type {ethers.BigNumber}
     */
    minBuy: data.minBuy,
    /**
     * @type {ethers.BigNumber}
     */
    startTime: data.startTime,
    /**
     * @type {ethers.BigNumber}
     */
    endTime: data.endTime,
    /**
     * @type {ethers.BigNumber}
     */
    listingTime: data.listingTime,
    /**
     * @type {ethers.BigNumber}
     */
    totalUsdtInvested: data.totalUsdtInvested,
    /**
     * @type {ethers.BigNumber}
     */
    totalBnbInvested: data.totalBnbInvested,
    /**
     * @type {ethers.BigNumber}
     */
    totalUsdtReferralRewards: data.totalUsdtReferralRewards,
    /**
     * @type {ethers.BigNumber}
     */
    totalBnbReferralRewards: data.totalBnbReferralRewards,
    /**
     * @type {ethers.BigNumber}
     */
    totalUSDValueRaised: data.totalUSDValueRaised,
    vestingPeriod: data.vestingPeriod,
    /**
     * @type {ethers.BigNumber}
     */
    vestingInterval: data.vestingInterval,
    /**
     * @type {ethers.BigNumber}
     */
    vestingRatio: data.vestingRatio,
    /**
     * @type {boolean}
     */
    isVestingEnabled: data.isVestingEnabled,
    /**
     * @type {ethers.BigNumber}
     */
    referralCommissionRate: data.referralCommissionRate,
  };
};

const buyWithUSDT = async ({
  address,
  signer,
  amount,
  referral = ethers.constants.AddressZero,
}) => {
  const contract = getIcoContract({ address, provider: signer });
  return await contract.buy(amount, referral);
};

const buyWithBNB = async ({
  address,
  signer,
  amount,
  referral = ethers.constants.AddressZero,
}) => {
  const ref = window.localStorage.getItem("referral");
  if (ref && ethers.utils.isAddress(ref)) {
    referral = ref;
  }

  const contract = getIcoContract({ address, provider: signer });
  return await contract.buyWithBNB(referral, { value: amount });
};

const claimUnlocked = async ({ address, signer }) => {
  const contract = getIcoContract({ address, provider: signer });
  return await contract.claimUnlockedBoughtTokens();
};

const claimReferral = async ({ address, signer }) => {
  const contract = getIcoContract({ address, provider: signer });
  return await contract.claimAllReferralRewards();
};
/**
 * @param address {string}
 * @param provider {ethers.providers.Provider}
 * @param userAddress {string}
 * @returns {Promise<{unlockedAmount: BigNumber, usdtInvested: BigNumber, boughtAmount: BigNumber, usdtReferralRewards: BigNumber, nonVestedAmount: BigNumber, claimableAmount: BigNumber, bnbInvested: BigNumber, bnbReferralRewards: BigNumber, claimedAmount: BigNumber}>}
 */
const getUserData = async ({ address, provider, userAddress }) => {
  const contract = getIcoContract({ address, provider });
  /*
        uint256 boughtAmount;
    uint256 nonVestedAmount;
    uint256 unlockedAmount;
    uint256 claimableAmount;
    uint256 claimedAmount;
    uint256 usdtInvested;
    uint256 bnbInvested;
    uint256 bnbReferralRewards;
    uint256 usdtReferralRewards;
     */
  const data = await contract.getUserData(userAddress);

  return {
    /**
     * @type {ethers.BigNumber}
     */
    boughtAmount: data.boughtAmount,
    /**
     * @type {ethers.BigNumber}
     */
    nonVestedAmount: data.nonVestedAmount,
    /**
     * @type {ethers.BigNumber}
     */
    unlockedAmount: data.unlockedAmount,
    /**
     * @type {ethers.BigNumber}
     */
    claimableAmount: data.claimableAmount,
    /**
     * @type {ethers.BigNumber}
     */
    claimedAmount: data.claimedAmount,
    /**
     * @type {ethers.BigNumber}
     */
    usdtInvested: data.usdtInvested,
    /**
     *  @type {ethers.BigNumber}
     */
    bnbInvested: data.bnbInvested,

    /**
     * @type {ethers.BigNumber}
     */
    bnbReferralRewards: data.bnbReferralRewards,
    /**
     * @type {ethers.BigNumber}
     */
    usdtReferralRewards: data.usdtReferralRewards,
  };
};
const IcoUtils = {
  getPresaleData,
  getUserData,
  buyWithUSDT,
  buyWithBNB,
  claimUnlocked,
  claimReferral,
};

export default IcoUtils;
