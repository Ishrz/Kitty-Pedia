import { useEffect, useState } from "react"

/**
 * Returns `value` after it has been stable for `delay` ms.
 * Used to keep the search box from firing a request on every keystroke.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
