'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function PortfolioForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [projects, setProjects] = useState([
    { title: '', description: '', link: '', github: '' }
  ])

  const [form, setForm] = useState({
    username: '',
    name: '',
    bio: '',
    skills: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
  })

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
      <h1 className="text-3xl font-bold">Create Your Portfolio</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
      )}

      <div className="space-y-2">
        <Label htmlFor="username">Username (your portfolio URL)</Label>
        <Input id="username" name="username" placeholder="e.g. mohit" value={form.username} onChange={handleChange} required />
        <p className="text-xs text-gray-400">yoursite.com/mohit</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="Mohit Kumar" value={form.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" placeholder="Tell the world about yourself..." value={form.bio} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills (comma separated)</Label>
        <Input id="skills" name="skills" placeholder="React, Node.js, Python" value={form.skills} onChange={handleChange} />
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
        {loading ? 'Saving...' : 'Save Portfolio'}
      </Button>
    </form>
  )
}