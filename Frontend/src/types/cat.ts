/**
 * Mirrors Backend/src/types/cat.types.ts exactly.
 * `isAppartmentFriendly` is misspelled in the backend schema, types, controllers
 * and stored documents. Do not "fix" it here.
 */
export interface Cat {
  _id: string
  name: string
  color: string
  breed: string
  description: string
  energyLevel: string
  image: string
  lifeSpan: number
  isAppartmentFriendly: boolean
  isKidsFriendly: boolean
  createdAt: string
  updatedAt: string
  __v?: number
}

/** Body for POST /api/cat/create */
export type CatInput = Omit<Cat, "_id" | "createdAt" | "updatedAt" | "__v">

/** Body for POST /api/cat/recommend, /api/aiRecommend/recommend and /api/mcpTest/ */
export interface Preferences {
  isKidsFriendly: boolean
  isAppartmentFriendly: boolean
}
