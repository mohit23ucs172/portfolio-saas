import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function PricingPage() {
  const { userId } = await auth()

  let currentPlan = 'free'

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { subscription: true },
    })
    currentPlan = user?.subscription?.plan ?? 'free'
  }

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '₹0',
    period: 'forever',
    features: [
      '1 portfolio',
      'All 3 templates',
      'Platform subdomain',
      'Portfolio SaaS watermark',
    ],
    cta: 'Current Plan',
    disabled: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹99',
    period: 'per month',
    features: [
      '1 portfolio',
      'All 3 templates',
      'No watermark',
      'Priority support',
      'Custom domain (coming soon)',
    ],
    cta: 'Upgrade to Pro',
    disabled: false,
  },
]

  return (
    <main className="max-w-4xl mx-auto py-16 px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Simple Pricing</h1>
        <p className="text-gray-500 text-lg">
          Start for free. Upgrade when you need more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border-2 rounded-2xl p-8 ${
              plan.id === 'pro'
                ? 'border-black bg-black text-white'
                : 'border-gray-200'
            }`}
          >
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">{plan.price}</span>
              <span className={`text-sm ml-2 ${plan.id === 'pro' ? 'text-gray-300' : 'text-gray-400'}`}>
                {plan.period}
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <span className={plan.id === 'pro' ? 'text-green-400' : 'text-green-600'}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            {currentPlan === plan.id ? (
              <div className={`text-center text-sm font-medium py-2 rounded-lg ${
                plan.id === 'pro' ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                Current Plan
              </div>
            ) : plan.disabled ? (
              <div className="text-center text-sm font-medium py-2 rounded-lg bg-gray-100">
                Free Forever
              </div>
            ) : userId ? (
              <Link href="/dashboard/subscribe">
                <Button className="w-full bg-white text-black hover:bg-gray-100">
                  {plan.cta}
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button className="w-full bg-white text-black hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}