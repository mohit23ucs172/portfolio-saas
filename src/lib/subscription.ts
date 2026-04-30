import { prisma } from '@/lib/prisma'

export async function getUserPlan(clerkId: string): Promise<'free' | 'pro'> {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { subscription: true },
  })

  if (!user) return 'free'
  if (user.subscription?.plan === 'pro' && user.subscription?.status === 'active') {
    return 'pro'
  }

  return 'free'
}