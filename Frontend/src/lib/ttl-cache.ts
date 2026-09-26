/**
 * Small in-memory TTL cache for slow, deterministic-by-request AI responses.
 *
 * The advisor endpoints take 10-110s each and consume real Gemini quota. On a
 * free-tier host, a user who switches preferences back and forth — or simply
 * refreshes — would otherwise pay the full cost every time. These responses only
 * depend on the request body, so repeating a request can safely reuse the answer.
 *
 * Scope and trade-offs:
 *  - Per-tab, in memory. Cleared on reload, which is the desired behaviour: a
 *    visitor should get fresh answers on a new visit, not a stale cache from a
 *    previous session.
 *  - Bounded entry count, so it cannot grow without limit.
 *  - De-duplicates concurrent identical requests, so two components asking the
 *    same question at once produce one call rather than two.
 */
export class TtlCache {
  private readonly store = new Map<string, { value: unknown; expiresAt: number }>()
  private readonly inFlight = new Map<string, Promise<unknown>>()
  private readonly ttlMs: number
  private readonly maxEntries: number

  // `erasableSyntaxOnly` is enabled in tsconfig, so TypeScript parameter
  // properties are not allowed. Fields are declared explicitly and assigned here.
  constructor(ttlMs: number, maxEntries = 50) {
    this.ttlMs = ttlMs
    this.maxEntries = maxEntries
  }

  /**
   * Returns the cached value for `key`, or calls `produce` to create it.
   * Concurrent calls for the same key share a single in-flight promise.
   */
  async resolve<T>(key: string, produce: () => Promise<T>): Promise<T> {
    const hit = this.store.get(key);

    if (hit && hit.expiresAt > Date.now()) {
      // Refresh insertion order so the least recently used entry is evicted first.
      this.store.delete(key)
      this.store.set(key, hit)
      return hit.value as T
    }

    if (hit) this.store.delete(key)

    const existing = this.inFlight.get(key)
    if (existing) return existing as Promise<T>

    const pending = produce()
      .then((value) => {
        this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs })
        this.evictIfFull()
        return value
      })
      .finally(() => {
        this.inFlight.delete(key)
      })

    this.inFlight.set(key, pending)
    return pending
  }

  /** Keeps memory bounded by dropping expired entries, then the oldest ones. */
  private evictIfFull(): void {
    const now = Date.now()

    for (const [key, entry] of this.store) {
      if (entry.expiresAt <= now) this.store.delete(key)
    }

    // Map preserves insertion order, so the first key is the least recently used.
    while (this.store.size > this.maxEntries) {
      const oldest = this.store.keys().next()
      if (oldest.done) break
      this.store.delete(oldest.value)
    }
  }

  clear(): void {
    this.store.clear()
    this.inFlight.clear()
  }
}

/** Ten minutes: long enough to make exploring pleasant, short enough to feel live. */
export const AI_CACHE_TTL_MS = 10 * 60 * 1000

/**
 * Key builder for the recommendation endpoints. Preferences are sorted into a
 * fixed order so `{a,b}` and `{b,a}` share one entry.
 */
export const preferencesKey = (prefix: string, p: {
  isKidsFriendly: boolean
  isAppartmentFriendly: boolean
}): string => `${prefix}:${p.isKidsFriendly ? "kids" : "nokids"}:${p.isAppartmentFriendly ? "apt" : "noapt"}`
