import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import { PageShell } from "@/components/layout/PageShell"
import { Skeleton } from "@/components/ui/skeleton"
import BrowsePage from "@/pages/browse.page"
import CatDetailPage from "@/pages/cat-detail.page"
import HomePage from "@/pages/home.page"
import NotFoundPage from "@/pages/not-found.page"
import RecommendPage from "@/pages/recommend.page"

/**
 * react-markdown + remark-gfm are only needed on /advisor, and together they
 * are the bulk of the bundle. Splitting them keeps the initial payload small
 * for the home, browse and detail routes.
 */
const AdvisorPage = lazy(() => import("@/pages/advisor.page"))

function RouteFallback() {
  return (
    <div className="flex flex-col gap-6" role="status" aria-label="Loading page">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
      <Skeleton className="h-56 w-full rounded-xl" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<PageShell />}>
        <Route index element={<HomePage />} />
        <Route path="browse" element={<BrowsePage />} />
        <Route path="cats/:id" element={<CatDetailPage />} />
        <Route path="recommend" element={<RecommendPage />} />
        <Route
          path="advisor"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AdvisorPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
