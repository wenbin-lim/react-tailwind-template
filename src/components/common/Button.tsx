import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
};

const Button = ({
  className,
  disabled,
  fullWidth = true,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(`btn ${className}`, {
        "w-full": fullWidth,
        "btn-disabled": disabled,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
