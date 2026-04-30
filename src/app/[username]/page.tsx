import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Template1 from '@/components/templates/Template1'
import Template2 from '@/components/templates/Template2'
import Template3 from '@/components/templates/Template3'

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const portfolio = await prisma.portfolio.findUnique({
    where: { username },
    include: { projects: true },
  })

  if (!portfolio) {
    notFound()
  }

  if (portfolio.templateId === 'template2') {
    return <Template2 portfolio={portfolio} />
  }

  if (portfolio.templateId === 'template3') {
    return <Template3 portfolio={portfolio} />
  }

  return <Template1 portfolio={portfolio} />
}