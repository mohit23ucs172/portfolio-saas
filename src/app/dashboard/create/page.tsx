import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import PortfolioForm from '@/components/ui/PortfolioForm'

export default async function CreatePortfolioPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/')
  }

  return <PortfolioForm />
}