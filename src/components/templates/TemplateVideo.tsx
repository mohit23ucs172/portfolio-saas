// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValue,
//   AnimatePresence,
// } from 'framer-motion'

// type Project = {
//   id: string
//   title: string
//   description: string | null
//   link: string | null
//   github: string | null
// }

// type Education = {
//   id: string
//   college: string
//   degree: string
//   year: string | null
// }

// type Experience = {
//   id: string
//   company: string
//   role: string
//   duration: string | null
//   description: string | null
// }

// type Certification = {
//   id: string
//   name: string
//   issuer: string | null
//   link: string | null
// }

// type Portfolio = {
//   name: string
//   bio: string | null
//   avatar: string | null
//   skills: string[]
//   github: string | null
//   linkedin: string | null
//   twitter: string | null
//   website: string | null
//   projects: Project[]
//   education: Education[]
//   experience: Experience[]
//   certifications: Certification[]
// }

// // ============================================================
// // SCROLL PROGRESS
// // ============================================================
// function ScrollProgress() {
//   const { scrollYProgress } = useScroll()
//   const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 h-0.5 z-[9998] origin-left"
//       style={{ scaleX, background: 'linear-gradient(90deg, #ff6b00, #ff0080, #7c3aed)' }}
//     />
//   )
// }

// // ============================================================
// // CUSTOM CURSOR
// // ============================================================
// function CustomCursor() {
//   const cursorX = useMotionValue(-100)
//   const cursorY = useMotionValue(-100)
//   const springX = useSpring(cursorX, { stiffness: 500, damping: 30 })
//   const springY = useSpring(cursorY, { stiffness: 500, damping: 30 })
//   const [isHovering, setIsHovering] = useState(false)
//   const [isVisible, setIsVisible] = useState(false)
//   const [label, setLabel] = useState('')

//   useEffect(() => {
//     const handleMove = (e: MouseEvent) => {
//       cursorX.set(e.clientX)
//       cursorY.set(e.clientY)
//       if (!isVisible) setIsVisible(true)
//     }
//     window.addEventListener('mousemove', handleMove)
//     return () => window.removeEventListener('mousemove', handleMove)
//   }, [isVisible])

//   return (
//     <>
//       <motion.div
//         className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center rounded-full"
//         style={{
//           x: springX,
//           y: springY,
//           translateX: '-50%',
//           translateY: '-50%',
//         }}
//         animate={{
//           width: isHovering ? 80 : 32,
//           height: isHovering ? 80 : 32,
//           opacity: isVisible ? 1 : 0,
//           background: isHovering
//             ? 'rgba(255,107,0,0.15)'
//             : 'transparent',
//           border: isHovering
//             ? '1px solid rgba(255,107,0,0.6)'
//             : '1px solid rgba(255,255,255,0.3)',
//         }}
//         transition={{ duration: 0.2 }}
//       >
//         {isHovering && label && (
//           <span className="text-[10px] font-black text-orange-400 uppercase tracking-wider">
//             {label}
//           </span>
//         )}
//       </motion.div>
//       <motion.div
//         className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-orange-500 hidden md:block"
//         style={{
//           x: cursorX,
//           y: cursorY,
//           translateX: '-50%',
//           translateY: '-50%',
//           width: 5,
//           height: 5,
//           opacity: isVisible ? 1 : 0,
//         }}
//       />
//     </>
//   )
// }

// // ============================================================
// // REVEAL SECTION
// // ============================================================
// function RevealSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: '-60px' })
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 60 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
//     >
//       {children}
//     </motion.div>
//   )
// }

// // ============================================================
// // LOADING SCREEN
// // ============================================================
// function LoadingScreen({ onDone }: { onDone: () => void }) {
//   useEffect(() => {
//     const timer = setTimeout(onDone, 2200)
//     return () => clearTimeout(timer)
//   }, [onDone])

//   return (
//     <motion.div
//       exit={{ opacity: 0, scale: 1.05 }}
//       transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//       className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
//       style={{ background: '#050505' }}
//     >
//       {/* Film strip animation */}
//       <div className="relative mb-8">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
//           className="w-16 h-16 rounded-full border-2 border-orange-500/20 flex items-center justify-center"
//         >
//           <motion.div
//             animate={{ rotate: -360 }}
//             transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
//             className="w-10 h-10 rounded-full border-2 border-t-orange-500 border-orange-500/10"
//           />
//         </motion.div>
//         <motion.div
//           animate={{ scale: [1, 1.2, 1] }}
//           transition={{ duration: 1, repeat: Infinity }}
//           className="absolute inset-0 flex items-center justify-center text-2xl"
//         >
//           🎬
//         </motion.div>
//       </div>

//       {/* Loading bar */}
//       <div className="w-48 h-px bg-white/5 rounded-full overflow-hidden">
//         <motion.div
//           initial={{ x: '-100%' }}
//           animate={{ x: '0%' }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//           className="h-full rounded-full"
//           style={{ background: 'linear-gradient(90deg, #ff6b00, #ff0080)' }}
//         />
//       </div>
//       <motion.p
//         animate={{ opacity: [0.3, 0.7, 0.3] }}
//         transition={{ duration: 1.5, repeat: Infinity }}
//         className="text-white/30 text-xs font-black uppercase tracking-widest mt-4"
//       >
//         Loading Showreel
//       </motion.p>
//     </motion.div>
//   )
// }

// // ============================================================
// // YOUTUBE HELPERS
// // ============================================================
// function getYouTubeEmbedUrl(url: string): string | null {
//   if (!url) return null
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
//   const match = url.match(regExp)
//   if (match && match[2].length === 11) {
//     return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`
//   }
//   const vimeoRegExp = /vimeo\.com\/(\d+)/
//   const vimeoMatch = url.match(vimeoRegExp)
//   if (vimeoMatch) {
//     return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
//   }
//   return null
// }

// function getBackgroundVideoUrl(url: string): string | null {
//   if (!url) return null
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
//   const match = url.match(regExp)
//   if (match && match[2].length === 11) {
//     return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}&controls=0&showinfo=0&rel=0&modestbranding=1`
//   }
//   const vimeoRegExp = /vimeo\.com\/(\d+)/
//   const vimeoMatch = url.match(vimeoRegExp)
//   if (vimeoMatch) {
//     return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`
//   }
//   return null
// }

// // NEW: Extract YouTube thumbnail
// function getYouTubeThumbnail(url: string): string | null {
//   if (!url) return null
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
//   const match = url.match(regExp)
//   if (match && match[2].length === 11) {
//     // maxresdefault gets the highest resolution thumbnail available
//     return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`
//   }
//   return null
// }

// // ============================================================
// // PROJECT CARD COMPONENT (Handles Hover & Autoplay)
// // ============================================================
// function ProjectCard({ 
//   project, 
//   index, 
//   setActiveVideo 
// }: { 
//   project: Project; 
//   index: number; 
//   setActiveVideo: (url: string) => void 
// }) {
//   const [isHovered, setIsHovered] = useState(false)
  
//   const projectEmbedUrl = getYouTubeEmbedUrl(project.link ?? '')
//   const projectPreviewUrl = getBackgroundVideoUrl(project.link ?? '')
//   const thumbUrl = getYouTubeThumbnail(project.link ?? '')

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1 }}
//       whileHover={{ y: -8 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group relative rounded-3xl overflow-hidden cursor-pointer"
//       onClick={() => projectEmbedUrl ? setActiveVideo(projectEmbedUrl) : project.link ? window.open(project.link, '_blank') : null}
//       style={{
//         background: 'rgba(255,255,255,0.03)',
//         border: '1px solid rgba(255,255,255,0.06)',
//         aspectRatio: index === 0 ? '16/10' : '4/3',
//       }}
//     >
//       {/* 1. Base Gradient Fallback (If no thumbnail) */}
//       <div
//         className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
//         style={{
//           background: index % 4 === 0
//             ? 'linear-gradient(135deg, #ff6b00, #ff0080)'
//             : index % 4 === 1
//               ? 'linear-gradient(135deg, #7c3aed, #ff0080)'
//               : index % 4 === 2
//                 ? 'linear-gradient(135deg, #ff0080, #ff6b00)'
//                 : 'linear-gradient(135deg, #1a1a2e, #7c3aed)',
//         }}
//       />

//       {/* 2. YouTube Thumbnail */}
//       {thumbUrl && (
//         <img 
//           src={thumbUrl} 
//           alt={project.title} 
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
//         />
//       )}

//       {/* 3. Autoplay Preview Video (Only mounts/plays when hovering) */}
//       <AnimatePresence>
//         {isHovered && projectPreviewUrl && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="absolute inset-0 z-10 pointer-events-none"
//           >
//             <iframe
//               src={projectPreviewUrl}
//               className="absolute inset-0 w-full h-full transform scale-125 pointer-events-none"
//               allow="autoplay; muted"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 4. Film Noise Overlay */}
//       <div
//         className="absolute inset-0 opacity-20 z-10 mix-blend-overlay pointer-events-none"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* 5. Center Play Button */}
//       <div className="absolute inset-0 flex items-center justify-center z-20">
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           whileInView={{ scale: 1, opacity: 1 }}
//           animate={{ scale: isHovered ? 1.1 : 1, opacity: isHovered ? 0 : 1 }}
//           transition={{ duration: 0.3 }}
//           className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl"
//         >
//           <div className="w-0 h-0 ml-1" style={{
//             borderTop: '10px solid transparent',
//             borderBottom: '10px solid transparent',
//             borderLeft: '16px solid white',
//           }} />
//         </motion.div>
//       </div>

//       {/* 6. Content Hover Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 z-20">
//         <motion.div
//           initial={{ y: 20 }}
//           whileInView={{ y: 0 }}
//         >
//           <h3 className="text-white font-black text-lg mb-1">{project.title}</h3>
//           {project.description && (
//             <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
//           )}
//           <div className="flex gap-2">
//             {(projectEmbedUrl || project.link) && (
//               <button
//                 className="text-xs font-black px-4 py-2 rounded-xl text-white shadow-lg pointer-events-none"
//                 style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//               >
//                 Watch Now →
//               </button>
//             )}
//           </div>
//         </motion.div>
//       </div>

//       {/* 7. Category badge */}
//       <div className="absolute top-4 left-4 z-20">
//         <span
//           className="text-xs font-black px-3 py-1.5 rounded-full text-white shadow-md"
//           style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
//         >
//           {index % 4 === 0 ? 'YouTube' : index % 4 === 1 ? 'Brand Film' : index % 4 === 2 ? 'Reels' : 'Cinematic'}
//         </span>
//       </div>
//     </motion.div>
//   )
// }

// // ============================================================
// // PRICING CARD
// // ============================================================
// function PricingCard({ plan, price, desc, features, highlighted }: {
//   plan: string
//   price: string
//   desc: string
//   features: string[]
//   highlighted?: boolean
// }) {
//   return (
//     <motion.div
//       whileHover={{ y: -8, scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//       className="relative rounded-3xl p-8 flex flex-col"
//       style={{
//         background: highlighted
//           ? 'linear-gradient(135deg, rgba(255,107,0,0.15), rgba(255,0,128,0.15))'
//           : 'rgba(255,255,255,0.03)',
//         border: highlighted
//           ? '1px solid rgba(255,107,0,0.4)'
//           : '1px solid rgba(255,255,255,0.06)',
//         boxShadow: highlighted
//           ? '0 0 40px rgba(255,107,0,0.1)'
//           : 'none',
//       }}
//     >
//       {highlighted && (
//         <div
//           className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black text-white"
//           style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//         >
//           Most Popular
//         </div>
//       )}
//       <div className="mb-6">
//         <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">{plan}</p>
//         <p className="text-4xl font-black text-white mb-2">{price}</p>
//         <p className="text-white/40 text-sm">{desc}</p>
//       </div>
//       <div className="space-y-3 flex-1 mb-8">
//         {features.map((f, i) => (
//           <div key={i} className="flex items-start gap-3">
//             <span className="text-orange-400 text-sm mt-0.5 shrink-0">✓</span>
//             <span className="text-white/60 text-sm">{f}</span>
//           </div>
//         ))}
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="w-full py-3 rounded-2xl text-sm font-black transition-all"
//         style={{
//           background: highlighted
//             ? 'linear-gradient(135deg, #ff6b00, #ff0080)'
//             : 'rgba(255,255,255,0.06)',
//           color: 'white',
//           border: highlighted ? 'none' : '1px solid rgba(255,255,255,0.1)',
//         }}
//       >
//         Get Started →
//       </motion.button>
//     </motion.div>
//   )
// }

// // ============================================================
// // TESTIMONIAL CARD
// // ============================================================
// function TestimonialCard({ name, role, text, rating }: {
//   name: string
//   role: string
//   text: string
//   rating: number
// }) {
//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       className="rounded-3xl p-8"
//       style={{
//         background: 'rgba(255,255,255,0.03)',
//         border: '1px solid rgba(255,255,255,0.06)',
//       }}
//     >
//       <div className="flex gap-1 mb-4">
//         {Array.from({ length: rating }).map((_, i) => (
//           <span key={i} className="text-orange-400 text-sm">★</span>
//         ))}
//       </div>
//       <p className="text-white/60 text-sm leading-relaxed mb-6 italic">"{text}"</p>
//       <div className="flex items-center gap-3">
//         <div
//           className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
//           style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//         >
//           {name.charAt(0)}
//         </div>
//         <div>
//           <p className="font-black text-sm text-white">{name}</p>
//           <p className="text-white/30 text-xs">{role}</p>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// // ============================================================
// // MAIN TEMPLATE VIDEO
// // ============================================================
// export default function TemplateVideo({
//   portfolio,
//   showWatermark = true,
// }: {
//   portfolio: Portfolio
//   showWatermark?: boolean
// }) {
//   const [loaded, setLoaded] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [activeVideo, setActiveVideo] = useState<string | null>(null)
//   const { scrollY } = useScroll()
//   const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
//   const heroScale = useTransform(scrollY, [0, 600], [1, 1.1])
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

//   useEffect(() => {
//     const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
//     window.addEventListener('mousemove', handleMouse)
//     return () => window.removeEventListener('mousemove', handleMouse)
//   }, [])

//   // Lock body scroll when modal is open
//   useEffect(() => {
//     if (activeVideo) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = 'unset'
//     }
//   }, [activeVideo])

//   const bgVideoUrl = getBackgroundVideoUrl(portfolio.website ?? '')

//   const testimonials = [
//     {
//       name: 'Rahul Sharma',
//       role: 'YouTuber — 500K Subscribers',
//       text: 'My videos went from 10K to 200K views after working together. The editing style is cinematic and engaging. Best investment I made.',
//       rating: 5,
//     },
//     {
//       name: 'Priya Mehta',
//       role: 'Brand Manager — StartupX',
//       text: 'Delivered our brand film in 3 days. The quality was beyond our expectations. Will definitely work again.',
//       rating: 5,
//     },
//     {
//       name: 'Arjun Singh',
//       role: 'Instagram Influencer — 1M Followers',
//       text: 'My reels engagement doubled after switching to this editor. The pacing, music sync and color grading is next level.',
//       rating: 5,
//     },
//   ]

//   const pricingPlans = [
//     {
//       plan: 'Basic',
//       price: '₹5,000',
//       desc: 'Perfect for short content',
//       highlighted: false,
//       features: [
//         'Up to 5 min edited video',
//         'Basic color grading',
//         'Background music',
//         'Subtitles/captions',
//         '2 revisions',
//         '5 day delivery',
//       ],
//     },
//     {
//       plan: 'Pro',
//       price: '₹15,000',
//       desc: 'For serious creators',
//       highlighted: true,
//       features: [
//         'Up to 15 min edited video',
//         'Advanced color grading',
//         'Motion graphics',
//         'Sound design',
//         'Thumbnail design',
//         '5 revisions',
//         '7 day delivery',
//       ],
//     },
//     {
//       plan: 'Premium',
//       price: '₹30,000',
//       desc: 'Cinematic brand films',
//       highlighted: false,
//       features: [
//         'Up to 30 min edited video',
//         'Cinematic color grade',
//         'Custom motion graphics',
//         'Full sound design',
//         'Thumbnail + shorts cut',
//         'Unlimited revisions',
//         '14 day delivery',
//       ],
//     },
//   ]

//   const processSteps = [
//     { step: '01', title: 'Brief', desc: 'Share your raw footage, references and vision. We align on style, tone and deliverables.', icon: '📋' },
//     { step: '02', title: 'Edit', desc: 'I cut, color grade, add motion graphics and sound design to create the final edit.', icon: '✂️' },
//     { step: '03', title: 'Review', desc: 'You review the edit and share feedback. We refine until you love it.', icon: '👁' },
//     { step: '04', title: 'Delivery', desc: 'Final files delivered in your preferred format. Ready to publish.', icon: '🚀' },
//   ]

//   return (
//     <div className="min-h-screen text-white overflow-x-hidden font-sans" style={{ background: '#050505' }}>

//       <AnimatePresence>
//         {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
//       </AnimatePresence>

//       <CustomCursor />
//       <ScrollProgress />

//       {/* Ambient cursor glow */}
//       <div
//         className="fixed pointer-events-none z-10 w-96 h-96 rounded-full blur-3xl opacity-[0.06] transition-all duration-700"
//         style={{
//           background: 'radial-gradient(circle, #ff6b00, #ff0080)',
//           left: mousePos.x - 192,
//           top: mousePos.y - 192,
//         }}
//       />

//       {/* NAV */}
//       <motion.nav
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 2.3, duration: 0.8 }}
//         className="fixed top-0 left-0 right-0 z-50"
//         style={{
//           background: 'rgba(5,5,5,0.85)',
//           backdropFilter: 'blur(20px)',
//           borderBottom: '1px solid rgba(255,255,255,0.04)',
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             {portfolio.avatar ? (
//               <img src={portfolio.avatar} alt={portfolio.name} className="w-9 h-9 rounded-xl object-cover ring-2 ring-orange-500/30" />
//             ) : (
//               <div
//                 className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
//                 style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//               >
//                 {portfolio.name.charAt(0)}
//               </div>
//             )}
//             <div>
//               <p className="font-black text-sm text-white">{portfolio.name}</p>
//               <p className="text-xs text-white/30">Video Editor</p>
//             </div>
//           </div>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-8 text-sm">
//             {['Work', 'Services', 'Process', 'About'].map((item) => (
//               <motion.button
//                 key={item}
//                 whileHover={{ color: '#ff6b00' }}
//                 className="text-white/40 font-medium transition-colors"
//                 onClick={() => {
//                   document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
//                 }}
//               >
//                 {item}
//               </motion.button>
//             ))}
//           </div>

//           {/* CTA */}
//           <div className="flex items-center gap-3">
//             {portfolio.linkedin && (
//               <motion.a
//                 whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,107,0,0.4)' }}
//                 whileTap={{ scale: 0.95 }}
//                 href={portfolio.linkedin}
//                 target="_blank"
//                 className="hidden md:block text-sm font-black px-5 py-2.5 rounded-2xl text-white"
//                 style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//               >
//                 Hire Me →
//               </motion.a>
//             )}
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
//             >
//               <motion.div
//                 animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
//                 className="w-5 h-0.5 bg-white"
//               />
//               <motion.div
//                 animate={{ opacity: menuOpen ? 0 : 1 }}
//                 className="w-5 h-0.5 bg-white"
//               />
//               <motion.div
//                 animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
//                 className="w-5 h-0.5 bg-white"
//               />
//             </motion.button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="md:hidden border-t overflow-hidden"
//               style={{ borderColor: 'rgba(255,255,255,0.04)' }}
//             >
//               <div className="px-6 py-6 space-y-4">
//                 {['Work', 'Services', 'Process', 'About'].map((item) => (
//                   <button
//                     key={item}
//                     onClick={() => {
//                       setMenuOpen(false)
//                       document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
//                     }}
//                     className="block text-white/60 font-medium text-lg"
//                   >
//                     {item}
//                   </button>
//                 ))}
//                 {portfolio.linkedin && (
//                   <a
//                     href={portfolio.linkedin}
//                     target="_blank"
//                     className="block text-sm font-black px-5 py-3 rounded-2xl text-white text-center mt-4"
//                     style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//                   >
//                     Hire Me →
//                   </a>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* HERO */}
//       <section className="relative min-h-screen flex items-center pt-20 overflow-hidden pb-20 md:pb-0">

//         {/* Video / Gradient Background */}
//         <motion.div style={{ scale: heroScale }} className="absolute inset-0">
//           {bgVideoUrl ? (
//             <iframe
//               src={bgVideoUrl}
//               className="absolute inset-0 w-full h-full pointer-events-none"
//               style={{ transform: 'scale(1.3)', transformOrigin: 'center' }}
//               allow="autoplay; muted"
//             />
//           ) : (
//             <div className="absolute inset-0">
//               <motion.div
//                 animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
//                 className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl opacity-20"
//                 style={{ background: 'radial-gradient(circle, #ff6b00, transparent)' }}
//               />
//               <motion.div
//                 animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
//                 transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
//                 className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-15"
//                 style={{ background: 'radial-gradient(circle, #ff0080, transparent)' }}
//               />
//               <motion.div
//                 animate={{ scale: [1, 1.3, 1] }}
//                 transition={{ duration: 15, repeat: Infinity }}
//                 className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"
//                 style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
//               />
//             </div>
//           )}
//           {/* Dark overlay */}
//           <div
//             className="absolute inset-0 z-0"
//             style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.7) 50%, #050505 100%)' }}
//           />
//         </motion.div>

//         {/* Film grain */}
//         <div
//           className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//             backgroundSize: '128px 128px',
//           }}
//         />

//         {/* Hero Content */}
//         <motion.div
//           style={{ opacity: heroOpacity }}
//           className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full"
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
//             {/* Left Content */}
//             <div className="max-w-3xl">
//               {/* Badge */}
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 2.5, duration: 0.6 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold mb-8 backdrop-blur-sm"
//                 style={{
//                   background: 'rgba(255,107,0,0.08)',
//                   borderColor: 'rgba(255,107,0,0.25)',
//                   color: '#ff6b00',
//                 }}
//               >
//                 <motion.div
//                   animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="w-2 h-2 rounded-full bg-orange-500"
//                 />
//                 Available for new projects
//               </motion.div>

//               {/* Headline */}
//               <div className="mb-6">
//                 {['I Turn Raw', 'Footage Into', 'Viral Stories'].map((line, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
//                     animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
//                     transition={{ delay: 2.5 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
//                     className="block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-2"
//                   >
//                     {i === 1 ? (
//                       <span
//                         className="bg-clip-text text-transparent"
//                         style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080, #7c3aed)' }}
//                       >
//                         {line}
//                       </span>
//                     ) : (
//                       <span className="text-white">{line}</span>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Subheading */}
//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 3, duration: 0.8 }}
//                 className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
//               >
//                 {portfolio.bio ?? 'Cinematic video editing for YouTubers, brands and influencers who want content that stops the scroll.'}
//               </motion.p>

//               {/* Stats */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 3.1 }}
//                 className="flex gap-10 mb-10"
//               >
//                 {[
//                   { value: '10M+', label: 'Views Generated' },
//                   { value: `${portfolio.projects.length}+`, label: 'Projects Done' },
//                   { value: '100%', label: 'Client Satisfaction' },
//                 ].map((stat, i) => (
//                   <div key={i}>
//                     <p
//                       className="text-3xl md:text-4xl font-black bg-clip-text text-transparent"
//                       style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//                     >
//                       {stat.value}
//                     </p>
//                     <p className="text-white/30 text-xs font-medium mt-1">{stat.label}</p>
//                   </div>
//                 ))}
//               </motion.div>

//               {/* CTAs */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 3.2 }}
//                 className="flex gap-4 flex-wrap"
//               >
//                 {portfolio.linkedin && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,107,0,0.4)' }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.linkedin}
//                     target="_blank"
//                     className="relative overflow-hidden px-8 py-4 rounded-2xl text-base font-black text-white"
//                     style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//                   >
//                     <motion.div
//                       className="absolute inset-0 bg-white/15"
//                       initial={{ x: '-100%' }}
//                       whileHover={{ x: '100%' }}
//                       transition={{ duration: 0.5 }}
//                     />
//                     <span className="relative">Hire Me →</span>
//                   </motion.a>
//                 )}
//                 <motion.a
//                   whileHover={{ scale: 1.05, borderColor: 'rgba(255,107,0,0.4)' }}
//                   whileTap={{ scale: 0.95 }}
//                   href="#work"
//                   className="px-8 py-4 rounded-2xl text-base font-black text-white/70 border border-white/15 hover:text-white transition-all backdrop-blur-sm"
//                 >
//                   View Work ↓
//                 </motion.a>
//               </motion.div>
//             </div>

//             {/* Right Content - Abstract Editor Graphic */}
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 2.8, duration: 1.2, ease: "easeOut" }}
//               className="hidden lg:flex justify-center items-center h-[500px] relative perspective-1000"
//             >
//               {/* Floating Editor UI Representation */}
//               <motion.div 
//                 animate={{ rotateY: [-8, 8, -8], rotateX: [4, -4, 4] }} 
//                 transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} 
//                 className="w-full max-w-md h-[400px] preserve-3d relative"
//               >
//                 {/* Preview Window */}
//                 <motion.div 
//                   className="absolute top-0 left-[10%] right-[10%] h-48 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden flex items-center justify-center shadow-2xl shadow-orange-500/20 z-20"
//                   animate={{ y: [-10, 10, -10] }}
//                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                 >
//                   {/* Subtle video glow */}
//                   <motion.div 
//                     animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} 
//                     transition={{ duration: 4, repeat: Infinity }} 
//                     className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 to-pink-500/30" 
//                   />
//                   {/* Play Icon Graphic */}
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center pl-1.5 shadow-[0_0_30px_rgba(255,107,0,0.3)]">
//                       <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent" />
//                     </div>
//                   </div>
                  
//                   {/* Fake UI Overlay */}
//                   <div className="absolute top-3 right-3 flex gap-1.5">
//                     <div className="w-2 h-2 rounded-full bg-white/20" />
//                     <div className="w-2 h-2 rounded-full bg-white/20" />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
//                     <motion.div 
//                       className="h-full bg-orange-500" 
//                       animate={{ width: ["0%", "100%", "0%"] }} 
//                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//                     />
//                   </div>
//                 </motion.div>

//                 {/* Timeline Panel */}
//                 <motion.div 
//                   className="absolute bottom-0 left-0 right-0 h-44 bg-[#111]/80 border border-white/10 rounded-2xl backdrop-blur-xl p-5 shadow-2xl z-10"
//                   animate={{ y: [10, -10, 10] }}
//                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//                 >
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-3 h-3 rounded-full bg-red-500" />
//                     <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Timeline_Sequence_01</p>
//                   </div>
                  
//                   <div className="space-y-4 relative">
//                     {/* Track 1 (Video) */}
//                     <div className="flex gap-3 items-center">
//                       <div className="w-6 h-4 bg-white/5 rounded text-[8px] flex items-center justify-center text-white/30">V1</div>
//                       <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative">
//                         <motion.div 
//                           animate={{ x: ['-100%', '300%'] }} 
//                           transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} 
//                           className="absolute inset-y-0 w-1/3 bg-orange-500/60 rounded border border-orange-400/50" 
//                         />
//                       </div>
//                     </div>
//                     {/* Track 2 (Effects) */}
//                     <div className="flex gap-3 items-center">
//                       <div className="w-6 h-4 bg-white/5 rounded text-[8px] flex items-center justify-center text-white/30">V2</div>
//                       <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative">
//                         <motion.div 
//                           animate={{ x: ['300%', '-100%'] }} 
//                           transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} 
//                           className="absolute inset-y-0 w-1/4 bg-pink-500/60 rounded border border-pink-400/50" 
//                         />
//                       </div>
//                     </div>
//                     {/* Track 3 (Audio) */}
//                     <div className="flex gap-3 items-center">
//                       <div className="w-6 h-4 bg-white/5 rounded text-[8px] flex items-center justify-center text-white/30">A1</div>
//                       <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative flex gap-1">
//                         <motion.div 
//                           animate={{ x: ['-50%', '150%'] }} 
//                           transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} 
//                           className="absolute inset-y-0 w-1/2 bg-purple-500/60 rounded border border-purple-400/50 flex items-center justify-center overflow-hidden" 
//                         >
//                           {/* Fake audio waveform */}
//                           <div className="w-full h-2 flex gap-0.5 px-2 items-center opacity-50">
//                             {[...Array(20)].map((_, i) => (
//                                <motion.div 
//                                  key={i} 
//                                  className="flex-1 bg-white/80 rounded-full" 
//                                  animate={{ height: ['20%', '100%', '20%'] }} 
//                                  transition={{ duration: 0.5 + (i * 0.1), repeat: Infinity, ease: "easeInOut" }}
//                                />
//                             ))}
//                           </div>
//                         </motion.div>
//                       </div>
//                     </div>

//                     {/* Animated Playhead Line */}
//                     <motion.div 
//                       animate={{ x: [0, 260, 0] }} 
//                       transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} 
//                       className="absolute top-0 bottom-0 left-8 w-[2px] bg-red-500 z-10 shadow-[0_0_10px_red]"
//                     >
//                       <div className="absolute -top-3 -left-1.5 w-3 h-4 bg-red-500 rounded-sm" />
//                       <div className="absolute -top-3 -left-1.5 w-3 h-4 border border-white/50 rounded-sm" />
//                     </motion.div>
//                   </div>
//                 </motion.div>

//                 {/* Floating elements representing "assets" */}
//                 <motion.div 
//                   animate={{ y: [-15, 5, -15], rotate: [0, 10, 0] }} 
//                   transition={{ duration: 7, repeat: Infinity }}
//                   className="absolute top-1/2 -left-8 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg flex items-center justify-center text-2xl z-30"
//                 >
//                   🎵
//                 </motion.div>
//                 <motion.div 
//                   animate={{ y: [5, -20, 5], rotate: [0, -15, 0] }} 
//                   transition={{ duration: 8, repeat: Infinity, delay: 1 }}
//                   className="absolute top-1/3 -right-6 w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg flex items-center justify-center text-xl z-30"
//                 >
//                   ✨
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Scroll indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 3.5 }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
//         >
//           <motion.div
//             animate={{ y: [0, 8, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5 backdrop-blur-sm"
//           >
//             <motion.div
//               animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//               className="w-1 h-2 rounded-full bg-orange-500"
//             />
//           </motion.div>
//         </motion.div>

//       </section>

//       {/* CONTENT */}
//       <div id="work" className="max-w-7xl mx-auto px-6 md:px-8 space-y-32 pb-32 pt-20">

//         {/* FEATURED WORK */}
//         {portfolio.projects.length > 0 && (
//           <RevealSection>
//             <div className="text-center mb-16">
//               <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">Portfolio</p>
//               <h2 className="text-4xl md:text-6xl font-black">Featured Work</h2>
//               <p className="text-white/30 mt-4 max-w-md mx-auto">Every frame crafted with precision. Every cut tells a story.</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {portfolio.projects.map((project, i) => (
//                 <ProjectCard 
//                   key={project.id} 
//                   project={project} 
//                   index={i} 
//                   setActiveVideo={setActiveVideo} 
//                 />
//               ))}
//             </div>
//           </RevealSection>
//         )}

//         {/* SERVICES */}
//         <RevealSection>
//           <div id="services" className="text-center mb-16 pt-10">
//             <p className="text-pink-400 text-xs font-black uppercase tracking-widest mb-3">Packages</p>
//             <h2 className="text-4xl md:text-6xl font-black">Services & Pricing</h2>
//             <p className="text-white/30 mt-4 max-w-md mx-auto">Transparent pricing. No hidden costs. Just world-class editing.</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {pricingPlans.map((plan, i) => (
//               <motion.div
//                 key={plan.plan}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//               >
//                 <PricingCard {...plan} />
//               </motion.div>
//             ))}
//           </div>
//         </RevealSection>

//         {/* PROCESS */}
//         <RevealSection>
//           <div id="process" className="text-center mb-16 pt-10">
//             <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-3">How it works</p>
//             <h2 className="text-4xl md:text-6xl font-black">The Process</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
//             {/* Connecting line */}
//             <div
//               className="absolute top-12 left-0 right-0 h-px hidden md:block"
//               style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.3), rgba(255,0,128,0.3), transparent)' }}
//             />
//             {processSteps.map((step, i) => (
//               <motion.div
//                 key={step.step}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.15 }}
//                 className="relative text-center"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
//                   transition={{ duration: 0.4 }}
//                   className="w-20 h-20 rounded-3xl flex flex-col items-center justify-center mx-auto mb-6 relative z-10"
//                   style={{
//                     background: 'rgba(255,255,255,0.04)',
//                     border: '1px solid rgba(255,107,0,0.2)',
//                     boxShadow: '0 0 20px rgba(255,107,0,0.08)',
//                     backdropFilter: 'blur(10px)',
//                   }}
//                 >
//                   <span className="text-2xl">{step.icon}</span>
//                   <span
//                     className="text-xs font-black mt-1"
//                     style={{ color: 'rgba(255,107,0,0.6)' }}
//                   >
//                     {step.step}
//                   </span>
//                 </motion.div>
//                 <h3 className="font-black text-lg mb-2 text-white">{step.title}</h3>
//                 <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </RevealSection>

//         {/* ABOUT */}
//         <RevealSection>
//           <div id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-10">
//             {/* Left */}
//             <div>
//               <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-4">About Me</p>
//               <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
//                 Crafting Stories<br />
//                 <span
//                   className="bg-clip-text text-transparent"
//                   style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//                 >
//                   Frame by Frame
//                 </span>
//               </h2>
//               <p className="text-white/50 leading-relaxed mb-8 text-lg">
//                 {portfolio.bio ?? 'I am a passionate video editor who transforms raw footage into compelling visual stories. With expertise in color grading, motion graphics and sound design, I help creators and brands stand out in a crowded digital landscape.'}
//               </p>

//               {/* Skills */}
//               {portfolio.skills.length > 0 && (
//                 <div className="flex flex-wrap gap-3">
//                   {portfolio.skills.map((skill, i) => (
//                     <motion.div
//                       key={skill}
//                       initial={{ opacity: 0, scale: 0.5 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: i * 0.05, type: 'spring' }}
//                       whileHover={{ scale: 1.08, y: -3 }}
//                       className="px-4 py-2 rounded-xl text-sm font-bold"
//                       style={{
//                         background: 'rgba(255,107,0,0.08)',
//                         border: '1px solid rgba(255,107,0,0.2)',
//                         color: 'rgba(255,107,0,0.8)',
//                       }}
//                     >
//                       {skill}
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Right — Avatar */}
//             <div className="relative">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//                 className="absolute -inset-4 rounded-3xl opacity-20"
//                 style={{ background: 'conic-gradient(from 0deg, #ff6b00, #ff0080, #7c3aed, #ff6b00)' }}
//               />
//               {portfolio.avatar ? (
//                 <img
//                   src={portfolio.avatar}
//                   alt={portfolio.name}
//                   className="relative w-full rounded-3xl object-cover z-10 shadow-2xl"
//                   style={{ maxHeight: '500px' }}
//                 />
//               ) : (
//                 <div
//                   className="relative w-full h-96 rounded-3xl flex items-center justify-center z-10 text-9xl font-black shadow-2xl"
//                   style={{
//                     background: 'linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,0,128,0.1))',
//                     border: '1px solid rgba(255,107,0,0.15)',
//                     color: 'rgba(255,107,0,0.2)',
//                     backdropFilter: 'blur(10px)',
//                   }}
//                 >
//                   {portfolio.name.charAt(0)}
//                 </div>
//               )}

//               {/* Floating stat cards */}
//               <motion.div
//                 animate={{ y: [-6, 6, -6] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//                 className="absolute -right-6 top-8 z-20 px-5 py-3 rounded-2xl"
//                 style={{
//                   background: 'rgba(5,5,5,0.95)',
//                   border: '1px solid rgba(255,107,0,0.3)',
//                   boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
//                 }}
//               >
//                 <p className="text-xs text-white/30 font-medium">Views Generated</p>
//                 <p
//                   className="text-2xl font-black bg-clip-text text-transparent"
//                   style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//                 >
//                   10M+
//                 </p>
//               </motion.div>

//               <motion.div
//                 animate={{ y: [6, -6, 6] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="absolute -left-6 bottom-8 z-20 px-5 py-3 rounded-2xl"
//                 style={{
//                   background: 'rgba(5,5,5,0.95)',
//                   border: '1px solid rgba(124,58,237,0.3)',
//                   boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
//                 }}
//               >
//                 <p className="text-xs text-white/30 font-medium">Projects Done</p>
//                 <p
//                   className="text-2xl font-black bg-clip-text text-transparent"
//                   style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed, #ff0080)' }}
//                 >
//                   {portfolio.projects.length}+
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </RevealSection>

//         {/* EXPERIENCE */}
//         {portfolio.experience.length > 0 && (
//           <RevealSection>
//             <div className="text-center mb-12">
//               <p className="text-orange-400 text-xs font-black uppercase tracking-widest mb-3">Career</p>
//               <h2 className="text-4xl md:text-5xl font-black">Experience</h2>
//             </div>
//             <div className="space-y-4">
//               {portfolio.experience.map((exp, i) => (
//                 <motion.div
//                   key={exp.id}
//                   initial={{ opacity: 0, x: -30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   whileHover={{ x: 4 }}
//                   className="rounded-3xl p-6 md:p-8 border group"
//                   style={{
//                     background: 'rgba(255,255,255,0.02)',
//                     borderColor: 'rgba(255,255,255,0.05)',
//                   }}
//                 >
//                   <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
//                     <div>
//                       <h3 className="text-xl font-black text-white group-hover:text-orange-400 transition-colors">{exp.role}</h3>
//                       <p className="text-orange-400/70 font-bold text-sm mt-1">{exp.company}</p>
//                       {exp.description && (
//                         <p className="text-white/30 text-sm mt-3 leading-relaxed">{exp.description}</p>
//                       )}
//                     </div>
//                     {exp.duration && (
//                       <span
//                         className="text-xs font-bold px-4 py-1.5 rounded-full w-fit shrink-0"
//                         style={{
//                           background: 'rgba(255,107,0,0.08)',
//                           border: '1px solid rgba(255,107,0,0.2)',
//                           color: '#ff6b00',
//                         }}
//                       >
//                         {exp.duration}
//                       </span>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </RevealSection>
//         )}

//         {/* TESTIMONIALS */}
//         <RevealSection>
//           <div className="text-center mb-16">
//             <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-3">Client Love</p>
//             <h2 className="text-4xl md:text-6xl font-black">Testimonials</h2>
//             <p className="text-white/30 mt-4">What clients say after working with me</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {testimonials.map((t, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//               >
//                 <TestimonialCard {...t} />
//               </motion.div>
//             ))}
//           </div>
//         </RevealSection>

//         {/* BIG CTA */}
//         <RevealSection>
//           <div
//             className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center shadow-2xl"
//             style={{
//               background: 'linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,0,128,0.1), rgba(124,58,237,0.1))',
//               border: '1px solid rgba(255,107,0,0.15)',
//             }}
//           >
//             {/* Animated rings */}
//             {[1, 2, 3].map((ring) => (
//               <motion.div
//                 key={ring}
//                 animate={{ rotate: ring % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
//                 transition={{ duration: 15 * ring, repeat: Infinity, ease: 'linear' }}
//                 className="absolute rounded-full border border-orange-500/5 pointer-events-none"
//                 style={{ inset: `-${ring * 80}px` }}
//               />
//             ))}

//             {/* Scanning line */}
//             <motion.div
//               className="absolute left-0 right-0 h-px opacity-30 pointer-events-none"
//               style={{ background: 'linear-gradient(90deg, transparent, #ff6b00, transparent)' }}
//               animate={{ top: ['0%', '100%', '0%'] }}
//               transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
//             />

//             <div className="relative z-10">
//               <motion.div
//                 initial={{ scale: 0 }}
//                 whileInView={{ scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: 'spring', bounce: 0.5 }}
//                 className="text-6xl mb-6"
//               >
//                 🎬
//               </motion.div>
//               <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
//                 Let's Create Something{' '}
//                 <span
//                   className="bg-clip-text text-transparent"
//                   style={{ backgroundImage: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//                 >
//                   Viral
//                 </span>
//               </h2>
//               <p className="text-white/40 text-lg max-w-lg mx-auto mb-10">
//                 Ready to take your content to the next level? Let's talk about your project.
//               </p>
//               <div className="flex gap-4 justify-center flex-wrap">
//                 {portfolio.linkedin && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,107,0,0.4)' }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.linkedin}
//                     target="_blank"
//                     className="relative overflow-hidden font-black px-10 py-4 rounded-2xl text-white shadow-xl"
//                     style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
//                   >
//                     <motion.div
//                       className="absolute inset-0 bg-white/10"
//                       initial={{ x: '-100%' }}
//                       whileHover={{ x: '100%' }}
//                       transition={{ duration: 0.5 }}
//                     />
//                     <span className="relative">Start a Project →</span>
//                   </motion.a>
//                 )}
//                 {portfolio.twitter && (
//                   <motion.a
//                     whileHover={{ scale: 1.05 }}
//                     href={portfolio.twitter}
//                     target="_blank"
//                     className="font-black px-10 py-4 rounded-2xl text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all backdrop-blur-sm"
//                   >
//                     DM on Twitter
//                   </motion.a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </RevealSection>

//         {/* CERTIFICATIONS */}
//         {portfolio.certifications.length > 0 && (
//           <RevealSection>
//             <div className="text-center mb-12">
//               <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-3">Achievements</p>
//               <h2 className="text-4xl font-black">Certifications</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {portfolio.certifications.map((cert, i) => (
//                 <motion.div
//                   key={cert.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.05 }}
//                   whileHover={{ scale: 1.02 }}
//                   className="rounded-3xl p-6 border flex justify-between items-center"
//                   style={{
//                     background: 'rgba(255,255,255,0.02)',
//                     borderColor: 'rgba(255,255,255,0.05)',
//                   }}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div
//                       className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-yellow-400 shrink-0"
//                       style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.15)' }}
//                     >
//                       ✦
//                     </div>
//                     <div>
//                       <p className="font-black text-sm text-white">{cert.name}</p>
//                       {cert.issuer && <p className="text-white/30 text-xs mt-0.5">{cert.issuer}</p>}
//                     </div>
//                   </div>
//                   {cert.link && (
//                     <motion.a
//                       whileHover={{ x: 4 }}
//                       href={cert.link}
//                       target="_blank"
//                       className="text-orange-400 text-xs font-black ml-4 shrink-0"
//                     >
//                       View →
//                     </motion.a>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           </RevealSection>
//         )}

//       </div>

//       {/* FOOTER */}
//       <footer
//         className="border-t py-12 text-center relative z-10 bg-[#050505]"
//         style={{ borderColor: 'rgba(255,255,255,0.04)' }}
//       >
//         <div className="max-w-7xl mx-auto px-8">
//           <motion.div
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 3, repeat: Infinity }}
//             className="text-3xl mb-4"
//           >
//             🎬
//           </motion.div>
//           <p className="font-black text-xl text-white mb-2">{portfolio.name}</p>
//           <p className="text-white/20 text-sm mb-6">Video Editor & Storyteller</p>
//           <div className="flex justify-center gap-6 mb-8">
//             {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">LinkedIn</a>}
//             {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">Twitter</a>}
//             {portfolio.website && <a href={portfolio.website} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">Showreel</a>}
//           </div>
//           <p className="text-xs text-white/10">
//             {showWatermark ? (
//               <span>
//                 Made with{' '}
//                 <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-white/30">Portfolio SaaS</a>
//                 {' — '}
//                 <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-white/30">Remove watermark</a>
//               </span>
//             ) : (
//               <span>Built with Portfolio SaaS</span>
//             )}
//           </p>
//         </div>
//       </footer>

//       {/* VIDEO MODAL */}
//       <AnimatePresence>
//         {activeVideo && (
//           <motion.div
//             initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
//             animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
//             exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
//             className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-8 bg-black/80"
//             onClick={() => setActiveVideo(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.9, y: 20, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,107,0,0.2)]"
//               onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video
//             >
//               <button 
//                 onClick={() => setActiveVideo(null)} 
//                 className="absolute top-4 right-4 z-50 w-12 h-12 bg-black/50 hover:bg-orange-500 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all border border-white/10 hover:border-orange-400 group shadow-lg"
//               >
//                 <motion.span 
//                    whileHover={{ rotate: 90 }}
//                    className="block text-xl"
//                 >
//                   ✕
//                 </motion.span>
//               </button>
              
//               {/* Loader placeholder behind iframe */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
//                 <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-2 border-orange-500/20 border-t-orange-500 rounded-full mb-4" />
//                 <p className="text-white/30 text-xs font-bold tracking-widest uppercase">Loading Media...</p>
//               </div>

//               <iframe 
//                 src={activeVideo} 
//                 className="absolute inset-0 w-full h-full z-10 bg-transparent" 
//                 allow="autoplay; fullscreen; picture-in-picture" 
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </div>
//   )
// }
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
// CAMERA VIEWFINDER & OVERLAYS (ADVANCED EDITOR UI)
// ============================================================
function ViewfinderOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9000] mix-blend-overlay opacity-30 hidden md:block">
      {/* Center Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-8 h-[1px] bg-white/50" />
        <div className="absolute h-8 w-[1px] bg-white/50" />
      </div>
      
      {/* Rule of Thirds subtle lines */}
      <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/10" />
      <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white/10" />
      <div className="absolute left-1/3 top-0 h-full w-[1px] bg-white/10" />
      <div className="absolute left-2/3 top-0 h-full w-[1px] bg-white/10" />

      {/* Camera Corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/40" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/40" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/40" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/40" />
    </div>
  )
}

function TimecodeOverlay() {
  const [timecode, setTimecode] = useState("00:00:00:00")

  useEffect(() => {
    let frame = 0
    const interval = setInterval(() => {
      frame++
      const h = Math.floor(frame / (24 * 60 * 60)).toString().padStart(2, '0')
      const m = Math.floor((frame / (24 * 60)) % 60).toString().padStart(2, '0')
      const s = Math.floor((frame / 24) % 60).toString().padStart(2, '0')
      const f = (frame % 24).toString().padStart(2, '0')
      setTimecode(`${h}:${m}:${s}:${f}`)
    }, 1000 / 24) // 24 FPS
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-6 right-8 z-[9001] pointer-events-none hidden md:flex flex-col items-end gap-1 font-mono">
      <div className="flex items-center gap-2">
        <motion.div 
          animate={{ opacity: [1, 0, 1] }} 
          transition={{ duration: 1, repeat: Infinity }} 
          className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_red]"
        />
        <span className="text-[10px] text-white/50 tracking-[0.2em]">REC</span>
      </div>
      <p className="text-xl font-bold text-white/80 tracking-wider mix-blend-difference">{timecode}</p>
      <p className="text-[8px] text-white/30 uppercase tracking-widest">SMPTE / 24.00 FPS / 4K LOG</p>
    </div>
  )
}

// ============================================================
// SCROLL PROGRESS
// ============================================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9998] origin-left"
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
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 40,
        height: 40,
        border: '1px solid rgba(255,255,255,0.5)',
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
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
// LOADING SCREEN (RENDERING SEQUENCE)
// ============================================================
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(onDone, 400)
          return 100
        }
        return p + Math.floor(Math.random() * 15)
      })
    }, 200)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <motion.div
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center font-mono"
      style={{ background: '#050505' }}
    >
      <div className="w-full max-w-md px-8">
        <p className="text-orange-500 text-xs tracking-[0.3em] uppercase mb-4 font-bold flex justify-between">
          <span>Rendering Sequence</span>
          <span>{Math.min(progress, 100)}%</span>
        </p>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>
        <div className="text-[10px] text-white/30 space-y-1">
          <p>Analyzing color space... OK</p>
          <p>Compiling motion blur... OK</p>
          <p>Baking audio stems... {progress > 60 ? 'OK' : 'WAIT'}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
// YOUTUBE HELPERS
// ============================================================
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0&modestbranding=1`
  }
  const vimeoRegExp = /vimeo\.com\/(\d+)/
  const vimeoMatch = url.match(vimeoRegExp)
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`
  }
  return null
}

function getBackgroundVideoUrl(url: string): string | null {
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

function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`
  }
  return null
}

// ============================================================
// PROJECT CARD COMPONENT (Advanced Magnetic 3D Parallax)
// ============================================================
function ProjectCard({ 
  project, 
  index, 
  setActiveVideo 
}: { 
  project: Project; 
  index: number; 
  setActiveVideo: (url: string) => void 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Magnetic 3D Setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const projectEmbedUrl = getYouTubeEmbedUrl(project.link ?? '')
  const projectPreviewUrl = getBackgroundVideoUrl(project.link ?? '')
  const thumbUrl = getYouTubeThumbnail(project.link ?? '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => projectEmbedUrl ? setActiveVideo(projectEmbedUrl) : project.link ? window.open(project.link, '_blank') : null}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(255,107,0,0.2)]"
      >
        <div 
          style={{ aspectRatio: index === 0 ? '16/10' : '4/3', transform: 'translateZ(0)' }} 
          className="relative w-full h-full bg-[#111]"
        >
          {/* Base Gradient */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{
              background: index % 4 === 0 ? 'linear-gradient(135deg, #ff6b00, #ff0080)' : 'linear-gradient(135deg, #1a1a2e, #7c3aed)',
            }}
          />

          {/* YouTube Thumbnail */}
          {thumbUrl && (
            <img 
              src={thumbUrl} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-50 z-0"
            />
          )}

          {/* Autoplay Preview Video */}
          <AnimatePresence>
            {isHovered && projectPreviewUrl && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-10 pointer-events-none mix-blend-screen"
              >
                <iframe
                  src={projectPreviewUrl}
                  className="absolute inset-0 w-full h-full transform scale-125 pointer-events-none opacity-80 filter contrast-125 saturate-150"
                  allow="autoplay; muted"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Film Noise & CRT Scanlines */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none" style={{ transform: "translateZ(30px)" }}>
            <motion.div
              animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              <div className="w-0 h-0 ml-1" style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid white' }} />
            </motion.div>
          </div>

          {/* Audio Visualizer Hover Effect */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 h-8 z-20 pointer-events-none"
                style={{ transform: "translateZ(40px) translateX(-50%) translateY(-50%)" }}
              >
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="w-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_#ff6b00]"
                    animate={{ height: ['20%', '100%', '20%'] }}
                    transition={{ duration: 0.3 + Math.random() * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 z-20">
            <motion.div style={{ transform: "translateZ(50px)" }}>
              <h3 className="text-white font-black text-xl mb-1 tracking-tight">{project.title}</h3>
              {project.description && (
                <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.description}</p>
              )}
              <div className="flex gap-2">
                <span className="text-xs font-black px-4 py-2 rounded-xl text-white shadow-[0_0_20px_rgba(255,107,0,0.4)] pointer-events-none flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  PLAY SEQUENCE
                </span>
              </div>
            </motion.div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20" style={{ transform: "translateZ(20px)" }}>
            <span className="text-[10px] font-black px-3 py-1.5 rounded-sm text-white/80 border border-white/20 uppercase tracking-widest backdrop-blur-md bg-black/40">
              {index % 4 === 0 ? 'YouTube' : index % 4 === 1 ? 'Commercial' : index % 4 === 2 ? 'Shorts' : 'Cinematic'}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
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
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-sm text-[10px] tracking-widest uppercase font-black text-white"
          style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
        >
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">{plan}</p>
        <p className="text-4xl font-black text-white mb-2 tracking-tighter">{price}</p>
        <p className="text-white/40 text-sm font-medium">{desc}</p>
      </div>
      <div className="space-y-3 flex-1 mb-8">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-orange-500 text-sm mt-0.5 shrink-0">✓</span>
            <span className="text-white/60 text-sm">{f}</span>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 rounded-md text-xs tracking-widest uppercase font-black transition-all"
        style={{
          background: highlighted
            ? 'linear-gradient(135deg, #ff6b00, #ff0080)'
            : 'rgba(255,255,255,0.06)',
          color: 'white',
          border: highlighted ? 'none' : '1px solid rgba(255,255,255,0.1)',
        }}
      >
        Select Tier
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
      className="rounded-3xl p-8 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="absolute top-0 right-0 p-6 text-6xl text-white/5 font-serif italic">"</div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-orange-500 text-sm">★</span>
        ))}
      </div>
      <p className="text-white/60 text-sm leading-relaxed mb-6 italic relative z-10">"{text}"</p>
      <div className="flex items-center gap-3 relative z-10">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-sm border border-white/20"
          style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-black text-sm text-white uppercase tracking-wider">{name}</p>
          <p className="text-white/30 text-[10px] font-mono tracking-widest">{role}</p>
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
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])
  
  // Parallax logic for Hero UI
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const pRotateX = useTransform(parallaxY, [-0.5, 0.5], ["5deg", "-5deg"])
  const pRotateY = useTransform(parallaxX, [-0.5, 0.5], ["-5deg", "5deg"])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      parallaxX.set(e.clientX / window.innerWidth - 0.5)
      parallaxY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [parallaxX, parallaxY])

  useEffect(() => {
    if (activeVideo) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [activeVideo])

  const bgVideoUrl = getBackgroundVideoUrl(portfolio.website ?? '')

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'YouTuber — 500K Subs',
      text: 'My videos went from 10K to 200K views after working together. The editing style is cinematic and engaging. Best investment I made.',
      rating: 5,
    },
    {
      name: 'Priya Mehta',
      role: 'Brand Manager',
      text: 'Delivered our brand film in 3 days. The quality was beyond our expectations. Will definitely work again.',
      rating: 5,
    },
    {
      name: 'Arjun Singh',
      role: 'Influencer',
      text: 'My reels engagement doubled after switching to this editor. The pacing, music sync and color grading is next level.',
      rating: 5,
    },
  ]

  const pricingPlans = [
    {
      plan: 'Basic Cut',
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
      plan: 'Pro Sequence',
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
      plan: 'Cinema Master',
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
    { step: '01', title: 'Pre-Prod Brief', desc: 'Share raw footage, references, and vision. We align on style, pacing, and core narrative.', icon: '📋' },
    { step: '02', title: 'Assembly & Cut', desc: 'Trimming the fat. Building the foundation of the story with precise pacing and rhythm.', icon: '✂️' },
    { step: '03', title: 'Color & Sound', desc: 'Applying cinematic color grades and layering immersive sound design and foley.', icon: '🎛️' },
    { step: '04', title: 'Final Render', desc: 'Exported in high-bitrate 4K, ready for multi-platform digital distribution.', icon: '🚀' },
  ]

  return (
    <div className="min-h-screen text-white overflow-x-hidden font-sans selection:bg-orange-500 selection:text-white" style={{ background: '#050505' }}>

      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <CustomCursor />
      <ScrollProgress />
      <ViewfinderOverlay />
      <TimecodeOverlay />

      {/* Ambient cursor glow */}
      <div
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full blur-[100px] opacity-[0.08] transition-all duration-700 mix-blend-screen hidden md:block"
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
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.95), rgba(5,5,5,0))', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {portfolio.avatar ? (
              <img src={portfolio.avatar} alt={portfolio.name} className="w-10 h-10 rounded-lg object-cover grayscale hover:grayscale-0 transition-all border border-white/10" />
            ) : (
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black bg-[#111] border border-white/10">
                {portfolio.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-bold text-sm text-white tracking-widest uppercase">{portfolio.name}</p>
              <p className="text-[10px] text-orange-500 font-mono tracking-widest uppercase">Senior Editor</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            {['Work', 'Services', 'Process', 'About'].map((item) => (
              <motion.button key={item} whileHover={{ color: '#fff' }} className="transition-colors hover:text-orange-400" onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>
                {item}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {portfolio.linkedin && (
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={portfolio.linkedin} target="_blank" className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-sm text-white border border-white/20 hover:border-orange-500 hover:bg-orange-500/10 transition-all">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                Book Session
              </motion.a>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/5 rounded-md border border-white/10"
            >
              <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="w-5 h-[2px] bg-white" />
              <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-5 h-[2px] bg-white" />
              <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="w-5 h-[2px] bg-white" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t overflow-hidden bg-[#0a0a0a]"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <div className="px-6 py-8 space-y-6 flex flex-col items-center">
                {['Work', 'Services', 'Process', 'About'].map((item) => (
                  <button key={item} onClick={() => { setMenuOpen(false); document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }) }} className="block text-white/60 font-mono tracking-widest uppercase text-sm">
                    {item}
                  </button>
                ))}
                {portfolio.linkedin && (
                  <a href={portfolio.linkedin} target="_blank" className="block text-xs font-black px-8 py-4 rounded-sm text-white text-center mt-4 w-full uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}>
                    Book Session
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden pb-20 md:pb-0 border-b border-white/5">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[#050505]">
          {bgVideoUrl ? (
            <iframe src={bgVideoUrl} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen filter contrast-125 saturate-50" style={{ transform: 'scale(1.3)', transformOrigin: 'center' }} allow="autoplay; muted" />
          ) : (
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />
            </div>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
          
          {/* Film Grain */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
        </div>

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content (Typography) */}
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex items-center gap-3 mb-8">
                <div className="px-3 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"/> LIVE
                </div>
                <div className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em]">Sequence_Master_V3.prproj</div>
              </motion.div>

              <div className="mb-8">
                {['Directing', 'Motion &', 'Soundscape'].map((line, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 40, rotateX: 90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="block text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase" style={{ transformOrigin: "bottom" }}>
                    {i === 1 ? <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">{line}</span> : <span className="text-white drop-shadow-2xl">{line}</span>}
                  </motion.div>
                ))}
              </div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-white/40 text-lg md:text-xl max-w-lg leading-relaxed mb-10 font-medium">
                {portfolio.bio ?? 'Industry-grade video editing, color grading, and sound design for high-end digital campaigns.'}
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex gap-6 items-center border-l-2 border-orange-500 pl-6">
                <div>
                  <p className="text-white text-3xl font-black">{portfolio.projects.length}+</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1 font-bold font-mono">Timelines Rendered</p>
                </div>
                <div>
                  <p className="text-white text-3xl font-black">10M+</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1 font-bold font-mono">Digital Impressions</p>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Advanced 3D Parallax Editor UI */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 1.5, ease: "easeOut" }} className="hidden lg:flex justify-center items-center h-[550px] relative perspective-1000">
              <motion.div style={{ rotateX: pRotateX, rotateY: pRotateY }} className="w-full max-w-lg h-[450px] preserve-3d relative">
                
                {/* Main Video Monitor */}
                <motion.div className="absolute top-0 left-0 right-0 h-56 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-20 flex flex-col" style={{ transform: "translateZ(40px)" }}>
                  <div className="h-6 border-b border-white/10 flex items-center justify-between px-3 bg-[#111]">
                    <span className="text-[8px] text-white/50 font-mono uppercase tracking-widest">Program: Main_Edit_v2</span>
                    <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-white/10"/><div className="w-2 h-2 rounded-full bg-white/10"/></div>
                  </div>
                  <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(circle,#222,#0a0a0a)] overflow-hidden">
                    <motion.div animate={{ scale: [1, 1.05, 1], filter: ['hue-rotate(0deg)', 'hue-rotate(20deg)', 'hue-rotate(0deg)'] }} transition={{ duration: 10, repeat: Infinity }} className="absolute inset-0 opacity-40 bg-gradient-to-br from-orange-600 to-purple-600 mix-blend-color" />
                    <div className="text-white/20 font-black text-6xl tracking-tighter mix-blend-overlay">RAW</div>
                    {/* Monitor Crosshairs */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/5" />
                  </div>
                </motion.div>

                {/* Timeline UI Panel */}
                <motion.div className="absolute bottom-0 left-4 right-4 h-48 bg-[#0f0f0f] border border-white/5 rounded-lg shadow-2xl p-4 z-30 backdrop-blur-xl" style={{ transform: "translateZ(80px)" }}>
                  <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                    <span className="text-[10px] font-mono text-white/40">Sequence_01</span>
                    <span className="text-[10px] font-mono text-orange-500">00:04:23:15</span>
                  </div>
                  
                  <div className="space-y-3 relative">
                    {/* Video Tracks */}
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-2 items-center">
                        <div className="w-6 font-mono text-[8px] text-white/30 text-right">V{i}</div>
                        <div className="flex-1 h-6 bg-[#1a1a1a] rounded-sm overflow-hidden relative border border-white/5">
                          <motion.div animate={{ x: i===1 ? ['-50%', '150%'] : ['100%', '-50%'] }} transition={{ duration: 15+i*5, repeat: Infinity, ease: 'linear' }} className={`absolute inset-y-0 w-1/3 rounded-sm ${i===1 ? 'bg-blue-600/40 border border-blue-500/50' : 'bg-pink-600/40 border border-pink-500/50'}`} />
                        </div>
                      </div>
                    ))}
                    {/* Audio Track with Waves */}
                    <div className="flex gap-2 items-center mt-4">
                      <div className="w-6 font-mono text-[8px] text-white/30 text-right">A1</div>
                      <div className="flex-1 h-8 bg-[#1a1a1a] rounded-sm overflow-hidden relative border border-white/5 flex gap-0.5 px-2 items-center">
                        {[...Array(40)].map((_, i) => (
                           <motion.div key={i} className="flex-1 bg-green-500/60 rounded-full" animate={{ height: ['20%', `${Math.random()*80 + 20}%`, '20%'] }} transition={{ duration: 0.2 + Math.random()*0.3, repeat: Infinity }} />
                        ))}
                      </div>
                    </div>

                    {/* Red Playhead */}
                    <motion.div animate={{ x: [0, 300, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[-25px] bottom-[-10px] left-8 w-[1px] bg-red-500 z-40">
                      <div className="absolute top-0 -left-1.5 w-3 h-3 bg-red-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Elements / UI panels */}
                <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/4 -right-12 w-32 h-24 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-lg p-2 shadow-xl z-10" style={{ transform: "translateZ(10px)" }}>
                  <p className="text-[8px] font-mono text-white/40 mb-2 border-b border-white/10 pb-1">Lumetri Color</p>
                  <div className="space-y-1.5">
                    <div className="w-full h-1 bg-gradient-to-r from-cyan-500 via-white to-red-500 rounded-full" />
                    <div className="w-full h-1 bg-gradient-to-r from-green-500 via-white to-magenta-500 rounded-full" />
                    <div className="w-full h-1 bg-gradient-to-r from-blue-500 via-white to-yellow-500 rounded-full" />
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FULL CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-40 pb-32 pt-24 relative z-10">

        {/* WORK / PORTFOLIO GRID */}
        {portfolio.projects.length > 0 && (
          <RevealSection>
            <div id="work" className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8 pt-10">
              <div>
                <p className="text-orange-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Select_Works_vFinal</p>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Directorial<br/>Archive</h2>
              </div>
              <p className="text-white/30 text-xs font-mono max-w-xs text-right hidden md:block">
                A curated selection of cinematic cuts, brand anthems, and digital experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} setActiveVideo={setActiveVideo} />
              ))}
            </div>
          </RevealSection>
        )}

        {/* SERVICES */}
        <RevealSection>
          <div id="services" className="mb-16 border-b border-white/10 pb-8 pt-10">
            <p className="text-pink-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Post_Production_Rates</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.plan} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <PricingCard {...plan} />
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* PROCESS */}
        <RevealSection>
          <div id="process" className="mb-16 border-b border-white/10 pb-8 pt-10">
            <p className="text-purple-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Workflow_Architecture</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">The Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="absolute top-12 left-0 right-0 h-[1px] hidden md:block" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.5), rgba(255,0,128,0.5), transparent)' }} />
            {processSteps.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center">
                <motion.div whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }} transition={{ duration: 0.4 }} className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center mx-auto mb-6 relative z-10 bg-[#111] border border-white/10 shadow-[0_0_30px_rgba(255,107,0,0.1)] backdrop-blur-md">
                  <span className="text-3xl mb-1">{step.icon}</span>
                  <span className="text-[10px] font-mono font-black text-orange-500 tracking-widest">{step.step}</span>
                </motion.div>
                <h3 className="font-black text-xl mb-3 text-white tracking-tight">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* ABOUT */}
        <RevealSection>
          <div id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-10">
            <div>
              <p className="text-orange-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Operator_Profile</p>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9] uppercase tracking-tighter">
                Crafting Stories<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Frame by Frame</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 text-lg font-medium">
                {portfolio.bio ?? 'I am a passionate video editor who transforms raw footage into compelling visual stories. With expertise in color grading, motion graphics and sound design, I help creators and brands stand out in a crowded digital landscape.'}
              </p>

              {portfolio.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-8">
                  {portfolio.skills.map((skill, i) => (
                    <motion.div key={skill} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, type: 'spring' }} whileHover={{ scale: 1.05, y: -2 }} className="px-3 py-1.5 rounded-sm text-xs font-mono font-bold tracking-widest uppercase border border-white/10 bg-white/5 text-white/80 hover:border-orange-500 hover:text-orange-400 transition-colors">
                      {skill}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute -inset-4 rounded-full opacity-20 blur-2xl" style={{ background: 'conic-gradient(from 0deg, #ff6b00, #ff0080, #7c3aed, #ff6b00)' }} />
              {portfolio.avatar ? (
                <img src={portfolio.avatar} alt={portfolio.name} className="relative w-full rounded-2xl object-cover z-10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-white/10" style={{ maxHeight: '500px' }} />
              ) : (
                <div className="relative w-full h-96 rounded-2xl flex items-center justify-center z-10 text-9xl font-black shadow-2xl bg-[#111] border border-white/10">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white/20 to-white/5">{portfolio.name.charAt(0)}</span>
                </div>
              )}

              <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 top-8 z-20 px-6 py-4 rounded-lg bg-[#111]/90 backdrop-blur-md border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase mb-1">Views Generated</p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">10M+</p>
              </motion.div>

              <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 bottom-8 z-20 px-6 py-4 rounded-lg bg-[#111]/90 backdrop-blur-md border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase mb-1">Projects Delivered</p>
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">{portfolio.projects.length}+</p>
              </motion.div>
            </div>
          </div>
        </RevealSection>

        {/* EXPERIENCE */}
        {portfolio.experience.length > 0 && (
          <RevealSection>
            <div className="mb-16 border-b border-white/10 pb-8 pt-10">
              <p className="text-orange-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Career_Timeline</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Experience</h2>
            </div>
            <div className="space-y-6">
              {portfolio.experience.map((exp, i) => (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ x: 8 }} className="rounded-2xl p-8 border border-white/5 bg-[#111]/50 group relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-orange-400 transition-colors uppercase tracking-tight">{exp.role}</h3>
                      <p className="text-white/50 font-mono text-[11px] tracking-widest uppercase mt-2">{exp.company}</p>
                      {exp.description && (
                        <p className="text-white/40 text-sm mt-4 leading-relaxed max-w-3xl">{exp.description}</p>
                      )}
                    </div>
                    {exp.duration && (
                      <span className="text-[10px] font-mono font-bold px-4 py-2 rounded-sm border border-white/10 bg-white/5 text-white/70 shrink-0 uppercase tracking-widest">
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
          <div className="mb-16 border-b border-white/10 pb-8 pt-10">
            <p className="text-green-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Client_Feedback_Loop</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* CERTIFICATIONS */}
        {portfolio.certifications.length > 0 && (
          <RevealSection>
            <div className="mb-12 border-b border-white/10 pb-8 pt-10">
              <p className="text-yellow-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">Verified_Achievements</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, i) => (
                <motion.div key={cert.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.02 }} className="rounded-xl p-6 border border-white/10 bg-[#111] flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center font-black text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 shrink-0 text-xl group-hover:rotate-12 transition-transform">
                      ✦
                    </div>
                    <div>
                      <p className="font-black text-sm text-white uppercase tracking-wider">{cert.name}</p>
                      {cert.issuer && <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mt-1">{cert.issuer}</p>}
                    </div>
                  </div>
                  {cert.link && (
                    <motion.a whileHover={{ x: 4 }} href={cert.link} target="_blank" className="text-orange-500 text-[10px] font-mono font-black ml-4 shrink-0 uppercase tracking-widest hover:text-orange-400">
                      View Source →
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}

        {/* BIG CTA */}
        <RevealSection>
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-24 text-center shadow-[0_0_100px_rgba(255,107,0,0.1)] border border-white/10 bg-[#0a0a0a]">
            {/* Animated Rings & Scanlines */}
            {[1, 2, 3].map((ring) => (
              <motion.div key={ring} animate={{ rotate: ring % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }} transition={{ duration: 15 * ring, repeat: Infinity, ease: 'linear' }} className="absolute rounded-full border border-white/5 pointer-events-none" style={{ inset: `-${ring * 100}px` }} />
            ))}
            <motion.div className="absolute left-0 right-0 h-[2px] opacity-20 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, #ff6b00, transparent)' }} animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />

            <div className="relative z-10">
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', bounce: 0.5 }} className="text-6xl mb-6">🎬</motion.div>
              <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                Initiate New<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Sequence</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-lg mx-auto mb-10">
                Ready to elevate your digital content? Let's open a new timeline.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {portfolio.linkedin && (
                  <motion.a whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,107,0,0.4)' }} whileTap={{ scale: 0.95 }} href={portfolio.linkedin} target="_blank" className="relative overflow-hidden font-black px-12 py-5 rounded-sm text-white shadow-xl uppercase tracking-widest text-sm" style={{ background: 'linear-gradient(135deg, #ff6b00, #ff0080)' }}>
                    <motion.div className="absolute inset-0 bg-white/20" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.5 }} />
                    <span className="relative flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white animate-pulse"/> Book Session</span>
                  </motion.a>
                )}
                {portfolio.twitter && (
                  <motion.a whileHover={{ scale: 1.05 }} href={portfolio.twitter} target="_blank" className="font-black px-12 py-5 rounded-sm text-white/70 border border-white/20 hover:border-white/50 hover:text-white transition-all backdrop-blur-sm uppercase tracking-widest text-sm bg-white/5">
                    DM on Twitter
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-16 text-center bg-[#000] relative z-20 mt-10">
        <div className="max-w-7xl mx-auto px-8">
          <p className="font-black text-3xl uppercase tracking-tighter text-white mb-2">{portfolio.name}</p>
          <p className="text-white/30 font-mono text-[10px] uppercase tracking-widest mb-8">Post-Production / Color / Sound</p>
          <div className="flex justify-center gap-8 mb-12">
            {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="text-white/40 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition-colors">LinkedIn</a>}
            {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="text-white/40 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition-colors">Twitter</a>}
            {portfolio.website && <a href={portfolio.website} target="_blank" className="text-white/40 hover:text-orange-500 text-xs font-bold uppercase tracking-widest transition-colors">Website</a>}
          </div>
          <p className="text-[10px] font-mono text-white/20 tracking-widest">
            {showWatermark ? (
              <span>SYSTEM ARCHITECTURE BY <a href="https://portfolio-saas-red.vercel.app" className="text-white/40 hover:text-white transition-colors">PORTFOLIO SAAS</a></span>
            ) : (
              <span>ALL SYSTEMS OPERATIONAL</span>
            )}
          </p>
        </div>
      </footer>

      {/* CINEMATIC VIDEO MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[999999] flex items-center justify-center p-0 md:p-8 bg-black/95 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            {/* Modal Viewfinder Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
              <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-white" />
              <div className="absolute top-10 right-10 w-16 h-16 border-t border-r border-white" />
              <div className="absolute bottom-10 left-10 w-16 h-16 border-b border-l border-white" />
              <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-white" />
            </div>

            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-7xl aspect-video bg-[#050505] md:rounded-lg overflow-hidden shadow-[0_0_100px_rgba(255,107,0,0.15)] ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)} 
                className="absolute top-4 right-4 z-50 px-4 py-2 bg-black/50 hover:bg-red-600 font-mono text-[10px] tracking-widest text-white backdrop-blur-md transition-all border border-white/10 rounded-sm"
              >
                [ EXIT_PLAYBACK ]
              </button>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                <span className="font-mono text-white/30 text-[10px] tracking-widest uppercase animate-pulse">Loading Source Media...</span>
              </div>

              <iframe src={activeVideo} className="absolute inset-0 w-full h-full z-10 bg-transparent" allow="autoplay; fullscreen" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}