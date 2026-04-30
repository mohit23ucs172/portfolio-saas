import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Portfolio SaaS</h1>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Create a beautiful portfolio website in minutes. Pick a template, fill your details, go live.
      </p>
      <Link href="/dashboard">
        <Button size="lg">Get Started</Button>
      </Link>
    </main>
  )
}