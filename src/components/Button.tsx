import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button = ({ className, disabled, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "select-none rounded-btn px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-input-focus",
        className,
        {
          "pointer-events-none select-none opacity-50": !!disabled,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
