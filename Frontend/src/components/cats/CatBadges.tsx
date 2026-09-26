import { Baby, Home } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ENERGY_BADGE, isEnergyLevel } from "@/lib/cat-colors"
import { cn } from "@/lib/utils"
import type { Cat } from "@/types/cat"

interface CatBadgesProps {
  cat: Cat
  className?: string
}

export function CatBadges({ cat, className }: CatBadgesProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      <Badge variant="secondary" className="font-normal">
        {cat.color}
      </Badge>

      {isEnergyLevel(cat.energyLevel) ? (
        <Badge className={cn("border-transparent font-normal", ENERGY_BADGE[cat.energyLevel])}>
          {cat.energyLevel} energy
        </Badge>
      ) : (
        <Badge variant="secondary" className="font-normal">
          {cat.energyLevel} energy
        </Badge>
      )}

      <Badge
        variant="outline"
        className={cn("font-normal", !cat.isKidsFriendly && "opacity-55")}
        title={cat.isKidsFriendly ? "Good with children" : "Not suited to homes with children"}
      >
        <Baby className="size-3" aria-hidden="true" />
        {cat.isKidsFriendly ? "Kid friendly" : "Not kid friendly"}
      </Badge>

      <Badge
        variant="outline"
        className={cn("font-normal", !cat.isAppartmentFriendly && "opacity-55")}
        title={cat.isAppartmentFriendly ? "Suits apartment living" : "Needs more space"}
      >
        <Home className="size-3" aria-hidden="true" />
        {cat.isAppartmentFriendly ? "Apartment friendly" : "Needs space"}
      </Badge>
    </div>
  )
}
