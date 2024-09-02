"use client";

import { useEffect, useRef, useState } from "react";
import Big from "big.js";

import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import { USD_CONVERT_RATES } from "@/misc/constants";
import { Currency } from "@/misc/types";
import { IconArrowsUpDown } from "@tabler/icons-react";

const convertCurrency = (
  fromCurrency: Currency,
  toCurrency: Currency,
  amount: number
) => {
  const amountBig = new Big(amount);
  const fromRate = new Big(USD_CONVERT_RATES[fromCurrency]);
  const toRate = new Big(USD_CONVERT_RATES[toCurrency]);

  return Number(amountBig.times(toRate).div(fromRate));
};

export default function Home() {
  const isUpdating = useRef(false);
  const [fromCurrency, setFromCurrency] = useState<Currency>("USD");
  const [toCurrency, setToCurrency] = useState<Currency>("AUD");
  const [fromValue, setFromValue] = useState<number | undefined>();
  const [toValue, setToValue] = useState<number | undefined>();

  const [isSwapping, setIsSwapping] = useState(false);

  // it just put the value of "from" to "to"
  const reverseInputOutput = () => {
    setToCurrency(fromCurrency);
    setToValue(fromValue);
  };

  // Handle selling currency conversion
  useEffect(() => {
    if (fromValue !== undefined && !isUpdating.current) {
      isUpdating.current = true;
      setToValue(convertCurrency(fromCurrency, toCurrency, fromValue) * 0.99);
    } else {
      isUpdating.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, fromValue]);

  // Handle buying currency conversion
  useEffect(() => {
    if (toValue !== undefined && !isUpdating.current) {
      isUpdating.current = true;
      setFromValue(convertCurrency(toCurrency, fromCurrency, toValue) * 1.01);
    } else {
      isUpdating.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCurrency, toValue]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 bg-page-background">
      <div className="flex flex-col justify-center gap-1 p-2 sm:p-24 w-full sm:max-w-[800px]">
        {/* From Currency Input */}
        <CurrencyInput
          label="You're Selling"
          amount={fromValue}
          currency={fromCurrency}
          onAmountChange={(value) => {
            setFromValue(value);
          }}
          onCurrencyChange={(value) => {
            setFromCurrency(value);
          }}
        />

        {/* Reverse */}
        <div className="flex justify-center">
          <Button
            label="ghost"
            size="sm"
            shape="rounded"
            color="secondary"
            className="w-9 h-9 border-[3px] hover:border-[3px] border-dark bg-transparent"
            iconOnly={<IconArrowsUpDown size="14px" />}
            onClick={reverseInputOutput}
          />
        </div>

        {/* To Currency Input */}
        <CurrencyInput
          label="You're Buying"
          amount={toValue}
          currency={toCurrency}
          onAmountChange={(value) => {
            setToValue(value);
          }}
          onCurrencyChange={(value) => {
            setToCurrency(value);
          }}
        />

        {/* Swap Button */}
        <Button
          label="Swap"
          color="primary"
          shape="pill"
          size="lg"
          className="mt-10"
          isLoading={isSwapping}
          disabled={!fromValue && !toValue}
          onClick={() => {
            setIsSwapping(true);
            // mock swapping
            setTimeout(() => {
              setIsSwapping(false);
              alert("Swapped!");
            }, 2000);
          }}
        />

        {/* Single Accordion */}
        <div className="flex justify-center w-full">
          <div className="flex px-24 pt-2 w-[400px]">
            <Accordion
              title="Show more info"
              speed="slow"
              className="text-xs"
              content={
                <div>
                  <p className="text-center text-white">
                    We charge a 1% fees for all conversion
                  </p>
                  <div>
                    {Object.entries(USD_CONVERT_RATES).map(
                      ([currency, rate]) => (
                        <div
                          key={currency}
                          className="flex flex-row justify-between items-center min-w-[100px] w-full py-2 px-3 hover:bg-primary/10 cursor-pointer text-sm text-white"
                        >
                          <p>{currency}</p>
                          <div className="flex flex-col text-white/50 text-xs text-right">
                            <p>$1 = {rate}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              }
              variant="ghost"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
