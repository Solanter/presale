import { ethers } from "ethers";

export const formatLongNumber = (n, decimals) => {
  if (!n) return 0;
  n = Number(n);
  if (n < 1e3) return +n.toFixed(decimals);
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(decimals) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(decimals) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(decimals) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(decimals) + "T";
};

export const truncNumberNoFormating = (n, decimals) => {
  if (!n) return "0.00";
  n = eToNumber(n);
  // substring only two decimals after .
  return n.toString().substring(0, n.toString().indexOf(".") + decimals + 1);
};

export const truncNumber = (n, decimals) => {
  if (!n) return "0.00";
  n = eToNumber(n);
  // substring only two decimals after .
  return formatMoneyNumber(
    n.includes(".")
      ? n.toString().substring(0, n.toString().indexOf(".") + decimals + 1)
      : n.toString()
  );
};
/**
 *
 * @param num{Number | String}
 * @returns {string}
 */
export function eToNumber(num) {
  let sign = "";
  (num += "").charAt(0) == "-" && ((num = num.substring(1)), (sign = "-"));
  let arr = num.split(/[e]/gi);
  if (arr.length < 2) {
    return sign + num;
  }
  let dot = (0.1).toLocaleString().substr(1, 1),
    n = arr[0],
    exp = +arr[1],
    w = (n = n.replace(/^0+/, "")).replace(dot, ""),
    pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
    L = pos - w.length,
    // eslint-disable-next-line no-undef
    s = "" + BigInt(w);
  w =
    exp >= 0
      ? L >= 0
        ? s + "0".repeat(L)
        : r()
      : pos <= 0
      ? "0" + dot + "0".repeat(Math.abs(pos)) + s
      : r();
  L = w.split(dot);
  if ((L[0] == 0 && L[1] == 0) || (+w == 0 && +s == 0)) {
    w = 0;
  } //** added 9/10/2021
  return sign + w;

  function r() {
    return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`);
  }
}

export function formatMoneyNumber(number, minDecimals = 0, maxDecimals = 5) {
  return new Intl.NumberFormat("en-US", {
    /*maximumSignificantDigits: 30*/
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  }).format(number);
}

export function formatMoneyBigNumber(
  number,
  decimals = 18,
  minDecimals = 0,
  maxDecimals = 2
) {
  const n = ethers.utils.formatUnits(number, decimals);
  return new Intl.NumberFormat("en-US", {
    /*maximumSignificantDigits: 30*/
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: minDecimals,
  }).format(n);
}
