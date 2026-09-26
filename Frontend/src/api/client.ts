import type { AxiosError, AxiosResponse } from "axios"
import axios from "axios"

import type { ApiEnvelope, AppError, Normalized } from "@/types/api"

/**
 * Base URL for all API calls.
 *
 * An empty `VITE_API_URL` is the production value: the Backend serves this bundle
 * itself, so requests are same-origin and relative paths like "/api/cat/" resolve
 * against whatever host the page came from. That removes CORS entirely and means
 * the Render URL never has to be baked into the bundle.
 *
 * `??` only substitutes on null/undefined, so an intentionally empty string is
 * preserved and axios treats it as a relative base. Do not "fix" this back to a
 * hard-coded URL.
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

/**
 * axios' 5s default is far too short for this API, and 60s is still not enough
 * for the AI endpoints. Measured against the running backend:
 *   GET  /api/cat/                    ~50ms
 *   POST /api/cat/recommend           ~80ms
 *   POST /api/ai/ask                  ~6s
 *   POST /api/aiRecommend/recommend   ~110s  (5 breeds, full comparison)
 *   POST /api/mcpTest/                10-110s (first call also starts a subprocess)
 *
 * The AI and MCP ceilings are raised well above those numbers because a free-tier
 * host may need to cold-start first, which adds a minute before any work begins.
 */
export const TIMEOUTS = {
  default: 30_000,
  ai: 300_000,
  mcp: 420_000,
} as const

/**
 * The single axios instance. Everything goes through it.
 *
 * Database routes use `TIMEOUTS.default`. The AI and MCP routes opt into a much
 * longer timeout by passing `{ timeout: TIMEOUTS.ai }` per request, because a
 * single shared value would either kill the advisor mid-generation or leave the
 * fast routes waiting far too long on a hung connection.
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUTS.default,
  headers: { "Content-Type": "application/json" },
})

/**
 * Unifies the two backend envelopes. Components and stores never read
 * `res.data.data` themselves.
 */
export function unwrap<T>(res: AxiosResponse<ApiEnvelope<T>>): Normalized<T> {
  return {
    data: res.data?.data ?? null,
    message: res.data?.message ?? "",
    success: res.data?.success ?? true,
  }
}

/** Same as `unwrap` but throws when the payload is null. */
export function unwrapOrThrow<T>(res: AxiosResponse<ApiEnvelope<T>>): T {
  const { data, message } = unwrap(res)
  if (data === null) {
    throw new Error(message || "The server returned an empty response")
  }
  return data
}

/**
 * Normalizes any thrown value into a displayable string.
 * Handles: our own AppError, the backend's `{ message }` JSON error body,
 * and non-JSON bodies (Express's default HTML error page).
 *
 * These strings are rendered directly in the UI, so they are written for cat owners,
 * not developers. Never leak a URL, HTTP status, or library name here — see AGENT.md §13.
 */
export function toAppError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiEnvelope<unknown>>

    if (err.code === "ECONNABORTED") {
      return { message: "That took too long and we gave up waiting. Please try again.", status: 408 }
    }
    if (!err.response) {
      return { message: "We can't reach kitty_pedia right now. Please check your connection and try again." }
    }

    const body = err.response.data
    const fromBody =
      body && typeof body === "object" && typeof body.message === "string" ? body.message : null

    if (fromBody) return { message: fromBody, status: err.response.status }

    return { message: "Something went wrong on our side. Please try again in a moment.", status: err.response.status }
  }

  if (error instanceof Error) return { message: error.message }
  return { message: "Something went wrong" }
}
