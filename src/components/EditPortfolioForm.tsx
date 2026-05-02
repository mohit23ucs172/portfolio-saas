'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import AvatarUpload from '@/components/AvatarUpload'

type Project = {
  id: string
  title: string
  description: string | null
  link: string | null
  github: string | null
}

type Education = {
  id: string
  college: string
  degree: string
  year: string | null
}

type Experience = {
  id: string
  company: string
  role: string
  duration: string | null
  description: string | null
}

type Certification = {
  id: string
  name: string
  issuer: string | null
  link: string | null
}

type Portfolio = {
  username: string
  name: string
  bio: string | null
  avatar: string | null
  skills: string[]
  github: string | null
  linkedin: string | null
  twitter: string | null
  website: string | null
  projects: Project[]
  education: Education[]
  experience: Experience[]
  certifications: Certification[]
}

export default function EditPortfolioForm({ portfolio }: { portfolio: Portfolio }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [avatar, setAvatar] = useState(portfolio.avatar ?? '')

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

  const [education, setEducation] = useState(
    portfolio.education.length > 0
      ? portfolio.education.map(e => ({
          college: e.college,
          degree: e.degree,
          year: e.year ?? '',
        }))
      : [{ college: '', degree: '', year: '' }]
  )

  const [experience, setExperience] = useState(
    portfolio.experience.length > 0
      ? portfolio.experience.map(e => ({
          company: e.company,
          role: e.role,
          duration: e.duration ?? '',
          description: e.description ?? '',
        }))
      : [{ company: '', role: '', duration: '', description: '' }]
  )

  const [certifications, setCertifications] = useState(
    portfolio.certifications.length > 0
      ? portfolio.certifications.map(c => ({
          name: c.name,
          issuer: c.issuer ?? '',
          link: c.link ?? '',
        }))
      : [{ name: '', issuer: '', link: '' }]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleListChange = (
    list: any[], setList: any, index: number, field: string, value: string
  ) => {
    const updated = [...list]
    updated[index] = { ...updated[index], [field]: value }
    setList(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        avatar,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        projects: projects.filter(p => p.title.trim() !== ''),
        education: education.filter(e => e.college.trim() !== ''),
        experience: experience.filter(e => e.company.trim() !== ''),
        certifications: certifications.filter(c => c.name.trim() !== ''),
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold">Edit Your Portfolio</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
      )}

      {/* Basic Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Basic Info</h2>

        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <AvatarUpload
            name={form.name || 'U'}
            currentAvatar={avatar}
            onUpload={(url) => setAvatar(url)}
          />
        </div>

        <div className="space-y-2">
          <Label>Username</Label>
          <Input name="username" value={form.username} onChange={handleChange} required />
          <p className="text-xs text-gray-400">yoursite.com/{form.username}</p>
        </div>

        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea name="bio" value={form.bio} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label>Skills (comma separated)</Label>
          <Input name="skills" value={form.skills} onChange={handleChange} />
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Links</h2>
        <Input name="github" placeholder="GitHub URL" value={form.github} onChange={handleChange} />
        <Input name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} />
        <Input name="twitter" placeholder="Twitter URL" value={form.twitter} onChange={handleChange} />
        <Input name="website" placeholder="Personal Website URL" value={form.website} onChange={handleChange} />
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Education</h2>
        {education.map((edu, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Input placeholder="College / University" value={edu.college} onChange={e => handleListChange(education, setEducation, index, 'college', e.target.value)} />
            <Input placeholder="Degree" value={edu.degree} onChange={e => handleListChange(education, setEducation, index, 'degree', e.target.value)} />
            <Input placeholder="Year of Graduation" value={edu.year} onChange={e => handleListChange(education, setEducation, index, 'year', e.target.value)} />
            {education.length > 1 && (
              <button type="button" onClick={() => setEducation(education.filter((_, i) => i !== index))} className="text-red-500 text-sm">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setEducation([...education, { college: '', degree: '', year: '' }])} className="text-blue-500 text-sm">
          + Add Education
        </button>
      </div>

      {/* Experience */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Experience</h2>
        {experience.map((exp, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Input placeholder="Company Name" value={exp.company} onChange={e => handleListChange(experience, setExperience, index, 'company', e.target.value)} />
            <Input placeholder="Role / Position" value={exp.role} onChange={e => handleListChange(experience, setExperience, index, 'role', e.target.value)} />
            <Input placeholder="Duration" value={exp.duration} onChange={e => handleListChange(experience, setExperience, index, 'duration', e.target.value)} />
            <Textarea placeholder="What did you do?" value={exp.description} onChange={e => handleListChange(experience, setExperience, index, 'description', e.target.value)} />
            {experience.length > 1 && (
              <button type="button" onClick={() => setExperience(experience.filter((_, i) => i !== index))} className="text-red-500 text-sm">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setExperience([...experience, { company: '', role: '', duration: '', description: '' }])} className="text-blue-500 text-sm">
          + Add Experience
        </button>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Certifications</h2>
        {certifications.map((cert, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Input placeholder="Certification Name" value={cert.name} onChange={e => handleListChange(certifications, setCertifications, index, 'name', e.target.value)} />
            <Input placeholder="Issuer" value={cert.issuer} onChange={e => handleListChange(certifications, setCertifications, index, 'issuer', e.target.value)} />
            <Input placeholder="Certificate Link" value={cert.link} onChange={e => handleListChange(certifications, setCertifications, index, 'link', e.target.value)} />
            {certifications.length > 1 && (
              <button type="button" onClick={() => setCertifications(certifications.filter((_, i) => i !== index))} className="text-red-500 text-sm">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setCertifications([...certifications, { name: '', issuer: '', link: '' }])} className="text-blue-500 text-sm">
          + Add Certification
        </button>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Input placeholder="Project Title" value={project.title} onChange={e => handleListChange(projects, setProjects, index, 'title', e.target.value)} />
            <Textarea placeholder="Project Description" value={project.description} onChange={e => handleListChange(projects, setProjects, index, 'description', e.target.value)} />
            <Input placeholder="Live Link" value={project.link} onChange={e => handleListChange(projects, setProjects, index, 'link', e.target.value)} />
            <Input placeholder="GitHub Link" value={project.github} onChange={e => handleListChange(projects, setProjects, index, 'github', e.target.value)} />
            {projects.length > 1 && (
              <button type="button" onClick={() => setProjects(projects.filter((_, i) => i !== index))} className="text-red-500 text-sm">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => setProjects([...projects, { title: '', description: '', link: '', github: '' }])} className="text-blue-500 text-sm">
          + Add Project
        </button>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}