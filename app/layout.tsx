import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quira Voices',
  description: 'A wall of messages from the Quira community.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Quira Voices',
    siteName: 'quira-voices',
    url: 'https://quira-voices.vercel.app/',
    description:
      'A wall of messages from the Quira community.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quira Voices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quira Voices',
    description:
      'A wall of messages from the Quira community.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
