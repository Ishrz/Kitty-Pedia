import { useState } from "react"

/** Toggles a boolean, for filter switches and disclosure widgets. */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  return [value, () => setValue((v) => !v), setValue] as const
}
