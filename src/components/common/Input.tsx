import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  label?: string;
  required?: boolean;
  errorText?: string;
  helperText?: string;
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
      ...rest
    }: InputProps,
    ref,
  ) => {
    return (
      <div>
        <div className="flex items-center justify-between">
          {!!label && (
            <label
              htmlFor={id || `input_${new Date().getTime()}`}
              className="input-label"
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          )}
          <div className="text-sm">{inputHint}</div>
        </div>

        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            id={id || `input_${new Date().getTime()}`}
            className={clsx("input", {
              "input-error": !!errorText,
            })}
            aria-invalid={!!errorText ? "true" : "false"}
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
          {!!errorText ? errorText : helperText}
        </p>
      </div>
    );
  },
);
export default Input;
