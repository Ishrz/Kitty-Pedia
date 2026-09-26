import { useState } from "react"

import { getPalette } from "@/lib/cat-colors"
import { cn } from "@/lib/utils"

interface CatImageProps {
  src: string
  alt: string
  /** Used to tint the placeholder, e.g. "Seal Point". */
  color?: string
  className?: string
  /** Rendered inside the placeholder under the silhouette. */
  caption?: string
}

/**
 * Every `image` in the database currently points at
 * `https://example.com/images/<slug>.jpg`, which returns 404. So the fallback
 * is the default rendering path, not an edge case — this component exists to
 * guarantee no broken-image icon ever reaches the user.
 */
export function CatImage({ src, alt, color, className, caption }: CatImageProps) {
  const [failed, setFailed] = useState(false)
  const palette = getPalette(color)

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-gradient-to-br",
          palette.surface,
          className,
        )}
      >
        <CatSilhouette className={cn("h-1/3 w-1/3 min-h-10 min-w-10", palette.ink)} />
        {caption ? (
          <span className={cn("px-3 text-center text-xs font-medium", palette.ink)}>{caption}</span>
        ) : null}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  )
}

function CatSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 22 8 8l12 7a30 30 0 0 1 24 0l12-7-4 14a22 22 0 0 1 4 12c0 8-9 12-22 12S8 42 8 34a22 22 0 0 1 4-12Z" />
    </svg>
  )
}
