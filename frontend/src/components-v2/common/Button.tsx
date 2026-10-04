import type { Props } from "../../types/props";

export default function Button({
  children,
  className
}: Props) {
  return (
    <button className={`${className} rounded px-2 py-1 text-sm md:text-base lg:text-lg cursor-pointer hover:brightness-50 ease-in-out duration-300`}>
      {children}
    </button>
  )
}
