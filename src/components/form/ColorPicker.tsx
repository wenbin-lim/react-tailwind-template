import clsx from "clsx";

import { Popover } from "@headlessui/react";
import { useFloating, flip, shift, autoUpdate } from "@floating-ui/react";
import { SketchPicker, ColorResult } from "react-color";

interface ColorPickerProps {
  id?: string;
  label?: string;
  required?: boolean;
  errorText?: string;
  helperText?: string;
  wrapperClass?: string;
  disabled?: boolean;
  value?: ColorResult;
  onChange: (value: ColorResult) => void;
  displayAs?: "hex" | "rgb" | "hsl";
}

const ColorPicker = ({
  id,
  label,
  required,
  errorText,
  helperText,
  wrapperClass,
  disabled,
  value,
  onChange,
  displayAs = "hex",
}: ColorPickerProps) => {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [flip(), shift()],
  });

  const getDisplayValue = () => {
    if (value) {
      switch (displayAs) {
        case "rgb":
          return `r: ${value.rgb.r}, g: ${value.rgb.g}, b: ${value.rgb.b}`;
        case "hsl": {
          const h = value.hsl.h.toFixed(2);
          const s = value.hsl.s.toFixed(2);
          const l = value.hsl.l.toFixed(2);
          return `h: ${h}, s: ${s}, l: ${l}`;
        }
        case "hex":
        default:
          return value.hex;
      }
    }

    return "Wrong color format";
  };

  return (
    <div className={clsx(wrapperClass)}>
      <div className="flex items-center justify-between">
        {!!label && (
          <label
            htmlFor={id || `input_${new Date().getTime()}`}
            className={clsx("block text-sm font-medium leading-6", {
              "text-red-500": !!errorText,
            })}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
      </div>

      <Popover className="relative mt-2 rounded-md shadow-sm">
        <Popover.Button
          className={clsx(
            "flex h-9 w-full items-center justify-between rounded-input border-0 bg-inherit px-3 py-1.5 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6",
            errorText
              ? "pr-10 text-red-500 ring-red-300 focus:border-red-500 focus:ring-red-500 dark:ring-red-500"
              : "text-inherit ring-gray-300 focus:ring-input-focus dark:ring-gray-700",
          )}
          disabled={disabled}
          ref={refs.setReference}
        >
          <span>{getDisplayValue()}</span>
          <div
            className={clsx(
              "w-10 rounded-sm text-xs ring-2 ring-gray-300 dark:ring-gray-700",
            )}
            style={{
              backgroundColor: value ? value.hex : "#fff",
            }}
          >
            &nbsp;
          </div>
        </Popover.Button>

        <Popover.Panel
          className="z-popover"
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <div className="m-2 overflow-hidden rounded-md shadow-lg">
            <SketchPicker
              onChangeComplete={onChange}
              color={value && value.hex}
            />
          </div>
        </Popover.Panel>
      </Popover>

      <p
        className={clsx("mt-2 text-xs", {
          "text-red-500": !!errorText,
        })}
      >
        {errorText || helperText}
      </p>
    </div>
  );
};
export default ColorPicker;
