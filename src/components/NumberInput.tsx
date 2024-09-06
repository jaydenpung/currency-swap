"use client";

import { cn } from "@/misc/utils";
import { NumberFormatValues, NumericFormat } from "react-number-format";

type Props = {
  prefix?: string;
  suffix?: string;
  className?: string;
  value?: number;
  onValueChange: (values: NumberFormatValues) => void;
  onInput: () => void;
};

const NumberInput = (props: Props) => {
  // Get the thousands separator for the current locale
  let thousandSeparator = ",";
  if (typeof navigator !== "undefined") {
    thousandSeparator = new Intl.NumberFormat(navigator.language)
      .format(1111)
      .replace(/\p{Number}/gu, "")[0];
  }

  return (
    <NumericFormat
      prefix={props.prefix}
      suffix={props.suffix}
      className={cn(props.className)}
      allowNegative={false}
      thousandSeparator={thousandSeparator}
      value={props.value ?? undefined}
      onValueChange={props.onValueChange}
      onInput={props.onInput}
      placeholder="0.00"
    />
  );
};

export default NumberInput;
