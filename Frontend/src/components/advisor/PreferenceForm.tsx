import { Baby, Home } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useFiltersStore } from "@/store/filters.store"

interface PreferenceFormProps {
  /** Set false to render the controls read-only, e.g. while a request is in flight. */
  disabled?: boolean
  className?: string
}

/** Bound to the shared filters store, so Recommend and the Advisor stay in sync. */
export function PreferenceForm({ disabled = false, className }: PreferenceFormProps) {
  const isKidsFriendly = useFiltersStore((s) => s.isKidsFriendly)
  const isAppartmentFriendly = useFiltersStore((s) => s.isAppartmentFriendly)
  const setKidsFriendly = useFiltersStore((s) => s.setKidsFriendly)
  const setApartmentFriendly = useFiltersStore((s) => s.setApartmentFriendly)
  const reset = useFiltersStore((s) => s.reset)

  return (
    <div className={className}>
      <div className="grid gap-3 sm:grid-cols-2">
        <PreferenceRow
          id="kids-friendly"
          icon={Baby}
          label="Kid friendly"
          description="Good with children"
          checked={isKidsFriendly}
          disabled={disabled}
          onCheckedChange={setKidsFriendly}
        />
        <PreferenceRow
          id="apartment-friendly"
          icon={Home}
          label="Apartment friendly"
          description="Suits small living spaces"
          checked={isAppartmentFriendly}
          disabled={disabled}
          onCheckedChange={setApartmentFriendly}
        />
      </div>

      <button
        type="button"
        onClick={reset}
        disabled={disabled}
        className="mt-3 text-xs font-medium text-muted-foreground underline-offset-4 hover:underline disabled:opacity-50"
      >
        Reset preferences
      </button>
    </div>
  )
}

function PreferenceRow({
  id,
  icon: Icon,
  label,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  id: string
  icon: typeof Baby
  label: string
  description: string
  checked: boolean
  disabled: boolean
  onCheckedChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-card px-3.5 py-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <div className="min-w-0">
          <Label htmlFor={id} className="cursor-pointer text-sm font-medium">
            {label}
          </Label>
          <p className="truncate text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} />
    </div>
  )
}
