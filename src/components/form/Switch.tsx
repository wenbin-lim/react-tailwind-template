import clsx from "clsx";
import { Switch as HUISwitch } from "@headlessui/react";

/* 
  !! IMPORTANT !!
  https://headlessui.com/react/switch

  Use <Controller /> from react-hook-form to render and control this component.

  <Controller
    name=""
    control={control}
    defaultValue={true | false}
    render={({ field }) => (
      <Switch.Group>
        <Switch.Label></Switch.Label>
        <Switch
          disabled={disabled}
          value={field.value}
          onChange={field.onChange}
        />
      </Switch.Group>
    )}
  />
*/
type SwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

const Switch = ({ value, onChange, disabled }: SwitchProps) => {
  return (
    <HUISwitch
      checked={value}
      onChange={!disabled ? onChange : undefined}
      className={clsx(
        "focus:ring-input-focus relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
        value ? "bg-primary" : "bg-gray-400 dark:bg-gray-600",
      )}
    >
      <span
        aria-hidden="true"
        className={clsx(
          value ? "translate-x-5 bg-on-primary" : "translate-x-0 bg-white",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out",
        )}
      />
    </HUISwitch>
  );
};

type SwitchGroupProps = {
  className?: string;
  children?: React.ReactNode;
};

const SwitchGroup = ({ className, children }: SwitchGroupProps) => {
  return (
    <HUISwitch.Group
      as="div"
      className={clsx(
        {
          "flex items-center justify-between": !className,
        },
        className,
      )}
    >
      {children}
    </HUISwitch.Group>
  );
};

type SwitchLabelProps = {
  required?: boolean;
  invalid?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const SwitchLabel = ({
  required,
  invalid,
  className,
  children,
}: SwitchLabelProps) => {
  return (
    <HUISwitch.Label
      className={clsx("form-label", className, {
        "form-label-invalid": invalid,
        "form-label-required": required,
      })}
    >
      {children}
    </HUISwitch.Label>
  );
};

Switch.Group = SwitchGroup;
Switch.Label = SwitchLabel;

export default Switch;
