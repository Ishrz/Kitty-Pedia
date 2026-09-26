import { AlertTriangle, Inbox, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StateMessageProps {
  title: string
  description?: string
  icon?: "error" | "empty"
  actionLabel?: string
  onAction?: () => void
  className?: string
}

/** Shared error / empty presentation so every page fails the same way. */
export function StateMessage({
  title,
  description,
  icon = "empty",
  actionLabel,
  onAction,
  className,
}: StateMessageProps) {
  const Icon = icon === "error" ? AlertTriangle : Inbox

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full",
          icon === "error" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </span>

      <div className="space-y-1">
        <p className="font-semibold">{title}</p>
        {description ? <p className="max-w-prose text-sm text-muted-foreground">{description}</p> : null}
      </div>

      {actionLabel && onAction ? (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-1">
          <RotateCcw className="size-3.5" aria-hidden="true" />
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
