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

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Template1({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans overflow-x-hidden">

      {/* Cursor glow effect */}
     {/* Cursor glow effect */}
      <div
        className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-15 blur-3xl transition-all duration-200"
        style={{
          background: 'radial-gradient(circle, #818cf8, #c084fc, #f472b6)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(168,85,247,0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {portfolio.avatar ? (
              <motion.img
                whileHover={{ scale: 1.15, rotate: 5 }}
                src={portfolio.avatar}
                alt={portfolio.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-400 ring-offset-2"
              />
            ) : (
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-purple-200"
              >
                {portfolio.name.charAt(0)}
              </motion.div>
            )}
            <span className="font-bold text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {portfolio.name}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {portfolio.github && (
              <motion.a
                whileHover={{ y: -2 }}
                href={portfolio.github}
                target="_blank"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                GitHub
              </motion.a>
            )}
            {portfolio.linkedin && (
              <motion.a
                whileHover={{ y: -2 }}
                href={portfolio.linkedin}
                target="_blank"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                LinkedIn
              </motion.a>
            )}
            {portfolio.twitter && (
              <motion.a
                whileHover={{ y: -2 }}
                href={portfolio.twitter}
                target="_blank"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                Twitter
              </motion.a>
            )}
            {portfolio.website && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={portfolio.website}
                target="_blank"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-shadow"
              >
                Website →
              </motion.a>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Animated gradient background */}
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(-45deg, #ede9fe, #fce7f3, #dbeafe, #ede9fe, #fdf2f8)',
            backgroundSize: '400% 400%',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-20 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-40"
          />
          <motion.div
            animate={{ x: [0, -60, 0], y: [0, 80, 0], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-40 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"
          />
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-40"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-40 right-1/3 w-48 h-48 bg-blue-300 rounded-full blur-3xl opacity-30"
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-6xl mx-auto px-8 pt-32 pb-20 w-full"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              className="relative shrink-0"
            >
              {portfolio.avatar ? (
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-1 rounded-3xl opacity-90"
                    style={{
                      background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f97316, #6366f1)',
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-2 rounded-3xl opacity-40 blur-sm"
                    style={{
                      background: 'conic-gradient(from 180deg, #6366f1, #a855f7, #ec4899, #6366f1)',
                    }}
                  />
                  <img
                    src={portfolio.avatar}
                    alt={portfolio.name}
                    className="relative w-48 h-48 rounded-3xl object-cover"
                  />
                </div>
              ) : (
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-1 rounded-3xl"
                    style={{
                      background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f97316, #6366f1)',
                    }}
                  />
                  <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-7xl font-bold text-white">
                    {portfolio.name.charAt(0)}
                  </div>
                </div>
              )}

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-green-200"
              >
                ✦ Available
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-orange-200"
              >
                🚀 Open to work
              </motion.div>
            </motion.div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
                  borderColor: 'rgba(168,85,247,0.3)',
                  color: '#7c3aed',
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-purple-500 rounded-full"
                />
                Personal Portfolio
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl md:text-7xl font-black tracking-tight leading-none mb-6"
              >
                {portfolio.name.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`inline-block mr-3 ${
                      i % 2 === 1
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {portfolio.bio && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-gray-500 max-w-xl leading-relaxed mb-8"
                >
                  {portfolio.bio}
                </motion.p>
              )}

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-8 mb-8 justify-center md:justify-start"
              >
                {portfolio.skills.length > 0 && (
                  <div>
                    <p className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {portfolio.skills.length}+
                    </p>
                    <p className="text-xs text-gray-400 font-medium">Skills</p>
                  </div>
                )}
                {portfolio.projects.length > 0 && (
                  <div>
                    <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {portfolio.projects.length}+
                    </p>
                    <p className="text-xs text-gray-400 font-medium">Projects</p>
                  </div>
                )}
                {portfolio.experience.length > 0 && (
                  <div>
                    <p className="text-2xl font-black bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                      {portfolio.experience.length}+
                    </p>
                    <p className="text-xs text-gray-400 font-medium">Experience</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex gap-3 flex-wrap justify-center md:justify-start"
              >
                {portfolio.github && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.github}
                    target="_blank"
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    GitHub
                  </motion.a>
                )}
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="flex items-center gap-2 bg-[#0077b5] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    LinkedIn
                  </motion.a>
                )}
                {portfolio.twitter && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.twitter}
                    target="_blank"
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-shadow"
                  >
                    Twitter
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-purple-300 rounded-full flex items-start justify-center pt-1.5"
          >
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-purple-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-8 space-y-32 pb-32">

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">What I know</span>
              <h2 className="text-4xl font-black mt-2">Skills & Technologies</h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {portfolio.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: 'spring' }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="bg-white text-gray-700 px-6 py-3 rounded-2xl text-sm font-semibold shadow-sm border border-gray-100 cursor-default hover:shadow-lg hover:border-blue-100 hover:text-blue-600 transition-all"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </FadeInSection>
        )}

        {/* Experience */}
        {portfolio.experience.length > 0 && (
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Where I've worked</span>
              <h2 className="text-4xl font-black mt-2">Experience</h2>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-transparent hidden md:block"></div>
              <div className="space-y-6">
                {portfolio.experience.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="relative md:pl-20 group"
                  >
                    <div className="absolute left-5 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg hidden md:flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:border-blue-50 transition-all">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold">{exp.role}</h3>
                          <p className="text-blue-600 font-semibold text-sm mt-1">{exp.company}</p>
                        </div>
                        {exp.duration && (
                          <span className="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full border mt-2 md:mt-0 w-fit font-medium">
                            {exp.duration}
                          </span>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-50">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* Education */}
        {portfolio.education.length > 0 && (
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Where I studied</span>
              <h2 className="text-4xl font-black mt-2">Education</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 mb-4 flex items-center justify-center text-white text-xl font-black">
                    🎓
                  </div>
                  <h3 className="font-black text-lg group-hover:text-green-600 transition-colors">{edu.college}</h3>
                  <p className="text-gray-500 text-sm mt-1">{edu.degree}</p>
                  {edu.year && (
                    <span className="inline-block mt-3 text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border font-medium">
                      {edu.year}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">What I've built</span>
              <h2 className="text-4xl font-black mt-2">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 mb-6 shadow-lg"></div>
                    <h3 className="text-xl font-black mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{project.description}</p>
                    )}
                    <div className="flex gap-4">
                      {project.link && (
                        <motion.a
                          whileHover={{ x: 4 }}
                          href={project.link}
                          target="_blank"
                          className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
                        >
                          Live Demo →
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a
                          whileHover={{ x: 4 }}
                          href={project.github}
                          target="_blank"
                          className="text-gray-400 text-sm font-medium hover:text-gray-700 flex items-center gap-1"
                        >
                          GitHub →
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        )}

        {/* Certifications */}
        {portfolio.certifications.length > 0 && (
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Achievements</span>
              <h2 className="text-4xl font-black mt-2">Certifications</h2>
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
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                      ✦
                    </div>
                    <div>
                      <p className="font-bold text-sm group-hover:text-yellow-600 transition-colors">{cert.name}</p>
                      {cert.issuer && <p className="text-gray-400 text-xs mt-0.5">{cert.issuer}</p>}
                    </div>
                  </div>
                  {cert.link && (
                    <motion.a
                      whileHover={{ x: 3 }}
                      href={cert.link}
                      target="_blank"
                      className="text-blue-600 text-xs font-bold hover:underline ml-4 shrink-0"
                    >
                      View →
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        )}

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-8"
        >
          <p className="text-2xl font-black mb-2">{portfolio.name}</p>
          <p className="text-gray-400 text-sm mb-6">{portfolio.bio?.slice(0, 60)}...</p>
          <div className="flex justify-center gap-4 mb-8">
            {portfolio.github && <a href={portfolio.github} target="_blank" className="text-gray-400 hover:text-black text-sm transition">GitHub</a>}
            {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="text-gray-400 hover:text-black text-sm transition">LinkedIn</a>}
            {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="text-gray-400 hover:text-black text-sm transition">Twitter</a>}
          </div>
          <p className="text-xs text-gray-300">
            {showWatermark ? (
              <span>
                Made with{' '}
                <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-gray-500">Portfolio SaaS</a>
                {' — '}
                <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-gray-500">Remove watermark</a>
              </span>
            ) : (
              <span>Built with Portfolio SaaS</span>
            )}
          </p>
        </motion.div>
      </footer>
{/* Contact */}
      <FadeInSection>
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          
          {/* Background decoration */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"
          />

          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6"
            >
              👋
            </motion.div>

            <h2 className="text-4xl font-black mb-4">Let's Work Together</h2>
            <p className="text-white/80 text-lg max-w-md mx-auto mb-8">
              Have a project in mind? I'd love to hear about it. Let's build something amazing together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {portfolio.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={portfolio.linkedin}
                  target="_blank"
                  className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:shadow-xl transition-all"
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
                  className="bg-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/30 transition-all border border-white/30"
                >
                  View GitHub →
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </FadeInSection>
    </main>
  )
}