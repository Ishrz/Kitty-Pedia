import { Search } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { Link } from "react-router-dom"

import { CatGrid, CatGridSkeleton } from "@/components/cats/CatGrid"
import { StateMessage } from "@/components/common/StateMessage"
import { BackLink } from "@/components/common/BackLink"
import { PreferenceForm } from "@/components/advisor/PreferenceForm"
import { Button } from "@/components/ui/button"
import { recommendCats } from "@/api/cats"
import { toAppError } from "@/api/client"
import { useFiltersStore } from "@/store/filters.store"
import type { LoadStatus } from "@/types/api"
import type { Cat, Preferences } from "@/types/cat"

export default function RecommendPage() {
  const [cats, setCats] = useState<Cat[]>([])
  const [status, setStatus] = useState<LoadStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  // Selected as primitives. A selector returning a fresh object would break
  // reference equality in zustand v5 and loop forever.
  const isKidsFriendly = useFiltersStore((s) => s.isKidsFriendly)
  const isAppartmentFriendly = useFiltersStore((s) => s.isAppartmentFriendly)

  const preferences = useMemo<Preferences>(
    () => ({ isKidsFriendly, isAppartmentFriendly }),
    [isKidsFriendly, isAppartmentFriendly],
  )

  const runSearch = useCallback(async () => {
    setStatus("loading")
    setError(null)
    setHasSearched(true)

    try {
      // Both keys are always sent explicitly — the backend passes them straight
      // into a Mongo query, so an omitted key would not match.
      setCats(await recommendCats(preferences))
      setStatus("success")
    } catch (err) {
      setError(toAppError(err).message)
      setStatus("error")
    }
  }, [preferences])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    void runSearch()
  }

  const isLoading = status === "loading"

  return (
    <div className="flex flex-col gap-6">
      <BackLink to="/browse" label="Back to browse" />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Find your match</h1>
        <p className="text-sm text-muted-foreground">
          Tell us about your home and we'll show you the cats that fit. Want a written comparison
          instead? Try the{" "}
          <Link to="/advisor" className="font-medium text-primary underline-offset-4 hover:underline">
            AI advisor
          </Link>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <PreferenceForm disabled={isLoading} />

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isLoading}>
            <Search className="size-4" aria-hidden="true" />
            {isLoading ? "Searching…" : "Show matching cats"}
          </Button>
          {isLoading ? (
            <span className="text-sm text-muted-foreground">Finding your matches…</span>
          ) : null}
        </div>
      </form>

      {isLoading ? (
        <CatGridSkeleton count={4} />
      ) : status === "error" ? (
        <StateMessage
          icon="error"
          title="Could not load recommendations"
          description={error ?? undefined}
          actionLabel="Try again"
          onAction={() => void runSearch()}
        />
      ) : status === "success" && cats.length === 0 ? (
        <StateMessage
          title="No cats match both of those"
          description="Nothing suits that exact combination. Try switching one of the options off and see what comes up."
          actionLabel="Reset my choices"
          onAction={() => useFiltersStore.getState().reset()}
        />
      ) : status === "success" ? (
        <>
          <p className="text-sm text-muted-foreground">
            {cats.length} good match{cats.length === 1 ? "" : "es"} for your home
          </p>
          <CatGrid cats={cats} />
        </>
      ) : hasSearched ? null : (
        <StateMessage
          title="Let's start with your home"
          description="Set the two options above, then hit search and we'll do the rest."
        />
      )}
    </div>
  )
}
