import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OnboardingClient from '@/components/OnboardingClient'

export default async function OnboardingPage() {
  const { userId } = await auth()
  if (!userId) redirect('/')

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { portfolio: true },
  })

  if (user?.portfolio) redirect('/dashboard')

  return <OnboardingClient />
}