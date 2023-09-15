import clsx from "clsx";

import { Popover } from "@headlessui/react";
import { useFloating, flip, shift, autoUpdate } from "@floating-ui/react";
import { SketchPicker, RGBColor, HSLColor } from "react-color";

type Hex = {
  type: "hex";
  value: string;
  onChange: (hex: string) => void;
};

type RGB = {
  type: "rgb";
  value: RGBColor;
  onChange: (rgb: RGBColor) => void;
};

type HSL = {
  type: "hsl";
  value: HSLColor;
  onChange: (hsl: HSLColor) => void;
};

type ColorPickerProps = {
  id?: string;
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
} & (Hex | RGB | HSL);

/* 
  !! IMPORTANT !!
  Use <Controller /> from react-hook-form to render and control this component.

  <Controller
    name=""
    control={control}
    render={({ field }) => (
      <ColorPicker
        type="hex"
        name={field.name}
        value={field.value}
        onChange={(value) => field.onChange(value)}
        disabled={}
        invalid={}
      />
    )}
  />
*/
const ColorPicker = ({
  id,
  name,
  disabled,
  invalid,
  type,
  value,
  onChange,
}: ColorPickerProps) => {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [flip(), shift()],
  });

  const displayColorAsString = () => {
    if (!value) return "";

    switch (type) {
      case "hex":
        return value;
      case "rgb":
        return `r: ${value.r}, g: ${value.g}, b: ${value.b}`;
      case "hsl":
        return `h: ${value.h.toFixed(2)}, s: ${value.s.toFixed(
          2,
        )}, l: ${value.l.toFixed(2)}`;
      default:
        return "";
    }
  };

  const displayColorAsCss = () => {
    if (!value) return "inherit";

    switch (type) {
      case "hex":
        return value;
      case "rgb":
        return `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`;
      case "hsl":
        return `hsl(${value.h}, ${value.s * 100}%, ${value.l * 100}%)`;
      default:
        return "inherit";
    }
  };

  return (
    <div className="relative rounded-md" ref={refs.setReference}>
      <input
        id={id}
        name={name}
        className={clsx("input pr-16 dark:input-dark disabled:cursor-auto", {
          "input-invalid": invalid,
        })}
        aria-invalid={invalid ? "true" : "false"}
        value={displayColorAsString()}
        readOnly
      />

      <Popover>
        <Popover.Button
          className="absolute inset-y-0 right-0 flex items-center px-3"
          disabled={disabled}
        >
          <div
            className={clsx(
              "w-10 rounded-sm text-xs ring-2 ring-gray-300 dark:ring-gray-700",
            )}
            style={{
              backgroundColor: displayColorAsCss(),
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
              className="text-black"
              onChange={(color) => {
                switch (type) {
                  case "hex":
                    return onChange(color.hex);
                  case "rgb":
                    return onChange(color.rgb);
                  case "hsl":
                    return onChange(color.hsl);
                  default:
                    return;
                }
              }}
              color={value}
            />
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
export default ColorPicker;
