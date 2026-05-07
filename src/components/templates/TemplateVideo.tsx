'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
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

// ============================================================
// SCROLL PROGRESS
// ============================================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[9998] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #ff6b00, #ff0080, #7c3aed)' }}
    />
  )
}

// ============================================================
// CUSTOM CURSOR
// ============================================================
function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [label, setLabel] = useState('')

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
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 80 : 32,
          height: isHovering ? 80 : 32,
          opacity: isVisible ? 1 : 0,
          background: isHovering
            ? 'rgba(255,107,0,0.15)'
            : 'transparent',
          border: isHovering
            ? '1px solid rgba(255,107,0,0.6)'
            : '1px solid rgba(255,255,255,0.3)',
        }}
        transition={{ duration: 0.2 }}
      >
        {isHovering && label && (
          <span className="text-[10px] font-black text-orange-400 uppercase tracking-wider">
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-orange-500 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 5,
          height: 5,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}

// ============================================================
// REVEAL SECTION
// ============================================================
function RevealSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// LOADING SCREEN
// ============================================================
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: '#050505' }}
    >
      {/* Film strip animation */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-2 border-orange-500/20 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-full border-2 border-t-orange-500 border-orange-500/10"
          />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center text-2xl"
        >
          🎬
        </motion.div>
      </div>

      {/* Loading bar */}
      <div className="w-48 h-px bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #ff6b00, #ff0080)' }}
        />
      </div>
      <motion.p
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-white/30 text-xs font-black uppercase tracking-widest mt-4"
      >
        Loading Showreel
      </motion.p>
    </motion.div>
  )
}

// ============================================================
// YOUTUBE EMBED HELPER
// ============================================================
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}&controls=0&showinfo=0&rel=0&modestbranding=1`
  }
  const vimeoRegExp = /vimeo\.com\/(\d+)/
  const vimeoMatch = url.match(vimeoRegExp)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`
  }
  return null
}

// ============================================================
// PRICING CARD
// ============================================================
function PricingCard({ plan, price, desc, features, highlighted }: {
  plan: string
  price: string
  desc: string
  features: string[]
  highlighted?: boolean
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative rounded-3xl p-8 flex flex-col"
      style={{
        background: highlighted
          ? 'linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,0,128,0.15))'
          : 'rgba(255,255,255,0.03)',
        border: highlighted
          ? '1px solid rgba(255,107,0,0.4)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: highlighted
          ? '0 0 40px rgba(255,107,0,0.1)'
          : 'none',
      }}
    >
      {highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black text-white"
          style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
        >
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">{plan}</p>
        <p className="text-4xl font-black text-white mb-2">{price}</p>
        <p className="text-white/40 text-sm">{desc}</p>
      </div>
      <div className="space-y-3 flex-1 mb-8">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-orange-400 text-sm mt-0.5 shrink-0">✓</span>
            <span className="text-white/60 text-sm">{f}</span>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 rounded-2xl text-sm font-black transition-all"
        style={{
          background: highlighted
            ? 'linear-gradient(135deg, #ff6b00, #ff0080)'
            : 'rgba(255,255,255,0.06)',
          color: 'white',
          border: highlighted ? 'none' : '1px solid rgba(255,255,255,0.1)',
        }}
      >
        Get Started →
      </motion.button>
    </motion.div>
  )
}

// ============================================================
// TESTIMONIAL CARD
// ============================================================
function TestimonialCard({ name, role, text, rating }: {
  name: string
  role: string
  text: string
  rating: number
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-3xl p-8"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-orange-400 text-sm">★</span>
        ))}
      </div>
      <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{text}"</p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
          style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-black text-sm text-white">{name}</p>
          <p className="text-white/30 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
// MAIN TEMPLATE VIDEO
// ============================================================
export default function TemplateVideo({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const embedUrl = getYouTubeEmbedUrl(portfolio.website ?? '')

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'YouTuber — 500K Subscribers',
      text: 'My videos went from 10K to 200K views after working together. The editing style is cinematic and engaging. Best investment I made.',
      rating: 5,
    },
    {
      name: 'Priya Mehta',
      role: 'Brand Manager — StartupX',
      text: 'Delivered our brand film in 3 days. The quality was beyond our expectations. Will definitely work again.',
      rating: 5,
    },
    {
      name: 'Arjun Singh',
      role: 'Instagram Influencer — 1M Followers',
      text: 'My reels engagement doubled after switching to this editor. The pacing, music sync and color grading is next level.',
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      plan: 'Basic',
      price: '₹5,000',
      desc: 'Perfect for short content',
      highlighted: false,
      features: [
        'Up to 5 min edited video',
        'Basic color grading',
        'Background music',
        'Subtitles/captions',
        '2 revisions',
        '5 day delivery',
      ],
    },
    {
      plan: 'Pro',
      price: '₹15,000',
      desc: 'For serious creators',
      highlighted: true,
      features: [
        'Up to 15 min edited video',
        'Advanced color grading',
        'Motion graphics',
        'Sound design',
        'Thumbnail design',
        '5 revisions',
        '7 day delivery',
      ],
    },
    {
      plan: 'Premium',
      price: '₹30,000',
      desc: 'Cinematic brand films',
      highlighted: false,
      features: [
        'Up to 30 min edited video',
        'Cinematic color grade',
        'Custom motion graphics',
        'Full sound design',
        'Thumbnail + shorts cut',
        'Unlimited revisions',
        '14 day delivery',
      ],
    },
  ]

  const processSteps = [
    { step: '01', title: 'Brief', desc: 'Share your raw footage, references and vision. We align on style, tone and deliverables.', icon: '📋' },
    { step: '02', title: 'Edit', desc: 'I cut, color grade, add motion graphics and sound design to create the final edit.', icon: '✂️' },
    { step: '03', title: 'Review', desc: 'You review the edit and share feedback. We refine until you love it.', icon: '👁' },
    { step: '04', title: 'Delivery', desc: 'Final files delivered in your preferred format. Ready to publish.', icon: '🚀' },
  ]

  return (
    <div className="min-h-screen text-white overflow-x-hidden font-sans" style={{ background: '#050505' }}>

      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />

      {/* Ambient cursor glow */}
      <div
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full blur-3xl opacity-[0.06] transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, #ff6b00, #ff0080)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* NAV */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(5,5,5,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {portfolio.avatar ? (
              <img src={portfolio.avatar} alt={portfolio.name} className="w-9 h-9 rounded-xl object-cover ring-2 ring-orange-500/30" />
            ) : (
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
                style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
              >
                {portfolio.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-black text-sm text-white">{portfolio.name}</p>
              <p className="text-xs text-white/30">Video Editor</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {['Work', 'Services', 'Process', 'About'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ color: '#ff6b00' }}
                className="text-white/40 font-medium transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            {portfolio.linkedin && (
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,107,0,0.4)' }}
                whileTap={{ scale: 0.95 }}
                href={portfolio.linkedin}
                target="_blank"
                className="hidden md:block text-sm font-black px-5 py-2.5 rounded-2xl text-white"
                style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
              >
                Hire Me →
              </motion.a>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            >
              <motion.div
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                className="w-5 h-0.5 bg-white"
              />
              <motion.div
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="w-5 h-0.5 bg-white"
              />
              <motion.div
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                className="w-5 h-0.5 bg-white"
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.04)' }}
            >
              <div className="px-6 py-6 space-y-4">
                {['Work', 'Services', 'Process', 'About'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMenuOpen(false)}
                    className="block text-white/60 font-medium text-lg"
                  >
                    {item}
                  </button>
                ))}
                {portfolio.linkedin && (
                  <a
                    href={portfolio.linkedin}
                    target="_blank"
                    className="block text-sm font-black px-5 py-3 rounded-2xl text-white text-center mt-4"
                    style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
                  >
                    Hire Me →
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">

        {/* Video / Gradient Background */}
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: 'scale(1.3)', transformOrigin: 'center' }}
              allow="autoplay; muted"
            />
          ) : (
            <div className="absolute inset-0">
              <motion.div
                animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #ff6b00, transparent)' }}
              />
              <motion.div
                animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-15"
                style={{ background: 'radial-gradient(circle, #ff0080, transparent)' }}
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"
                style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
              />
            </div>
          )}
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,0.9) 100%)' }}
          />
        </motion.div>

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full"
        >
          <div className="max-w-4xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold mb-8"
              style={{
                background: 'rgba(255,107,0,0.08)',
                borderColor: 'rgba(255,107,0,0.25)',
                color: '#ff6b00',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-orange-500"
              />
              Available for new projects
            </motion.div>

            {/* Headline */}
            <div className="mb-6">
              {['I Turn Raw', 'Footage Into', 'Viral Stories'].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 2.5 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-2"
                >
                  {i === 1 ? (
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080, #7c3aed)' }}
                    >
                      {line}
                    </span>
                  ) : (
                    <span className="text-white">{line}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
              className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
            >
              {portfolio.bio ?? 'Cinematic video editing for YouTubers, brands and influencers who want content that stops the scroll.'}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.1 }}
              className="flex gap-10 mb-10"
            >
              {[
                { value: '10M+', label: 'Views Generated' },
                { value: `${portfolio.projects.length}+`, label: 'Projects Done' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={i}>
                  <p
                    className="text-3xl md:text-4xl font-black bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/30 text-xs font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2 }}
              className="flex gap-4 flex-wrap"
            >
              {portfolio.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,107,0,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  href={portfolio.linkedin}
                  target="_blank"
                  className="relative overflow-hidden px-8 py-4 rounded-2xl text-base font-black text-white"
                  style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/15"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative">Hire Me →</span>
                </motion.a>
              )}
              <motion.a
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,107,0,0.4)' }}
                whileTap={{ scale: 0.95 }}
                href="#work"
                className="px-8 py-4 rounded-2xl text-base font-black text-white/70 border border-white/15 hover:text-white transition-all"
              >
                View Work ↓
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-orange-500"
            />
          </motion.div>
        </motion.div>

      </section>

      {/* CONTENT */}
      <div id="work" className="max-w-7xl mx-auto px-6 md:px-8 space-y-32 pb-32">

        {/* FEATURED WORK */}
        {portfolio.projects.length > 0 && (
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">Portfolio</p>
              <h2 className="text-4xl md:text-6xl font-black">Featured Work</h2>
              <p className="text-white/30 mt-4 max-w-md mx-auto">Every frame crafted with precision. Every cut tells a story.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    aspectRatio: i === 0 ? '16/10' : '4/3',
                  }}
                >
                  {/* Gradient thumbnail */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: i % 4 === 0
                        ? 'linear-gradient(135deg, #ff6b00, #ff0080)'
                        : i % 4 === 1
                          ? 'linear-gradient(135deg, #7c3aed, #ff0080)'
                          : i % 4 === 2
                            ? 'linear-gradient(135deg, #ff0080, #ff6b00)'
                            : 'linear-gradient(135deg, #1a1a2e, #7c3aed)',
                    }}
                  />

                  {/* Noise overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                    >
                      <div className="w-0 h-0 ml-1" style={{
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft: '16px solid white',
                      }} />
                    </motion.div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <motion.div
                      initial={{ y: 20 }}
                      whileInView={{ y: 0 }}
                    >
                      <h3 className="text-white font-black text-lg mb-1">{project.title}</h3>
                      {project.description && (
                        <p className="text-white/60 text-sm mb-4">{project.description}</p>
                      )}
                      <div className="flex gap-2">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            className="text-xs font-black px-4 py-2 rounded-xl text-white"
                            style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
                          >
                            Watch →
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-xs font-black px-3 py-1.5 rounded-full text-white"
                      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
                    >
                      {i % 4 === 0 ? 'YouTube' : i % 4 === 1 ? 'Brand Film' : i % 4 === 2 ? 'Reels' : 'Cinematic'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* SERVICES */}
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-pink-400 text-xs font-black uppercase tracking-widest mb-3">Packages</p>
            <h2 className="text-4xl md:text-6xl font-black">Services & Pricing</h2>
            <p className="text-white/30 mt-4 max-w-md mx-auto">Transparent pricing. No hidden costs. Just world-class editing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <PricingCard {...plan} />
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* PROCESS */}
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-4xl md:text-6xl font-black">The Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div
              className="absolute top-12 left-0 right-0 h-px hidden md:block"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.3), rgba(255,0,128,0.3), transparent)' }}
            />
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                  className="w-20 h-20 rounded-3xl flex flex-col items-center justify-center mx-auto mb-6 relative z-10"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,107,0,0.2)',
                    boxShadow: '0 0 20px rgba(255,107,0,0.08)',
                  }}
                >
                  <span className="text-2xl">{step.icon}</span>
                  <span
                    className="text-xs font-black mt-1"
                    style={{ color: 'rgba(255,107,0,0.6)' }}
                  >
                    {step.step}
                  </span>
                </motion.div>
                <h3 className="font-black text-lg mb-2 text-white">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* ABOUT */}
        <RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-4">About Me</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Crafting Stories<br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
                >
                  Frame by Frame
                </span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 text-lg">
                {portfolio.bio ?? 'I am a passionate video editor who transforms raw footage into compelling visual stories. With expertise in color grading, motion graphics and sound design, I help creators and brands stand out in a crowded digital landscape.'}
              </p>

              {/* Skills */}
              {portfolio.skills.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {portfolio.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, type: 'spring' }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="px-4 py-2 rounded-xl text-sm font-bold"
                      style={{
                        background: 'rgba(255,107,0,0.08)',
                        border: '1px solid rgba(255,107,0,0.2)',
                        color: 'rgba(255,107,0,0.8)',
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right — Avatar */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-3xl opacity-20"
                style={{ background: 'conic-gradient(from 0deg, #ff6b00, #ff0080, #7c3aed, #ff6b00)' }}
              />
              {portfolio.avatar ? (
                <img
                  src={portfolio.avatar}
                  alt={portfolio.name}
                  className="relative w-full rounded-3xl object-cover z-10"
                  style={{ maxHeight: '500px' }}
                />
              ) : (
                <div
                  className="relative w-full h-96 rounded-3xl flex items-center justify-center z-10 text-9xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,0,128,0.1))',
                    border: '1px solid rgba(255,107,0,0.15)',
                    color: 'rgba(255,107,0,0.2)',
                  }}
                >
                  {portfolio.name.charAt(0)}
                </div>
              )}

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -right-6 top-8 z-20 px-5 py-3 rounded-2xl"
                style={{
                  background: 'rgba(5,5,5,0.95)',
                  border: '1px solid rgba(255,107,0,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <p className="text-xs text-white/30 font-medium">Views Generated</p>
                <p
                  className="text-2xl font-black bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
                >
                  10M+
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-6 bottom-8 z-20 px-5 py-3 rounded-2xl"
                style={{
                  background: 'rgba(5,5,5,0.95)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <p className="text-xs text-white/30 font-medium">Projects Done</p>
                <p
                  className="text-2xl font-black bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #ff0080)' }}
                >
                  {portfolio.projects.length}+
                </p>
              </motion.div>
            </div>
          </div>
        </RevealSection>

        {/* EXPERIENCE */}
        {portfolio.experience.length > 0 && (
          <RevealSection>
            <div className="text-center mb-12">
              <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">Career</p>
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
                    borderColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-orange-400 transition-colors">{exp.role}</h3>
                      <p className="text-orange-400/70 font-bold text-sm mt-1">{exp.company}</p>
                      {exp.description && (
                        <p className="text-white/30 text-sm mt-3 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                    {exp.duration && (
                      <span
                        className="text-xs font-bold px-4 py-1.5 rounded-full w-fit shrink-0"
                        style={{
                          background: 'rgba(255,107,0,0.08)',
                          border: '1px solid rgba(255,107,0,0.2)',
                          color: '#ff6b00',
                        }}
                      >
                        {exp.duration}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* TESTIMONIALS */}
        <RevealSection>
          <div className="text-center mb-16">
            <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-3">Client Love</p>
            <h2 className="text-4xl md:text-6xl font-black">Testimonials</h2>
            <p className="text-white/30 mt-4">What clients say after working with me</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* BIG CTA */}
        <RevealSection>
          <div
            className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,0,128,0.1), rgba(124,58,237,0.1))',
              border: '1px solid rgba(255,107,0,0.15)',
            }}
          >
            {/* Animated rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                animate={{ rotate: ring % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
                transition={{ duration: 15 * ring, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full border border-orange-500/5"
                style={{ inset: `-${ring * 80}px` }}
              />
            ))}

            {/* Scanning line */}
            <motion.div
              className="absolute left-0 right-0 h-px opacity-30"
              style={{ background: 'linear-gradient(90deg, transparent, #ff6b00, transparent)' }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-6xl mb-6"
              >
                🎬
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                Let's Create Something{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
                >
                  Viral
                </span>
              </h2>
              <p className="text-white/40 text-lg max-w-lg mx-auto mb-10">
                Ready to take your content to the next level? Let's talk about your project.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,107,0,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="relative overflow-hidden font-black px-10 py-4 rounded-2xl text-white"
                    style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative">Start a Project →</span>
                  </motion.a>
                )}
                {portfolio.twitter && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={portfolio.twitter}
                    target="_blank"
                    className="font-black px-10 py-4 rounded-2xl text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                  >
                    DM on Twitter
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* CERTIFICATIONS */}
        {portfolio.certifications.length > 0 && (
          <RevealSection>
            <div className="text-center mb-12">
              <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-3">Achievements</p>
              <h2 className="text-4xl font-black">Certifications</h2>
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
                    borderColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-yellow-400 shrink-0"
                      style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.15)' }}
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

      </div>

      {/* FOOTER */}
      <footer
        className="border-t py-12 text-center"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl mb-4"
          >
            🎬
          </motion.div>
          <p className="font-black text-xl text-white mb-2">{portfolio.name}</p>
          <p className="text-white/20 text-sm mb-6">Video Editor & Storyteller</p>
          <div className="flex justify-center gap-6 mb-8">
            {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">LinkedIn</a>}
            {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">Twitter</a>}
            {portfolio.website && <a href={portfolio.website} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">Showreel</a>}
          </div>
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
        </div>
      </footer>

    </div>
  )
}