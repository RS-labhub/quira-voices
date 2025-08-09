"use client"

import { useEffect, useMemo, useState } from "react"
import TweetCard from "./tweet-card"
import type { Tweet } from "@/types/tweet"

export default function TweetWall() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        const res = await fetch("/data/tweets.json", { cache: "no-store" })
        if (!res.ok) throw new Error(`Failed to load tweets.json: ${res.status}`)
        const data: Tweet[] = await res.json()
        if (isMounted) setTweets(data)
      } catch (e: any) {
        if (isMounted) setError(e?.message ?? "Failed to load tweets")
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

  const sorted = useMemo(() => {
    // Keep chronological order but the masonry will create a pleasing staggered gallery
    return [...tweets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [tweets])

  if (error) {
    return (
      <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-200 ring-1 ring-red-500/20">
        {error}
      </div>
    )
  }

  // Masonry columns with min 2 and max 3 posts per row on larger screens
  //  - Mobile: 1 column for readability
  //  - Small/Medium/Large: 2 columns
  //  - XL and up: 3 columns (capped at 3)
  return (
    <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
      {sorted.map((t) => (
        <div key={t.id} className="mb-6 break-inside-avoid">
          <TweetCard tweet={t} />
        </div>
      ))}
    </div>
  )
}
