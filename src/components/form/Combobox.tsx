import { Combobox as HUICombobox } from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type ComboboxOption = {
  id: string;
  name: string;
  value: string;
};

type LabelProps = {
  label?: string;
  required?: boolean;
  errorText?: string;
};
const Label = ({ label, errorText, required }: LabelProps) =>
  label && (
    <HUICombobox.Label
      className={clsx("mb-2 block text-sm font-medium leading-6", {
        "text-red-500": !!errorText,
        "after:text-red-500 after:content-['*']": required,
      })}
    >
      {label}
    </HUICombobox.Label>
  );

type InputProps = {
  errorText?: string;
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
};
const Input = ({ errorText, query, setQuery, placeholder }: InputProps) => (
  <HUICombobox.Input
    className={clsx(
      "w-full rounded-md border-0 bg-inherit py-1.5 pl-3 pr-12 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
      errorText
        ? "text-red-500 placeholder-red-300 ring-red-300 focus:border-red-500 focus:ring-red-500 dark:placeholder-red-700 dark:ring-red-700"
        : "placeholder-gray-400 ring-gray-300 focus:ring-input-focus dark:placeholder-gray-600 dark:ring-gray-700",
    )}
    onChange={(event) => setQuery(event.target.value)}
    displayValue={() => query}
    placeholder={placeholder}
  />
);

const Button = () => (
  <HUICombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
  </HUICombobox.Button>
);

type OptionsProps = {
  filteredOptions?: ComboboxOption[];
};
const Options = ({ filteredOptions }: OptionsProps) =>
  filteredOptions &&
  filteredOptions.length > 0 && (
    <HUICombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface-variant py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-surface-variant-dark sm:text-sm">
      {filteredOptions.map((option) => (
        <HUICombobox.Option
          key={option.id}
          value={option.value}
          className={({ active }) =>
            clsx(
              active
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant dark:text-on-surface-variant-dark",
              "relative cursor-default select-none py-2 pl-3 pr-9",
            )
          }
        >
          {({ active, selected }) => (
            <>
              <div className="flex">
                <span className={clsx("truncate", selected && "font-semibold")}>
                  {option.name}
                </span>
              </div>

              {selected && (
                <span
                  className={clsx(
                    "absolute inset-y-0 right-0 flex items-center pr-4",
                    active ? "text-on-primary" : "text-primary",
                  )}
                >
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </>
          )}
        </HUICombobox.Option>
      ))}
    </HUICombobox.Options>
  );

type HelperErrorText = {
  errorText?: string;
  helperText?: string;
};

const HelperErrorText = ({ errorText, helperText }: HelperErrorText) =>
  (errorText || helperText) && (
    <p
      className={clsx("mt-2 text-xs", {
        "text-red-500": !!errorText,
      })}
    >
      {errorText || helperText}
    </p>
  );

type ComboboxCommonProps = {
  label?: string;
  wrapperClass?: string;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  query: string;
  setQuery: (value: string) => void;
  filteredOptions?: ComboboxOption[];
};

type ComboboxSingleSelectProps = ComboboxCommonProps & {
  multiple?: false;
  selected: string;
  setSelected: (value: string) => void;
};

type ComboboxMultiSelectProps = ComboboxCommonProps & {
  multiple: true;
  selected: string[];
  setSelected: (value: string[]) => void;
};

const Combobox = ({
  label,
  wrapperClass,
  errorText,
  helperText,
  disabled,
  required,
  placeholder = "Search",
  query,
  setQuery,
  filteredOptions,
  multiple,
  selected,
  setSelected,
}: ComboboxSingleSelectProps | ComboboxMultiSelectProps) => {
  return multiple ? (
    <HUICombobox
      multiple
      as="div"
      value={selected}
      onChange={setSelected}
      className={clsx(wrapperClass)}
      disabled={disabled}
    >
      <Label label={label} required={required} errorText={errorText} />
      <div className="relative">
        <Input
          errorText={errorText}
          query={query}
          setQuery={setQuery}
          placeholder={placeholder}
        />
        <Button />
        <Options filteredOptions={filteredOptions} />
      </div>
      <HelperErrorText errorText={errorText} helperText={helperText} />
    </HUICombobox>
  ) : (
    <HUICombobox
      as="div"
      value={selected}
      onChange={setSelected}
      className={clsx(wrapperClass)}
      disabled={disabled}
    >
      <Label label={label} required={required} errorText={errorText} />
      <div className="relative">
        <Input
          errorText={errorText}
          query={query}
          setQuery={setQuery}
          placeholder={placeholder}
        />
        <Button />
        <Options filteredOptions={filteredOptions} />
      </div>
      <HelperErrorText errorText={errorText} helperText={helperText} />
    </HUICombobox>
  );
};

export default Combobox;
