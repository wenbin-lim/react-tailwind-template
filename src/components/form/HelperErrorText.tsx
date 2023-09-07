import clsx from "clsx";

interface HelperErrorTextProps {
  isError?: boolean;
  children?: React.ReactNode;
}

const HelperErrorText = ({ isError, children }: HelperErrorTextProps) => {
  return (
    children && (
      <p
        className={clsx("text-sm", {
          "text-red-500": isError,
        })}
      >
        {children}
      </p>
    )
  );
};
export default HelperErrorText;
