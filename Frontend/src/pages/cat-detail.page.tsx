import { Clock, Palette, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { CatBadges } from "@/components/cats/CatBadges"
import { CatImage } from "@/components/cats/CatImage"
import { StateMessage } from "@/components/common/StateMessage"
import { BackLink } from "@/components/common/BackLink"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchCatById } from "@/api/cats"
import type { LoadStatus } from "@/types/api"
import type { Cat } from "@/types/cat"

interface Result {
  id: string
  cat: Cat | null
}

export default function CatDetailPage() {
  const { id = "" } = useParams<{ id: string }>()

  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    fetchCatById(id)
      .then((cat) => {
        if (cancelled) return
        // The backend answers 200 with `data: null` for an unknown id, and 500s
        // for a malformed one. Both mean "not found".
        setResult({ id, cat })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        // A hand-edited or malformed id surfaces a raw database error. Keep the
        // technical detail in the console for developers and show the user
        // something they can act on.
        console.error("[cat-detail] lookup failed", err)
        setResult({ id, cat: null })
      })

    return () => {
      cancelled = true
    }
  }, [id])

  // Status is derived, not stored, so navigating to a new id renders the
  // loading state immediately without a setState inside the effect.
  const isStale = result === null || result.id !== id
  const status: LoadStatus = isStale ? "loading" : result.cat ? "success" : "error"
  const cat = isStale ? null : result.cat

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-40" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="aspect-4/3 w-full rounded-xl" />
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    )
  }

  if (status === "error" || !cat) {
    return (
      <div className="flex flex-col gap-6">
        <BackLink to="/browse" label="Back to browse" />
        <StateMessage
          icon="error"
          title="We couldn't find that cat"
          description="It may have been removed, or the link might be out of date. Have a browse to find another one."
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <BackLink to="/browse" label="Back to browse" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CatImage src={cat.image} alt={cat.name} color={cat.color} className="aspect-4/3 w-full" />
        </Card>

        <div className="flex flex-col gap-5">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{cat.name}</h1>
            <p className="text-lg text-muted-foreground italic">{cat.breed}</p>
          </div>

          <CatBadges cat={cat} />

          <p className="leading-relaxed text-pretty">{cat.description}</p>

          <Card className="bg-muted/40">
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <Spec icon={Palette} label="Color" value={cat.color} />
              <Spec icon={Zap} label="Energy level" value={cat.energyLevel} />
              <Spec icon={Clock} label="Life span" value={`${cat.lifeSpan} years`} />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/recommend">Find a similar cat</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full sm:w-auto">
              <Link to="/advisor">Ask the AI advisor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Spec({ icon: Icon, label, value }: { icon: typeof Palette; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  )
}
