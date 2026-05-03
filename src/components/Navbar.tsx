'use client'

import { useUser } from '@clerk/nextjs'
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return (
    <header className="flex justify-between items-center px-4 md:px-8 h-16 border-b bg-white sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white text-xs font-black">P</div>
        <span className="font-black text-sm md:text-base text-gray-900">Portfolio SaaS</span>
      </Link>
    </header>
  )

  return (
    <header className="flex justify-between items-center px-4 md:px-8 h-16 border-b bg-white sticky top-0 z-50">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white text-xs font-black">
          P
        </div>
        <span className="font-black text-sm md:text-base text-gray-900">
          Portfolio SaaS
        </span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-3">
        <Link
          href="/pricing"
          className="text-xs md:text-sm text-gray-500 hover:text-black transition-colors hidden sm:block font-medium"
        >
          Pricing
        </Link>

        {!isSignedIn ? (
          <>
            <SignInButton mode="modal">
              <button className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-700 hover:text-black border border-gray-200 hover:border-gray-400 px-3 md:px-4 py-2 rounded-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="flex items-center gap-1.5 text-xs md:text-sm font-black text-white bg-black hover:bg-gray-800 px-3 md:px-4 py-2 rounded-xl transition-all shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Sign Up
              </button>
            </SignUpButton>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-700 hover:text-black border border-gray-200 hover:border-gray-400 px-3 md:px-4 py-2 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
              </svg>
              Dashboard
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-9 h-9 rounded-xl',
                },
              }}
            />
          </>
        )}
      </div>
    </header>
  )
}