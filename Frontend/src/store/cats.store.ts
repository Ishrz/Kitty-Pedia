import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

import { fetchAllCats, searchCats } from "@/api/cats"
import { toAppError } from "@/api/client"
import type { LoadStatus } from "@/types/api"
import type { Cat } from "@/types/cat"

interface CatsState {
  cats: Cat[]
  query: string
  status: LoadStatus
  error: string | null
  /** Increments on every completed load so pages can react to cache updates. */
  loadedAt: number | null
  loadAll: () => Promise<void>
  search: (term: string) => Promise<void>
  clear: () => void
}

/**
 * Caches the cat collection so navigating detail -> back to browse does not
 * refetch. Actions are thin: call the api module, set status/error, set data.
 * No filtering or transformation happens here.
 */
export const useCatsStore = create<CatsState>()(
  subscribeWithSelector((set) => ({
    cats: [],
    query: "",
    status: "idle",
    error: null,
    loadedAt: null,

    loadAll: async () => {
      set({ status: "loading", error: null })
      try {
        const cats = await fetchAllCats()
        set({ cats, query: "", status: "success", loadedAt: Date.now() })
      } catch (error) {
        set({ status: "error", error: toAppError(error).message })
      }
    },

    search: async (term) => {
      const trimmed = term.trim()
      set({ status: "loading", error: null })
      try {
        const cats = await searchCats(trimmed)
        set({ cats, query: trimmed, status: "success", loadedAt: Date.now() })
      } catch (error) {
        set({ status: "error", error: toAppError(error).message })
      }
    },

    clear: () => set({ cats: [], query: "", status: "idle", error: null, loadedAt: null }),
  })),
)
