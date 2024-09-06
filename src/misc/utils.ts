import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "./types";
import Big from "big.js";
import { USD_CONVERT_RATES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertCurrency = (
  fromCurrency: Currency,
  toCurrency: Currency,
  amount: number,
  feeInPercent: number = 0,
  isSelling: boolean = true
) => {
  const amountBig = new Big(amount);
  const fromRate = new Big(USD_CONVERT_RATES[fromCurrency]);
  const toRate = new Big(USD_CONVERT_RATES[toCurrency]);
  let feeMultiplier = new Big(0);
  // deduct from amount if buying, add to amount if selling
  if (isSelling) {
    feeMultiplier = new Big(1).minus(new Big(feeInPercent).div(100));
  } else {
    feeMultiplier = new Big(feeInPercent).div(100).plus(1);
  }

  return Number(amountBig.times(toRate).div(fromRate).mul(feeMultiplier));
};
