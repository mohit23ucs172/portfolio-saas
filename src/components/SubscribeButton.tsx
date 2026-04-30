'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function SubscribeButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/subscription/create-order', {
        method: 'POST',
      })
      const { orderId, amount } = await res.json()

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: 'INR',
          name: 'Portfolio SaaS',
          description: 'Pro Plan - Monthly Subscription',
          order_id: orderId,
          handler: async (response: any) => {
            const verifyRes = await fetch('/api/subscription/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })

            const data = await verifyRes.json()

            if (data.success) {
              router.push('/dashboard')
              router.refresh()
            } else {
              alert('Payment verification failed. Please contact support.')
            }
          },
          theme: { color: '#000000' },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full"
      size="lg"
    >
      {loading ? 'Loading...' : 'Pay ₹99 / month'}
    </Button>
  )
}