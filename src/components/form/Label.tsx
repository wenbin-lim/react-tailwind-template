import clsx from "clsx";

interface LabelProps {
  htmlFor?: string;
  className?: string;
  required?: boolean;
  invalid?: boolean;
  children?: React.ReactNode;
}
const Label = ({
  htmlFor,
  className,
  required,
  invalid,
  children,
}: LabelProps) => {
  return (
    children && (
      <label
        className={clsx(
          "form-label",
          {
            "form-label-invalid": invalid,
            "form-label-required": required,
          },
          className,
        )}
        htmlFor={htmlFor}
      >
        {children}
      </label>
    )
  );
};
export default Label;
