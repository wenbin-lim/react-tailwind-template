import { Fragment } from "react";
import clsx from "clsx";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type SelectedOptionBadgeProps = {
  label?: string;
  onClickRemove?: () => void;
  wrapperClass?: string;
};
const SelectedOptionBadge = ({
  label = "",
  onClickRemove,
  wrapperClass,
}: SelectedOptionBadgeProps) => (
  <span
    className={clsx(
      "inline-flex items-center gap-x-0.5 rounded-md bg-primary px-2 py-1 text-xs font-medium text-on-primary",
      wrapperClass,
    )}
  >
    {label || ""}
    <a
      className="group relative -mr-1 h-3.5 w-3.5 rounded-sm"
      onClick={onClickRemove}
    >
      <span className="sr-only">Remove</span>
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-on-primary">
        <path d="M4 4l6 6m0-6l-6 6" />
      </svg>
      <span className="absolute -inset-1" />
    </a>
  </span>
);

type Option = {
  id: string | number;
  name: string;
  value: string;
};

type SelectProps = {
  label?: string;
  wrapperClass?: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
  multiOptionBadgeClass?: string;
};

type SelectSingleOptionProps = SelectProps & {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type SelectMultiOptionProps = SelectProps & {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

const Select = ({
  label,
  wrapperClass,
  options,
  multiple,
  value,
  onChange,
  placeholder = "Select a value",
  required,
  errorText,
  helperText,
  disabled,
  multiOptionBadgeClass,
}: SelectSingleOptionProps | SelectMultiOptionProps) => {
  return (
    <Listbox
      value={value}
      onChange={onChange}
      disabled={disabled}
      multiple={multiple}
    >
      {({ open }) => (
        <div className={clsx(wrapperClass)}>
          {/* label */}
          {!!label && (
            <Listbox.Label
              className={clsx("mb-2 block text-sm font-medium leading-6", {
                "text-red-500": !!errorText,
                "after:text-red-500 after:content-['*']": required,
              })}
            >
              {label}
            </Listbox.Label>
          )}

          {/* selected */}
          <div className="relative">
            <Listbox.Button
              className={clsx(
                "relative w-full cursor-default rounded-input bg-inherit py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 sm:text-sm sm:leading-6",
                errorText
                  ? "pr-10 text-red-500 placeholder-red-300 ring-red-300 focus:border-red-500 focus:ring-red-500 dark:placeholder-red-700 dark:ring-red-700"
                  : "placeholder-gray-400 ring-gray-300 focus:ring-input-focus dark:placeholder-gray-600 dark:ring-gray-700",
              )}
            >
              {multiple ? (
                value.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {value.map((v) => (
                      <SelectedOptionBadge
                        key={v}
                        label={
                          options.find((option) => option.value === v)?.name
                        }
                        wrapperClass={multiOptionBadgeClass}
                        onClickRemove={() => {
                          onChange(value.filter((val) => val !== v));
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  placeholder
                )
              ) : (
                <div className="block truncate">
                  {options.find((option) => option.value === value)?.name ||
                    placeholder}{" "}
                </div>
              )}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            {/* options */}
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface-variant py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-surface-variant-dark sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      clsx(
                        active
                          ? "bg-primary text-on-primary"
                          : "text-on-surface-variant dark:text-on-surface-variant-dark",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? "text-on-primary" : "text-primary",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>

          {/* errortext or helpertext */}
          {(errorText || helperText) && (
            <p
              className={clsx("mt-2 text-xs", {
                "text-red-500": !!errorText,
              })}
            >
              {errorText || helperText}
            </p>
          )}
        </div>
      )}
    </Listbox>
  );
};

export default Select;
