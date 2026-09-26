import { TIMEOUTS, api, unwrapOrThrow } from "@/api/client"
import { AI_CACHE_TTL_MS, TtlCache, preferencesKey } from "@/lib/ttl-cache"
import type { ApiEnvelope } from "@/types/api"
import type { Preferences } from "@/types/cat"

/**
 * Caches the two slow advisor responses in memory for 10 minutes.
 *
 * These calls take 10-110s and consume Gemini quota, and the answer depends only
 * on the request body. Re-visiting a preference combination — or switching back
 * to one already explored — is instant instead of a fresh wait. See
 * `lib/ttl-cache.ts` for the scope and trade-offs of this cache.
 */
const cache = new TtlCache(AI_CACHE_TTL_MS)

/**
 * POST /api/ai/ask — freeform prompt straight to Gemini.
 * Returns a markdown string, NOT json. Render with react-markdown.
 * Measured at ~6s.
 */
export const askAi = async (prompt: string): Promise<string> => {
  const key = `ask:${prompt.trim().toLowerCase()}`

  return cache.resolve(key, async () => {
    const res = await api.post<ApiEnvelope<string>>(
      "/api/ai/ask",
      { prompt },
      { timeout: TIMEOUTS.ai },
    )
    return unwrapOrThrow(res)
  })
}

/**
 * POST /api/aiRecommend/recommend — Gemini compares the top 5 breeds for the
 * given preferences and returns markdown with `## N. Breed Name`,
 * `Match Score: XX/100`, `### Pros`, `### Cons`, `### Key Characteristics`
 * and a `# Final Recommendation`.
 *
 * Measured at ~110s, which is why this needs the long timeout.
 */
export const aiRecommend = async (preferences: Preferences): Promise<string> => {
  return cache.resolve(preferencesKey("airec", preferences), async () => {
    const res = await api.post<ApiEnvelope<string>>(
      "/api/aiRecommend/recommend",
      preferences,
      { timeout: TIMEOUTS.ai },
    )
    return unwrapOrThrow(res)
  })
}
