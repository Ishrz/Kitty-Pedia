import { CatCard } from "@/components/cats/CatCard"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { Cat } from "@/types/cat"

interface CatGridProps {
  cats: Cat[]
  className?: string
}

export function CatGrid({ cats, className }: CatGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {cats.map((cat) => (
        <CatCard key={cat._id} cat={cat} />
      ))}
    </div>
  )
}

/** Mirrors CatGrid's shape so the layout does not shift when data lands. */
export function CatGridSkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-4/3 w-full rounded-none" />
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
