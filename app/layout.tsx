import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yugyeong Na Blog',
  description: 'Dynamic chatbot interface with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-C68B9SJWCZ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C68B9SJWCZ');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}