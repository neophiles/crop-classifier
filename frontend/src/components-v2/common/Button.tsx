import type { ButtonHTMLAttributes } from "react";
import type { Props } from "../../types/props";

type ButtonProps = Props & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "aria-pressed" | "disabled" | "onClick" | "type">;

export default function Button({
  children,
  className,
  "aria-pressed": ariaPressed,
  disabled,
  onClick,
  type = "button"
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} rounded px-2 py-1 text-sm md:text-base lg:text-lg cursor-pointer hover:brightness-50 ease-in-out duration-300`}
      aria-pressed={ariaPressed}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
