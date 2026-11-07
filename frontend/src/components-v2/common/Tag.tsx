import type { Props } from '../../types/props'

export default function Tag({
  children,
  className
}: Props) {
  return (
    <div className={`${className} px-2 py-1 border rounded-lg`}>
      {children}
    </div>
  )
}
