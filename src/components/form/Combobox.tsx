import { Fragment } from "react";
import clsx from "clsx";

import { Combobox as HUICombobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

/* 
  !! IMPORTANT !!
  https://headlessui.com/react/combobox
  
  Use <Controller /> from react-hook-form to render and control this component.

	<Controller
		name=""
		control={control}
		defaultValue="" // multiple = false
		defaultValue={[]} // multiple = true
		render={({ field }) => (
			<Combobox
				multiple={true | false}
				value={field.value}
				onChange={field.onChange}
			>
				<Combobox.Label>Label</Combobox.Label>
				<Combobox.Input query={query} setQuery={setQuery} invalid={invalid}/>
				<Combobox.Options
					options={options.map(({name, value}) => ({
						name,
						value,
					}))}
				/>
			</Combobox>
		)}
	/>
*/
export type ComboboxOption = {
  name: string;
  value: string;
  [key: string]: any;
};

type ComboboxProps = {
  disabled?: boolean;
  children?: React.ReactNode;
} & (
  | {
      multiple?: false;
      value?: string;
      onChange?: (value: string) => void;
    }
  | { multiple: true; value?: string[]; onChange?: (value: string[]) => void }
);

const Combobox = ({
  multiple: isMultiple,
  value,
  onChange,
  disabled,
  children,
}: ComboboxProps) => {
  return isMultiple ? (
    <HUICombobox
      multiple={true}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <div className="relative">{children}</div>
    </HUICombobox>
  ) : (
    <HUICombobox value={value} onChange={onChange} disabled={disabled}>
      <div className="relative">{children}</div>
    </HUICombobox>
  );
};

type ComboboxLabelProps = {
  required?: boolean;
  invalid?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const ComboboxLabel = ({
  required,
  invalid,
  className,
  children,
}: ComboboxLabelProps) => (
  <HUICombobox.Label
    className={clsx("form-label mb-2", className, {
      "form-label-invalid": invalid,
      "form-label-required": required,
    })}
  >
    {children}
  </HUICombobox.Label>
);

type ComboboxInputProps = {
  invalid?: boolean;
  placeholder?: string;
  query: string;
  setQuery: (value: string) => void;
};

const ComboboxInput = ({
  invalid,
  placeholder,
  query,
  setQuery,
}: ComboboxInputProps) => {
  return (
    <div className="relative">
      <HUICombobox.Input
        className={clsx("input pr-16 dark:input-dark disabled:cursor-auto", {
          "input-invalid": invalid,
        })}
        onChange={(event) => setQuery(event.target.value)}
        displayValue={() => query}
        placeholder={placeholder}
      />
      <HUICombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </HUICombobox.Button>
    </div>
  );
};

type ComboboxRenderOptionProps = {
  active: boolean;
  selected: boolean;
  disabled: boolean;
  option: ComboboxOption;
};

type ComboboxOptionsProps = {
  options: ComboboxOption[];
  className?: string;
  renderOption?: (props: ComboboxRenderOptionProps) => JSX.Element;
};

const ComboboxOptions = ({
  options,
  className,
  renderOption,
}: ComboboxOptionsProps) => {
  return (
    options.length > 0 && (
      <Transition
        as={Fragment}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-y-0 opacity-0"
        enterTo="transform scale-y-100 opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="transform scale-y-100 opacity-100"
        leaveTo="transform scale-y-0 opacity-0"
      >
        <HUICombobox.Options
          className={clsx(
            "absolute z-popover mt-2 max-h-60 w-full origin-top overflow-auto rounded-md bg-gray-50 py-2 text-sm shadow-lg ring-1 ring-gray-300 focus:outline-none",
            className,
          )}
        >
          {options.map((option) => (
            <HUICombobox.Option key={option.value} value={option.value}>
              {({ active, selected, disabled }) =>
                renderOption ? (
                  renderOption({ active, selected, disabled, option })
                ) : (
                  <div
                    className={clsx(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-primary text-on-primary" : "text-gray-900",
                    )}
                  >
                    <span
                      className={clsx(
                        "block truncate",
                        selected && "font-semibold",
                      )}
                    >
                      {option.name}
                    </span>

                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-primary",
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                )
              }
            </HUICombobox.Option>
          ))}
        </HUICombobox.Options>
      </Transition>
    )
  );
};

// assigning
Combobox.Label = ComboboxLabel;
Combobox.Input = ComboboxInput;
Combobox.Options = ComboboxOptions;

export default Combobox;
