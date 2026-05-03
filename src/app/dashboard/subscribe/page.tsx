import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SubscribeButton from '@/components/SubscribeButton'

export default async function SubscribePage() {
  const { userId } = await auth()

  if (!userId) redirect('/')

  return (
  <main className="max-w-md mx-auto py-8 md:py-16 px-4 md:px-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Upgrade to Pro</h1>
      <p className="text-gray-500 mb-8">
        Get access to all templates, no watermark, and priority support.
      </p>
      <div className="border-2 border-black rounded-2xl p-8 mb-8">
        <div className="text-4xl font-extrabold mb-2">₹99</div>
        <div className="text-gray-500 text-sm mb-6">per month</div>
        <ul className="text-left space-y-3 mb-8">
          <li className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span> All 3 templates
          </li>
          <li className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span> No watermark
          </li>
          <li className="flex items-center gap-2 text-sm">
            <span className="text-green-600">✓</span> Priority support
          </li>
        </ul>
        <SubscribeButton />
      </div>
    </main>
  )
}