import { ComponentProps } from "react";

const CustomButton = ({
  children,
  className = "",
  ...props
}: ComponentProps<"button">) => (
  <button
    className={`rounded-sm bg-primary px-6 py-2 text-center text-sm text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
