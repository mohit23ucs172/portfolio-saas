'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const professions = [
  {
    id: 'developer',
    emoji: '💻',
    title: 'Developer / Engineer',
    desc: 'Frontend, Backend, Full Stack, Mobile',
    color: 'from-blue-500 to-indigo-600',
    glow: 'rgba(99,102,241,0.3)',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Git', 'Docker'],
    skillPlaceholder: 'React, Node.js, Python, TypeScript...',
    bioPlaceholder: 'Full stack developer passionate about building scalable web applications...',
    projectLabel: 'Projects',
    projectPlaceholder: 'E-commerce platform, REST API, Mobile App...',
  },
  {
    id: 'designer',
    emoji: '🎨',
    title: 'Graphic Designer',
    desc: 'UI/UX, Brand Identity, Illustration',
    color: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.3)',
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'Sketch'],
    skillPlaceholder: 'Figma, Adobe XD, Photoshop, Illustrator...',
    bioPlaceholder: 'Creative designer specializing in UI/UX and brand identity...',
    projectLabel: 'Design Work',
    projectPlaceholder: 'Brand redesign, Mobile app UI, Logo design...',
  },
  {
    id: 'video',
    emoji: '🎬',
    title: 'Video Editor',
    desc: 'Film, YouTube, Social Media Content',
    color: 'from-red-500 to-orange-600',
    glow: 'rgba(239,68,68,0.3)',
    skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro', 'Motion Graphics'],
    skillPlaceholder: 'Premiere Pro, After Effects, DaVinci Resolve...',
    bioPlaceholder: 'Video editor specializing in cinematic storytelling and motion graphics...',
    projectLabel: 'Video Projects',
    projectPlaceholder: 'YouTube series, Brand commercial, Short film...',
  },
  {
    id: 'photographer',
    emoji: '📸',
    title: 'Photographer',
    desc: 'Portrait, Commercial, Wedding, Events',
    color: 'from-amber-500 to-yellow-600',
    glow: 'rgba(245,158,11,0.3)',
    skills: ['Lightroom', 'Photoshop', 'Capture One', 'Portrait Photography', 'Studio Lighting'],
    skillPlaceholder: 'Lightroom, Photoshop, Portrait, Commercial...',
    bioPlaceholder: 'Photographer capturing authentic moments and telling visual stories...',
    projectLabel: 'Photography Projects',
    projectPlaceholder: 'Wedding shoot, Brand campaign, Portrait series...',
  },
  {
    id: 'writer',
    emoji: '✍️',
    title: 'Content Writer',
    desc: 'Blogs, Copywriting, SEO, Technical Writing',
    color: 'from-green-500 to-emerald-600',
    glow: 'rgba(16,185,129,0.3)',
    skills: ['SEO', 'Copywriting', 'Content Strategy', 'WordPress', 'Email Marketing', 'Social Media'],
    skillPlaceholder: 'SEO, Copywriting, Content Strategy, WordPress...',
    bioPlaceholder: 'Content writer helping brands tell their story through compelling copy...',
    projectLabel: 'Writing Samples',
    projectPlaceholder: 'Blog series, Brand campaign copy, Technical documentation...',
  },
  {
    id: 'data',
    emoji: '📊',
    title: 'Data Analyst',
    desc: 'Analytics, Visualization, Machine Learning',
    color: 'from-cyan-500 to-teal-600',
    glow: 'rgba(6,182,212,0.3)',
    skills: ['Python', 'SQL', 'Tableau', 'Power BI', 'Excel', 'Machine Learning', 'Pandas'],
    skillPlaceholder: 'Python, SQL, Tableau, Power BI, Machine Learning...',
    bioPlaceholder: 'Data analyst turning complex datasets into actionable business insights...',
    projectLabel: 'Case Studies',
    projectPlaceholder: 'Sales dashboard, Customer churn analysis, ML model...',
  },
  {
    id: 'product',
    emoji: '🎯',
    title: 'Product Manager',
    desc: 'Strategy, Roadmaps, Agile, Growth',
    color: 'from-purple-500 to-violet-600',
    glow: 'rgba(139,92,246,0.3)',
    skills: ['Product Strategy', 'Agile', 'Jira', 'Figma', 'Analytics', 'Roadmapping', 'A/B Testing'],
    skillPlaceholder: 'Product Strategy, Agile, Jira, Analytics...',
    bioPlaceholder: 'Product manager driving user-centric solutions and business growth...',
    projectLabel: 'Product Launches',
    projectPlaceholder: 'Feature launch, Growth initiative, Product redesign...',
  },
  {
    id: 'other',
    emoji: '✨',
    title: 'Other',
    desc: 'Marketing, Finance, HR, and more',
    color: 'from-gray-500 to-slate-600',
    glow: 'rgba(100,116,139,0.3)',
    skills: [],
    skillPlaceholder: 'Add your skills...',
    bioPlaceholder: 'Tell the world about yourself and what you do...',
    projectLabel: 'Projects',
    projectPlaceholder: 'Your best work...',
  },
]

export default function OnboardingClient() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelected(id)
    setTimeout(() => {
      router.push(`/dashboard/create?profession=${id}`)
    }, 600)
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-6 md:p-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
          className="w-16 h-16 rounded-3xl bg-black flex items-center justify-center text-white text-2xl font-black mx-auto mb-6 shadow-xl"
        >
          P
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
          What do you do?
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Pick your profession — we'll customize your portfolio for you
        </p>
      </motion.div>

      {/* Profession Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full"
      >
        {professions.map((prof, i) => (
          <motion.button
            key={prof.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleSelect(prof.id)}
            onMouseEnter={() => setHoveredId(prof.id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden rounded-3xl p-6 text-left border-2 transition-all duration-300 group"
            style={{
              background: selected === prof.id
                ? 'black'
                : hoveredId === prof.id
                  ? 'white'
                  : 'white',
              borderColor: selected === prof.id
                ? 'black'
                : hoveredId === prof.id
                  ? 'black'
                  : 'rgba(0,0,0,0.08)',
              boxShadow: hoveredId === prof.id
                ? `0 20px 40px ${prof.glow}, 0 4px 12px rgba(0,0,0,0.08)`
                : '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Selected overlay */}
            <AnimatePresence>
              {selected === prof.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'black' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="text-4xl"
                  >
                    ✓
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gradient background on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl"
              style={{ background: `linear-gradient(135deg, ${prof.glow}, transparent)` }}
            />

            <div className="relative">
              {/* Emoji */}
              <motion.div
                animate={hoveredId === prof.id ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-4xl mb-4 block"
              >
                {prof.emoji}
              </motion.div>

              {/* Title */}
              <h3
                className="font-black text-sm md:text-base leading-tight mb-1 transition-colors"
                style={{ color: selected === prof.id ? 'white' : 'black' }}
              >
                {prof.title}
              </h3>

              {/* Description */}
              <p
                className="text-xs leading-relaxed transition-colors"
                style={{ color: selected === prof.id ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)' }}
              >
                {prof.desc}
              </p>

              {/* Skills preview */}
              {prof.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {prof.skills.slice(0, 3).map(skill => (
                    <span
                      key={skill}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors"
                      style={{
                        background: selected === prof.id ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)',
                        color: selected === prof.id ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-gray-300 text-sm mt-8"
      >
        You can change this later
      </motion.p>

    </main>
  )
}