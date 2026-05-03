export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

  const body = razorpay_order_id + '|' + razorpay_payment_id
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex')

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    // Capture the payment
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

    const captureResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${razorpay_payment_id}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 9900, currency: 'INR' }),
      }
    )

    const captureData = await captureResponse.json()
    console.log('Capture response:', captureData)

    if (!captureResponse.ok && captureData.error?.code !== 'BAD_REQUEST_ERROR') {
      return NextResponse.json({ error: 'Payment capture failed' }, { status: 500 })
    }

    // Update subscription in DB
    const user = await prisma.user.findUnique({ where: { clerkId: userId } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

  const expiresAt = new Date()
expiresAt.setDate(expiresAt.getDate() + 30)

await prisma.subscription.upsert({
  where: { userId: user.id },
  update: {
    plan: 'pro',
    status: 'active',
    razorpaySubscriptionId: razorpay_payment_id,
    expiresAt,
  },
  create: {
    userId: user.id,
    plan: 'pro',
    status: 'active',
    razorpaySubscriptionId: razorpay_payment_id,
    expiresAt,
  },
})

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}