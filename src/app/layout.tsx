import type { Metadata } from 'next'
import { ClerkProvider, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Portfolio SaaS',
    template: '%s | Portfolio SaaS',
  },
  description: 'Create a beautiful portfolio website in minutes. Pick a template, fill your details, go live.',
  keywords: ['portfolio', 'website builder', 'student portfolio', 'fresher portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center px-4 md:px-8 h-16 border-b bg-white">
  <Link href="/" className="font-black text-sm md:text-base">
    Portfolio SaaS
  </Link>
  <div className="flex items-center gap-2 md:gap-4">
    <Link href="/pricing" className="text-xs md:text-sm text-gray-600 hover:text-black hidden sm:block">
      Pricing
    </Link>
    <SignInButton />
    <SignUpButton />
    <UserButton />
  </div>
</header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}