import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "theme"

function isDark() {
  if (typeof window === "undefined") return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return stored === "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

/**
 * Drives the `.dark` class on <html>. The initial value is also applied by an
 * inline script in index.html so a reload does not flash the light theme.
 */
export function useTheme() {
  const [dark, setDark] = useState(isDark)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light")
  }, [dark])

  const toggle = useCallback(() => setDark((d) => !d), [])

  return { dark, toggle }
}
