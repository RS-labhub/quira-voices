"use client"

import Image from "next/image"
import { BadgeCheck, Link2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Tweet, ThreadMessage } from "@/types/tweet"
import { cn } from "@/lib/utils"
import { useMemo, useState } from "react"

const defaultTweet: Tweet = {
  id: "0",
  name: "Anonymous",
  username: "anon",
  avatarUrl: "/default-avatar.png",
  tweet: "Loading…",
  createdAt: new Date().toISOString(),
  verified: false,
  role: "Contributor",
  link: "#",
  tags: [],
  images: [],
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return iso
  }
}

export default function TweetCard({ tweet = defaultTweet }: { tweet?: Tweet }) {
  // Build slides if there's a thread: main tweet becomes slide 0
  const slides = useMemo(() => {
    const first: ThreadMessage = {
      id: `${tweet.id}-main`,
      tweet: tweet.tweet,
      images: tweet.images ?? [],
      createdAt: tweet.createdAt,
    }
    return tweet.thread && tweet.thread.length > 0 ? [first, ...tweet.thread] : [first]
  }, [tweet])

  const [index, setIndex] = useState(0)
  const isThread = slides.length > 1
  const current = slides[index]

  const goLeft = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))
  const goRight = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1))

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-2xl border-0 bg-white/[0.04] p-0 text-white shadow-sm ring-1 ring-white/[0.08] backdrop-blur",
        "transition hover:bg-white/[0.05] hover:shadow-lg hover:ring-white/[0.12]"
      )}
    >
      {/* Gradient frame */}
      <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(38,255,106,0.25),rgba(45,212,191,0.15))] p-[1px]">
        <div className="rounded-[1rem] bg-[#0b0f2a]/60 p-5">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <Image
                src={tweet.avatarUrl || defaultTweet.avatarUrl}
                alt={`Avatar of ${tweet.name}`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full ring-1 ring-white/10 object-cover"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-base font-semibold leading-none break-words">
                    {tweet.name}
                  </span>
                  {tweet.verified && (
                    <BadgeCheck className="h-4 w-4 text-[#26ff6a]" aria-label="Verified" />
                  )}
                </div>
                {/* Username on its own line; no date here */}
                <div className="mt-1 text-sm text-white/65 break-words">@{tweet.username}</div>
                {tweet.role ? <div className="mt-1 text-xs text-white/50">{tweet.role}</div> : null}
              </div>
            </div>
            {tweet.link ? (
              <a
                href={tweet.link}
                target="_blank"
                rel="noreferrer"
                className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/85 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <Link2 className="h-3.5 w-3.5" />
                Open
              </a>
            ) : null}
          </div>

          {/* Content + Thread */}
          <div className="relative">
            {isThread && (
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-white/70">Thread</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 ring-1 ring-white/10">
                  {index + 1}/{slides.length}
                </span>
              </div>
            )}

            <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-white/90">
              {current.tweet}
            </p>

            {current.images && current.images.length > 0 ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {current.images.slice(0, 4).map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-xl ring-1 ring-white/10">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={"Tweet media " + (i + 1)}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}

            {isThread && (
              <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="pointer-events-auto h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20 ring-1 ring-white/20 shadow-md"
                  onClick={goLeft}
                  aria-label="Previous message"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="pointer-events-auto h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20 ring-1 ring-white/20 shadow-md"
                  onClick={goRight}
                  aria-label="Next message"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Footer: tags on the left, date on the right (same line) */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {(tweet.tags ?? []).slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[#26ff6a]/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#aaffc4] ring-1 ring-[#26ff6a]/20"
                >
                  {t}
                </span>
              ))}
            </div>
            <time className="shrink-0 text-xs text-white/55">{formatDate(tweet.createdAt)}</time>
          </div>
        </div>
      </div>
    </Card>
  )
}
