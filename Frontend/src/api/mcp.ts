import { TIMEOUTS, api, unwrapOrThrow } from "@/api/client"
import { AI_CACHE_TTL_MS, TtlCache, preferencesKey } from "@/lib/ttl-cache"
import type { ApiEnvelope } from "@/types/api"
import type { Preferences } from "@/types/cat"

/**
 * Cached for the same reason as the AI endpoints: this path takes 10-110s and
 * depends only on the two preference flags, so repeating it can reuse the answer.
 */
const cache = new TtlCache(AI_CACHE_TTL_MS)

/**
 * POST /api/mcpTest/ — the full tool-calling path:
 * the Backend calls the MCP server's `recommend_cats` tool over stdio, that tool
 * calls back into `/api/cat/recommend`, and the result is fed to Gemini.
 *
 * Slow, so it gets the longest timeout and the UI must disable the submit button
 * while it is in flight.
 */
export const mcpRecommend = async (preferences: Preferences): Promise<string> => {
  return cache.resolve(preferencesKey("mcp", preferences), async () => {
    const res = await api.post<ApiEnvelope<string>>(
      "/api/mcpTest/",
      preferences,
      { timeout: TIMEOUTS.mcp },
    )
    return unwrapOrThrow(res)
  })
}
