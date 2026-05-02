'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

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

function RevealSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function GlowCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.4), transparent 50%)`,
          }}
        />
      )}
      <div className="absolute inset-0 rounded-2xl border border-white/5" />
      {children}
    </motion.div>
  )
}

export default function Template2({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const { scrollY } = useScroll()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('home')
  const heroY = useTransform(scrollY, [0, 500], [0, -80])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const navItems = ['Skills', 'Experience', 'Projects', 'Education']

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: '#0a0a0f' }}>

      {/* Ambient cursor glow */}
      <div
        className="fixed pointer-events-none z-50 w-80 h-80 rounded-full opacity-20 blur-3xl transition-all duration-500"
        style={{
          background: 'radial-gradient(circle, #6366f1, #a855f7)',
          left: mousePos.x - 160,
          top: mousePos.y - 160,
        }}
      />

      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
        />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-2"
      >
        <div
          className="flex items-center gap-1 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-xl"
          style={{ background: 'rgba(10,10,15,0.8)' }}
        >
          {portfolio.avatar ? (
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={portfolio.avatar}
              alt={portfolio.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/50 mr-2"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold mr-2">
              {portfolio.name.charAt(0)}
            </div>
          )}
          <span className="text-xs font-semibold text-white/80 mr-4">{portfolio.name.split(' ')[0]}</span>
          <div className="w-px h-4 bg-white/10 mr-4" />
          {navItems.map((item) => (
            <motion.button
              key={item}
              whileHover={{ backgroundColor: 'rgba(99,102,241,0.2)' }}
              className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-xl transition-colors"
            >
              {item}
            </motion.button>
          ))}
          <div className="w-px h-4 bg-white/10 mx-2" />
          {portfolio.github && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={portfolio.github}
              target="_blank"
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-xl font-semibold transition-colors"
            >
              GitHub
            </motion.a>
          )}
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <motion.div
          style={{ y: heroY }}
          className="relative max-w-6xl mx-auto px-8 pt-32 pb-20 w-full"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-indigo-400 rounded-full"
                />
                Available for opportunities
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
              >
                {portfolio.name.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`block ${i % 2 === 0 ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {portfolio.bio && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-white/50 max-w-lg leading-relaxed mb-10"
                >
                  {portfolio.bio}
                </motion.p>
              )}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-8 mb-10 justify-center lg:justify-start"
              >
                {[
                  { value: `${portfolio.skills.length}+`, label: 'Skills' },
                  { value: `${portfolio.projects.length}+`, label: 'Projects' },
                  { value: `${portfolio.experience.length}+`, label: 'Roles' },
                ].map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <motion.p
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                      className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs text-white/30 font-medium mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-3 flex-wrap justify-center lg:justify-start"
              >
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/25 transition-colors"
                  >
                    Connect →
                  </motion.a>
                )}
                {portfolio.github && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.github}
                    target="_blank"
                    className="flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all"
                  >
                    GitHub
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Right — Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0"
            >
              <div className="relative w-72 h-72">
                {/* Rotating rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-4 rounded-full border border-indigo-500/20 border-dashed"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-8 rounded-full border border-purple-500/10 border-dashed"
                />

                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
                  style={{ background: 'radial-gradient(circle, #6366f1, #a855f7, transparent)' }}
                />

                {portfolio.avatar ? (
                  <img
                    src={portfolio.avatar}
                    alt={portfolio.name}
                    className="relative w-full h-full rounded-3xl object-cover border border-white/10"
                  />
                ) : (
                  <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border border-white/10 flex items-center justify-center text-8xl font-black text-white/20">
                    {portfolio.name.charAt(0)}
                  </div>
                )}

                {/* Floating cards */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -right-8 top-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3"
                >
                  <p className="text-xs text-white/50">Skills</p>
                  <p className="text-lg font-black text-indigo-400">{portfolio.skills.length}+</p>
                </motion.div>

                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-8 bottom-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3"
                >
                  <p className="text-xs text-white/50">Projects</p>
                  <p className="text-lg font-black text-purple-400">{portfolio.projects.length}+</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-8 space-y-32 pb-32">

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <motion.p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
                What I know
              </motion.p>
              <h2 className="text-4xl font-black">Skills & Technologies</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, type: 'spring' }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-white/70 hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-default">
                    {skill}
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Experience */}
        {portfolio.experience.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Career</p>
              <h2 className="text-4xl font-black">Experience</h2>
            </div>
            <div className="space-y-4">
              {portfolio.experience.map((exp, i) => (
                <GlowCard key={exp.id} className="p-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-black text-white">{exp.role}</h3>
                        <p className="text-indigo-400 font-semibold text-sm mt-1">{exp.company}</p>
                      </div>
                      {exp.duration && (
                        <span className="text-xs text-white/30 border border-white/10 px-4 py-1.5 rounded-full mt-2 md:mt-0 w-fit font-medium">
                          {exp.duration}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {exp.description}
                      </p>
                    )}
                  </motion.div>
                </GlowCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Education */}
        {portfolio.education.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <p className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-3">Background</p>
              <h2 className="text-4xl font-black">Education</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.education.map((edu, i) => (
                <GlowCard key={edu.id} className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20 flex items-center justify-center text-xl mb-4">
                      🎓
                    </div>
                    <h3 className="font-black text-lg text-white">{edu.college}</h3>
                    <p className="text-white/40 text-sm mt-1">{edu.degree}</p>
                    {edu.year && (
                      <span className="inline-block mt-3 text-xs text-pink-400 border border-pink-500/20 bg-pink-500/10 px-3 py-1 rounded-full font-medium">
                        {edu.year}
                      </span>
                    )}
                  </motion.div>
                </GlowCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Portfolio</p>
              <h2 className="text-4xl font-black">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, i) => (
                <GlowCard key={project.id} className="p-8 group">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/20 flex items-center justify-center">
                        <span className="text-green-400 text-lg">⚡</span>
                      </div>
                      <div className="flex gap-2">
                        {project.link && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.link}
                            target="_blank"
                            className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all text-xs"
                          >
                            ↗
                          </motion.a>
                        )}
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.github}
                            target="_blank"
                            className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all text-xs"
                          >
                            ⌥
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-white/40 text-sm leading-relaxed">{project.description}</p>
                    )}
                  </motion.div>
                </GlowCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Certifications */}
        {portfolio.certifications.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">Achievements</p>
              <h2 className="text-4xl font-black">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, i) => (
                <GlowCard key={cert.id} className="p-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 flex items-center justify-center text-yellow-400 font-black">
                        ✦
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{cert.name}</p>
                        {cert.issuer && <p className="text-white/30 text-xs mt-0.5">{cert.issuer}</p>}
                      </div>
                    </div>
                    {cert.link && (
                      <motion.a
                        whileHover={{ x: 3 }}
                        href={cert.link}
                        target="_blank"
                        className="text-indigo-400 text-xs font-bold hover:underline ml-4 shrink-0"
                      >
                        View →
                      </motion.a>
                    )}
                  </motion.div>
                </GlowCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Contact */}
        <RevealSection>
          <div className="relative overflow-hidden rounded-3xl p-12 text-center border border-white/10">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full border border-indigo-500/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full border border-purple-500/10"
            />
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg shadow-indigo-500/25"
              >
                👋
              </motion.div>
              <h2 className="text-4xl font-black mb-4">Let's Build Together</h2>
              <p className="text-white/50 text-lg max-w-md mx-auto mb-8">
                Open to exciting opportunities and collaborations. Let's create something extraordinary.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-indigo-500/25"
                  >
                    Connect on LinkedIn →
                  </motion.a>
                )}
                {portfolio.github && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.github}
                    target="_blank"
                    className="border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-2xl transition-all"
                  >
                    View GitHub →
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </RevealSection>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center">
        <p className="text-white/20 text-xs">
          {showWatermark ? (
            <span>
              Made with{' '}
              <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-white/40">Portfolio SaaS</a>
              {' — '}
              <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-white/40">Remove watermark</a>
            </span>
          ) : (
            <span>Built with Portfolio SaaS</span>
          )}
        </p>
      </footer>

    </main>
  )
}