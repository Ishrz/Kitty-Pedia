import { Search, X } from "lucide-react"
import { useEffect, useState } from "react"

import { CatGrid, CatGridSkeleton } from "@/components/cats/CatGrid"
import { StateMessage } from "@/components/common/StateMessage"
import { BackLink } from "@/components/common/BackLink"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import { useCatsStore } from "@/store/cats.store"

export default function BrowsePage() {
  const [term, setTerm] = useState("")
  const debouncedTerm = useDebounce(term, 300)

  const cats = useCatsStore((s) => s.cats)
  const query = useCatsStore((s) => s.query)
  const status = useCatsStore((s) => s.status)
  const error = useCatsStore((s) => s.error)
  const loadAll = useCatsStore((s) => s.loadAll)
  const search = useCatsStore((s) => s.search)

  // Initial load, and re-run whenever the debounced term changes.
  useEffect(() => {
    if (debouncedTerm.trim()) {
      void search(debouncedTerm)
    } else {
      void loadAll()
    }
  }, [debouncedTerm, loadAll, search])

  const isSearching = debouncedTerm.trim().length > 0

  return (
    <div className="flex flex-col gap-6">
      <BackLink to="/" label="Back to home" />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Cat breeds</h1>
        <p className="text-sm text-muted-foreground">
          {status === "success" && !isSearching
            ? `${cats.length} breed${cats.length === 1 ? "" : "s"} to explore`
            : "Search by name or breed — the list updates as you type."}
        </p>
      </div>

      <div className="relative max-w-md">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search cats or breeds…"
          aria-label="Search cats by name or breed"
          className="pr-9 pl-9"
        />
        {term ? (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setTerm("")}
            aria-label="Clear search"
            className="absolute top-1/2 right-2 -translate-y-1/2"
          >
            <X className="size-3.5" aria-hidden="true" />
          </Button>
        ) : null}
      </div>

      {status === "loading" ? (
        <CatGridSkeleton />
      ) : status === "error" ? (
        <StateMessage
          icon="error"
          title="Could not load cats"
          description={error ?? undefined}
          actionLabel="Try again"
          onAction={() => void (isSearching ? search(debouncedTerm) : loadAll())}
        />
      ) : cats.length === 0 ? (
        <StateMessage
          title={isSearching ? `No cats match “${query}”` : "No cats just yet"}
          description={
            isSearching
              ? "We search by cat name and breed. Try a different word, like “Bengal” or “Siamese”."
              : "There are no cats to show at the moment. Please check back soon."
          }
          actionLabel={isSearching ? "Clear search" : "Try again"}
          onAction={() => (isSearching ? setTerm("") : void loadAll())}
        />
      ) : (
        <CatGrid cats={cats} />
      )}
    </div>
  )
}
