import { Link } from "react-router-dom"

import { CatImage } from "@/components/cats/CatImage"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Cat } from "@/types/cat"

interface CatCardProps {
  cat: Cat
  className?: string
}

export function CatCard({ cat, className }: CatCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-border/70 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        className,
      )}
    >
      <Link
        to={`/cats/${cat._id}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <CatImage
          src={cat.image}
          alt={cat.name}
          color={cat.color}
          className="aspect-4/3 w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />

        <CardContent className="flex flex-col gap-1.5">
          <h3 className="text-base leading-tight font-semibold group-hover:text-primary">{cat.name}</h3>
          <p className="text-sm text-muted-foreground italic">{cat.breed}</p>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{cat.description}</p>
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            Life span {cat.lifeSpan} years
          </p>
        </CardContent>
      </Link>
    </Card>
  )
}
