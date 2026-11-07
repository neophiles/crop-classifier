import type { Props } from "../../types/props";

export default function Main({ children }: Props) {
  return (
    <main className="md:flex-1 md:min-h-0 w-full max-w-6xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </main>
  )
}
