import { api, unwrapOrThrow } from "@/api/client"
import type { ApiEnvelope } from "@/types/api"
import type { Cat, CatInput, Preferences } from "@/types/cat"

/** GET /api/cat/ — the backend responds `{ message, data: Cat[] }` */
export const fetchAllCats = async (): Promise<Cat[]> => {
  const res = await api.get<ApiEnvelope<Cat[]>>("/api/cat/")
  console.log(res)
  return unwrapOrThrow(res)
}

/**
 * GET /api/cat/search?q= — case-insensitive regex over `name` and `breed` only.
 * It does NOT search `description`. An empty `q` matches everything, but the
 * Browse page resets to `fetchAllCats` instead of relying on that.
 */
export const searchCats = async (q: string): Promise<Cat[]> => {
  const res = await api.get<ApiEnvelope<Cat[]>>("/api/cat/search", { params: { q } })
  return unwrapOrThrow(res)
}

/**
 * GET /api/cat/:id
 * The backend returns HTTP 200 with `data: null` for an unknown id, and a 500
 * for a malformed id (Mongoose throws inside findById). Callers must treat both
 * a null result and a thrown error as "not found".
 */
export const fetchCatById = async (id: string): Promise<Cat | null> => {
  const res = await api.get<ApiEnvelope<Cat | null>>(`/api/cat/${encodeURIComponent(id)}`)
  return res.data?.data ?? null
}

/** POST /api/cat/recommend — both booleans must be sent explicitly, never omitted. */
export const recommendCats = async (preferences: Preferences): Promise<Cat[]> => {
  const res = await api.post<ApiEnvelope<Cat[]>>("/api/cat/recommend", preferences)
  return unwrapOrThrow(res)
}

/** POST /api/cat/create */
export const createCat = async (input: CatInput): Promise<Cat> => {
  const res = await api.post<ApiEnvelope<Cat>>("/api/cat/create", input)
  return unwrapOrThrow(res)
}
