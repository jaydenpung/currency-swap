"use client";

import { cn } from "@/misc/utils";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { ReactNode, useEffect, useRef, useState } from "react";

const variantsToCss = {
  primary: "bg-background text-white",
  secondary: "bg-lily text-text",
  ghost: "bg-transparent text-white/50",
};

const speedToCss = {
  default: "duration-300",
  fast: "duration-100",
  slow: "duration-500",
};

type Props = {
  title: string;
  content: ReactNode;
  /** If set to true, accordion will be opened by default */
  isOpenByDefault?: boolean;
  variant: "primary" | "secondary" | "ghost";
  speed?: "default" | "fast" | "slow";
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

const Accordion = ({
  speed = "default",
  isOpenByDefault = false,
  ...props
}: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  useEffect(() => {
    // Update `isOpen` when `isOpenByDefault` changes
    setIsOpen(isOpenByDefault);
  }, [isOpenByDefault]);

  useEffect(() => {
    if (isOpen) {
      props.onOpen?.();
    } else {
      props.onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Get the height of the content
  const [contentHeight, setContentHeight] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [contentRef.current?.scrollHeight, isOpen]);

  return (
    <div
      className={cn("w-full", variantsToCss[props.variant], props.className)}
    >
      {/* Trigger */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-grow">{props.title}</span>
        <div
          className={cn(
            `transition-transform`,
            speedToCss[speed],
            isOpen ? "rotate-180" : ""
          )}
        >
          {isOpen ? <IconChevronUp /> : <IconChevronDown />}
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          `ease-in-out transition-all overflow-hidden`,
          speedToCss[speed],
          isOpen ? `max-h-[${contentRef?.current?.scrollHeight}px]` : "max-h-0"
        )}
        style={{ maxHeight: isOpen ? contentHeight : "0" }}
      >
        {props.content}
      </div>
    </div>
  );
};

export default Accordion;
