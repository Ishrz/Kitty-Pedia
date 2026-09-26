import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

import type { Preferences } from "@/types/cat"

interface FiltersState extends Preferences {
  setKidsFriendly: (value: boolean) => void
  setApartmentFriendly: (value: boolean) => void
  setPreferences: (value: Preferences) => void
  toggleKidsFriendly: () => void
  toggleApartmentFriendly: () => void
  reset: () => void
}

const defaults: Preferences = {
  isKidsFriendly: true,
  isAppartmentFriendly: true,
}

/** Shared by the Recommend page and the AI Advisor. */
export const useFiltersStore = create<FiltersState>()(
  subscribeWithSelector((set) => ({
    ...defaults,
    setKidsFriendly: (isKidsFriendly) => set({ isKidsFriendly }),
    setApartmentFriendly: (isAppartmentFriendly) => set({ isAppartmentFriendly }),
    setPreferences: (preferences) => set(preferences),
    toggleKidsFriendly: () => set((s) => ({ isKidsFriendly: !s.isKidsFriendly })),
    toggleApartmentFriendly: () => set((s) => ({ isAppartmentFriendly: !s.isAppartmentFriendly })),
    reset: () => set({ ...defaults }),
  })),
)

/** Non-reactive read, for use inside other modules. */
export const selectPreferences = (s: FiltersState): Preferences => ({
  isKidsFriendly: s.isKidsFriendly,
  isAppartmentFriendly: s.isAppartmentFriendly,
})
