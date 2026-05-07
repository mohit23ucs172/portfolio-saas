import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getUserSubscriptionStatus } from '@/lib/subscription'
import Navbar from '@/components/Navbar'

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
    include: {
      projects: true,
      experience: true,
      education: true,
      certifications: true,
    },
  })
if (!portfolio) redirect('/onboarding')

  const subStatus = await getUserSubscriptionStatus(userId)

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  })

  const isPro = subscription?.plan === 'pro' && subscription?.status === 'active'

  const templates = [
    {
      id: 'template1',
      label: 'Apple Minimal',
      desc: 'Clean, modern, professional',
      emoji: '🍎',
      colors: 'from-gray-100 to-white',
      border: 'border-gray-200',
    },
    {
      id: 'template2',
      label: 'Corporate Dark',
      desc: 'Linear.app inspired dark UI',
      emoji: '🌙',
      colors: 'from-indigo-950 to-gray-900',
      border: 'border-indigo-800',
    },
    {
      id: 'template3',
      label: 'Cyberpunk Neon',
      desc: 'Bold neon hacker aesthetic',
      emoji: '⚡',
      colors: 'from-cyan-950 to-black',
      border: 'border-cyan-800',
    },
  ]

  const stats = [
    { label: 'Projects', value: portfolio?.projects.length ?? 0, emoji: '🚀' },
    { label: 'Skills', value: portfolio?.skills.length ?? 0, emoji: '⚡' },
    { label: 'Experience', value: portfolio?.experience.length ?? 0, emoji: '💼' },
    { label: 'Certifications', value: portfolio?.certifications.length ?? 0, emoji: '🏆' },
  ]

  return (
    <main className="min-h-screen bg-[#f5f5f7]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {clerkUser?.imageUrl ? (
                <img
                  src={clerkUser.imageUrl}
                  alt={clerkUser.fullName ?? ''}
                  className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-sm">
                  {clerkUser?.firstName?.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Dashboard</p>
                <h1 className="text-2xl font-black text-gray-900">
                  Hey, {clerkUser?.firstName ?? 'there'} 👋
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
  {subStatus.plan === 'pro' ? (
    <span className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-black px-4 py-2 rounded-full shadow-sm">
      ⭐ PRO — {subStatus.daysRemaining} days left
    </span>
  ) : subStatus.isTrialExpired ? (
    <Link href="/pricing">
      <span className="flex items-center gap-2 bg-red-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-sm animate-pulse">
        ⚠️ Trial Expired — Upgrade Now
      </span>
    </Link>
  ) : (
    <Link href="/pricing">
      <span className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-sm">
        🕐 {subStatus.daysRemaining} days trial left
      </span>
    </Link>
  )}
  {portfolio && (
    <Link href={`/${portfolio.username}`} target="_blank">
      <Button size="sm" className="text-xs bg-black hover:bg-gray-800">
        View Portfolio →
      </Button>
    </Link>
  )}
</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 space-y-8">

        {portfolio ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="text-2xl mb-2">{stat.emoji}</div>
                  <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Portfolio card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Your Portfolio</p>
                    <h2 className="text-white text-2xl font-black">{portfolio.name}</h2>
                    <p className="text-white/70 text-sm mt-1">
                      portfolio-saas-red.vercel.app/{portfolio.username}
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
                    {portfolio.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-wrap gap-3">
                <Link href="/dashboard/edit">
                  <Button className="bg-black hover:bg-gray-800 text-white rounded-xl">
                    ✏️ Edit Portfolio
                  </Button>
                </Link>
                <Link href={`/${portfolio.username}`} target="_blank">
                  <Button variant="outline" className="rounded-xl">
                    👁️ View Live
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="rounded-xl">
                    ⭐ Upgrade Plan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Template selector */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-black text-gray-900">Choose Template</h2>
                <p className="text-gray-400 text-sm mt-1">All templates are free — pick your style</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((t) => (
                  <div
                    key={t.id}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all ${
                      portfolio.templateId === t.id
                        ? 'border-black shadow-lg scale-[1.02]'
                        : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    {/* Preview */}
                    <div className={`h-28 bg-gradient-to-br ${t.colors} flex items-center justify-center text-4xl`}>
                      {t.emoji}
                    </div>

                    {portfolio.templateId === t.id && (
                      <div className="absolute top-3 right-3 bg-black text-white text-xs font-black px-2 py-1 rounded-full">
                        ACTIVE
                      </div>
                    )}

                    <div className="p-4">
                      <p className="font-black text-sm text-gray-900">{t.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5 mb-3">{t.desc}</p>
                      {portfolio.templateId === t.id ? (
                        <div className="flex items-center gap-1.5 text-green-600 text-xs font-bold">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Currently Active
                        </div>
                      ) : (
                        <Link href={`/dashboard/template?id=${t.id}`}>
                          <Button variant="outline" size="sm" className="w-full rounded-xl text-xs">
                            Use This Template
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/dashboard/edit" className="block">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                    ✏️
                  </div>
                  <h3 className="font-black text-gray-900 mb-1">Edit Portfolio</h3>
                  <p className="text-gray-400 text-xs">Update your info, skills and projects</p>
                </div>
              </Link>

              <Link href="/pricing" className="block">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                    ⭐
                  </div>
                  <h3 className="font-black text-gray-900 mb-1">Upgrade to Pro</h3>
                  <p className="text-gray-400 text-xs">Remove watermark and get priority support</p>
                </div>
              </Link>

              <Link href={`/${portfolio.username}`} target="_blank" className="block">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                    🌐
                  </div>
                  <h3 className="font-black text-gray-900 mb-1">View Live Site</h3>
                  <p className="text-gray-400 text-xs">See how your portfolio looks to others</p>
                </div>
              </Link>
            </div>
          </>
        ) : (
          /* No portfolio yet */
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12 text-center text-white">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-3xl font-black mb-2">Create Your Portfolio</h2>
              <p className="text-white/70 max-w-md mx-auto mb-8">
                Build a stunning portfolio in minutes. Pick a template, fill your details, go live.
              </p>
              <Link href="/dashboard/create">
                <Button className="bg-white text-black hover:bg-gray-100 font-black px-8 py-6 rounded-2xl text-base shadow-xl">
                  Get Started →
                </Button>
              </Link>
            </div>
            <div className="p-8">
              <p className="text-center text-gray-400 text-sm font-medium mb-6">Choose from 3 stunning templates</p>
              <div className="grid grid-cols-3 gap-4">
                {templates.map((t) => (
                  <div key={t.id} className="rounded-2xl overflow-hidden border border-gray-100">
                    <div className={`h-20 bg-gradient-to-br ${t.colors} flex items-center justify-center text-3xl`}>
                      {t.emoji}
                    </div>
                    <div className="p-3 text-center">
                      <p className="font-black text-xs text-gray-900">{t.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
      

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white text-xs font-black">
              P
            </div>
            <span className="font-black text-gray-900 text-sm">Portfolio SaaS</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
            <Link href="/dashboard/create" className="hover:text-black transition-colors">Create Portfolio</Link>
            <Link href="/dashboard/edit" className="hover:text-black transition-colors">Edit Portfolio</Link>
          </div>
          <p className="text-xs text-gray-400">
            © 2025 Portfolio SaaS. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  )
}
  