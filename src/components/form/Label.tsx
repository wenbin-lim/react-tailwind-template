import clsx from "clsx";

interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  isError?: boolean;
  children?: React.ReactNode;
}
const Label = ({ htmlFor, required, isError, children }: LabelProps) => {
  return (
    children && (
      <label
        className={clsx("block text-sm font-medium leading-6", {
          "text-red-500": isError,
          "after:text-red-500 after:content-['*']": required,
        })}
        htmlFor={htmlFor}
      >
        {children}
      </label>
    )
  );
};
export default Label;
