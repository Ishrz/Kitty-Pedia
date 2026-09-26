import { Outlet } from "react-router-dom"

import { Header } from "@/components/layout/Header"

export function PageShell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-border/70 py-6">
        <p className="mx-auto max-w-6xl px-4 text-xs text-muted-foreground">
          kitty_pedia — breed information to help you find a cat that suits your home. Always
          confirm a cat's temperament in person before adopting.
        </p>
      </footer>
    </div>
  )
}
