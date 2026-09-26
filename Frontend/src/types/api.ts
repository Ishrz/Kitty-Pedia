/**
 * The backend uses two different response envelopes:
 *  - cat routes  -> { message, data }            (no `success`)
 *  - ai/mcp      -> { message, success, data }
 * `ApiEnvelope` tolerates both. `unwrap` is the single place they are unified.
 */
export interface ApiEnvelope<T> {
  message?: string
  success?: boolean
  data?: T
}

export interface Normalized<T> {
  data: T | null
  message: string
  success: boolean
}

/** Error surfaced to the UI, always a plain string. */
export interface AppError {
  message: string
  status?: number
}

/** Discriminated status used by every store and data-driven page. */
export type LoadStatus = "idle" | "loading" | "success" | "error"

/** Which engine produced an advisor response. */
export type Engine = "ai" | "mcp"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  engine?: Engine
}
