import clsx from "clsx";

interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  invalid?: boolean;
  children?: React.ReactNode;
}
const Label = ({ htmlFor, required, invalid, children }: LabelProps) => {
  return (
    children && (
      <label
        className={clsx("form-label", {
          "form-label-invalid": invalid,
          "form-label-required": required,
        })}
        htmlFor={htmlFor}
      >
        {children}
      </label>
    )
  );
};
export default Label;
