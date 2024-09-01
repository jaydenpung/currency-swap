"use client";

import { cn } from "@/misc/utils";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import NumberInput from "./NumberInput";
import { Currency } from "@/misc/types";
import { CURRENCIES, USD_CONVERT_RATES } from "@/misc/constants";
import { numericFormatter } from "react-number-format";

const currencyOptions = Object.entries(USD_CONVERT_RATES).map(
  ([currency, rate]) => ({
    key: currency,
    value: currency,
    customElement: (
      <div
        className={cn(
          "flex flex-row justify-between items-center min-w-[100px] w-full",
          "py-2 px-3 hover:bg-primary/10",
          "cursor-pointer",
          "text-sm text-white"
        )}
      >
        <p>{currency}</p>
        <div className="flex flex-col text-white/50 text-xs text-right">
          <p>$1 =</p>
          <p>{rate}</p>
        </div>
      </div>
    ),
  })
);

const isCurrency = (value: string): value is Currency => {
  return typeof value === "string" && CURRENCIES.includes(value as Currency);
};

type Props = {
  label: string;
  amount?: number;
  currency: Currency;
  onAmountChange: (value: number) => void;
  onCurrencyChange: (value: Currency) => void;
};

const CurrencyInput = ({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
}: Props) => {
  const [amountInUsd, setAmountInUsd] = useState<string | undefined>();

  // convert to usd based on currency and show
  useEffect(() => {
    if (amount) {
      const usdAmount = amount / USD_CONVERT_RATES[currency];
      const usdAmountString = numericFormatter(usdAmount.toString(), {
        decimalScale: 2,
        fixedDecimalScale: true,
        thousandSeparator: true,
      });
      setAmountInUsd(usdAmountString);
    } else {
      setAmountInUsd(undefined);
    }
  }, [amount, currency]);

  return (
    <div
      className={cn(
        "flex flex-col bg-dark p-4 rounded-xl",
        "space-y-3 focus-within:ring-2 focus-within:ring-primary"
      )}
    >
      <div className="flex flex-row justify-between">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-text-primary text-lily">
            {label}
          </p>
          <Dropdown
            isDismissable
            value={currency}
            options={currencyOptions}
            onChange={(value) => {
              if (isCurrency(value)) {
                onCurrencyChange(value);
              }
            }}
          />
        </div>
        {/* Right Column */}
        <div className="flex flex-col flex-1 justify-center">
          <NumberInput
            className={cn(
              "bg-transparent outline-none caret-white",
              "text-right text-white font-bold",
              "placeholder:text-white/25"
            )}
            value={amount}
            onValueChange={(value) => {
              onAmountChange(value.floatValue ?? 0);
            }}
          />
          {amountInUsd && (
            <p className="text-xs font-normal text-white/25 text-right">
              ${amountInUsd}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}; // Remove the extra closing parenthesis here

export default CurrencyInput;
