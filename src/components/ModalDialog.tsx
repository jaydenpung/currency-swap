"use client";

import { cn } from "@/misc/utils";
import React, { useEffect, useRef, useState } from "react";

interface ModalDialogProps {
  isOpen: boolean;
  className?: string;
  onOutsideClick: () => void;
  children: React.ReactNode;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  className,
  onOutsideClick,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null); // Reference to the modal content
  const [isLocalOpen, setIsLocalOpen] = useState(false);

  // Open the modal if the prop is open
  useEffect(() => {
    if (!isLocalOpen) setIsLocalOpen(isOpen);

    if (isLocalOpen) {
      setTimeout(() => {
        setIsLocalOpen(isOpen);
      }, 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Close the modal on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOutsideClick]);

  if (!isLocalOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center",
        "bg-black/25 backdrop-blur-sm w-full h-full z-10",
        className
      )}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default ModalDialog;
