'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

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

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[index])
        setIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [index, text])

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-cyan-400"
      >
        |
      </motion.span>
    </span>
  )
}

function NeonCard({ children, color = 'cyan', className = '' }: {
  children: React.ReactNode
  color?: 'cyan' | 'pink' | 'purple' | 'green' | 'yellow'
  className?: string
}) {
  const colors = {
    cyan: { border: 'rgba(34,211,238,0.3)', glow: 'rgba(34,211,238,0.1)', text: '#22d3ee', shadow: '0 0 20px rgba(34,211,238,0.1)' },
    pink: { border: 'rgba(236,72,153,0.3)', glow: 'rgba(236,72,153,0.1)', text: '#ec4899', shadow: '0 0 20px rgba(236,72,153,0.1)' },
    purple: { border: 'rgba(168,85,247,0.3)', glow: 'rgba(168,85,247,0.1)', text: '#a855f7', shadow: '0 0 20px rgba(168,85,247,0.1)' },
    green: { border: 'rgba(74,222,128,0.3)', glow: 'rgba(74,222,128,0.1)', text: '#4ade80', shadow: '0 0 20px rgba(74,222,128,0.1)' },
    yellow: { border: 'rgba(250,204,21,0.3)', glow: 'rgba(250,204,21,0.1)', text: '#facc15', shadow: '0 0 20px rgba(250,204,21,0.1)' },
  }
  const c = colors[color]

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${c.glow}` }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl p-6 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${c.glow}, rgba(0,0,0,0.5))`,
        border: `1px solid ${c.border}`,
        boxShadow: c.shadow,
      }}
    >
      {children}
    </motion.div>
  )
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

export default function Template3({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -80])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 5000)
    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <main
      className="min-h-screen text-white overflow-x-hidden font-mono"
      style={{ background: '#050508' }}
    >

      {/* Scanlines effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
        }}
      />

      {/* Cursor glow */}
      <div
        className="fixed pointer-events-none z-40 w-64 h-64 rounded-full blur-3xl opacity-20 transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, #22d3ee, #a855f7)',
          left: mousePos.x - 128,
          top: mousePos.y - 128,
        }}
      />

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Neon orbs */}
        <motion.div
          animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-20 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }}
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
        />
      </div>

      {/* Nav */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-40 border-b"
        style={{
          background: 'rgba(5,5,8,0.9)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(34,211,238,0.1)',
        }}
      >
        <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ boxShadow: ['0 0 10px #22d3ee', '0 0 20px #22d3ee', '0 0 10px #22d3ee'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
            {portfolio.avatar ? (
              <img src={portfolio.avatar} alt={portfolio.name} className="w-7 h-7 rounded-full object-cover" style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.5))' }} />
            ) : (
              <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-black">
                {portfolio.name.charAt(0)}
              </div>
            )}
            <span className="text-xs font-black text-cyan-400 tracking-widest uppercase">
              {portfolio.name.split(' ')[0]}.exe
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-white/20">[ </span>
            {portfolio.github && (
              <motion.a whileHover={{ color: '#22d3ee' }} href={portfolio.github} target="_blank" className="text-white/40 transition-colors font-bold tracking-wider">
                GITHUB
              </motion.a>
            )}
            {portfolio.linkedin && (
              <motion.a whileHover={{ color: '#22d3ee' }} href={portfolio.linkedin} target="_blank" className="text-white/40 transition-colors font-bold tracking-wider">
                LINKEDIN
              </motion.a>
            )}
            {portfolio.twitter && (
              <motion.a whileHover={{ color: '#22d3ee' }} href={portfolio.twitter} target="_blank" className="text-white/40 transition-colors font-bold tracking-wider">
                TWITTER
              </motion.a>
            )}
            <span className="text-white/20"> ]</span>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <motion.div
          style={{ y: heroY }}
          className="relative max-w-6xl mx-auto px-8 pt-32 pb-20 w-full"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-black tracking-widest mb-6 text-cyan-400/60"
              >
                &gt; INITIALIZING PORTFOLIO.EXE...
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className={`mb-2 ${glitchActive ? 'translate-x-1' : ''} transition-transform`}
              >
                <h1
                  className="text-6xl lg:text-8xl font-black tracking-tight leading-none"
                  style={{
                    textShadow: '0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(34,211,238,0.1)',
                    color: '#ffffff',
                  }}
                >
                  {portfolio.name.split(' ')[0]}
                </h1>
                <h1
                  className="text-6xl lg:text-8xl font-black tracking-tight leading-none"
                  style={{
                    textShadow: '0 0 40px rgba(236,72,153,0.5), 0 0 80px rgba(236,72,153,0.2)',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(236,72,153,0.8)',
                  }}
                >
                  {portfolio.name.split(' ').slice(1).join(' ') || portfolio.name}
                </h1>
              </motion.div>

              {portfolio.bio && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-white/40 text-lg max-w-lg leading-relaxed mb-8 mt-6"
                >
                  <span className="text-cyan-400/60">&gt; </span>
                  <TypewriterText text={portfolio.bio} />
                </motion.p>
              )}

              {/* Terminal stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="font-mono text-xs text-white/30 mb-8 space-y-1"
                style={{ borderLeft: '2px solid rgba(34,211,238,0.3)', paddingLeft: '12px' }}
              >
                <p><span className="text-cyan-400">skills</span> <span className="text-pink-400">=</span> <span className="text-green-400">[{portfolio.skills.length} items]</span></p>
                <p><span className="text-cyan-400">projects</span> <span className="text-pink-400">=</span> <span className="text-green-400">[{portfolio.projects.length} items]</span></p>
                <p><span className="text-cyan-400">experience</span> <span className="text-pink-400">=</span> <span className="text-green-400">[{portfolio.experience.length} items]</span></p>
                <p><span className="text-cyan-400">status</span> <span className="text-pink-400">=</span> <span className="text-yellow-400">"available"</span></p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex gap-3 flex-wrap justify-center lg:justify-start"
              >
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,211,238,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="px-6 py-3 rounded-xl text-sm font-black tracking-wider transition-all"
                    style={{
                      background: 'rgba(34,211,238,0.1)',
                      border: '1px solid rgba(34,211,238,0.4)',
                      color: '#22d3ee',
                      textShadow: '0 0 10px rgba(34,211,238,0.5)',
                    }}
                  >
                    CONNECT →
                  </motion.a>
                )}
                {portfolio.github && (
                  <motion.a
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236,72,153,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.github}
                    target="_blank"
                    className="px-6 py-3 rounded-xl text-sm font-black tracking-wider transition-all"
                    style={{
                      background: 'rgba(236,72,153,0.1)',
                      border: '1px solid rgba(236,72,153,0.4)',
                      color: '#ec4899',
                      textShadow: '0 0 10px rgba(236,72,153,0.5)',
                    }}
                  >
                    GITHUB →
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Right — Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative shrink-0"
            >
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                {/* Neon rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-6 rounded-full"
                  style={{ border: '1px solid rgba(34,211,238,0.2)', borderTopColor: 'rgba(34,211,238,0.8)' }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-10 rounded-full"
                  style={{ border: '1px solid rgba(236,72,153,0.15)', borderRightColor: 'rgba(236,72,153,0.6)' }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-14 rounded-full"
                  style={{ border: '1px dashed rgba(168,85,247,0.1)', borderBottomColor: 'rgba(168,85,247,0.4)' }}
                />

                {/* Avatar */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{
                    border: '1px solid rgba(34,211,238,0.3)',
                    boxShadow: '0 0 40px rgba(34,211,238,0.2), inset 0 0 40px rgba(34,211,238,0.05)',
                  }}
                >
                  {portfolio.avatar ? (
                    <img
                      src={portfolio.avatar}
                      alt={portfolio.name}
                      className="w-full h-full object-cover"
                      style={{ filter: 'saturate(1.2) contrast(1.1)' }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-8xl font-black"
                      style={{
                        background: 'linear-gradient(135deg, #050508, #0a0a15)',
                        color: 'rgba(34,211,238,0.2)',
                        textShadow: '0 0 40px rgba(34,211,238,0.4)',
                      }}
                    >
                      {portfolio.name.charAt(0)}
                    </div>
                  )}

                  {/* Scanline overlay on avatar */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)',
                    }}
                  />
                </div>

                {/* Floating status cards */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-16 top-6 px-4 py-2 rounded-xl text-xs font-black"
                  style={{
                    background: 'rgba(34,211,238,0.1)',
                    border: '1px solid rgba(34,211,238,0.3)',
                    color: '#22d3ee',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px rgba(34,211,238,0.2)',
                  }}
                >
                  SYS: ONLINE ●
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -left-16 bottom-6 px-4 py-2 rounded-xl text-xs font-black"
                  style={{
                    background: 'rgba(236,72,153,0.1)',
                    border: '1px solid rgba(236,72,153,0.3)',
                    color: '#ec4899',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px rgba(236,72,153,0.2)',
                  }}
                >
                  HIRE: TRUE ✓
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
              <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-3">
                &gt; SKILLS.MAP()
              </p>
              <h2 className="text-4xl font-black" style={{ textShadow: '0 0 20px rgba(34,211,238,0.3)' }}>
                Technologies
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, type: 'spring' }}
                  whileHover={{
                    scale: 1.1,
                    y: -4,
                    boxShadow: '0 0 20px rgba(34,211,238,0.4)',
                  }}
                  className="px-5 py-2.5 rounded-xl text-sm font-black cursor-default transition-all"
                  style={{
                    background: 'rgba(34,211,238,0.05)',
                    border: '1px solid rgba(34,211,238,0.2)',
                    color: 'rgba(34,211,238,0.8)',
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Experience */}
        {portfolio.experience.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <p className="text-pink-400 text-xs font-black uppercase tracking-widest mb-3">
                &gt; EXPERIENCE.FILTER(RELEVANT)
              </p>
              <h2 className="text-4xl font-black" style={{ textShadow: '0 0 20px rgba(236,72,153,0.3)' }}>
                Work History
              </h2>
            </div>
            <div className="space-y-4">
              {portfolio.experience.map((exp, i) => (
                <NeonCard key={exp.id} color="pink">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                      <div>
                        <h3 className="text-lg font-black text-white">{exp.role}</h3>
                        <p className="text-pink-400 text-sm font-bold mt-1">{exp.company}</p>
                      </div>
                      {exp.duration && (
                        <span
                          className="text-xs font-black px-3 py-1 rounded-full mt-2 md:mt-0 w-fit"
                          style={{
                            background: 'rgba(236,72,153,0.1)',
                            border: '1px solid rgba(236,72,153,0.3)',
                            color: '#ec4899',
                          }}
                        >
                          {exp.duration}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-white/40 text-sm leading-relaxed border-t border-white/5 pt-3 mt-3">
                        <span className="text-pink-400/60">&gt; </span>{exp.description}
                      </p>
                    )}
                  </motion.div>
                </NeonCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Education */}
        {portfolio.education.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-3">
                &gt; EDUCATION.LOAD()
              </p>
              <h2 className="text-4xl font-black" style={{ textShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
                Education
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.education.map((edu, i) => (
                <NeonCard key={edu.id} color="purple">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-2xl mb-3">🎓</div>
                    <h3 className="font-black text-white">{edu.college}</h3>
                    <p className="text-purple-400 text-sm mt-1">{edu.degree}</p>
                    {edu.year && (
                      <span
                        className="inline-block mt-3 text-xs font-black px-3 py-1 rounded-full"
                        style={{
                          background: 'rgba(168,85,247,0.1)',
                          border: '1px solid rgba(168,85,247,0.3)',
                          color: '#a855f7',
                        }}
                      >
                        CLASS OF {edu.year}
                      </span>
                    )}
                  </motion.div>
                </NeonCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-3">
                &gt; PROJECTS.RENDER()
              </p>
              <h2 className="text-4xl font-black" style={{ textShadow: '0 0 20px rgba(74,222,128,0.3)' }}>
                Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, i) => (
                <NeonCard key={project.id} color="green" className="group">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        animate={{ rotate: [0, 180, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-green-400 text-lg"
                        style={{ border: '1px solid rgba(74,222,128,0.3)' }}
                      >
                        ⚡
                      </motion.div>
                      <div className="flex gap-2">
                        {project.link && (
                          <motion.a
                            whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(34,211,238,0.4)' }}
                            href={project.link}
                            target="_blank"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all"
                            style={{
                              background: 'rgba(34,211,238,0.1)',
                              border: '1px solid rgba(34,211,238,0.3)',
                              color: '#22d3ee',
                            }}
                          >
                            ↗
                          </motion.a>
                        )}
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(236,72,153,0.4)' }}
                            href={project.github}
                            target="_blank"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all"
                            style={{
                              background: 'rgba(236,72,153,0.1)',
                              border: '1px solid rgba(236,72,153,0.3)',
                              color: '#ec4899',
                            }}
                          >
                            ⌥
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <h3
                      className="text-lg font-black text-white mb-2 group-hover:text-green-400 transition-colors"
                      style={{ letterSpacing: '0.05em' }}
                    >
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-white/40 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </motion.div>
                </NeonCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Certifications */}
        {portfolio.certifications.length > 0 && (
          <RevealSection>
            <div className="mb-12">
              <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-3">
                &gt; ACHIEVEMENTS.UNLOCK()
              </p>
              <h2 className="text-4xl font-black" style={{ textShadow: '0 0 20px rgba(250,204,21,0.3)' }}>
                Certifications
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, i) => (
                <NeonCard key={cert.id} color="yellow">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-yellow-400 font-black text-lg shrink-0"
                        style={{
                          background: 'rgba(250,204,21,0.1)',
                          border: '1px solid rgba(250,204,21,0.3)',
                        }}
                      >
                        ✦
                      </motion.div>
                      <div>
                        <p className="font-black text-sm text-white">{cert.name}</p>
                        {cert.issuer && <p className="text-yellow-400/60 text-xs mt-0.5">{cert.issuer}</p>}
                      </div>
                    </div>
                    {cert.link && (
                      <motion.a
                        whileHover={{ x: 3, textShadow: '0 0 10px rgba(34,211,238,0.8)' }}
                        href={cert.link}
                        target="_blank"
                        className="text-cyan-400 text-xs font-black ml-4 shrink-0"
                      >
                        VIEW →
                      </motion.a>
                    )}
                  </motion.div>
                </NeonCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* Contact */}
        <RevealSection>
          <div
            className="relative overflow-hidden rounded-3xl p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.05), rgba(236,72,153,0.05))',
              border: '1px solid rgba(34,211,238,0.2)',
              boxShadow: '0 0 60px rgba(34,211,238,0.1), inset 0 0 60px rgba(34,211,238,0.02)',
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-pink-400/40 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-pink-400/40 rounded-br-lg" />

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-5xl mb-6"
            >
              👾
            </motion.div>

            <h2
              className="text-4xl font-black mb-4"
              style={{ textShadow: '0 0 20px rgba(34,211,238,0.5)' }}
            >
              INITIATE_CONTACT()
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto mb-8 font-mono">
              <span className="text-cyan-400">&gt;</span> Ready to collaborate on next-gen projects.
              <br />
              <span className="text-cyan-400">&gt;</span> Status: <span className="text-green-400">ONLINE</span>
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              {portfolio.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,211,238,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  href={portfolio.linkedin}
                  target="_blank"
                  className="font-black px-8 py-4 rounded-xl text-sm tracking-widest transition-all"
                  style={{
                    background: 'rgba(34,211,238,0.1)',
                    border: '1px solid rgba(34,211,238,0.4)',
                    color: '#22d3ee',
                    textShadow: '0 0 10px rgba(34,211,238,0.5)',
                  }}
                >
                  CONNECT →
                </motion.a>
              )}
              {portfolio.github && (
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236,72,153,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  href={portfolio.github}
                  target="_blank"
                  className="font-black px-8 py-4 rounded-xl text-sm tracking-widest transition-all"
                  style={{
                    background: 'rgba(236,72,153,0.1)',
                    border: '1px solid rgba(236,72,153,0.4)',
                    color: '#ec4899',
                    textShadow: '0 0 10px rgba(236,72,153,0.5)',
                  }}
                >
                  GITHUB →
                </motion.a>
              )}
            </div>
          </div>
        </RevealSection>

      </div>

      {/* Footer */}
      <footer
        className="border-t py-10 text-center font-mono"
        style={{ borderColor: 'rgba(34,211,238,0.1)' }}
      >
        <motion.p
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xs text-cyan-400/30"
        >
          {showWatermark ? (
            <span>
              BUILT_WITH{' '}
              <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-cyan-400/60">PORTFOLIO_SAAS</a>
              {' // '}
              <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-cyan-400/60">REMOVE_WATERMARK</a>
            </span>
          ) : (
            <span>POWERED_BY PORTFOLIO_SAAS // ALL_SYSTEMS_NOMINAL</span>
          )}
        </motion.p>
      </footer>

    </main>
  )
}