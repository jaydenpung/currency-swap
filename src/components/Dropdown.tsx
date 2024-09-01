"use client";

import { cn } from "@/misc/utils";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import ModalDialog from "./ModalDialog";
import Button from "./Button";

type Props = {
  value: string;
  onChange: (value: string) => void;
  /** if customElement is passed in, will use it to display as dropdown item */
  options: { key: string; value: string; customElement?: ReactNode }[];
  /** Allow close modal if clicked outside */
  isDismissable?: boolean;
  className?: string;
};

const Dropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const closeDropdown = () => {
    setIsOpen(false);
    setSearchValue("");
  };

  const handleSelectValue = (value: string) => {
    props.onChange(value);
    closeDropdown();
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row rounded-lg items-center justify-center gap-3",
          "py-2 px-3 h-10 bg-page-background",
          "hover: cursor-pointer",
          props.className
        )}
        onClick={() => setIsOpen(true)}
      >
        <p className="font-semibold text-sm text-white">{props.value}</p>
        <IconChevronDown className="text-white/25" />
      </div>

      {isOpen && (
        <ModalDialog
          className="items-start pt-4"
          isOpen={isOpen}
          onOutsideClick={() => {
            // allow closing dropdown if isDismissable and searchValue not dirty
            if (props.isDismissable && searchValue === "") {
              closeDropdown();
            }
          }}
        >
          <div className="flex flex-col max-w-[450px] h-full overflow-y-scroll bg-light-background rounded-lg">
            {/* Search */}
            <div className="flex flex-row justify-between p-2">
              <div className="flex flex-row items-center gap-2">
                <IconSearch className="text-lily/30" size="16px" />
                <input
                  autoFocus
                  autoComplete="off"
                  className={cn(
                    "w-[70%] outline-none truncate bg-transparent",
                    "text-sm caret-white text-white placeholder:text-lily/30 placeholder:text-xs"
                  )}
                  type="text"
                  placeholder="Search currency"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button
                label="Esc"
                size="sm"
                shape="square"
                color="secondary"
                onClick={closeDropdown}
              />
            </div>
            {/* Dropdown Options */}
            <div className="max-h-[80vh] overflow-y-scroll">
              {props.options
                .filter((option) => {
                  // regex match option.value with search value
                  const regex = new RegExp(searchValue, "i");
                  if (!regex.test(option.value)) return null;
                  return option;
                })
                .map((option) => {
                  if (option.customElement) {
                    return (
                      <div
                        key={option.key}
                        onClick={() => handleSelectValue(option.value)}
                      >
                        {option.customElement}
                      </div>
                    );
                  }

                  // If no given customElement, render default dropdown item
                  return (
                    <div
                      key={option.key}
                      className={cn(
                        "flex flex-row justify-between items-center",
                        "py-2 px-3 hover:bg-primary/10",
                        "cursor-pointer",
                        "text-sm text-white"
                      )}
                      onClick={() => handleSelectValue(option.value)}
                    >
                      <p>{option.value}</p>
                      <p>{option.key}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </ModalDialog>
      )}
    </>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
