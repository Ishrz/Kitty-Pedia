import { ArrowRight, BookOpen, Bot, Clock, Filter, Heart, Home, Search, Sparkles, Sun, Zap } from "lucide-react"
import { Link } from "react-router-dom"

import { CatHeroArt } from "@/components/layout/CatHeroArt"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const FEATURES = [
  {
    icon: BookOpen,
    title: "Browse every breed",
    description:
      "Ten cat breeds, each with a photo, a description, how much energy it needs, and how long it usually lives.",
  },
  {
    icon: Search,
    title: "Search in a flash",
    description: "Start typing a breed or a name and the list updates as you go. No waiting, no searching button.",
  },
  {
    icon: Filter,
    title: "Match it to your home",
    description:
      "Tell us whether you have kids and whether you live in an apartment, and we'll only show cats that fit.",
  },
  {
    icon: Bot,
    title: "Ask our AI advisor",
    description:
      "Got a question about cats? Ask it in your own words and get a clear, easy-to-read answer.",
  },
  {
    icon: Sparkles,
    title: "Get a side-by-side comparison",
    description:
      "Not sure which one? Get the five best breeds for your situation, compared on the things that actually matter.",
  },
  {
    icon: Clock,
    title: "Answers take a moment",
    description:
      "Our AI reads and writes a full comparison, so give it a minute or two. Small questions come back much faster.",
  },
] as const

const STEPS = [
  {
    step: "01",
    title: "Have a browse",
    body: "Scroll through the breeds and see which ones catch your eye. Every card shows the essentials at a glance.",
  },
  {
    step: "02",
    title: "Read the details",
    body: "Open a breed to see its personality, energy level, lifespan, and whether it suits your home.",
  },
  {
    step: "03",
    title: "Narrow it down",
    body: "Set your filters and we'll show only the cats that genuinely fit your lifestyle.",
  },
  {
    step: "04",
    title: "Ask anything else",
    body: "Still unsure? Ask the AI advisor anything — it will happily talk you through the trade-offs.",
  },
] as const

/** Real guidance, so the page is worth reading even without clicking anything. */
const TIPS = [
  {
    icon: Zap,
    title: "Energy level is the big one",
    body: "A high-energy breed will keep you entertained, but it needs space, play and attention every day. A calm breed is happier in a quieter home. This is the single biggest mistake people make.",
  },
  {
    icon: Home,
    title: "Small spaces suit calm cats",
    body: "Most cats are fine in an apartment as long as they have vertical space to climb, a sunny window, and something to hunt. A flat, quiet home and a busy, open house suit very different cats.",
  },
  {
    icon: Sun,
    title: "Grooming is a commitment",
    body: "Long-haired breeds need brushing several times a week, every week, for their whole life. Short-haired cats are far easier. If you dislike fur on your sofa, choose short-haired.",
  },
  {
    icon: Heart,
    title: "Match it to your family",
    body: "Kid-friendly breeds are typically calmer, more patient and more tolerant of noise and handling. Every cat is an individual, but starting from the right breed gives you a much easier first few months.",
  },
] as const

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-8 sm:gap-20">
      {/* Hero */}
      <section className="grid items-center gap-10 pt-6 lg:grid-cols-[1.15fr_1fr] lg:pt-12">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-accent/50 px-3 py-1 text-xs font-medium text-accent-foreground">
            <Heart className="size-3" aria-hidden="true" />
            Ten breeds, ready to explore
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find the cat
            <span className="text-primary"> that fits your life.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            Whether you're in a small flat with no room to spare, or a busy family home with
            children running around, there is a breed that suits you. Browse them, compare them, and
            ask our AI advisor anything you're still unsure about.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/browse">
                Browse cats
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to="/advisor">Ask the AI advisor</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CatHeroArt className="max-w-xs sm:max-w-sm" />
        </div>
      </section>

      {/* What you can do */}
      <section className="flex flex-col gap-6" aria-labelledby="features-heading">
        <div className="space-y-1.5">
          <h2 id="features-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
            What you can do here
          </h2>
          <p className="max-w-2xl text-sm text-pretty text-muted-foreground">
            Everything below works straight away — no sign-up, no payment, no forms to fill in.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Card className="h-full border-border/70 transition-colors hover:border-primary/40">
                <CardContent className="flex flex-col gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="flex flex-col gap-6" aria-labelledby="steps-heading">
        <div className="space-y-1.5">
          <h2 id="steps-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <p className="text-sm text-muted-foreground">Four steps, about two minutes.</p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ step, title, body }) => (
            <li key={step}>
              <Card className="h-full bg-muted/40">
                <CardContent className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-widest text-primary">{step}</span>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* Choosing well — real guidance instead of architecture diagrams */}
      <section className="flex flex-col gap-6" aria-labelledby="tips-heading">
        <div className="space-y-1.5">
          <h2 id="tips-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Getting it right
          </h2>
          <p className="max-w-2xl text-sm text-pretty text-muted-foreground">
            A few things worth knowing before you choose. Getting these right is the difference
            between a happy cat and a stressed one.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {TIPS.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Card className="h-full border-border/70">
                <CardContent className="flex flex-col gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing CTA */}
      <section className="rounded-2xl border border-border/70 bg-gradient-to-br from-accent/50 to-muted px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          Ready to meet the cats?
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-pretty text-muted-foreground">
          From the Russian Blue to the Bengal, ten breeds are waiting to be explored.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/browse">
              Browse cats
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link to="/recommend">Match to my home</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
