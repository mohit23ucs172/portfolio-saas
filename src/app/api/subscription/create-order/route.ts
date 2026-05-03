export const dynamic = 'force-dynamic'

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    console.log('keyId exists:', !!keyId)
    console.log('keySecret exists:', !!keySecret)
    console.log('keyId value:', keyId?.substring(0, 10))

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })
    }

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 9900,
        currency: 'INR',
        receipt: `receipt_${userId}_${Date.now()}`,
      }),
    })

    const order = await response.json()
    console.log('Razorpay response status:', response.status)
    console.log('Razorpay response:', JSON.stringify(order))

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to create order', details: order }, { status: 500 })
    }

    return NextResponse.json({ orderId: order.id, amount: order.amount })
  } catch (error: any) {
    console.error('Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}