import { useRef } from "react";
import clsx from "clsx";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchProps = {
  wrapperClass?: string;
  label?: string;
  disabled?: boolean;
  triggerOnChangeUsingBtn?: boolean;
  onChange: (value: string) => void;
};

const Search = ({
  wrapperClass,
  label,
  disabled,
  triggerOnChangeUsingBtn = true,
  onChange,
}: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickSearch = () => {
    if (inputRef.current && triggerOnChangeUsingBtn) {
      onChange(inputRef.current.value);
    }
  };

  return (
    <div className={clsx(wrapperClass)}>
      <label htmlFor="search" className="block text-sm font-medium leading-6">
        {label}
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          ref={inputRef}
          onChange={(e) => !triggerOnChangeUsingBtn && onChange(e.target.value)}
          className={clsx(
            "block w-full rounded-input border-0 bg-inherit py-1.5 pr-10 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-input-focus dark:placeholder-gray-600 dark:ring-gray-700 sm:text-sm sm:leading-6",
          )}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-1.5 enabled:active:scale-105"
          onClick={onClickSearch}
          disabled={!triggerOnChangeUsingBtn || disabled}
        >
          <kbd className="inline-flex items-center rounded border border-gray-300 p-1 font-sans text-xs text-gray-400 dark:border-gray-700">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </kbd>
        </button>
      </div>
    </div>
  );
};
export default Search;
