import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
export const dynamic = 'force-dynamic'
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
    const user = await prisma.user.findUnique({ where: { clerkId: userId } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        plan: 'pro',
        status: 'active',
        razorpaySubscriptionId: razorpay_payment_id,
      },
      create: {
        userId: user.id,
        plan: 'pro',
        status: 'active',
        razorpaySubscriptionId: razorpay_payment_id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
  }
}