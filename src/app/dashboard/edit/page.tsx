import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EditPortfolioForm from '@/components/EditPortfolioForm'

export default async function EditPortfolioPage() {
  const { userId } = await auth()
  if (!userId) redirect('/')

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) redirect('/dashboard')

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: user.id },
    include: {
      projects: true,
      education: true,
      experience: true,
      certifications: true,
    },
  })

  if (!portfolio) redirect('/dashboard/create')

  return <EditPortfolioForm portfolio={portfolio} />
}