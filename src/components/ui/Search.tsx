import { useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (value: string) => void;
  searchUsingBtn?: boolean;
  disabled?: boolean;
};

const Search = ({
  searchUsingBtn = true,
  onChange,
  disabled,
  ...rest
}: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickSearch = () => {
    if (inputRef.current && searchUsingBtn) {
      onChange(inputRef.current.value);
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => !searchUsingBtn && onChange(e.target.value)}
        className="input pr-10 dark:input-dark"
        disabled={disabled}
        {...rest}
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center px-1.5 enabled:active:scale-105"
        onClick={onClickSearch}
        disabled={!searchUsingBtn || disabled}
      >
        <kbd className="inline-flex items-center rounded border border-gray-300 p-1 font-sans text-xs text-gray-500 dark:border-gray-600">
          <MagnifyingGlassIcon className="h-4 w-4" />
        </kbd>
      </button>
    </div>
  );
};
export default Search;
