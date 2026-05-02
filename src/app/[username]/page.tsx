import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Template1 from '@/components/templates/Template1'
import Template2 from '@/components/templates/Template2'
import Template3 from '@/components/templates/Template3'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}): Promise<Metadata> {
  const { username } = await params

  const portfolio = await prisma.portfolio.findUnique({
    where: { username },
  })

  if (!portfolio) {
    return { title: 'Portfolio not found' }
  }

  return {
    title: `${portfolio.name} — Portfolio`,
    description: portfolio.bio ?? `Check out ${portfolio.name}'s portfolio.`,
    openGraph: {
      title: `${portfolio.name} — Portfolio`,
      description: portfolio.bio ?? `Check out ${portfolio.name}'s portfolio.`,
      type: 'profile',
    },
  }
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const portfolio = await prisma.portfolio.findUnique({
    where: { username },
    include: {
      projects: true,
      education: true,
      experience: true,
      certifications: true,
      user: {
        include: { subscription: true },
      },
    },
  })

  if (!portfolio) notFound()

  const isPro =
    portfolio.user.subscription?.plan === 'pro' &&
    portfolio.user.subscription?.status === 'active'

  const props = {
    portfolio: {
      ...portfolio,
      experience: portfolio.experience ?? [],
      education: portfolio.education ?? [],
      certifications: portfolio.certifications ?? [],
      projects: portfolio.projects ?? [],
    },
    showWatermark: !isPro,
  }

  if (portfolio.templateId === 'template2') return <Template2 {...props} />
  if (portfolio.templateId === 'template3') return <Template3 {...props} />
  return <Template1 {...props} />
}