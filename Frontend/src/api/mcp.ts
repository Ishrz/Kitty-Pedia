import { TIMEOUTS, api, unwrapOrThrow } from "@/api/client"
import type { ApiEnvelope } from "@/types/api"
import type { Preferences } from "@/types/cat"

/**
 * POST /api/mcpTest/ — the full tool-calling path:
 * Backend spawns the MCP server over stdio (`npx tsx ../MCP_Server/src/index.ts`),
 * calls its `recommend_cats` tool, which calls back into `/api/cat/recommend`,
 * then feeds the result to Gemini.
 *
 * Slow and spawns a subprocess, so it gets the longest timeout and the UI must
 * disable the submit button while it is in flight. Requires the backend's CWD
 * to be `Backend/`.
 */
export const mcpRecommend = async (preferences: Preferences): Promise<string> => {
  const res = await api.post<ApiEnvelope<string>>(
    "/api/mcpTest/",
    preferences,
    { timeout: TIMEOUTS.mcp },
  )
  return unwrapOrThrow(res)
}
