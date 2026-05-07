'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
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
      className="fixed top-0 left-0 right-0 h-0.5 z-[9998] origin-left bg-black"
      style={{ scaleX }}
    />
  )
}

function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function TemplateWords({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, -80])

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden font-serif">

      <ScrollProgress />

      {/* NAV — Minimal */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-xl"
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
          <span className="font-serif font-bold text-sm">{portfolio.name}</span>
          <div className="flex items-center gap-6 text-xs">
            {portfolio.website && (
              <motion.a
                whileHover={{ opacity: 0.6 }}
                href={portfolio.website}
                target="_blank"
                className="text-black/60 transition-opacity"
              >
                Portfolio
              </motion.a>
            )}
            {portfolio.linkedin && (
              <motion.a
                whileHover={{ opacity: 0.6 }}
                href={portfolio.linkedin}
                target="_blank"
                className="text-black/60 transition-opacity"
              >
                LinkedIn
              </motion.a>
            )}
          </div>
        </div>
      </motion.nav>

      {/* HERO — Editorial style */}
      <section className="relative min-h-screen flex items-center">
        <motion.div
          style={{ y: heroY }}
          className="relative max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-20 w-full"
        >
          <div className="text-center">

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-px bg-black/10 w-16 mx-auto mb-12"
            />

            {/* Name */}
            <div className="mb-8">
              {portfolio.name.split(' ').map((word, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                >
                  {word}
                </motion.div>
              ))}
            </div>

            {/* Bio — prominent */}
            {portfolio.bio && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl leading-relaxed text-black/60 max-w-2xl mx-auto mb-12 font-light"
              >
                {portfolio.bio}
              </motion.p>
            )}

            {/* Avatar — small and elegant */}
            {portfolio.avatar && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="w-24 h-24 rounded-full mx-auto mb-8 border border-black/10 overflow-hidden"
              >
                <img src={portfolio.avatar} alt={portfolio.name} className="w-full h-full object-cover" />
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-12 justify-center text-sm mb-12"
            >
              {[
                { value: portfolio.projects.length, label: 'Published' },
                { value: portfolio.skills.length, label: 'Skills' },
                { value: portfolio.experience.length, label: 'Roles' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-black/40 text-xs font-light mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex gap-4 justify-center"
            >
              {portfolio.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={portfolio.linkedin}
                  target="_blank"
                  className="px-8 py-3 bg-black text-white rounded-full text-sm font-semibold"
                >
                  Connect
                </motion.a>
              )}
              {portfolio.website && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={portfolio.website}
                  target="_blank"
                  className="px-8 py-3 border border-black/20 text-black rounded-full text-sm font-semibold hover:border-black/40 transition-colors"
                >
                  Portfolio
                </motion.a>
              )}
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="h-px bg-black/10 w-16 mx-auto mt-12"
            />
          </div>
        </motion.div>
      </section>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-24 pb-32">

        {/* SKILLS — Simple list */}
        {portfolio.skills.length > 0 && (
          <RevealSection>
            <div className="border-t border-black/10 pt-12">
              <h2 className="text-xs uppercase tracking-widest text-black/40 mb-8 font-sans font-bold">Skills</h2>
              <div className="space-y-3">
                {portfolio.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                    <span className="text-lg font-light">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>
        )}

        {/* PROJECTS — Article style */}
        {portfolio.projects.length > 0 && (
          <RevealSection>
            <div className="border-t border-black/10 pt-12">
              <h2 className="text-xs uppercase tracking-widest text-black/40 mb-12 font-sans font-bold">Writing</h2>
              <div className="space-y-12">
                {portfolio.projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="mb-4">
                      <motion.h3
                        whileHover={{ x: 4 }}
                        className="text-3xl font-bold mb-2 cursor-pointer transition-transform"
                      >
                        {project.link ? (
                          <a href={project.link} target="_blank" className="hover:opacity-60">
                            {project.title} →
                          </a>
                        ) : (
                          project.title
                        )}
                      </motion.h3>
                      {project.description && (
                        <p className="text-lg text-black/60 leading-relaxed font-light">
                          {project.description}
                        </p>
                      )}
                    </div>
                    {i < portfolio.projects.length - 1 && (
                      <div className="h-px bg-black/5 mt-8" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>
        )}

        {/* EXPERIENCE — Clean timeline */}
        {portfolio.experience.length > 0 && (
          <RevealSection>
            <div className="border-t border-black/10 pt-12">
              <h2 className="text-xs uppercase tracking-widest text-black/40 mb-12 font-sans font-bold">Experience</h2>
              <div className="space-y-8">
                {portfolio.experience.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col md:flex-row md:justify-between gap-3"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-black/60 font-light">{exp.company}</p>
                      {exp.description && (
                        <p className="text-black/50 text-sm mt-2 leading-relaxed font-light">
                          {exp.description}
                        </p>
                      )}
                    </div>
                    {exp.duration && (
                      <span className="text-sm text-black/40 font-light shrink-0 md:text-right">
                        {exp.duration}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>
        )}

        {/* EDUCATION */}
        {portfolio.education.length > 0 && (
          <RevealSection>
            <div className="border-t border-black/10 pt-12">
              <h2 className="text-xs uppercase tracking-widest text-black/40 mb-12 font-sans font-bold">Education</h2>
              <div className="space-y-6">
                {portfolio.education.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col md:flex-row md:justify-between gap-2"
                  >
                    <div>
                      <h3 className="text-lg font-bold">{edu.college}</h3>
                      <p className="text-black/60 font-light">{edu.degree}</p>
                    </div>
                    {edu.year && (
                      <span className="text-sm text-black/40 font-light">{edu.year}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>
        )}

        {/* CERTIFICATIONS */}
        {portfolio.certifications.length > 0 && (
          <RevealSection>
            <div className="border-t border-black/10 pt-12">
              <h2 className="text-xs uppercase tracking-widest text-black/40 mb-12 font-sans font-bold">Certifications</h2>
              <div className="space-y-4">
                {portfolio.certifications.map((cert, i) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex justify-between items-start gap-4"
                  >
                    <div>
                      <p className="font-semibold">{cert.name}</p>
                      {cert.issuer && <p className="text-black/50 text-sm font-light mt-0.5">{cert.issuer}</p>}
                    </div>
                    {cert.link && (
                      <motion.a
                        whileHover={{ x: 4 }}
                        href={cert.link}
                        target="_blank"
                        className="text-sm text-black/40 shrink-0 hover:text-black transition-colors"
                      >
                        View →
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>
        )}

        {/* CONTACT — Simple */}
        <RevealSection>
          <div className="border-t border-black/10 pt-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-4xl mb-6"
            >
              ✉️
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Talk</h2>
            <p className="text-black/50 text-lg max-w-md mx-auto mb-10 font-light">
              Have a story to tell or a project to discuss? I'd love to hear from you.
            </p>
            <div className="flex gap-4 justify-center">
              {portfolio.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={portfolio.linkedin}
                  target="_blank"
                  className="px-8 py-3 bg-black text-white rounded-full text-sm font-semibold"
                >
                  Connect on LinkedIn
                </motion.a>
              )}
              {portfolio.website && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={portfolio.website}
                  target="_blank"
                  className="px-8 py-3 border border-black/20 text-black rounded-full text-sm font-semibold hover:border-black/40 transition-colors"
                >
                  Visit Portfolio
                </motion.a>
              )}
            </div>
          </div>
        </RevealSection>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-black/5 py-12 text-center">
        <p className="font-bold text-lg mb-2">{portfolio.name}</p>
        <p className="text-black/30 text-sm mb-6 font-light">{portfolio.bio?.slice(0, 70)}</p>
        <div className="flex justify-center gap-6 mb-8 text-sm">
          {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="text-black/30 hover:text-black/60 transition-colors">LinkedIn</a>}
          {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="text-black/30 hover:text-black/60 transition-colors">Twitter</a>}
          {portfolio.website && <a href={portfolio.website} target="_blank" className="text-black/30 hover:text-black/60 transition-colors">Website</a>}
        </div>
        <p className="text-xs text-black/20 font-light">
          {showWatermark ? (
            <span>
              Made with{' '}
              <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-black/40">Portfolio SaaS</a>
              {' — '}
              <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-black/40">Remove watermark</a>
            </span>
          ) : (
            <span>Built with Portfolio SaaS</span>
          )}
        </p>
      </footer>

    </main>
  )
}