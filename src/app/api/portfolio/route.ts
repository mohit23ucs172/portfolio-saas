import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { username, name, bio, skills, github, linkedin, twitter, website, projects } = body

  if (!username || !name) {
    return NextResponse.json({ error: 'Username and name are required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const portfolio = await prisma.portfolio.upsert({
      where: { userId: user.id },
      update: {
        username,
        name,
        bio,
        skills,
        github,
        linkedin,
        twitter,
        website,
        projects: {
          deleteMany: {},
          create: projects ?? [],
        },
      },
      create: {
        userId: user.id,
        username,
        name,
        bio,
        skills,
        github,
        linkedin,
        twitter,
        website,
        projects: {
          create: projects ?? [],
        },
      },
    })

    return NextResponse.json({ portfolio })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}