import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  size?: "small" | "normal" | "large";
  shadow?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button = ({
  className,
  size = "normal",
  shadow = true,
  disabled,
  children,
  ...rest
}: ButtonProps) => {
  const getSize = (size: string) => {
    switch (size) {
      case "small":
        return "px-2.5 py-1.5 text-sm";
      case "large":
        return "px-3.5 py-2.5 text-base";
      case "normal":
      default:
        return "px-3 py-2 text-sm";
    }
  };

  return (
    <button
      className={clsx(
        "select-none rounded-btn text-sm font-semibold hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-input-focus",
        className,
        getSize(size),
        { "shadow-sm": shadow },
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
