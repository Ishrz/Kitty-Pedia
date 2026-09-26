import { cn } from "@/lib/utils"

/**
 * Decorative hero artwork. Purely presentational, so it is hidden from
 * assistive tech — the surrounding copy carries the meaning.
 */
export function CatHeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={cn("h-auto w-full max-w-sm", className)}
    >
      <defs>
        <linearGradient id="hero-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="hero-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--card)" />
          <stop offset="100%" stopColor="var(--muted)" />
        </linearGradient>
      </defs>

      {/* back card */}
      <rect x="18" y="26" width="120" height="150" rx="14" fill="var(--accent)" opacity="0.45" transform="rotate(-8 18 26)" />
      {/* front card */}
      <rect x="52" y="30" width="150" height="164" rx="16" fill="url(#hero-card)" stroke="var(--border)" />

      {/* paw prints */}
      <g fill="var(--primary)" opacity="0.5">
        <circle cx="100" cy="140" r="11" />
        <circle cx="82" cy="126" r="5" />
        <circle cx="95" cy="120" r="5" />
        <circle cx="108" cy="121" r="5" />
        <circle cx="120" cy="129" r="5" />
      </g>

      {/* cat head */}
      <g>
        <path d="M118 62 108 40l22 12a44 44 0 0 1 18 0l22-12-10 22a34 34 0 0 1 8 22c0 15-14 26-29 26s-29-11-29-26a34 34 0 0 1 8-22Z" fill="url(#hero-body)" />
        <circle cx="128" cy="83" r="4.5" fill="var(--card)" />
        <circle cx="150" cy="83" r="4.5" fill="var(--card)" />
        <circle cx="128" cy="83" r="2" fill="var(--foreground)" />
        <circle cx="150" cy="83" r="2" fill="var(--foreground)" />
        <path d="M136 92h6l-3 4-3-4Z" fill="var(--card)" />
        {/* whiskers */}
        <g stroke="var(--muted-foreground)" strokeWidth="1.6" strokeLinecap="round" opacity="0.7">
          <path d="M104 90h-16" />
          <path d="M104 97l-15 4" />
          <path d="M174 90h16" />
          <path d="M174 97l15 4" />
        </g>
      </g>

      {/* tail */}
      <path
        d="M196 150c22 0 26-24 14-34"
        stroke="var(--primary)"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />
    </svg>
  )
}
