/**
 * Every `color` value currently present in the database. The record is
 * exhaustive on purpose: Tailwind scans source for literal class strings, so a
 * computed class name would not be generated. Unknown colors fall back to
 * `DEFAULT_PALETTE`, which degrades gracefully if new breeds are added.
 */
export interface Palette {
  /** Classes for the placeholder surface. */
  surface: string
  /** Classes for the cat silhouette + initials drawn on top of it. */
  ink: string
}

export const DEFAULT_PALETTE: Palette = {
  surface: "from-amber-100 to-orange-200 dark:from-amber-950 dark:to-orange-950",
  ink: "text-amber-700/70 dark:text-amber-300/50",
}

export const CAT_PALETTES: Record<string, Palette> = {
  // Greys, blacks and whites
  "blue-gray": { surface: "from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900", ink: "text-slate-600/70 dark:text-slate-300/50" },
  "silver blue": { surface: "from-sky-100 to-slate-300 dark:from-sky-950 dark:to-slate-900", ink: "text-sky-800/60 dark:text-sky-200/40" },
  ebony: { surface: "from-zinc-700 to-zinc-900 dark:from-zinc-800 dark:to-black", ink: "text-zinc-300/50 dark:text-zinc-500/60" },
  "black smoke": { surface: "from-zinc-600 to-stone-800 dark:from-zinc-800 dark:to-stone-950", ink: "text-stone-200/60 dark:text-stone-400/50" },
  "pure white": { surface: "from-slate-50 to-slate-200 dark:from-slate-700 dark:to-slate-900", ink: "text-slate-500/70 dark:text-slate-200/50" },
  gray: { surface: "from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900", ink: "text-slate-600/70 dark:text-slate-300/50" },
  "grey tabby": { surface: "from-slate-200 to-zinc-300 dark:from-slate-800 dark:to-zinc-900", ink: "text-zinc-600/70 dark:text-zinc-300/50" },
  "silver tabby": { surface: "from-slate-100 to-slate-400 dark:from-slate-700 dark:to-slate-900", ink: "text-slate-700/60 dark:text-slate-100/40" },

  // Browns, blacks and ruddy
  sable: { surface: "from-stone-300 to-yellow-900 dark:from-stone-800 dark:to-yellow-950", ink: "text-stone-700/60 dark:text-yellow-200/40" },
  "natural mink": { surface: "from-amber-200 to-stone-400 dark:from-amber-950 dark:to-stone-800", ink: "text-amber-900/60 dark:text-amber-200/40" },
  "ruddy brown": { surface: "from-orange-200 to-amber-400 dark:from-orange-950 dark:to-amber-900", ink: "text-orange-900/60 dark:text-orange-200/40" },
  "brown tabby": { surface: "from-amber-200 to-orange-300 dark:from-amber-950 dark:to-orange-900", ink: "text-amber-900/70 dark:text-amber-200/50" },
  "golden tabby": { surface: "from-yellow-200 to-amber-300 dark:from-yellow-950 dark:to-amber-900", ink: "text-yellow-800/60 dark:text-yellow-200/40" },
  "red tabby": { surface: "from-orange-300 to-red-400 dark:from-orange-950 dark:to-red-950", ink: "text-red-900/60 dark:text-orange-200/40" },
  "brown & black agouti": { surface: "from-stone-300 to-neutral-700 dark:from-stone-800 dark:to-neutral-950", ink: "text-neutral-700/60 dark:text-neutral-200/40" },

  // Points and bicolours
  "seal point": { surface: "from-stone-300 to-amber-900 dark:from-stone-800 dark:to-amber-950", ink: "text-stone-700/60 dark:text-amber-200/40" },
  "seal bicolor": { surface: "from-stone-200 via-amber-100 to-stone-800 dark:from-stone-800 dark:via-amber-950 dark:to-stone-950", ink: "text-stone-700/60 dark:text-amber-100/40" },
  "seal point with white paws": { surface: "from-stone-100 to-amber-900 dark:from-stone-700 dark:to-amber-950", ink: "text-stone-600/60 dark:text-amber-100/40" },
  "chocolate point": { surface: "from-orange-100 to-stone-700 dark:from-stone-800 dark:to-stone-950", ink: "text-stone-700/60 dark:text-orange-200/40" },

  // Creams, whites and pastels
  cream: { surface: "from-yellow-100 to-amber-200 dark:from-yellow-950 dark:to-amber-900", ink: "text-yellow-800/60 dark:text-yellow-200/40" },
  "cream tabby": { surface: "from-yellow-100 to-amber-300 dark:from-yellow-950 dark:to-amber-900", ink: "text-yellow-800/60 dark:text-yellow-200/40" },
  "pink / peach": { surface: "from-rose-100 to-orange-200 dark:from-rose-950 dark:to-orange-900", ink: "text-rose-800/50 dark:text-rose-200/40" },

  // Patterns
  "spotted rosetted": { surface: "from-amber-200 to-orange-400 dark:from-amber-950 dark:to-orange-900", ink: "text-amber-900/70 dark:text-amber-200/50" },
  "brown spotted": { surface: "from-amber-200 to-orange-300 dark:from-amber-950 dark:to-orange-900", ink: "text-amber-900/70 dark:text-amber-200/50" },
  calico: { surface: "from-rose-200 via-amber-100 to-slate-200 dark:from-rose-950 dark:via-amber-950 dark:to-slate-900", ink: "text-rose-800/60 dark:text-rose-300/40" },
  "orange tabby": { surface: "from-orange-200 to-amber-300 dark:from-orange-950 dark:to-amber-900", ink: "text-orange-800/70 dark:text-orange-300/50" },
  "white and black": { surface: "from-slate-100 to-slate-800 dark:from-slate-800 dark:to-slate-950", ink: "text-slate-500/70 dark:text-slate-200/50" },
  black: { surface: "from-zinc-700 to-zinc-900 dark:from-zinc-800 dark:to-black", ink: "text-zinc-300/50 dark:text-zinc-500/60" },
  "blue and white": { surface: "from-sky-100 to-slate-300 dark:from-sky-950 dark:to-slate-900", ink: "text-sky-800/60 dark:text-sky-200/40" },
}

export function getPalette(color: string | undefined): Palette {
  if (!color) return DEFAULT_PALETTE
  return CAT_PALETTES[color.trim().toLowerCase()] ?? DEFAULT_PALETTE
}

export const ENERGY_LEVELS = ["Low", "Medium", "High"] as const
export type EnergyLevel = (typeof ENERGY_LEVELS)[number]

export const ENERGY_BADGE: Record<EnergyLevel, string> = {
  Low: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  Medium: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  High: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
}

export function isEnergyLevel(value: string): value is EnergyLevel {
  return (ENERGY_LEVELS as readonly string[]).includes(value)
}
