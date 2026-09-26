import { TIMEOUTS, api, unwrapOrThrow } from "@/api/client"
import type { ApiEnvelope } from "@/types/api"
import type { Preferences } from "@/types/cat"

/**
 * POST /api/ai/ask — freeform prompt straight to Gemini.
 * Returns a markdown string, NOT json. Render with react-markdown.
 * Measured at ~6s.
 */
export const askAi = async (prompt: string): Promise<string> => {
  const res = await api.post<ApiEnvelope<string>>(
    "/api/ai/ask",
    { prompt },
    { timeout: TIMEOUTS.ai },
  )
  return unwrapOrThrow(res)
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
  const res = await api.post<ApiEnvelope<string>>(
    "/api/aiRecommend/recommend",
    preferences,
    { timeout: TIMEOUTS.ai },
  )
  return unwrapOrThrow(res)
}
