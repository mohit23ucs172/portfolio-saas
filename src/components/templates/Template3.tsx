'use client'
 
import { useEffect, useRef, useState, useCallback } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'
 
// ============================================================
// TYPES
// ============================================================
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
 
// ============================================================
// CONSTANTS
// ============================================================
const CYAN = '#22d3ee'
const PINK = '#ec4899'
const PURPLE = '#a855f7'
const GREEN = '#4ade80'
const AMBER = '#fbbf24'
 
// ============================================================
// PARTICLE CANVAS — floating circuit nodes
// ============================================================
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
 
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
 
    let animId: number
    let W = window.innerWidth
    let H = window.innerHeight
 
    canvas.width = W
    canvas.height = H
 
    const COUNT = Math.floor((W * H) / 18000)
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }
    const COLORS = [CYAN, PINK, PURPLE]
 
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
 
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `${r},${g},${b}`
    }
 
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
 
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            const alpha = (1 - dist / 120) * 0.12
            ctx.strokeStyle = `rgba(${hexToRgb(CYAN)},${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
 
      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`
        ctx.fill()
 
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      }
 
      animId = requestAnimationFrame(draw)
    }
 
    draw()
 
    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)
 
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])
 
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.6 }}
    />
  )
}
 
// ============================================================
// NOISE GRAIN OVERLAY
// ============================================================
function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[60] opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }}
    />
  )
}
 
// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9998] origin-left"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${CYAN}, ${PURPLE}, ${PINK})`,
          boxShadow: `0 0 12px ${CYAN}`,
        }}
      />
      {/* Percentage indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-[9998] font-mono text-xs font-black"
        style={{ color: `${CYAN}99` }}
      >
        <motion.span>{useTransform(scrollYProgress, v => `${Math.round(v * 100)}%`)}</motion.span>
      </motion.div>
    </>
  )
}
 
// ============================================================
// HEXAGONAL CUSTOM CURSOR
// ============================================================
function CustomCursor() {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 20 })
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 20 })
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 40 })
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 40 })
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
 
  useEffect(() => {
    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); setVisible(true) }
    const down = () => setClicking(true)
    const up = () => setClicking(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])
 
  if (!visible) return null
 
  return (
    <>
      {/* Outer hex ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: trailX, y: trailY,
          translateX: '-50%', translateY: '-50%',
          width: clicking ? 28 : 36, height: clicking ? 28 : 36,
          opacity: 0.7,
          transition: 'width 0.15s, height 0.15s',
        }}
      >
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="18,2 34,10 34,26 18,34 2,26 2,10"
            stroke={CYAN}
            strokeWidth="1"
            fill="none"
            style={{ filter: `drop-shadow(0 0 4px ${CYAN})` }}
          />
        </svg>
      </motion.div>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width: 4, height: 4,
          background: CYAN,
          borderRadius: '50%',
          boxShadow: `0 0 8px ${CYAN}`,
        }}
      />
    </>
  )
}
 
// ============================================================
// TYPEWRITER with multi-text cycling
// ============================================================
function TypewriterText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
 
  useEffect(() => {
    const current = texts[idx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1))
        } else {
          setTimeout(() => setDeleting(true), 2200)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1))
        } else {
          setDeleting(false)
          setIdx((idx + 1) % texts.length)
        }
      }
    }, deleting ? 30 : 60)
    return () => clearTimeout(timeout)
  }, [displayed, deleting, idx, texts])
 
  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ color: CYAN }}
      >_</motion.span>
    </span>
  )
}
 
// ============================================================
// GLITCH TEXT EFFECT
// ============================================================
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [g, setG] = useState(false)
  useEffect(() => {
    const iv = setInterval(() => {
      setG(true)
      setTimeout(() => setG(false), 120)
    }, 3500)
    return () => clearInterval(iv)
  }, [])
 
  return (
    <span className={`relative inline-block ${className}`}>
      {g && <>
        <span className="absolute inset-0" style={{ color: PINK, clipPath: 'inset(15% 0 55% 0)', transform: 'translate(-4px,1px)', opacity: 0.85 }}>{text}</span>
        <span className="absolute inset-0" style={{ color: CYAN, clipPath: 'inset(55% 0 15% 0)', transform: 'translate(4px,-1px)', opacity: 0.85 }}>{text}</span>
        <span className="absolute inset-0" style={{ color: PURPLE, clipPath: 'inset(35% 0 35% 0)', transform: 'translate(2px,0)', opacity: 0.5 }}>{text}</span>
      </>}
      <span style={{ textShadow: g ? `2px 0 ${CYAN}, -2px 0 ${PINK}` : 'none' }}>{text}</span>
    </span>
  )
}
 
// ============================================================
// LIVE TERMINAL CONSOLE
// ============================================================
function TerminalConsole({ portfolio }: { portfolio: Portfolio }) {
  const lines = [
    { delay: 0, text: '> Initializing neural interface...', color: CYAN },
    { delay: 600, text: `> Loading profile: ${portfolio.name}`, color: '#ffffff99' },
    { delay: 1200, text: `> Skills matrix: [${portfolio.skills.length} modules]`, color: GREEN },
    { delay: 1800, text: `> Projects deployed: ${portfolio.projects.length}`, color: GREEN },
    { delay: 2400, text: `> Experience nodes: ${portfolio.experience.length}`, color: GREEN },
    { delay: 3000, text: '> Status: AVAILABLE_FOR_HIRE', color: AMBER },
    { delay: 3600, text: '> Uptime: 99.99% | Latency: <1ms', color: '#ffffff44' },
    { delay: 4200, text: '> All systems nominal. Ready.', color: CYAN },
  ]
  const [visible, setVisible] = useState<number[]>([])
 
  useEffect(() => {
    lines.forEach((l, i) => {
      setTimeout(() => setVisible(v => [...v, i]), l.delay)
    })
  }, [])
 
  return (
    <div
      className="font-mono text-xs leading-6 p-4 rounded-xl"
      style={{
        background: 'rgba(0,0,0,0.6)',
        border: `1px solid ${CYAN}22`,
        boxShadow: `inset 0 0 20px rgba(0,0,0,0.5), 0 0 20px ${CYAN}08`,
      }}
    >
      {lines.map((l, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={visible.includes(i) ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
          style={{ color: l.color }}
        >
          {l.text}
        </motion.div>
      ))}
      {visible.length === lines.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{ color: CYAN }}
        >▋</motion.span>
      )}
    </div>
  )
}
 
// ============================================================
// 3D TILT CARD
// ============================================================
function TiltCard({ children, color = 'cyan', className = '' }: {
  children: React.ReactNode
  color?: 'cyan' | 'pink' | 'purple' | 'green' | 'yellow'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
 
  const COLORS: Record<string, { border: string; glow: string; accent: string }> = {
    cyan:   { border: `${CYAN}30`,   glow: `${CYAN}15`,   accent: CYAN },
    pink:   { border: `${PINK}30`,   glow: `${PINK}15`,   accent: PINK },
    purple: { border: `${PURPLE}30`, glow: `${PURPLE}15`, accent: PURPLE },
    green:  { border: `${GREEN}30`,  glow: `${GREEN}15`,  accent: GREEN },
    yellow: { border: `${AMBER}30`,  glow: `${AMBER}15`,  accent: AMBER },
  }
  const c = COLORS[color]
 
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: cy * -12, y: cx * 12 })
  }, [])
 
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: hovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        background: hovered
          ? `linear-gradient(135deg, ${c.glow}, rgba(0,0,0,0.4))`
          : `rgba(255,255,255,0.02)`,
        border: `1px solid ${hovered ? c.border : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${c.glow}` : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Shimmer on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${c.accent}15 50%, transparent 60%)`,
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px rounded-full"
        style={{ background: hovered ? `linear-gradient(90deg, transparent, ${c.accent}60, transparent)` : 'transparent', transition: 'background 0.3s' }}
      />
      {children}
    </motion.div>
  )
}
 
// ============================================================
// SECTION REVEAL
// ============================================================
function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
 
// ============================================================
// SECTION HEADER
// ============================================================
function SectionHeader({ label, title, color = CYAN }: { label: string; title: string; color?: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px" style={{ background: color }} />
        <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: `${color}80` }}>
          {label}
        </p>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
      </div>
      <h2
        className="text-4xl md:text-5xl font-black tracking-tight"
        style={{ textShadow: `0 0 40px ${color}30` }}
      >
        {title}
      </h2>
    </div>
  )
}
 
// ============================================================
// SKILL BADGE with animated border
// ============================================================
function SkillBadge({ skill, index }: { skill: string; index: number }) {
  const [hov, setHov] = useState(false)
  const colors = [CYAN, PINK, PURPLE, GREEN, AMBER]
  const accent = colors[index % colors.length]
 
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.035, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative px-4 py-2 rounded-xl text-xs font-black cursor-default select-none"
      style={{
        background: hov ? `${accent}15` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? accent + '50' : 'rgba(255,255,255,0.08)'}`,
        color: hov ? accent : 'rgba(255,255,255,0.4)',
        textShadow: hov ? `0 0 10px ${accent}80` : 'none',
        boxShadow: hov ? `0 0 20px ${accent}20, inset 0 0 10px ${accent}08` : 'none',
        transform: hov ? 'translateY(-4px) scale(1.05)' : 'none',
        transition: 'all 0.2s ease',
        letterSpacing: '0.05em',
      }}
    >
      {hov && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ border: `1px solid ${accent}30` }}
        />
      )}
      {skill}
    </motion.div>
  )
}
 
// ============================================================
// EXPERIENCE TIMELINE CARD
// ============================================================
function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
 
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(180deg, ${PINK}60, transparent)`, marginLeft: '-1px' }} />
      <div
        className="absolute left-0 top-8 w-3 h-3 rounded-full"
        style={{
          background: PINK,
          boxShadow: `0 0 12px ${PINK}`,
          transform: 'translateX(-50%)',
          border: '2px solid #030307',
        }}
      />
 
      <TiltCard color="pink" className="ml-8 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ background: PINK, boxShadow: `0 0 6px ${PINK}` }} />
              <h3 className="text-xl font-black text-white tracking-tight">{exp.role}</h3>
            </div>
            <p className="font-bold text-sm ml-4" style={{ color: PINK }}>{exp.company}</p>
          </div>
          {exp.duration && (
            <span
              className="text-xs font-black px-4 py-1.5 rounded-full shrink-0 w-fit"
              style={{
                background: `${PINK}10`,
                border: `1px solid ${PINK}25`,
                color: '#f472b6',
                letterSpacing: '0.05em',
              }}
            >
              {exp.duration}
            </span>
          )}
        </div>
        {exp.description && (
          <p className="text-sm leading-relaxed border-t pt-4" style={{ color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.05)' }}>
            <span style={{ color: `${PINK}60` }}>&gt; </span>{exp.description}
          </p>
        )}
      </TiltCard>
    </motion.div>
  )
}
 
// ============================================================
// PROJECT CARD — advanced
// ============================================================
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hov, setHov] = useState(false)
 
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard
        color="green"
        className="p-6 md:p-8 h-full group"
      >
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          className="h-full flex flex-col"
        >
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <div className="relative">
              {/* Hex icon */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <motion.polygon
                  points="22,3 41,12 41,32 22,41 3,32 3,12"
                  stroke={GREEN}
                  strokeWidth="1"
                  fill={hov ? `${GREEN}15` : 'none'}
                  style={{ filter: hov ? `drop-shadow(0 0 6px ${GREEN})` : 'none', transition: 'all 0.3s' }}
                />
                <text x="22" y="27" textAnchor="middle" fill={GREEN} fontSize="14" fontFamily="monospace" fontWeight="bold">
                  {String(index + 1).padStart(2, '0')}
                </text>
              </svg>
            </div>
 
            <div className="flex gap-2">
              {project.link && (
                <motion.a
                  whileHover={{ scale: 1.15, boxShadow: `0 0 16px ${CYAN}60` }}
                  href={project.link}
                  target="_blank"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black"
                  style={{ background: `${CYAN}10`, border: `1px solid ${CYAN}25`, color: CYAN }}
                >
                  ↗
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  whileHover={{ scale: 1.15, boxShadow: `0 0 16px ${PINK}60` }}
                  href={project.github}
                  target="_blank"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black"
                  style={{ background: `${PINK}10`, border: `1px solid ${PINK}25`, color: PINK }}
                >
                  ⌥
                </motion.a>
              )}
            </div>
          </div>
 
          <h3
            className="text-lg font-black mb-3 tracking-tight transition-colors"
            style={{ color: hov ? GREEN : 'white', textShadow: hov ? `0 0 20px ${GREEN}60` : 'none', transition: 'all 0.3s' }}
          >
            {project.title}
          </h3>
 
          {project.description && (
            <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {project.description}
            </p>
          )}
 
          {/* Bottom accent */}
          <div
            className="mt-4 h-px rounded-full transition-all duration-500"
            style={{ background: hov ? `linear-gradient(90deg, ${GREEN}60, transparent)` : 'transparent' }}
          />
        </div>
      </TiltCard>
    </motion.div>
  )
}
 
// ============================================================
// STATS COUNTER
// ============================================================
function StatCounter({ value, label, color }: { value: number; label: string; color: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
 
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = value / 40
    const iv = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(iv) }
      else setCount(Math.floor(start))
    }, 30)
    return () => clearInterval(iv)
  }, [inView, value])
 
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black mb-1" style={{ color, textShadow: `0 0 20px ${color}60` }}>
        {count}+
      </div>
      <div className="text-xs font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
        {label}
      </div>
    </div>
  )
}
 
// ============================================================
// MAIN TEMPLATE
// ============================================================
export default function Template3Advanced({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
 
  useEffect(() => {
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])
 
  const roles = [
    'Principal Engineer',
    'Systems Architect',
    'Full-Stack Craftsman',
    'Infrastructure Wizard',
    'Performance Obsessive',
  ]
 
  return (
    <main
      className="min-h-screen text-white overflow-x-hidden"
      style={{ background: '#020206', fontFamily: "'JetBrains Mono', 'Fira Code', monospace", cursor: 'none' }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Syne:wght@700;800&display=swap');
        * { cursor: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020206; }
        ::-webkit-scrollbar-thumb { background: ${CYAN}40; border-radius: 2px; }
        ::selection { background: ${CYAN}30; color: ${CYAN}; }
      `}</style>
 
      <CustomCursor />
      <ScrollProgress />
      <ParticleField />
      <GrainOverlay />
 
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-[15] opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(34,211,238,0.15) 3px, rgba(34,211,238,0.15) 4px)',
        }}
      />
 
      {/* Mouse ambient light */}
      <div
        className="fixed pointer-events-none z-[5] w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.06] transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${CYAN}, ${PURPLE})`,
          left: mousePos.x - 250,
          top: mousePos.y - 250,
        }}
      />
 
      {/* BG decorative layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">
        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${CYAN}80 1px, transparent 1px), linear-gradient(90deg, ${CYAN}80 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Large grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${CYAN} 1px, transparent 1px), linear-gradient(90deg, ${CYAN} 1px, transparent 1px)`,
            backgroundSize: '250px 250px',
          }}
        />
        {/* Perspective floor */}
        <div
          className="absolute bottom-0 left-[-20%] right-[-20%] h-80 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(${CYAN} 1px, transparent 1px), linear-gradient(90deg, ${CYAN} 1px, transparent 1px)`,
            backgroundSize: '100px 50px',
            transform: 'perspective(400px) rotateX(70deg)',
            transformOrigin: 'bottom',
          }}
        />
        {/* Ambient orbs */}
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${CYAN}, transparent)` }}
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${PINK}, transparent)` }}
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${PURPLE}, transparent)` }}
        />
      </div>
 
      {/* ====================================================
          NAV
      ==================================================== */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(2,2,6,0.85)',
          backdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${CYAN}10`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ boxShadow: [`0 0 6px ${CYAN}`, `0 0 18px ${CYAN}`, `0 0 6px ${CYAN}`] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: CYAN }}
            />
            <div className="flex items-center gap-2">
              {portfolio.avatar ? (
                <img
                  src={portfolio.avatar}
                  alt={portfolio.name}
                  className="w-7 h-7 object-cover"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    filter: `drop-shadow(0 0 6px ${CYAN}60)`,
                  }}
                />
              ) : (
                <div
                  className="w-7 h-7 flex items-center justify-center text-xs font-black"
                  style={{
                    border: `1px solid ${CYAN}40`,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    color: CYAN,
                  }}
                >
                  {portfolio.name.charAt(0)}
                </div>
              )}
              <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: CYAN }}>
                {portfolio.name.split(' ')[0]}
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>.exe</span>
              </span>
            </div>
          </div>
 
          {/* Nav links */}
          <div className="flex items-center gap-6 text-xs font-black tracking-widest">
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>[ </span>
            {[
              { label: 'GitHub', href: portfolio.github },
              { label: 'LinkedIn', href: portfolio.linkedin },
              { label: 'Twitter', href: portfolio.twitter },
              { label: 'Website', href: portfolio.website },
            ].filter(l => l.href).map(l => (
              <motion.a
                key={l.label}
                whileHover={{ color: CYAN, textShadow: `0 0 8px ${CYAN}80` }}
                href={l.href!}
                target="_blank"
                className="uppercase transition-all"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {l.label}
              </motion.a>
            ))}
            <span style={{ color: 'rgba(255,255,255,0.12)' }}> ]</span>
          </div>
        </div>
 
        {/* Animated nav underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${CYAN}60, transparent)` }}
          animate={{ width: ['0%', '100%', '0%'], left: ['0%', '0%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.nav>
 
      {/* ====================================================
          HERO
      ==================================================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-20 w-full z-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-20">
 
            {/* LEFT */}
            <div className="flex-1 text-center lg:text-left">
 
              {/* Terminal prompt */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xs font-black tracking-widest mb-8 flex items-center gap-1 justify-center lg:justify-start"
              >
                <span style={{ color: `${GREEN}80` }}>root@portfolio</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>:</span>
                <span style={{ color: `${CYAN}80` }}>~/dev</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>$</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}> ./start.sh --mode=showcase</span>
              </motion.div>
 
              {/* Name */}
              <div className="mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
                {portfolio.name.split(' ').map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {i === 0 ? (
                      <GlitchText
                        text={word}
                        className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tight leading-none text-white"
                      />
                    ) : (
                      <span
                        className="text-[clamp(3.5rem,10vw,7rem)] font-black tracking-tight leading-none block"
                        style={{
                          color: 'transparent',
                          WebkitTextStroke: '1.5px rgba(34,211,238,0.6)',
                          textShadow: `0 0 60px ${CYAN}20`,
                        }}
                      >
                        {word}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
 
              {/* Role typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl md:text-2xl font-black mb-6 h-8"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                <TypewriterText texts={roles} />
              </motion.div>
 
              {/* Bio */}
              {portfolio.bio && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm leading-relaxed mb-8 max-w-lg"
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    borderLeft: `2px solid ${CYAN}30`,
                    paddingLeft: '14px',
                  }}
                >
                  <span style={{ color: `${CYAN}50` }}>&gt; </span>{portfolio.bio}
                </motion.div>
              )}
 
              {/* Terminal console */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="mb-8 max-w-lg"
              >
                <TerminalConsole portfolio={portfolio} />
              </motion.div>
 
              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="flex gap-3 flex-wrap justify-center lg:justify-start"
              >
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.06, boxShadow: `0 0 40px ${CYAN}50` }}
                    whileTap={{ scale: 0.96 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="relative overflow-hidden px-7 py-3.5 rounded-xl text-sm font-black tracking-widest uppercase"
                    style={{
                      background: `${CYAN}10`,
                      border: `1px solid ${CYAN}35`,
                      color: CYAN,
                      textShadow: `0 0 10px ${CYAN}60`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(90deg, transparent, ${CYAN}12, transparent)` }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative flex items-center gap-2">Connect <span>→</span></span>
                  </motion.a>
                )}
                {portfolio.github && (
                  <motion.a
                    whileHover={{ scale: 1.06, boxShadow: `0 0 40px ${PINK}40` }}
                    whileTap={{ scale: 0.96 }}
                    href={portfolio.github}
                    target="_blank"
                    className="px-7 py-3.5 rounded-xl text-sm font-black tracking-widest uppercase"
                    style={{
                      background: `${PINK}10`,
                      border: `1px solid ${PINK}30`,
                      color: PINK,
                      textShadow: `0 0 10px ${PINK}50`,
                    }}
                  >
                    GitHub →
                  </motion.a>
                )}
                {portfolio.website && (
                  <motion.a
                    whileHover={{ scale: 1.06, boxShadow: `0 0 40px ${PURPLE}40` }}
                    whileTap={{ scale: 0.96 }}
                    href={portfolio.website}
                    target="_blank"
                    className="px-7 py-3.5 rounded-xl text-sm font-black tracking-widest uppercase"
                    style={{
                      background: `${PURPLE}10`,
                      border: `1px solid ${PURPLE}30`,
                      color: PURPLE,
                      textShadow: `0 0 10px ${PURPLE}50`,
                    }}
                  >
                    Website →
                  </motion.a>
                )}
              </motion.div>
            </div>
 
            {/* RIGHT — Avatar + rings */}
            <motion.div
              initial={{ opacity: 0, x: 80, filter: 'blur(20px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0 flex flex-col items-center"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Spinning orbit rings */}
                {[
                  { inset: 20, dur: 6,  stroke: `${CYAN}70`,   dash: 'solid' },
                  { inset: 36, dur: 11, stroke: `${PINK}50`,   dash: '6 4' },
                  { inset: 54, dur: 18, stroke: `${PURPLE}35`, dash: '2 6' },
                  { inset: 72, dur: 28, stroke: `${AMBER}20`,  dash: '1 8' },
                ].map((r, i) => (
                  <motion.svg
                    key={i}
                    className="absolute"
                    style={{
                      inset: `-${r.inset}px`,
                      width: `calc(100% + ${r.inset * 2}px)`,
                      height: `calc(100% + ${r.inset * 2}px)`,
                    }}
                    viewBox="0 0 100 100"
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: r.dur, repeat: Infinity, ease: 'linear' }}
                  >
                    <circle
                      cx="50" cy="50" r="48"
                      fill="none"
                      stroke={r.stroke}
                      strokeWidth="0.5"
                      strokeDasharray={r.dash}
                    />
                    {/* Orbit dot */}
                    <circle cx="50" cy="2" r="1.5" fill={r.stroke.slice(0, 7)} />
                  </motion.svg>
                ))}
 
                {/* Corner brackets */}
                {[
                  { pos: 'top-[-10px] left-[-10px]', bt: CYAN, bl: CYAN, top: true, left: true },
                  { pos: 'top-[-10px] right-[-10px]', bt: CYAN, br: CYAN, top: true, right: true },
                  { pos: 'bottom-[-10px] right-[-10px]', bb: PINK, br: PINK, bottom: true, right: true },
                  { pos: 'bottom-[-10px] left-[-10px]', bb: PINK, bl: PINK, bottom: true, left: true },
                ].map((b, i) => (
                  <div
                    key={i}
                    className={`absolute ${b.pos} w-5 h-5`}
                    style={{
                      borderTop: b.top ? `2px solid ${b.bt}70` : 'none',
                      borderBottom: (b as any).bottom ? `2px solid ${(b as any).bb}70` : 'none',
                      borderLeft: b.left ? `2px solid ${b.bl}70` : 'none',
                      borderRight: b.right ? `2px solid ${(b as any).br}70` : 'none',
                    }}
                  />
                ))}
 
                {/* Avatar frame */}
                <div
                  className="w-full h-full rounded-2xl overflow-hidden relative"
                  style={{
                    border: `1px solid ${CYAN}25`,
                    boxShadow: `0 0 60px ${CYAN}12, 0 0 120px ${CYAN}06, inset 0 0 30px ${CYAN}05`,
                  }}
                >
                  {portfolio.avatar ? (
                    <>
                      <img
                        src={portfolio.avatar}
                        alt={portfolio.name}
                        className="w-full h-full object-cover"
                        style={{ filter: 'saturate(1.15) contrast(1.05)' }}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)',
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(180deg, transparent 60%, ${CYAN}15)` }}
                      />
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-[6rem] font-black select-none"
                      style={{
                        background: `linear-gradient(135deg, #020206, #0a0a18)`,
                        color: `${CYAN}20`,
                        textShadow: `0 0 60px ${CYAN}40`,
                      }}
                    >
                      {portfolio.name.charAt(0)}
                    </div>
                  )}
                </div>
 
                {/* Floating tags */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-4 md:-right-20 top-8 px-3 py-2 rounded-xl text-xs font-black backdrop-blur-xl"
                  style={{
                    background: 'rgba(2,2,6,0.95)',
                    border: `1px solid ${CYAN}25`,
                    color: CYAN,
                    boxShadow: `0 0 20px ${CYAN}12`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span className="mr-1.5" style={{ color: `${GREEN}` }}>●</span>SYS ONLINE
                </motion.div>
 
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -left-4 md:-left-20 bottom-8 px-3 py-2 rounded-xl text-xs font-black backdrop-blur-xl"
                  style={{
                    background: 'rgba(2,2,6,0.95)',
                    border: `1px solid ${PINK}25`,
                    color: PINK,
                    boxShadow: `0 0 20px ${PINK}12`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  HIRE: TRUE ✓
                </motion.div>
              </div>
 
              {/* Stats row below avatar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex gap-10 mt-12 pt-8"
                style={{ borderTop: `1px solid rgba(255,255,255,0.05)` }}
              >
                <StatCounter value={portfolio.skills.length} label="Skills" color={CYAN} />
                <StatCounter value={portfolio.projects.length} label="Projects" color={GREEN} />
                <StatCounter value={portfolio.experience.length} label="Roles" color={PINK} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
 
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8"
            style={{ background: `linear-gradient(180deg, ${CYAN}50, transparent)` }}
          />
        </motion.div>
      </section>
 
      {/* ====================================================
          CONTENT SECTIONS
      ==================================================== */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-36 pb-36 relative z-10">
 
        {/* ── SKILLS ── */}
        {portfolio.skills.length > 0 && (
          <RevealSection>
            <SectionHeader
              label="> skills.map(tech => tech.load())"
              title="Technologies"
              color={CYAN}
            />
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, i) => (
                <SkillBadge key={skill} skill={skill} index={i} />
              ))}
            </div>
          </RevealSection>
        )}
 
        {/* ── EXPERIENCE ── */}
        {portfolio.experience.length > 0 && (
          <RevealSection>
            <SectionHeader
              label="> experience.filter(relevant)"
              title="Work History"
              color={PINK}
            />
            <div className="relative pl-4 space-y-6">
              {portfolio.experience.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} index={i} />
              ))}
            </div>
          </RevealSection>
        )}
 
        {/* ── EDUCATION ── */}
        {portfolio.education.length > 0 && (
          <RevealSection>
            <SectionHeader
              label="> education.load()"
              title="Education"
              color={PURPLE}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {portfolio.education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <TiltCard color="purple" className="p-8 h-full">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: `${PURPLE}10`, border: `1px solid ${PURPLE}20` }}
                      >
                        🎓
                      </div>
                      <div>
                        <h3 className="font-black text-lg text-white leading-tight">{edu.college}</h3>
                        <p className="text-sm mt-1 font-bold" style={{ color: `${PURPLE}90` }}>{edu.degree}</p>
                        {edu.year && (
                          <span
                            className="inline-block mt-3 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest"
                            style={{
                              background: `${PURPLE}10`,
                              border: `1px solid ${PURPLE}20`,
                              color: '#c084fc',
                            }}
                          >
                            Class of {edu.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}
 
        {/* ── PROJECTS ── */}
        {portfolio.projects.length > 0 && (
          <RevealSection>
            <SectionHeader
              label="> projects.render({ quality: 'production' })"
              title="Projects"
              color={GREEN}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </RevealSection>
        )}
 
        {/* ── CERTIFICATIONS ── */}
        {portfolio.certifications.length > 0 && (
          <RevealSection>
            <SectionHeader
              label="> achievements.unlock()"
              title="Certifications"
              color={AMBER}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <TiltCard color="yellow" className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                          className="w-11 h-11 rounded-xl flex items-center justify-center font-black shrink-0"
                          style={{
                            background: `${AMBER}10`,
                            border: `1px solid ${AMBER}20`,
                            color: AMBER,
                            fontSize: '18px',
                          }}
                        >
                          ✦
                        </motion.div>
                        <div>
                          <p className="font-black text-sm text-white">{cert.name}</p>
                          {cert.issuer && <p className="text-xs mt-0.5" style={{ color: `${AMBER}50` }}>{cert.issuer}</p>}
                        </div>
                      </div>
                      {cert.link && (
                        <motion.a
                          whileHover={{ x: 4, textShadow: `0 0 10px ${CYAN}` }}
                          href={cert.link}
                          target="_blank"
                          className="text-xs font-black ml-2 shrink-0 uppercase tracking-widest"
                          style={{ color: CYAN }}
                        >
                          View →
                        </motion.a>
                      )}
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}
 
        {/* ── CONTACT ── */}
        <RevealSection>
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
            style={{
              background: `linear-gradient(135deg, ${CYAN}05, ${PURPLE}05, ${PINK}05)`,
              border: `1px solid ${CYAN}12`,
              boxShadow: `0 0 100px ${CYAN}06, inset 0 0 80px ${CYAN}03`,
            }}
          >
            {/* Corner brackets */}
            {[
              { cls: 'top-5 left-5', bt: CYAN, bl: CYAN },
              { cls: 'top-5 right-5', bt: CYAN, br: CYAN },
              { cls: 'bottom-5 left-5', bb: PINK, bl: PINK },
              { cls: 'bottom-5 right-5', bb: PINK, br: PINK },
            ].map((b, i) => (
              <div
                key={i}
                className={`absolute ${b.cls} w-7 h-7 pointer-events-none`}
                style={{
                  borderTop: (b as any).bt ? `2px solid ${(b as any).bt}50` : 'none',
                  borderBottom: (b as any).bb ? `2px solid ${(b as any).bb}50` : 'none',
                  borderLeft: (b as any).bl ? `2px solid ${(b as any).bl}50` : 'none',
                  borderRight: (b as any).br ? `2px solid ${(b as any).br}50` : 'none',
                }}
              />
            ))}
 
            {/* Animated scan line */}
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${CYAN}50, transparent)` }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatType: 'reverse' }}
            />
 
            {/* Content */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-5xl mb-8"
              >
                👾
              </motion.div>
 
              <h2
                className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  textShadow: `0 0 40px ${CYAN}40`,
                }}
              >
                INITIATE_CONTACT()
              </h2>
 
              <div className="text-sm max-w-md mx-auto mb-10 leading-relaxed space-y-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <p><span style={{ color: `${CYAN}60` }}>&gt;</span> Ready to architect next-generation systems.</p>
                <p><span style={{ color: `${CYAN}60` }}>&gt;</span> Status: <span style={{ color: GREEN }}>ONLINE</span> | Ping: <span style={{ color: AMBER }}>&lt;1ms</span> | Mode: <span style={{ color: PINK }}>OPEN</span></p>
              </div>
 
              <div className="flex gap-4 justify-center flex-wrap">
                {[
                  { href: portfolio.linkedin, label: 'Connect', color: CYAN },
                  { href: portfolio.github, label: 'GitHub', color: PINK },
                  { href: portfolio.twitter, label: 'Twitter', color: PURPLE },
                  { href: portfolio.website, label: 'Website', color: GREEN },
                ].filter(l => l.href).map(l => (
                  <motion.a
                    key={l.label}
                    whileHover={{ scale: 1.06, boxShadow: `0 0 40px ${l.color}50` }}
                    whileTap={{ scale: 0.96 }}
                    href={l.href!}
                    target="_blank"
                    className="relative overflow-hidden font-black px-7 py-4 rounded-2xl text-sm tracking-widest uppercase"
                    style={{
                      background: `${l.color}10`,
                      border: `1px solid ${l.color}30`,
                      color: l.color,
                      textShadow: `0 0 10px ${l.color}50`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(90deg, transparent, ${l.color}10, transparent)` }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative">{l.label} →</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
 
      </div>
 
      {/* ====================================================
          FOOTER
      ==================================================== */}
      <footer
        className="relative border-t py-12 text-center z-10"
        style={{ borderColor: `${CYAN}08` }}
      >
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xs font-black tracking-widest"
          style={{ color: `${CYAN}35`, fontFamily: 'monospace' }}
        >
          {showWatermark ? (
            <span>
              BUILT_WITH{' '}
              <a href="https://portfolio-saas-red.vercel.app" className="underline hover:opacity-80 transition-opacity">
                PORTFOLIO_SAAS
              </a>
              {' // '}
              <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:opacity-80 transition-opacity">
                REMOVE_WATERMARK
              </a>
            </span>
          ) : (
            <span>POWERED_BY PORTFOLIO_SAAS // ALL_SYSTEMS_NOMINAL // {new Date().getFullYear()}</span>
          )}
        </motion.div>
      </footer>
 
    </main>
  )
}