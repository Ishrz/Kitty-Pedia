import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

import { aiRecommend, askAi } from "@/api/ai"
import { toAppError } from "@/api/client"
import { mcpRecommend } from "@/api/mcp"
import type { Engine, LoadStatus, Message } from "@/types/api"
import type { Preferences } from "@/types/cat"

interface AiAdvisorState {
  messages: Message[]
  engine: Engine
  status: LoadStatus
  error: string | null
  setEngine: (engine: Engine) => void
  /** POST /api/ai/ask */
  ask: (prompt: string) => Promise<void>
  /** POST /api/aiRecommend/recommend or /api/mcpTest/ depending on `engine` */
  recommend: (preferences: Preferences) => Promise<void>
  clear: () => void
}

let messageId = 0
const nextId = () => `msg-${++messageId}`

export const useAiAdvisorStore = create<AiAdvisorState>()(
  subscribeWithSelector((set, get) => ({
    messages: [],
    engine: "ai",
    status: "idle",
    error: null,

    setEngine: (engine) => set({ engine }),

    ask: async (prompt) => {
      const trimmed = prompt.trim()
      if (!trimmed) return

      const { engine } = get()
      set((s) => ({
        status: "loading",
        error: null,
        messages: [...s.messages, { id: nextId(), role: "user", content: trimmed }],
      }))

      try {
        const content = await askAi(trimmed)
        set((s) => ({
          status: "success",
          messages: [...s.messages, { id: nextId(), role: "assistant", content, engine }],
        }))
      } catch (error) {
        set({ status: "error", error: toAppError(error).message })
      }
    },

    recommend: async (preferences) => {
      const { engine } = get()
      const label = `${preferences.isKidsFriendly ? "Kid friendly" : "Not for kids"}, ${
        preferences.isAppartmentFriendly ? "good in an apartment" : "needs plenty of space"
      }`

      set((s) => ({
        status: "loading",
        error: null,
        messages: [
          ...s.messages,
          { id: nextId(), role: "user", content: `Recommend a cat breed — ${label}`, engine },
        ],
      }))

      try {
        const content = engine === "mcp" ? await mcpRecommend(preferences) : await aiRecommend(preferences)
        set((s) => ({
          status: "success",
          messages: [...s.messages, { id: nextId(), role: "assistant", content, engine }],
        }))
      } catch (error) {
        set({ status: "error", error: toAppError(error).message })
      }
    },

    clear: () => set({ messages: [], status: "idle", error: null }),
  })),
)
