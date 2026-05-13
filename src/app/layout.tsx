import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Shahood Saleem | Industrial & Manufacturing Engineer',
  description:
    'Portfolio of Shahood Saleem — Industrial & Manufacturing Engineer based in Karachi, Pakistan. Specializing in manufacturing systems, plant engineering, and product development.',
  keywords: [
    'Shahood Saleem',
    'Industrial Engineer',
    'Manufacturing Engineer',
    'Karachi Pakistan',
    'NED University',
    'Portfolio',
  ],
  authors: [{ name: 'Shahood Saleem' }],
  openGraph: {
    title: 'Shahood Saleem | Industrial & Manufacturing Engineer',
    description:
      'Portfolio of Shahood Saleem — Industrial & Manufacturing Engineer based in Karachi, Pakistan.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahood Saleem | Industrial & Manufacturing Engineer',
    description:
      'Portfolio of Shahood Saleem — Industrial & Manufacturing Engineer based in Karachi, Pakistan.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
