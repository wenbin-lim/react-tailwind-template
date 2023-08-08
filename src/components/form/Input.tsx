import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  required?: boolean;
  errorText?: string;
  helperText?: string;
  wrapperClass?: string;
  inputHint?: React.ReactNode | JSX.Element;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      required,
      errorText,
      helperText,
      inputHint,
      wrapperClass,
      ...rest
    }: InputProps,
    ref,
  ) => {
    return (
      <div className={clsx(wrapperClass)}>
        <div className="flex items-center justify-between">
          {!!label && (
            <label
              htmlFor={id || `input_${new Date().getTime()}`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="text-sm">{inputHint}</div>
        </div>

        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            id={id || `input_${new Date().getTime()}`}
            className={clsx(
              "block w-full rounded-input border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
              errorText
                ? "border-red-300 pr-10 text-red-900 placeholder-red-300 ring-red-300 focus:border-red-500 focus:ring-red-500"
                : "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-input-focus",
            )}
            aria-invalid={errorText ? "true" : "false"}
            required={required}
            ref={ref}
            {...rest}
          />
          {!!errorText && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <p
          className={clsx("mt-2 text-xs", {
            "text-red-600": !!errorText,
          })}
        >
          {errorText || helperText}
        </p>
      </div>
    );
  },
);
export default Input;
