import clsx from "clsx";

import { Switch } from "@headlessui/react";

type ToggleProps = {
  wrapperClass?: string;
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  required?: boolean;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
};

const Toggle = ({
  wrapperClass,
  label,
  value,
  onChange,
  required,
  errorText,
  helperText,
  disabled,
}: ToggleProps) => {
  return (
    <Switch.Group
      as="div"
      className={clsx("flex items-center justify-between", wrapperClass)}
    >
      {(label || helperText || errorText) && (
        <span className="flex flex-grow flex-col">
          <Switch.Label
            as="span"
            className={clsx("text-sm font-semibold leading-6", {
              "text-red-500": errorText,
              "after:text-red-500 after:content-['*']": required,
            })}
            passive
          >
            {label}
          </Switch.Label>
          <Switch.Description
            as="span"
            className={clsx(
              "text-sm",
              errorText ? "text-red-500" : "text-gray-500",
            )}
          >
            {errorText || helperText}
          </Switch.Description>
        </span>
      )}
      <Switch
        checked={value}
        onChange={!disabled ? onChange : undefined}
        className={clsx(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-input-focus focus:ring-offset-2",
          value
            ? "bg-primary"
            : "bg-surface-variant dark:bg-surface-variant-dark",
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            value ? "translate-x-5 bg-on-primary" : "translate-x-0 bg-white",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

export default Toggle;
