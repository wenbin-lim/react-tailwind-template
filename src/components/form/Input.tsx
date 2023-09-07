import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid, ...rest }: InputProps, ref) => {
    return (
      <div className="relative rounded-md">
        <input
          className={clsx("input dark:input-dark", {
            "input-invalid pr-10": invalid,
          })}
          aria-invalid={invalid ? "true" : "false"}
          ref={ref}
          {...rest}
        />

        {invalid && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    );
  },
);
export default Input;
