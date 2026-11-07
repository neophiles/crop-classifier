import type { ContainerProps } from "../../types/props";

export default function Widget({
  type: Component = "div",
  children,
  className
}: ContainerProps) {
  return (
    <Component className={`${className} w-full p-4 flex flex-col gap-4 border border-gray-300 rounded-lg`}>
      {children}
    </Component>
  )
}
