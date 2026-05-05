import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''

  const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'

  const isSubdomain =
    hostname !== mainDomain &&
    hostname !== `www.${mainDomain}` &&
    !hostname.includes('vercel.app')

  if (isSubdomain) {
    const username = hostname.split('.')[0]
    return NextResponse.rewrite(new URL(`/${username}`, req.url))
  }

  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}