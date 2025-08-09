import { Suspense } from "react"
import { Twitter } from 'lucide-react'
import TweetWall from "@/components/tweet-wall"

import { JetBrains_Mono } from 'next/font/google'

const jetBrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'], 
  variable: '--font-jetbrains'
})

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#070a1e] text-white">
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[60vh] w-[60vh] rounded-full bg-[#26ff6a] opacity-[0.08] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[60vh] w-[60vh] rounded-full bg-[#2dd4bf] opacity-[0.06] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(52,64,255,0.15),rgba(7,10,30,0))]" />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 md:py-16">
        <header className="mb-8 md:mb-12">
          {/* Title row with View on X on the right */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="inline-flex items-end gap-2 text-2xl font-semibold tracking-tight md:text-3xl leading-none">
              <img
                src="https://quira.sh/images/quira-logo-white.svg"
                alt="Quira"
                className="h-7 w-auto md:h-8 align-bottom"
              />
              <span className={`${jetBrains.className} pl-2 relative top-[1px]`}>Voices</span>
            </h1>

            <a
              href="https://x.com/quira_sh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/15 transition hover:bg-white/10"
            >
              <Twitter className="h-4 w-4" />
              View on X
            </a>
          </div>

          {/* Proper spacing between title and slogan */}
          <p className="mt-3 text-sm text-white/70 md:mt-4">
            A wall of messages from the Quira community.
          </p>
        </header>

        <Suspense fallback={<div className="text-white/70">Loading messages…</div>}>
          <TweetWall />
        </Suspense>
      </section>
    </main>
  )
}
