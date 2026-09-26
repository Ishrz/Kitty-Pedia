import { Link } from "react-router-dom"

import { StateMessage } from "@/components/common/StateMessage"
import { BackLink } from "@/components/common/BackLink"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <p className="text-6xl font-bold tracking-tight text-primary">404</p>
      <StateMessage
        title="We couldn't find that page"
        description="The link may be out of date, or the page may have moved. Try browsing the cats instead."
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/browse">Browse cats</Link>
        </Button>
        <BackLink to="/" label="Back to home" className="sm:-ml-0" />
      </div>
    </div>
  )
}
