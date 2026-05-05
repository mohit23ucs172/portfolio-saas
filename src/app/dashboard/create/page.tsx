import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import PortfolioForm from '@/components/ui/PortfolioForm'

export default async function CreatePortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ profession?: string }>
}) {
  const { userId } = await auth()
  if (!userId) redirect('/')

  const { profession } = await searchParams

  return <PortfolioForm profession={profession ?? 'other'} />
}