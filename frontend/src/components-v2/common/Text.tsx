import type { TextProps } from "../../types/props"

export default function Text({
  children,
  className,
  type: Component = "p",
  size = "base",
  weight = "normal"
}: TextProps) {
  const sizeMap = {
    "sm": " text-[0.5rem] md:text-xs lg:text-sm",
    "base": "text-xs md:text-sm lg:text-base",
    "lg": "text-sm md:text-base lg:text-lg",
    "xl": "text-base md:text-lg lg:text-xl",
    "2xl": "text-lg md:text-xl lg:text-2xl"
  }

  const headerTags = ["h1", "h2", "h3", "h4", "h5", "h6"]

  const finalSize = Component === "h1" ? sizeMap["2xl"] : sizeMap[size]

  const isBold = headerTags.includes(Component) || weight === "bold" ? "font-bold" : undefined
    
  return (
    <Component className={`${finalSize} ${isBold} ${className}`}>
      {children}
    </Component>
  )
}
