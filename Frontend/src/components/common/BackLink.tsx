import { ArrowLeft } from "lucide-react"
import { Link, type To } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BackLinkProps {
  to: To
  label: string
  className?: string
}

/** Consistent "return to the previous step" affordance on secondary pages. */
export function BackLink({ to, label, className }: BackLinkProps) {
  return (
    <Button asChild variant="ghost" size="sm" className={cn("-ml-2 w-fit", className)}>
      <Link to={to}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        {label}
      </Link>
    </Button>
  )
}
