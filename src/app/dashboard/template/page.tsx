import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function SwitchTemplatePage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>
}) {
  const { userId } = await auth()
  if (!userId) redirect('/')

  const { id } = await searchParams
  const validTemplates = ['template1', 'template2', 'template3']

  if (!validTemplates.includes(id)) redirect('/dashboard')

  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (user) {
    await prisma.portfolio.update({
      where: { userId: user.id },
      data: { templateId: id },
    })
  }

  redirect('/dashboard')
}