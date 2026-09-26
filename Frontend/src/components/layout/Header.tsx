import { Cat, Menu, Moon, Sparkles, Sun } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Cat, end: true },
  { to: "/browse", label: "Browse", icon: Cat, end: true },
  { to: "/recommend", label: "Recommend", icon: Sparkles, end: true },
  { to: "/advisor", label: "AI Advisor", icon: Sparkles, end: true },
] as const

function ThemeToggle({ className }: { className?: string }) {
  const { dark, toggle } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className={className}
    >
      {dark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
    </Button>
  )
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    isActive
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
  )

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Cat className="size-4.5" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">kitty_pedia</span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                    )
                  }
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile controls: theme toggle sits immediately left of the hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Cat className="size-4" aria-hidden="true" />
                  </span>
                  kitty_pedia
                </SheetTitle>
                <SheetDescription>Go anywhere in the encyclopedia.</SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                    <li key={to}>
                      <NavLink to={to} end className={linkClass} onClick={() => setOpen(false)}>
                        <Icon className="size-4" aria-hidden="true" />
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto border-t border-border/70 px-4 py-4">
                <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                  <Link to="/browse">Browse cats</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop theme toggle */}
        <ThemeToggle className="hidden md:inline-flex" />
      </div>
    </header>
  )
}
