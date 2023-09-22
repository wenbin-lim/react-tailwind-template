import clsx from "clsx";

interface InputWrapperProps {
  className?: string;
  children?: React.ReactNode;
}
const InputWrapper = ({ className, children }: InputWrapperProps) => {
  return (
    <div
      className={clsx(
        {
          "flex flex-col gap-y-2": !className,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};
export default InputWrapper;
