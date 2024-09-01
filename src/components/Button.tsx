"use client";

import { cn } from "@/misc/utils";
import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

const colorToClass = {
  primary:
    "font-semibold text-text bg-primary border-primary hover:text-text/70",
  secondary: "text-lily/50 bg-background border-background",
  ghost: "text-lily/50 bg-transparent border-transparent",
};

const shapeToClass = {
  square: "rounded",
  rounded: "rounded-full",
  pill: "rounded-xl",
};

const sizeToClass = {
  sm: "px-2 py-1 text-xs",
  md: "py-3 text-md",
  lg: "py-5 text-lg",
};

type Props = {
  label?: string;
  size: "sm" | "md" | "lg";
  shape: "square" | "rounded" | "pill";
  color: "primary" | "secondary" | "ghost";
  isActive?: boolean;
  isLoading?: boolean;
  /** The icon (component) to display on the left. */
  iconLeft?: ReactNode;
  /** The icon (component) to display on the right. */
  iconRight?: ReactNode;
  /**  Whether to display an icon without any text, do not use `iconRight` or `iconLeft` with this option, it is not needed. */
  iconOnly?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      color,
      shape,
      size,
      iconOnly,
      iconLeft,
      iconRight,
      label,
      className,
      isLoading,
      isActive,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex flex-row justify-center items-center border",
          "hover:border hover:border-primary/50 hover:text-primary",
          colorToClass[color],
          shapeToClass[shape],
          sizeToClass[size],
          isLoading || props.disabled ? "pointer-events-none opacity-50" : "",
          isActive && color !== "primary"
            ? "border border-primary/50 text-primary"
            : "",
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <>
            {!iconOnly && iconLeft}
            {!iconOnly && <p>{label}</p>}
            {iconOnly}
            {!iconOnly && iconRight}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
