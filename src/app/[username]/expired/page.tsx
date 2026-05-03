import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ExpiredPage({ params }: { params: { username: string } }) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 max-w-md w-full text-center">
        <div className="text-6xl mb-6">⏰</div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Trial Expired</h1>
        <p className="text-gray-500 mb-2">
          <span className="font-bold text-gray-900">@{params.username}</span>'s portfolio trial has ended.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          The owner needs to upgrade to keep this portfolio live.
        </p>
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">
            Upgrade for just
          </p>
          <p className="text-4xl font-black text-gray-900">₹99</p>
          <p className="text-gray-400 text-sm">per month</p>
        </div>
        <Link href="https://portfolio-saas-red.vercel.app">
          <Button className="w-full bg-black hover:bg-gray-800 text-white rounded-2xl py-6 font-black">
            Create Your Own Portfolio →
          </Button>
        </Link>
      </div>
    </main>
  )
}