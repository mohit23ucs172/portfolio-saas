import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  
  const { userId } = await auth()
  if (!userId) redirect('/')

  const clerkUser = await currentUser()

  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {},
    create: {
      clerkId: userId,
      email: clerkUser?.emailAddresses[0].emailAddress ?? '',
      name: clerkUser?.fullName ?? '',
    },
  })

  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: user.id },
  })
const subscription = await prisma.subscription.findUnique({
  where: { userId: user.id },
})
const isPro = subscription?.plan === 'pro' && subscription?.status === 'active'
  const templates = [
  { id: 'template1', label: 'Classic Dark', free: true },
  { id: 'template2', label: 'Minimal Sidebar', free: false },
  { id: 'template3', label: 'Modern Gradient', free: false },
]

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {clerkUser?.firstName ?? 'there'} 👋
      </h1>
      <p className="text-gray-500 mb-8">Manage your portfolio from here.</p>

      {portfolio === null ? (
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">
            You don't have a portfolio yet
          </h2>
          <p className="text-gray-500 mb-4">
            Create one in minutes by filling out your details.
          </p>
          <Link href="/dashboard/create">
            <Button>Create Portfolio</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Your Portfolio</h2>
            <p className="text-gray-500 mb-4">
              Live at: /{portfolio.username}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/dashboard/edit">
                <Button>Edit Portfolio</Button>
              </Link>
              <Link href={`/${portfolio.username}`} target="_blank">
                <Button variant="outline">View Portfolio</Button>
              </Link>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((t) => (
  <div
    key={t.id}
    className={`border-2 rounded-lg p-4 text-center ${
      portfolio.templateId === t.id
        ? 'border-black bg-gray-50'
        : 'border-gray-200'
    }`}
  >
    <p className="font-medium mb-1">{t.label}</p>
    {!t.free && !isPro && (
      <p className="text-xs text-yellow-600 mb-2">⭐ Pro only</p>
    )}
    {portfolio.templateId === t.id ? (
      <span className="text-xs text-green-600 font-medium">Active</span>
    ) : !t.free && !isPro ? (
      <Link href="/pricing">
        <Button variant="outline" size="sm">Upgrade</Button>
      </Link>
    ) : (
      <Link href={`/dashboard/template?id=${t.id}`}>
        <Button variant="outline" size="sm">Use This</Button>
      </Link>
    )}
  </div>
))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}