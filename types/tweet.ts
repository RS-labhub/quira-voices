export type ThreadMessage = {
  id: string
  tweet: string
  images?: string[]
  createdAt: string // ISO
}

export type Tweet = {
  id: string
  name: string
  username: string
  avatarUrl: string
  tweet: string
  createdAt: string // ISO string
  verified?: boolean
  role?: string
  link?: string
  tags?: string[]
  images?: string[]
  // Optional thread; if present, the card will render a carousel that includes the main tweet as slide 1.
  thread?: ThreadMessage[]
  // reactions are kept optional in case you ever want them again, but the UI does not render them.
  reactions?: {
    likes: number
    reposts: number
    replies: number
  }
}
