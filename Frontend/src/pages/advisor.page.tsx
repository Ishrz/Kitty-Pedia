import { Loader2, Send, Sparkles, Trash2, Wand2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { MarkdownResponse } from "@/components/advisor/MarkdownResponse"
import { PreferenceForm } from "@/components/advisor/PreferenceForm"
import { StateMessage } from "@/components/common/StateMessage"
import { BackLink } from "@/components/common/BackLink"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useAiAdvisorStore } from "@/store/aiAdvisor.store"
import { useFiltersStore } from "@/store/filters.store"
import { cn } from "@/lib/utils"

/** Labels are user-facing; the underlying ids stay "ai" | "mcp". */
const ENGINES = [
  {
    id: "ai" as const,
    label: "AI Advisor",
    hint: "Quick and knowledgeable. Good for one-off questions.",
    icon: Sparkles,
  },
  {
    id: "mcp" as const,
    label: "Advanced AI",
    hint: "Looks up our breed records first, then writes a detailed comparison. Takes longer.",
    icon: Wand2,
  },
]

const ENGINE_BADGE: Record<"ai" | "mcp", string> = {
  ai: "AI Advisor",
  mcp: "Advanced AI",
}

const SUGGESTIONS = [
  "Which cat is best for a small flat?",
  "Do any cats like children?",
  "Which breed sheds the least?",
  "Tell me about the Ragdoll",
] as const

export default function AdvisorPage() {
  const [prompt, setPrompt] = useState("")

  const messages = useAiAdvisorStore((s) => s.messages)
  const engine = useAiAdvisorStore((s) => s.engine)
  const status = useAiAdvisorStore((s) => s.status)
  const error = useAiAdvisorStore((s) => s.error)
  const setEngine = useAiAdvisorStore((s) => s.setEngine)
  const ask = useAiAdvisorStore((s) => s.ask)
  const recommend = useAiAdvisorStore((s) => s.recommend)
  const clear = useAiAdvisorStore((s) => s.clear)

  const isKidsFriendly = useFiltersStore((s) => s.isKidsFriendly)
  const isAppartmentFriendly = useFiltersStore((s) => s.isAppartmentFriendly)

  const isLoading = status === "loading"
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages.length, status])

  async function handleRecommend() {
    await recommend({ isKidsFriendly, isAppartmentFriendly })
  }

  function handleAsk(event: React.FormEvent) {
    event.preventDefault()
    void submitPrompt()
  }

  function submitPrompt(text: string = prompt) {
    if (!text.trim()) return
    void ask(text)
    setPrompt("")
  }

  const activeEngine = ENGINES.find((e) => e.id === engine) ?? ENGINES[0]

  return (
    <div className="flex flex-col gap-6">
      <BackLink to="/browse" label="Back to browse" />

      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Ask our AI advisor</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">
          Not sure which breed suits you? Set your home details below for a full comparison, or ask
          any question in your own words. The AI writes a detailed answer, so give it a minute or two.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-5">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">Choose an advisor</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {ENGINES.map(({ id, label, hint, icon: Icon }) => (
                <label
                  key={id}
                  className={cn(
                    "flex cursor-pointer items-start gap-2.5 rounded-lg border px-3.5 py-3 transition-colors",
                    "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring",
                    engine === id ? "border-primary bg-accent/50" : "border-border/70 hover:bg-accent/30",
                  )}
                >
                  <input
                    type="radio"
                    name="engine"
                    value={id}
                    checked={engine === id}
                    onChange={() => setEngine(id)}
                    disabled={isLoading}
                    className="sr-only"
                  />
                  <Icon
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      engine === id ? "text-primary" : "text-muted-foreground",
                    )}
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="block text-xs text-muted-foreground">{hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-3 border-t pt-5">
            <PreferenceForm disabled={isLoading} />
            <Button onClick={() => void handleRecommend()} disabled={isLoading} className="w-fit">
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Sparkles className="size-4" aria-hidden="true" />
              )}
              {isLoading ? "Writing your comparison…" : "Recommend a breed for me"}
            </Button>
            <p className="text-xs text-muted-foreground">
              You picked <strong className="font-medium text-foreground">
                {isKidsFriendly ? "kid friendly" : "not for kids"}
              </strong>{" "}
              and{" "}
              <strong className="font-medium text-foreground">
                {isAppartmentFriendly ? "apartment friendly" : "needs more space"}
              </strong>
              . Change the switches above any time.
            </p>
          </div>
        </CardContent>
      </Card>

      {messages.length > 0 ? (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={clear} disabled={isLoading}>
            <Trash2 className="size-3.5" aria-hidden="true" />
            Start again
          </Button>
        </div>
      ) : null}

      {status === "error" && error ? (
        <StateMessage
          icon="error"
          title="We couldn't get an answer just then"
          description={`${error} The AI can be slow when it's busy — try again in a moment.`}
        />
      ) : null}

      {messages.length === 0 && status !== "error" ? (
        <div className="flex flex-col gap-4">
          <StateMessage
            title="Ask me anything about cats"
            description="Try one of these, or ask your own question below."
          />
          <div className="flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                disabled={isLoading}
                onClick={() => submitPrompt(suggestion)}
                className="rounded-full"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((message) =>
            message.role === "user" ? (
              <div key={message.id} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                  {message.content}
                </p>
              </div>
            ) : (
              <Card key={message.id} className="bg-card">
                <CardContent className="pt-6">
                  {message.engine ? (
                    <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {ENGINE_BADGE[message.engine]}
                    </p>
                  ) : null}
                  <MarkdownResponse content={message.content} />
                </CardContent>
              </Card>
            ),
          )}

          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {engine === "mcp"
                ? "Advanced AI is checking our breed records and writing a comparison — this can take a couple of minutes."
                : "Thinking about your question…"}
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>
      )}

      <form
        onSubmit={handleAsk}
        className="sticky bottom-0 flex flex-col gap-2 border-t border-border/70 bg-background/90 pt-3 pb-1 backdrop-blur"
      >
        <label htmlFor="advisor-prompt" className="sr-only">
          Ask the advisor a question
        </label>
        <div className="flex items-end gap-2">
          <Textarea
            id="advisor-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask about any cat or breed…"
            rows={2}
            disabled={isLoading}
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                submitPrompt()
              }
            }}
          />
          <Button
            type="submit"
            size="icon-lg"
            disabled={isLoading || !prompt.trim()}
            aria-label="Send question"
          >
            <Send className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Asking the {activeEngine.label} · press Enter to send
        </p>
      </form>
    </div>
  )
}
