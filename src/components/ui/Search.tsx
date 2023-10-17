import { useRef } from "react";
import clsx from "clsx";

import { Input } from "./input";

import { X } from "lucide-react";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const Search = ({ value, onChange, placeholder, className }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className={clsx(className, "!relative")}>
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-10"
        placeholder={placeholder}
      />
      {value && (
        <button
          className="absolute inset-y-0 right-0 flex items-center px-3 enabled:active:scale-105"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear input</span>
        </button>
      )}
    </div>
  );
};
export default Search;
