import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import Template1 from '@/components/templates/Template1'
import Template2 from '@/components/templates/Template2'
import Template3 from '@/components/templates/Template3'
import type { Metadata } from 'next'
import TemplateCreative from '@/components/templates/TemplateCreative'
import TemplateWords from '@/components/templates/TemplateWords'
import TemplateVideo from '@/components/templates/TemplateVideo'
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

  // Check trial/subscription status
  const createdAt = portfolio.createdAt
  const trialEndDate = new Date(createdAt.getTime() + 10 * 24 * 60 * 60 * 1000)
  const now = new Date()
  const isTrialExpired = now > trialEndDate

  const subscription = portfolio.user.subscription
  const isPro = subscription?.plan === 'pro' &&
    subscription?.status === 'active' &&
    (!subscription?.expiresAt || subscription.expiresAt > now)

  // Redirect to expired page if trial over and not pro
  if (isTrialExpired && !isPro) {
    redirect(`/${username}/expired`)
  }

  const props = {
    portfolio: {
      ...portfolio,
      avatar: portfolio.avatar ?? null,
      experience: portfolio.experience ?? [],
      education: portfolio.education ?? [],
      certifications: portfolio.certifications ?? [],
      projects: portfolio.projects ?? [],
    },
    showWatermark: !isPro,
  }

const profession = portfolio.profession ?? 'developer'
if (profession === 'video') return <TemplateVideo {...props} />
if (profession === 'designer' || profession === 'photographer') return <TemplateCreative {...props} />
if (profession === 'writer' || profession === 'other') return <TemplateWords {...props} />

// Tech professions use templateId
if (portfolio.templateId === 'template2') return <Template2 {...props} />
if (portfolio.templateId === 'template3') return <Template3 {...props} />
return <Template1 {...props} />
}