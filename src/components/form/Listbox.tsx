import React, { Fragment } from "react";
import clsx from "clsx";

import { Listbox as HUIListbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

/* 
  !! IMPORTANT !!
	https://headlessui.com/react/listbox
	
  Use <Controller /> from react-hook-form to render and control this component.

	<Controller
		name=""
		control={control}
		defaultValue="" // multiple = false
		defaultValue={[]} // multiple = true
		render={({ field }) => (
			<Listbox
				multiple={true | false}
				value={field.value}
				onChange={field.onChange}
			>
				<Listbox.Label>Label</Listbox.Label>
				<Listbox.Button selected={field.value} invalid={invalid} />
				<Listbox.Options
					options={options.map(({name, value}) => ({
						name,
						value,
					}))}
				/>
			</Listbox>
		)}
	/>
*/
export type ListboxOption = {
  name: string;
  value: string;
  [key: string]: any;
};

type ListboxProps = {
  disabled?: boolean;
  children?: React.ReactNode;
} & (
  | {
      multiple?: false;
      value?: string;
      onChange?: (value: string) => void;
    }
  | {
      multiple: true;
      value?: string[];
      onChange?: (value: string[]) => void;
    }
);

const Listbox = ({
  multiple,
  value,
  onChange,
  disabled,
  children,
}: ListboxProps) => {
  return (
    <HUIListbox
      multiple={multiple}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      <div className="relative">{children}</div>
    </HUIListbox>
  );
};

type ListboxLabelProps = {
  required?: boolean;
  invalid?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const ListboxLabel = ({
  required,
  invalid,
  className,
  children,
}: ListboxLabelProps) => (
  <HUIListbox.Label
    className={clsx("form-label mb-2", className, {
      "form-label-invalid": invalid,
      "form-label-required": required,
    })}
  >
    {children}
  </HUIListbox.Label>
);

type ListboxButtonProps = {
  invalid?: boolean;
  placeholder?: string;
  selected?: string | string[];
  children?: React.ReactNode;
};

const ListboxButton = ({
  invalid,
  placeholder,
  selected,
  children,
}: ListboxButtonProps) => {
  const whatToDisplay = () => {
    if (children) return children;

    if (selected) {
      if (Array.isArray(selected)) {
        return selected.join(", ");
      } else {
        return selected;
      }
    }

    return placeholder || "Select a value";
  };

  return (
    <HUIListbox.Button
      className={clsx(
        "input relative h-9 pr-16 text-left dark:input-dark disabled:cursor-auto",
        {
          "input-invalid": invalid,
        },
      )}
    >
      {whatToDisplay()}
      <span className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </span>
    </HUIListbox.Button>
  );
};

type ListboxRenderOptionProps = {
  active: boolean;
  selected: boolean;
  disabled: boolean;
  option: ListboxOption;
};

type ListboxOptionsProps = {
  options: ListboxOption[];
  className?: string;
  renderOption?: (props: ListboxRenderOptionProps) => JSX.Element;
};

const ListboxOptions = ({
  options,
  className,
  renderOption,
}: ListboxOptionsProps) => {
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
        <HUIListbox.Options
          className={clsx(
            "absolute z-popover mt-2 max-h-60 w-full origin-top overflow-auto rounded-md bg-gray-50 py-2 text-sm shadow-lg ring-1 ring-gray-300 focus:outline-none",
            className,
          )}
        >
          {options.map((option) => (
            <HUIListbox.Option key={option.value} value={option.value}>
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
            </HUIListbox.Option>
          ))}
        </HUIListbox.Options>
      </Transition>
    )
  );
};

// assigning
Listbox.Label = ListboxLabel;
Listbox.Button = ListboxButton;
Listbox.Options = ListboxOptions;

export default Listbox;
