import useERC20 from "../Web3/ERC20/useERC20";
import useETHBalance from "../Web3/useETHBalance";
import IcoUtils from "../../web3Utils/icoUtils";
import { useQuery } from "react-query";
import { formatMoneyBigNumber } from "../../utils/NumberUtils/formatNumbers";
import { getFormattedTimeAsString } from "../../utils/timeUtils";
import { useCallback, useEffect, useState } from "react";
import useOutPrice from "../Uniswap/useUSDTPrice";
import useERC20Calls from "../Web3/ERC20/useERC20Calls";
import { ethers } from "ethers";
import icoUtils from "../../web3Utils/icoUtils";

const useICO = ({
  address,
  provider,
  saleToken,
  usdtToken,
  wbnbToken,
  router,
  chainID,
  user,
}) => {
  const usdt = useERC20({
    tokenAddress: usdtToken.address,
    provider: provider,
    user: user,
    spenders: [address],
  });

  const erc20Calls = useERC20Calls();

  const bnbBalance = useETHBalance({
    address: user,
    provider: provider,
    chainId: chainID,
  });

  const bnbPrice = useOutPrice({
    routerAddress: router,
    provider: provider,
    pathToUsdt: [wbnbToken.address, usdtToken.address],
    chainId: chainID,
  });

  /**
   * @type {import('react-query').UseQueryResult<{vestingRatio: number, raisedPercentage: number, totalUsdtInvested: {formatted: string, decimals: *, value: BigNumber}, listingTime: {miliseconds, seconds: number, formatted: string, Date: *}, hasStarted: boolean, vestingPeriod: {miliseconds, seconds: *, formatted: string, Date: *}, totalUSDValueRaised: {formatted: string, decimals: *, value: BigNumber}, vestingInterval: {miliseconds, seconds: number, formatted: *}, totalBnbInvested: {formatted: string, decimals: number, value: BigNumber}, maxBuy: {formatted: string, decimals: *, value: BigNumber}, totalUsdtReferralRewards: {formatted: string, decimals: *, value: BigNumber}, minBuy: {formatted: string, decimals: *, value: BigNumber}, totalSold: {formatted: string, decimals: *, value: BigNumber}, usdtPrice: {formatted: string, decimals: *, value: BigNumber}, hasEnded: boolean, referralCommissionRate: number, vestingEnd: {miliseconds, seconds, formatted: string, Date: *}, isVestingEnabled: boolean, startTimeSet: boolean, totalPresale: {formatted: string, decimals: *, value: BigNumber}, startTime: {miliseconds, seconds: number, formatted: string, Date: *}, endTime: {miliseconds, seconds: number, formatted: string, Date: *}, totalBnbReferralRewards: {formatted: string, decimals: number, value: BigNumber}, totalTobeRaised: {formatted: string, decimals: *, value: BigNumber}}, unknown>}
   */
  const presaleData = useQuery(
    [chainID, address, "presaleData"],
    async () => {
      const data = await IcoUtils.getPresaleData({ address, provider });

      const hasStarted =
        data.startTime.toNumber() > 0 &&
        data.startTime.toNumber() < Date.now() / 1000;

      const startTimeSet = data.startTime.toNumber() > 0;
      const hasEnded =
        data.endTime.toNumber() > 0 &&
        data.endTime.toNumber() < Date.now() / 1000;
      const raisedPercentage =
        (Number(data.totalSold.toString()) /
          Number(data.totalPresale.toString())) *
        100;

      const totalTobeRaised = data.totalPresale.mul(data.usdtPrice);
      return {
        totalTobeRaised: {
          value: ethers.utils.formatUnits(totalTobeRaised, usdtToken.decimals),
          formatted: formatMoneyBigNumber(
            totalTobeRaised,
            usdtToken.decimals * 2
          ),
          decimals: usdt.decimals.data,
        },
        raisedPercentage,
        startTimeSet,
        hasStarted: hasStarted,
        hasEnded,
        totalPresale: {
          value: data.totalPresale,
          decimals: saleToken.decimals,
          formatted: formatMoneyBigNumber(
            data.totalPresale,
            saleToken.decimals
          ),
        },
        totalSold: {
          value: data.totalSold,
          formatted: formatMoneyBigNumber(data.totalSold, saleToken.decimals),
          decimals: saleToken.decimals,
        },
        usdtPrice: {
          value: data.usdtPrice,
          formatted: formatMoneyBigNumber(data.usdtPrice, usdt.decimals.data),
          decimals: usdt.decimals.data,
        },
        maxBuy: {
          value: data.maxBuy,
          formatted: formatMoneyBigNumber(data.maxBuy, saleToken.decimals),
          decimals: saleToken.decimals,
        },
        minBuy: {
          value: data.minBuy,
          formatted: formatMoneyBigNumber(data.minBuy, saleToken.decimals),
          decimals: saleToken.decimals,
        },
        startTime: {
          seconds: data.startTime.toNumber(),
          miliseconds: data.startTime.toNumber() * 1000,
          Date: new Date(data.startTime.toNumber() * 1000),
          formatted: new Date(
            data.startTime.toNumber() * 1000
          ).toLocaleString(),
        },
        endTime: {
          seconds: data.endTime.toNumber(),
          miliseconds: data.endTime.toNumber() * 1000,
          Date: new Date(data.endTime.toNumber() * 1000),
          formatted: new Date(data.endTime.toNumber() * 1000).toLocaleString(),
        },
        listingTime: {
          seconds: data.listingTime.toNumber(),
          miliseconds: data.listingTime.toNumber() * 1000,
          Date: new Date(data.listingTime.toNumber() * 1000),
          formatted: new Date(
            data.listingTime.toNumber() * 1000
          ).toLocaleString(),
        },
        totalUsdtInvested: {
          value: data.totalUsdtInvested,
          formatted: formatMoneyBigNumber(
            data.totalUsdtInvested,
            usdt.decimals.data
          ),
          decimals: usdt.decimals.data,
        },
        totalBnbInvested: {
          value: data.totalBnbInvested,
          formatted: formatMoneyBigNumber(data.totalBnbInvested, 18),
          decimals: 18,
        },
        totalUsdtReferralRewards: {
          value: data.totalUsdtReferralRewards,
          formatted: formatMoneyBigNumber(
            data.totalUsdtReferralRewards,
            usdt.decimals.data
          ),
          decimals: usdt.decimals.data,
        },
        totalBnbReferralRewards: {
          value: data.totalBnbReferralRewards,
          formatted: formatMoneyBigNumber(data.totalBnbReferralRewards, 18),
          decimals: 18,
        },
        totalUSDValueRaised: {
          value: data.totalUSDValueRaised,
          formatted: formatMoneyBigNumber(
            data.totalUSDValueRaised,
            usdt.decimals.data
          ),
          decimals: usdt.decimals.data,
        },
        vestingPeriod: {
          seconds: data.vestingPeriod.toNumber(),
          miliseconds: data.vestingPeriod.toNumber() * 1000,
          Date: new Date(data.vestingPeriod.toNumber() * 1000),
          formatted: new Date(
            data.vestingPeriod.toNumber() * 1000
          ).toLocaleString(),
        },
        vestingEnd: {
          seconds: data.listingTime.toNumber() + data.vestingPeriod.toNumber(),
          miliseconds:
            (data.listingTime.toNumber() + data.vestingPeriod.toNumber()) *
            1000,
          Date: new Date(
            (data.listingTime.toNumber() + data.vestingPeriod.toNumber()) * 1000
          ),
          formatted: new Date(
            (data.listingTime.toNumber() + data.vestingPeriod.toNumber()) * 1000
          ).toLocaleString(),
        },
        vestingInterval: {
          seconds: data.vestingInterval.toNumber(),
          miliseconds: data.vestingInterval.toNumber() * 1000,
          formatted: getFormattedTimeAsString(
            data.vestingInterval.toNumber() * 1000
          ),
        },
        vestingRatio: data.vestingRatio.toNumber(),
        isVestingEnabled: data.isVestingEnabled,
        referralCommissionRate: data.referralCommissionRate.toNumber(),
      };
    },
    {
      enabled: !!address && !!provider && usdt.decimals.isSuccess,
    }
  );

  const userPresaleData = useQuery(
    [chainID, address, "userPresaleData"],
    async () => {
      /**
       * @type {{unlockedAmount: BigNumber, usdtInvested: BigNumber, boughtAmount: BigNumber, usdtReferralRewards: BigNumber, nonVestedAmount: BigNumber, claimableAmount: BigNumber, bnbInvested: BigNumber, bnbReferralRewards: BigNumber, claimedAmount: BigNumber}}
       */
      const data = await IcoUtils.getUserData({
        address,
        provider,
        userAddress: user,
      });

      return {
        totalBought: {
          value: data.boughtAmount,
          formatted: formatMoneyBigNumber(
            data.boughtAmount,
            saleToken.decimals
          ),
          decimals: saleToken.decimals,
        },
        unlockedAmount: {
          value: data.unlockedAmount,
          formatted: formatMoneyBigNumber(
            data.unlockedAmount,
            saleToken.decimals
          ),
          decimals: saleToken.decimals,
        },
        nonVestedAmount: {
          value: data.nonVestedAmount,
          formatted: formatMoneyBigNumber(
            data.nonVestedAmount,
            saleToken.decimals
          ),
          decimals: saleToken.decimals,
        },
        claimableAmount: {
          value: data.claimableAmount,
          formatted: formatMoneyBigNumber(
            data.claimableAmount,
            saleToken.decimals
          ),
          decimals: saleToken.decimals,
        },
        claimedAmount: {
          value: data.claimedAmount,
          formatted: formatMoneyBigNumber(
            data.claimedAmount,
            saleToken.decimals
          ),
          decimals: saleToken.decimals,
        },
        usdtInvested: {
          value: data.usdtInvested,
          formatted: formatMoneyBigNumber(
            data.usdtInvested,
            usdt.decimals.data
          ),
          decimals: usdt.decimals.data,
        },
        bnbInvested: {
          value: data.bnbInvested,
          formatted: formatMoneyBigNumber(data.bnbInvested, 18),
          decimals: 18,
        },
        usdtReferralRewards: {
          value: data.usdtReferralRewards,
          formatted: formatMoneyBigNumber(
            data.usdtReferralRewards,
            usdt.decimals.data
          ),
          decimals: usdt.decimals.data,
        },
        bnbReferralRewards: {
          value: data.bnbReferralRewards,
          formatted: formatMoneyBigNumber(
            data.bnbReferralRewards,
            18,
            0,
            6,
            true
          ),
          decimals: 18,
        },
      };
    },
    {
      enabled: !!address && !!provider && usdt.decimals.isSuccess && !!user,
    }
  );

  const [approved, setApproved] = useState(false);
  const [hasUsdtBalance, setHasUsdtBalance] = useState(false);

  useEffect(() => {
    if (usdt.allowances.data?.[address] && usdt.balance.data?.value) {
      setApproved(
        usdt.allowances.data?.[address]?.value &&
          usdt.allowances.data?.[address]?.value.gte(usdt.balance.data.value)
      );
    } else {
      setApproved(false);
    }
    setHasUsdtBalance(
      usdt.balance.data?.value && usdt.balance.data.value.gt(0)
    );
  }, [usdt.allowances.data, usdt.balance.data?.formatted]);

  const approveUSDT = useCallback(
    async (signer) => {
      const tr = await erc20Calls.approve(
        usdtToken.address,
        signer,
        address,
        ethers.constants.MaxUint256
      );
      await usdt.allowances.refetch();
      return tr;
    },
    [address, usdtToken.address]
  );

  const buyWithUSDT = useCallback(
    async (signer, amount) => {
      const tx = await icoUtils.buyWithUSDT({
        address,
        signer,
        amount,
      });
      await tx?.wait?.();

      await userPresaleData.refetch();
      await presaleData.refetch();
      await usdt.balance.refetch();
      await usdt.allowances.refetch();
      return tx;
    },
    [
      address,
      usdtToken.address,
      usdt.balance,
      usdt.allowances,
      userPresaleData,
      presaleData,
    ]
  );

  const buyWithBNB = useCallback(
    async (signer, amount) => {
      const tx = await icoUtils.buyWithBNB({
        address,
        signer,
        amount,
      });
      await tx?.wait?.();

      await userPresaleData.refetch();
      await presaleData.refetch();
      await bnbPrice.refetch();
      await bnbBalance.refetchBalance();
      return tx;
    },
    [
      address,
      usdtToken.address,
      userPresaleData,
      presaleData,
      bnbPrice,
      bnbBalance,
    ]
  );

  const estimateGas = useCallback(
    async (signer) => {
      const gasPrice = await signer.getGasPrice();
      const icoCOntract = new ethers.Contract(address, IcoUtils.abi, signer);
      const gasLimit = await icoCOntract.estimateGas.buyWithUSDT(
        ethers.constants.AddressZero,
        {
          value: presaleData.data?.minBuy?.value
            .mul(presaleData.data?.usdtPrice?.value)
            .div(bnbPrice.data?.value),
        }
      );

      return gasPrice.mul(gasLimit);
    },
    [address, usdtToken.address]
  );

  const claimReferalRewards = useCallback(
    async (signer) => {
      const tx = await icoUtils.claimReferral({
        address,
        signer,
      });
      await tx?.wait?.();

      await userPresaleData.refetch();
      await presaleData.refetch();
      await usdt.balance.refetch();
      await usdt.allowances.refetch();
      await bnbBalance.refetchBalance();
      return tx;
    },
    [
      address,
      usdtToken.address,
      userPresaleData,
      presaleData,
      bnbPrice,
      bnbBalance,
    ]
  );

  const claimUnlockedBoughtTokens = useCallback(
    async (signer) => {
      const tx = await icoUtils.claimUnlocked({
        address,
        signer,
      });
      await tx?.wait?.();

      await userPresaleData.refetch();
      await presaleData.refetch();
      return tx;
    },
    [
      address,
      usdtToken.address,
      userPresaleData,
      presaleData,
      bnbPrice,
      bnbBalance,
    ]
  );

  return {
    presaleData,
    userPresaleData,
    bnbBalance,
    usdt,
    approved,
    hasUsdtBalance,
    bnbPrice,
    approveUSDT,
    buyWithUSDT,
    buyWithBNB,
    estimateGas,
    claimReferalRewards,
    claimUnlockedBoughtTokens,
  };
};

export default useICO;
