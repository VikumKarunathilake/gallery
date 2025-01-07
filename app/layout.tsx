import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Generated Art Gallery',
  description: 'Explore a curated collection of breathtaking images generated with cutting-edge Flux AI technology. From abstract designs to realistic landscapes, each piece is a unique creation powered by artificial intelligence. Browse through our gallery to discover the future of digital art.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
