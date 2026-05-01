'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type Project = {
  id: string
  title: string
  description: string | null
  link: string | null
  github: string | null
}

type Portfolio = {
  username: string
  name: string
  bio: string | null
  skills: string[]
  github: string | null
  linkedin: string | null
  twitter: string | null
  website: string | null
  projects: Project[]
}

export default function EditPortfolioForm({ portfolio }: { portfolio: Portfolio }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    username: portfolio.username,
    name: portfolio.name,
    bio: portfolio.bio ?? '',
    skills: portfolio.skills.join(', '),
    github: portfolio.github ?? '',
    linkedin: portfolio.linkedin ?? '',
    twitter: portfolio.twitter ?? '',
    website: portfolio.website ?? '',
  })

  const [projects, setProjects] = useState(
    portfolio.projects.length > 0
      ? portfolio.projects.map(p => ({
          title: p.title,
          description: p.description ?? '',
          link: p.link ?? '',
          github: p.github ?? '',
        }))
      : [{ title: '', description: '', link: '', github: '' }]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updated = [...projects]
    updated[index] = { ...updated[index], [field]: value }
    setProjects(updated)
  }

  const addProject = () => {
    setProjects([...projects, { title: '', description: '', link: '', github: '' }])
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean)
    const validProjects = projects.filter(p => p.title.trim() !== '')

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        skills: skillsArray,
        projects: validProjects,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold">Edit Your Portfolio</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" value={form.username} onChange={handleChange} required />
        <p className="text-xs text-gray-400">yoursite.com/{form.username}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" value={form.bio} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills (comma separated)</Label>
        <Input id="skills" name="skills" value={form.skills} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Links</Label>
        <Input name="github" placeholder="GitHub URL" value={form.github} onChange={handleChange} />
        <Input name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} />
        <Input name="twitter" placeholder="Twitter URL" value={form.twitter} onChange={handleChange} />
        <Input name="website" placeholder="Personal Website URL" value={form.website} onChange={handleChange} />
      </div>

      <div className="space-y-4">
        <Label>Projects</Label>
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Input placeholder="Project Title" value={project.title} onChange={e => handleProjectChange(index, 'title', e.target.value)} />
            <Textarea placeholder="Project Description" value={project.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} />
            <Input placeholder="Live Link" value={project.link} onChange={e => handleProjectChange(index, 'link', e.target.value)} />
            <Input placeholder="GitHub Link" value={project.github} onChange={e => handleProjectChange(index, 'github', e.target.value)} />
            {projects.length > 1 && (
              <button type="button" onClick={() => removeProject(index)} className="text-red-500 text-sm">
                Remove project
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addProject} className="text-blue-500 text-sm">
          + Add another project
        </button>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}