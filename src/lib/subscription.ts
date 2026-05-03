import { prisma } from '@/lib/prisma'

export async function getUserSubscriptionStatus(clerkId: string): Promise<{
  plan: string
  isActive: boolean
  daysRemaining: number | null
  isTrialExpired: boolean
}> {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: {
      subscription: true,
      portfolio: true,
    },
  })

  if (!user) {
    return { plan: 'trial', isActive: false, daysRemaining: null, isTrialExpired: false }
  }

  // If user has active paid subscription
  if (user.subscription?.plan === 'pro' && user.subscription?.status === 'active') {
    const expiresAt = user.subscription.expiresAt
    if (expiresAt && expiresAt > new Date()) {
      const daysRemaining = Math.ceil((expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      return { plan: 'pro', isActive: true, daysRemaining, isTrialExpired: false }
    }
    if (!expiresAt) {
      return { plan: 'pro', isActive: true, daysRemaining: null, isTrialExpired: false }
    }
  }

  // Check trial period from portfolio creation
  if (user.portfolio) {
    const createdAt = user.portfolio.createdAt
    const trialEndDate = new Date(createdAt.getTime() + 10 * 24 * 60 * 60 * 1000)
    const now = new Date()

    if (now < trialEndDate) {
      const daysRemaining = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return { plan: 'trial', isActive: true, daysRemaining, isTrialExpired: false }
    } else {
      return { plan: 'trial', isActive: false, daysRemaining: 0, isTrialExpired: true }
    }
  }

  return { plan: 'trial', isActive: true, daysRemaining: 10, isTrialExpired: false }
}

export async function getUserPlan(clerkId: string): Promise<'free' | 'pro'> {
  const status = await getUserSubscriptionStatus(clerkId)
  return status.plan === 'pro' ? 'pro' : 'free'
}