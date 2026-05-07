'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion'

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

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9998] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #f97316, #ec4899, #a855f7)' }}
    />
  )
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [isVisible])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          x: springX, y: springY,
          translateX: '-50%', translateY: '-50%',
          width: 40, height: 40,
          border: '1px solid rgba(249,115,22,0.6)',
          opacity: isVisible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          x: cursorX, y: cursorY,
          translateX: '-50%', translateY: '-50%',
          width: 6, height: 6,
          background: '#f97316',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}

export default function TemplateCreative({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden">

      <CustomCursor />
      <ScrollProgress />

      {/* Cursor glow */}
      <div
        className="fixed pointer-events-none z-10 w-80 h-80 rounded-full blur-3xl opacity-10 transition-all duration-500"
        style={{
          background: 'radial-gradient(circle, #f97316, #ec4899)',
          left: mousePos.x - 160,
          top: mousePos.y - 160,
        }}
      />

      {/* NAV */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: 'rgba(12,12,12,0.9)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {portfolio.avatar ? (
              <img src={portfolio.avatar} alt={portfolio.name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-sm font-black">
                {portfolio.name.charAt(0)}
              </div>
            )}
            <span className="font-black text-sm text-white/80">{portfolio.name}</span>
          </div>
          <div className="flex items-center gap-4">
            {portfolio.website && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={portfolio.website}
                target="_blank"
                className="text-xs font-black px-4 py-2 rounded-full text-white"
                style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
              >
                Portfolio →
              </motion.a>
            )}
            {portfolio.linkedin && (
              <motion.a
                whileHover={{ color: '#f97316' }}
                href={portfolio.linkedin}
                target="_blank"
                className="text-xs text-white/40 font-medium transition-colors"
              >
                LinkedIn
              </motion.a>
            )}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.3, 1], x: [0, 60, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #f97316, transparent)' }}
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
          />
        </div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        <motion.div
          style={{ y: heroY }}
          className="relative max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20 w-full"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left">

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold mb-8"
                style={{
                  background: 'rgba(249,115,22,0.08)',
                  borderColor: 'rgba(249,115,22,0.2)',
                  color: '#fb923c',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-orange-400"
                />
                Creative Professional
              </motion.div>

              {/* Name */}
              <div className="mb-6">
                {portfolio.name.split(' ').map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
                  >
                    {i % 2 === 0 ? (
                      <span className="text-white">{word}</span>
                    ) : (
                      <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)' }}
                      >
                        {word}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              {portfolio.bio && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-white/40 text-lg max-w-xl leading-relaxed mb-8"
                >
                  {portfolio.bio}
                </motion.p>
              )}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-8 mb-8 justify-center lg:justify-start"
              >
                {[
                  { value: `${portfolio.projects.length}+`, label: 'Projects' },
                  { value: `${portfolio.skills.length}+`, label: 'Skills' },
                  { value: `${portfolio.experience.length}+`, label: 'Clients' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1, type: 'spring' }}
                  >
                    <p
                      className="text-3xl font-black bg-clip-text text-transparent"
                      style={{ backgroundImage: 'linear-gradient(135deg, #f97316, #ec4899)' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/30 font-medium mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-3 flex-wrap justify-center lg:justify-start"
              >
                {portfolio.website && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.website}
                    target="_blank"
                    className="relative overflow-hidden px-6 py-3 rounded-2xl text-sm font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="relative">View Portfolio →</span>
                  </motion.a>
                )}
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="px-6 py-3 rounded-2xl text-sm font-black text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                  >
                    LinkedIn
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Right — Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="relative shrink-0"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">

                {/* Rotating gradient border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-1 rounded-3xl"
                  style={{
                    background: 'conic-gradient(from 0deg, #f97316, #ec4899, #a855f7, #f97316)',
                    borderRadius: '28px',
                    padding: '2px',
                  }}
                />

                {portfolio.avatar ? (
                  <img
                    src={portfolio.avatar}
                    alt={portfolio.name}
                    className="relative w-full h-full rounded-3xl object-cover z-10"
                  />
                ) : (
                  <div
                    className="relative w-full h-full rounded-3xl flex items-center justify-center text-8xl font-black z-10"
                    style={{ background: 'linear-gradient(135deg, #1a0a00, #1a0010)' }}
                  >
                    <span style={{ color: 'rgba(249,115,22,0.3)' }}>{portfolio.name.charAt(0)}</span>
                  </div>
                )}

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 z-20 text-xs font-black px-4 py-2 rounded-2xl text-white"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
                >
                  ✦ Available
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-32 pb-32">

        {/* SKILLS */}
        {portfolio.skills.length > 0 && (
          <RevealSection>
            <div className="mb-10">
              <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">Expertise</p>
              <h2 className="text-4xl md:text-5xl font-black">Skills & Tools</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, type: 'spring' }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="px-5 py-2.5 rounded-2xl text-sm font-bold cursor-default group relative"
                  style={{
                    background: 'rgba(249,115,22,0.06)',
                    border: '1px solid rgba(249,115,22,0.15)',
                    color: 'rgba(249,115,22,0.8)',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm"
                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(236,72,153,0.2))' }}
                  />
                  <span className="relative">{skill}</span>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* PROJECTS — Visual Grid */}
        {portfolio.projects.length > 0 && (
          <RevealSection>
            <div className="mb-10">
              <p className="text-pink-400 text-xs font-black uppercase tracking-widest mb-3">Work</p>
              <h2 className="text-4xl md:text-5xl font-black">Featured Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative rounded-3xl overflow-hidden group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Color block top */}
                  <div
                    className="h-32 w-full relative overflow-hidden"
                    style={{
                      background: i % 3 === 0
                        ? 'linear-gradient(135deg, #f97316, #ec4899)'
                        : i % 3 === 1
                          ? 'linear-gradient(135deg, #a855f7, #6366f1)'
                          : 'linear-gradient(135deg, #ec4899, #a855f7)',
                    }}
                  >
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-white/10"
                      style={{ transform: 'skewX(-20deg)' }}
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.link && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.link}
                          target="_blank"
                          className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-xs font-black"
                        >
                          ↗
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.github}
                          target="_blank"
                          className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white text-xs font-black"
                        >
                          ⌥
                        </motion.a>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 text-5xl font-black text-white/10">
                      {project.title.charAt(0)}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-white/40 text-sm leading-relaxed">{project.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* EXPERIENCE */}
        {portfolio.experience.length > 0 && (
          <RevealSection>
            <div className="mb-10">
              <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-3">Journey</p>
              <h2 className="text-4xl md:text-5xl font-black">Experience</h2>
            </div>
            <div className="space-y-4">
              {portfolio.experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="rounded-3xl p-6 md:p-8 border group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderColor: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-orange-400 transition-colors">{exp.role}</h3>
                      <p className="text-orange-400/70 font-bold text-sm mt-1">{exp.company}</p>
                    </div>
                    {exp.duration && (
                      <span
                        className="text-xs font-bold px-4 py-1.5 rounded-full w-fit"
                        style={{
                          background: 'rgba(249,115,22,0.08)',
                          border: '1px solid rgba(249,115,22,0.2)',
                          color: '#fb923c',
                        }}
                      >
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-white/30 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {exp.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* EDUCATION */}
        {portfolio.education.length > 0 && (
          <RevealSection>
            <div className="mb-10">
              <p className="text-pink-400 text-xs font-black uppercase tracking-widest mb-3">Background</p>
              <h2 className="text-4xl md:text-5xl font-black">Education</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl p-8 border"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderColor: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="text-3xl mb-4">🎓</div>
                  <h3 className="font-black text-lg text-white">{edu.college}</h3>
                  <p className="text-white/40 text-sm mt-1">{edu.degree}</p>
                  {edu.year && (
                    <span
                      className="inline-block mt-3 text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(236,72,153,0.08)',
                        border: '1px solid rgba(236,72,153,0.2)',
                        color: '#f472b6',
                      }}
                    >
                      {edu.year}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* CERTIFICATIONS */}
        {portfolio.certifications.length > 0 && (
          <RevealSection>
            <div className="mb-10">
              <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">Achievements</p>
              <h2 className="text-4xl md:text-5xl font-black">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-3xl p-6 border flex justify-between items-center"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderColor: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-orange-400 shrink-0"
                      style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}
                    >
                      ✦
                    </div>
                    <div>
                      <p className="font-black text-sm text-white">{cert.name}</p>
                      {cert.issuer && <p className="text-white/30 text-xs mt-0.5">{cert.issuer}</p>}
                    </div>
                  </div>
                  {cert.link && (
                    <motion.a
                      whileHover={{ x: 4 }}
                      href={cert.link}
                      target="_blank"
                      className="text-orange-400 text-xs font-black ml-4 shrink-0"
                    >
                      View →
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* CONTACT */}
        <RevealSection>
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-white/10"
            />
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-5xl mb-6"
              >
                🎨
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Let's Create Together
              </h2>
              <p className="text-white/70 text-lg max-w-md mx-auto mb-10">
                Have a creative project in mind? Let's bring it to life.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="bg-white text-orange-600 font-black px-8 py-4 rounded-2xl shadow-xl"
                  >
                    Connect →
                  </motion.a>
                )}
                {portfolio.website && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    href={portfolio.website}
                    target="_blank"
                    className="bg-white/15 hover:bg-white/25 text-white font-black px-8 py-4 rounded-2xl border border-white/20 transition-colors"
                  >
                    Portfolio →
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </RevealSection>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 text-center">
        <p className="font-black text-xl text-white mb-2">{portfolio.name}</p>
        <p className="text-white/20 text-sm mb-6">{portfolio.bio?.slice(0, 60)}</p>
        <p className="text-xs text-white/10">
          {showWatermark ? (
            <span>
              Made with{' '}
              <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-white/30">Portfolio SaaS</a>
              {' — '}
              <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-white/30">Remove watermark</a>
            </span>
          ) : (
            <span>Built with Portfolio SaaS</span>
          )}
        </p>
      </footer>

    </main>
  )
}