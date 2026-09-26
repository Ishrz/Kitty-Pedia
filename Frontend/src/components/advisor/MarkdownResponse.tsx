import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"

interface MarkdownResponseProps {
  content: string
  className?: string
}

/**
 * Renders the markdown strings returned by /api/ai/ask,
 * /api/aiRecommend/recommend and /api/mcpTest/.
 *
 * AI output is untrusted, so this never touches dangerouslySetInnerHTML —
 * react-markdown builds React elements and does not execute raw HTML.
 */
export function MarkdownResponse({ content, className }: MarkdownResponseProps) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none dark:prose-invert",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-h1:text-xl prose-h2:text-lg prose-h3:text-base",
        "prose-a:text-primary",
        className,
      )}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  )
}
