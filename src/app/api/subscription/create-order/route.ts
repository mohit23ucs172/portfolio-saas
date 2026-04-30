export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const Razorpay = (await import('razorpay')).default

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const order = await razorpay.orders.create({
      amount: 9900,
      currency: 'INR',
      receipt: `receipt_${userId}_${Date.now()}`,
    })

    return NextResponse.json({ orderId: order.id, amount: order.amount })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}