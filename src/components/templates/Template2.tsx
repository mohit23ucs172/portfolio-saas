// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

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

// function RevealSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: '-80px' })
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 60 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
//     >
//       {children}
//     </motion.div>
//   )
// }

// function GlowCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
//   const [pos, setPos] = useState({ x: 0, y: 0 })
//   const [isHovered, setIsHovered] = useState(false)
//   const cardRef = useRef<HTMLDivElement>(null)

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!cardRef.current) return
//     const rect = cardRef.current.getBoundingClientRect()
//     setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
//   }

//   return (
//     <motion.div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       whileHover={{ y: -4, scale: 1.01 }}
//       transition={{ duration: 0.2 }}
//       className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm ${className}`}
//     >
//       {isHovered && (
//         <div
//           className="absolute pointer-events-none inset-0 opacity-20 transition-opacity duration-300"
//           style={{
//             background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.4), transparent 50%)`,
//           }}
//         />
//       )}
//       <div className="absolute inset-0 rounded-2xl border border-white/5" />
//       {children}
//     </motion.div>
//   )
// }

// export default function Template2({
//   portfolio,
//   showWatermark = true,
// }: {
//   portfolio: Portfolio
//   showWatermark?: boolean
// }) {
//   const { scrollY } = useScroll()
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
//   const [activeSection, setActiveSection] = useState('home')
//   const heroY = useTransform(scrollY, [0, 500], [0, -80])

//   useEffect(() => {
//     const handleMouse = (e: MouseEvent) => {
//       setMousePos({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener('mousemove', handleMouse)
//     return () => window.removeEventListener('mousemove', handleMouse)
//   }, [])

//   const navItems = ['Skills', 'Experience', 'Projects', 'Education']

//   return (
//     <main className="min-h-screen text-white overflow-x-hidden" style={{ background: '#0a0a0f' }}>

//       {/* Ambient cursor glow */}
//       <div
//         className="fixed pointer-events-none z-50 w-80 h-80 rounded-full opacity-20 blur-3xl transition-all duration-500"
//         style={{
//           background: 'radial-gradient(circle, #6366f1, #a855f7)',
//           left: mousePos.x - 160,
//           top: mousePos.y - 160,
//         }}
//       />

//       {/* Background grid */}
//       <div
//         className="fixed inset-0 opacity-5"
//         style={{
//           backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
//           backgroundSize: '60px 60px',
//         }}
//       />

//       {/* Floating orbs */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{ x: [0, 100, 0], y: [0, -80, 0] }}
//           transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
//           className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
//           style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
//         />
//         <motion.div
//           animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
//           transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
//           className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-10"
//           style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
//         />
//       </div>

//       {/* Nav */}
//       <motion.nav
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//         className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-2"
//       >
//         <div
//           className="flex items-center gap-1 px-4 py-2 rounded-2xl border border-white/10 backdrop-blur-xl"
//           style={{ background: 'rgba(10,10,15,0.8)' }}
//         >
//           {portfolio.avatar ? (
//             <motion.img
//               whileHover={{ scale: 1.1 }}
//               src={portfolio.avatar}
//               alt={portfolio.name}
//               className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/50 mr-2"
//             />
//           ) : (
//             <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold mr-2">
//               {portfolio.name.charAt(0)}
//             </div>
//           )}
//           <span className="text-xs font-semibold text-white/80 mr-4">{portfolio.name.split(' ')[0]}</span>
//           <div className="w-px h-4 bg-white/10 mr-4" />
//           {navItems.map((item) => (
//             <motion.button
//               key={item}
//               whileHover={{ backgroundColor: 'rgba(99,102,241,0.2)' }}
//               className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-xl transition-colors"
//             >
//               {item}
//             </motion.button>
//           ))}
//           <div className="w-px h-4 bg-white/10 mx-2" />
//           {portfolio.github && (
//             <motion.a
//               whileHover={{ scale: 1.05 }}
//               href={portfolio.github}
//               target="_blank"
//               className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-xl font-semibold transition-colors"
//             >
//               GitHub
//             </motion.a>
//           )}
//         </div>
//       </motion.nav>

//       {/* Hero */}
//       <section className="relative min-h-screen flex items-center">
//         <motion.div
//           style={{ y: heroY }}
//           className="relative max-w-6xl mx-auto px-8 pt-32 pb-20 w-full"
//         >
//           <div className="flex flex-col lg:flex-row items-center gap-16">

//             {/* Left content */}
//             <div className="flex-1 text-center lg:text-left">
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-8"
//               >
//                 <motion.div
//                   animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="w-2 h-2 bg-indigo-400 rounded-full"
//                 />
//                 Available for opportunities
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
//                 className="text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6"
//               >
//                 {portfolio.name.split(' ').map((word, i) => (
//                   <motion.span
//                     key={i}
//                     initial={{ opacity: 0, y: 60 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//                     className={`block ${i % 2 === 0 ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'}`}
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </motion.h1>

//               {portfolio.bio && (
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 }}
//                   className="text-lg text-white/50 max-w-lg leading-relaxed mb-10"
//                 >
//                   {portfolio.bio}
//                 </motion.p>
//               )}

//               {/* Stats */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//                 className="flex gap-8 mb-10 justify-center lg:justify-start"
//               >
//                 {[
//                   { value: `${portfolio.skills.length}+`, label: 'Skills' },
//                   { value: `${portfolio.projects.length}+`, label: 'Projects' },
//                   { value: `${portfolio.experience.length}+`, label: 'Roles' },
//                 ].map((stat, i) => (
//                   <div key={i} className="text-center lg:text-left">
//                     <motion.p
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
//                       className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
//                     >
//                       {stat.value}
//                     </motion.p>
//                     <p className="text-xs text-white/30 font-medium mt-0.5">{stat.label}</p>
//                   </div>
//                 ))}
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//                 className="flex gap-3 flex-wrap justify-center lg:justify-start"
//               >
//                 {portfolio.linkedin && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.linkedin}
//                     target="_blank"
//                     className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/25 transition-colors"
//                   >
//                     Connect →
//                   </motion.a>
//                 )}
//                 {portfolio.github && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.github}
//                     target="_blank"
//                     className="flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all"
//                   >
//                     GitHub
//                   </motion.a>
//                 )}
//               </motion.div>
//             </div>

//             {/* Right — Avatar */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8, x: 40 }}
//               animate={{ opacity: 1, scale: 1, x: 0 }}
//               transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
//               className="relative shrink-0"
//             >
//               <div className="relative w-72 h-72">
//                 {/* Rotating rings */}
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
//                   className="absolute -inset-4 rounded-full border border-indigo-500/20 border-dashed"
//                 />
//                 <motion.div
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
//                   className="absolute -inset-8 rounded-full border border-purple-500/10 border-dashed"
//                 />

//                 {/* Glow */}
//                 <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
//                   style={{ background: 'radial-gradient(circle, #6366f1, #a855f7, transparent)' }}
//                 />

//                 {portfolio.avatar ? (
//                   <img
//                     src={portfolio.avatar}
//                     alt={portfolio.name}
//                     className="relative w-full h-full rounded-3xl object-cover border border-white/10"
//                   />
//                 ) : (
//                   <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border border-white/10 flex items-center justify-center text-8xl font-black text-white/20">
//                     {portfolio.name.charAt(0)}
//                   </div>
//                 )}

//                 {/* Floating cards */}
//                 <motion.div
//                   animate={{ y: [-5, 5, -5] }}
//                   transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
//                   className="absolute -right-8 top-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3"
//                 >
//                   <p className="text-xs text-white/50">Skills</p>
//                   <p className="text-lg font-black text-indigo-400">{portfolio.skills.length}+</p>
//                 </motion.div>

//                 <motion.div
//                   animate={{ y: [5, -5, 5] }}
//                   transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//                   className="absolute -left-8 bottom-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3"
//                 >
//                   <p className="text-xs text-white/50">Projects</p>
//                   <p className="text-lg font-black text-purple-400">{portfolio.projects.length}+</p>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       <div className="max-w-6xl mx-auto px-8 space-y-32 pb-32">

//         {/* Skills */}
//         {portfolio.skills.length > 0 && (
//           <RevealSection>
//             <div className="mb-12">
//               <motion.p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
//                 What I know
//               </motion.p>
//               <h2 className="text-4xl font-black">Skills & Technologies</h2>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               {portfolio.skills.map((skill, i) => (
//                 <motion.div
//                   key={skill}
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.04, type: 'spring' }}
//                   whileHover={{ scale: 1.1, y: -3 }}
//                   className="relative group"
//                 >
//                   <div className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
//                   <div className="relative border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-white/70 hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-default">
//                     {skill}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </RevealSection>
//         )}

//         {/* Experience */}
//         {portfolio.experience.length > 0 && (
//           <RevealSection>
//             <div className="mb-12">
//               <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">Career</p>
//               <h2 className="text-4xl font-black">Experience</h2>
//             </div>
//             <div className="space-y-4">
//               {portfolio.experience.map((exp, i) => (
//                 <GlowCard key={exp.id} className="p-8">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
//                       <div>
//                         <h3 className="text-xl font-black text-white">{exp.role}</h3>
//                         <p className="text-indigo-400 font-semibold text-sm mt-1">{exp.company}</p>
//                       </div>
//                       {exp.duration && (
//                         <span className="text-xs text-white/30 border border-white/10 px-4 py-1.5 rounded-full mt-2 md:mt-0 w-fit font-medium">
//                           {exp.duration}
//                         </span>
//                       )}
//                     </div>
//                     {exp.description && (
//                       <p className="text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
//                         {exp.description}
//                       </p>
//                     )}
//                   </motion.div>
//                 </GlowCard>
//               ))}
//             </div>
//           </RevealSection>
//         )}

//         {/* Education */}
//         {portfolio.education.length > 0 && (
//           <RevealSection>
//             <div className="mb-12">
//               <p className="text-pink-400 text-xs font-bold uppercase tracking-widest mb-3">Background</p>
//               <h2 className="text-4xl font-black">Education</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {portfolio.education.map((edu, i) => (
//                 <GlowCard key={edu.id} className="p-8">
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/20 flex items-center justify-center text-xl mb-4">
//                       🎓
//                     </div>
//                     <h3 className="font-black text-lg text-white">{edu.college}</h3>
//                     <p className="text-white/40 text-sm mt-1">{edu.degree}</p>
//                     {edu.year && (
//                       <span className="inline-block mt-3 text-xs text-pink-400 border border-pink-500/20 bg-pink-500/10 px-3 py-1 rounded-full font-medium">
//                         {edu.year}
//                       </span>
//                     )}
//                   </motion.div>
//                 </GlowCard>
//               ))}
//             </div>
//           </RevealSection>
//         )}

//         {/* Projects */}
//         {portfolio.projects.length > 0 && (
//           <RevealSection>
//             <div className="mb-12">
//               <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Portfolio</p>
//               <h2 className="text-4xl font-black">Projects</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {portfolio.projects.map((project, i) => (
//                 <GlowCard key={project.id} className="p-8 group">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                   >
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/20 flex items-center justify-center">
//                         <span className="text-green-400 text-lg">⚡</span>
//                       </div>
//                       <div className="flex gap-2">
//                         {project.link && (
//                           <motion.a
//                             whileHover={{ scale: 1.1 }}
//                             href={project.link}
//                             target="_blank"
//                             className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all text-xs"
//                           >
//                             ↗
//                           </motion.a>
//                         )}
//                         {project.github && (
//                           <motion.a
//                             whileHover={{ scale: 1.1 }}
//                             href={project.github}
//                             target="_blank"
//                             className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all text-xs"
//                           >
//                             ⌥
//                           </motion.a>
//                         )}
//                       </div>
//                     </div>
//                     <h3 className="text-lg font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">
//                       {project.title}
//                     </h3>
//                     {project.description && (
//                       <p className="text-white/40 text-sm leading-relaxed">{project.description}</p>
//                     )}
//                   </motion.div>
//                 </GlowCard>
//               ))}
//             </div>
//           </RevealSection>
//         )}

//         {/* Certifications */}
//         {portfolio.certifications.length > 0 && (
//           <RevealSection>
//             <div className="mb-12">
//               <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-3">Achievements</p>
//               <h2 className="text-4xl font-black">Certifications</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {portfolio.certifications.map((cert, i) => (
//                 <GlowCard key={cert.id} className="p-6">
//                   <motion.div
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.05 }}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 flex items-center justify-center text-yellow-400 font-black">
//                         ✦
//                       </div>
//                       <div>
//                         <p className="font-bold text-sm text-white">{cert.name}</p>
//                         {cert.issuer && <p className="text-white/30 text-xs mt-0.5">{cert.issuer}</p>}
//                       </div>
//                     </div>
//                     {cert.link && (
//                       <motion.a
//                         whileHover={{ x: 3 }}
//                         href={cert.link}
//                         target="_blank"
//                         className="text-indigo-400 text-xs font-bold hover:underline ml-4 shrink-0"
//                       >
//                         View →
//                       </motion.a>
//                     )}
//                   </motion.div>
//                 </GlowCard>
//               ))}
//             </div>
//           </RevealSection>
//         )}

//         {/* Contact */}
//         <RevealSection>
//           <div className="relative overflow-hidden rounded-3xl p-12 text-center border border-white/10">
//             <div
//               className="absolute inset-0"
//               style={{
//                 background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
//               }}
//             />
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
//               className="absolute -top-32 -right-32 w-64 h-64 rounded-full border border-indigo-500/10"
//             />
//             <motion.div
//               animate={{ rotate: -360 }}
//               transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//               className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full border border-purple-500/10"
//             />
//             <div className="relative">
//               <motion.div
//                 initial={{ scale: 0 }}
//                 whileInView={{ scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: 'spring', bounce: 0.5 }}
//                 className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg shadow-indigo-500/25"
//               >
//                 👋
//               </motion.div>
//               <h2 className="text-4xl font-black mb-4">Let's Build Together</h2>
//               <p className="text-white/50 text-lg max-w-md mx-auto mb-8">
//                 Open to exciting opportunities and collaborations. Let's create something extraordinary.
//               </p>
//               <div className="flex gap-4 justify-center flex-wrap">
//                 {portfolio.linkedin && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.linkedin}
//                     target="_blank"
//                     className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg shadow-indigo-500/25"
//                   >
//                     Connect on LinkedIn →
//                   </motion.a>
//                 )}
//                 {portfolio.github && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.github}
//                     target="_blank"
//                     className="border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-2xl transition-all"
//                   >
//                     View GitHub →
//                   </motion.a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </RevealSection>

//       </div>

//       {/* Footer */}
//       <footer className="border-t border-white/5 py-10 text-center">
//         <p className="text-white/20 text-xs">
//           {showWatermark ? (
//             <span>
//               Made with{' '}
//               <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-white/40">Portfolio SaaS</a>
//               {' — '}
//               <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-white/40">Remove watermark</a>
//             </span>
//           ) : (
//             <span>Built with Portfolio SaaS</span>
//           )}
//         </p>
//       </footer>

//     </main>
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
// SCROLL PROGRESS
// ============================================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[9998] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
      }}
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
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-indigo-400/50 hidden md:block"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: isHovering ? 48 : 28, height: isHovering ? 48 : 28, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-indigo-400 hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%', width: 5, height: 5, opacity: isVisible ? 1 : 0 }}
      />
    </>
  )
}

// ============================================================
// GLOW CARD — mouse-follow spotlight
// ============================================================
function GlowCard({ children, className = '', glowColor = 'rgba(99,102,241,0.3)' }: {
  children: React.ReactNode
  className?: string
  glowColor?: string
}) {
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
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
      }}
    >
      {/* Spotlight */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none inset-0"
            style={{
              background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 60%)`,
            }}
          />
        )}
      </AnimatePresence>
      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-[20px] pointer-events-none"
        animate={{
          boxShadow: isHovered ? `inset 0 0 0 1px rgba(99,102,241,0.3)` : 'inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  )
}

// ============================================================
// SECTION REVEAL
// ============================================================
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

// ============================================================
// STAGGER CHILDREN
// ============================================================

// ============================================================
// TYPEWRITER
// ============================================================
function TypewriterText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(displayed.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % texts.length)
        }
      }
    }, isDeleting ? 40 : 70)
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentIndex, texts])

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-indigo-400"
      >
        |
      </motion.span>
    </span>
  )
}

// ============================================================
// MAIN TEMPLATE 2 — Corporate Dark (Linear.app style)
// ============================================================
export default function Template2({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -80])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const roles = ['Developer', 'Problem Solver', 'Tech Enthusiast', 'Builder']

  return (
    <main className="min-h-screen text-white overflow-x-hidden font-sans" style={{ background: '#080810' }}>

      <CustomCursor />
      <ScrollProgress />

      {/* Ambient cursor glow */}
      <div
        className="fixed pointer-events-none z-30 w-96 h-96 rounded-full opacity-[0.06] blur-3xl transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, #6366f1, #a855f7)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 80, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
        />
      </div>

      {/* NAV — floating pill */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border backdrop-blur-2xl"
          style={{
            background: 'rgba(8,8,16,0.85)',
            borderColor: 'rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Avatar */}
          {portfolio.avatar ? (
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={portfolio.avatar}
              alt={portfolio.name}
              className="w-7 h-7 rounded-xl object-cover ring-1 ring-indigo-500/30"
            />
          ) : (
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-black">
              {portfolio.name.charAt(0)}
            </div>
          )}

          <span className="text-xs font-bold text-white/60 pr-3 border-r border-white/10">
            {portfolio.name.split(' ')[0]}
          </span>

          {['Skills', 'Work', 'Projects'].map((item) => (
            <motion.button
              key={item}
              whileHover={{ color: '#fff', backgroundColor: 'rgba(255,255,255,0.06)' }}
              className="text-xs text-white/40 px-3 py-1.5 rounded-xl transition-colors font-medium"
            >
              {item}
            </motion.button>
          ))}

          <div className="w-px h-4 bg-white/10 mx-1" />

          {portfolio.github && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={portfolio.github}
              target="_blank"
              className="text-xs font-black px-4 py-1.5 rounded-xl text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              GitHub
            </motion.a>
          )}
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <motion.div
          style={{ y: heroY }}
          className="relative max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20 w-full"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left */}
            <div className="flex-1 text-center lg:text-left">

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold mb-8"
                style={{
                  background: 'rgba(99,102,241,0.08)',
                  borderColor: 'rgba(99,102,241,0.2)',
                  color: '#818cf8',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-indigo-400"
                />
                Available for opportunities
              </motion.div>

              {/* Name — split animation */}
              <div className="mb-6">
                {portfolio.name.split(' ').map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
                  >
                    {i % 2 === 0 ? (
                      <span className="text-white">{word}</span>
                    ) : (
                      <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)' }}
                      >
                        {word}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl font-medium text-white/40 mb-8 h-8"
              >
                <TypewriterText texts={roles} />
              </motion.div>

              {/* Bio */}
              {portfolio.bio && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-white/40 text-base max-w-lg leading-relaxed mb-10"
                >
                  {portfolio.bio}
                </motion.p>
              )}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex gap-8 mb-10 justify-center lg:justify-start"
              >
                {[
                  { value: `${portfolio.skills.length}+`, label: 'Skills' },
                  { value: `${portfolio.projects.length}+`, label: 'Projects' },
                  { value: `${portfolio.experience.length}+`, label: 'Roles' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: 'spring', bounce: 0.5 }}
                  >
                    <p
                      className="text-3xl font-black bg-clip-text text-transparent"
                      style={{ backgroundImage: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/30 font-medium mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex gap-3 flex-wrap justify-center lg:justify-start"
              >
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 40px rgba(99,102,241,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="relative overflow-hidden px-6 py-3 rounded-2xl text-sm font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative">Connect →</span>
                  </motion.a>
                )}
                {portfolio.github && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.github}
                    target="_blank"
                    className="px-6 py-3 rounded-2xl text-sm font-black text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                  >
                    GitHub
                  </motion.a>
                )}
              </motion.div>
            </div>

            {/* Right — Avatar with orbital rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">

                {/* Orbital rings */}
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 8 + ring * 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute rounded-full border"
                    style={{
                      inset: `-${ring * 20}px`,
                      borderColor: `rgba(99,102,241,${0.15 - ring * 0.04})`,
                      borderStyle: ring === 3 ? 'dashed' : 'solid',
                    }}
                  />
                ))}

                {/* Glow */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl blur-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3))' }}
                />

                {/* Avatar */}
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden border"
                  style={{ borderColor: 'rgba(99,102,241,0.3)' }}
                >
                  {portfolio.avatar ? (
                    <img src={portfolio.avatar} alt={portfolio.name} className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-8xl font-black"
                      style={{ background: 'linear-gradient(135deg, #1e1b4b, #2e1065)' }}
                    >
                      <span style={{ color: 'rgba(99,102,241,0.3)' }}>{portfolio.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                {/* Floating info cards */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -right-10 top-8 px-4 py-3 rounded-2xl border backdrop-blur-xl"
                  style={{
                    background: 'rgba(8,8,16,0.9)',
                    borderColor: 'rgba(99,102,241,0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <p className="text-xs text-white/30 font-medium">Skills</p>
                  <p className="text-xl font-black text-indigo-400">{portfolio.skills.length}+</p>
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -left-10 bottom-8 px-4 py-3 rounded-2xl border backdrop-blur-xl"
                  style={{
                    background: 'rgba(8,8,16,0.9)',
                    borderColor: 'rgba(168,85,247,0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  }}
                >
                  <p className="text-xs text-white/30 font-medium">Projects</p>
                  <p className="text-xl font-black text-purple-400">{portfolio.projects.length}+</p>
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
              <p className="text-indigo-400 text-xs font-black uppercase tracking-widest mb-3">What I know</p>
              <h2 className="text-4xl md:text-5xl font-black">Skills & Technologies</h2>
            </div>
           <div className="flex flex-wrap gap-3">
  {portfolio.skills.map((skill, i) => (
    <motion.div
      key={skill}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04, duration: 0.4 }}
      whileHover={{ scale: 1.08, y: -3 }}
      className="relative group"
    >
                  <div
                    className="absolute inset-0 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4))' }}
                  />
                  <div
                    className="relative px-5 py-2.5 rounded-2xl text-sm font-bold border text-white/60 hover:text-white transition-colors cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {skill}
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
              <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-3">Career</p>
              <h2 className="text-4xl md:text-5xl font-black">Experience</h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div
                className="absolute left-0 top-4 bottom-4 w-px hidden md:block"
                style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.6), rgba(168,85,247,0.3), transparent)' }}
              />
              <div className="space-y-4">
                {portfolio.experience.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative md:pl-8"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
                      className="absolute left-[-5px] top-6 w-2.5 h-2.5 rounded-full hidden md:block"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', boxShadow: '0 0 12px rgba(99,102,241,0.6)' }}
                    />
                    <GlowCard className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                        <div>
                          <h3 className="text-xl font-black text-white">{exp.role}</h3>
                          <p className="text-indigo-400 font-bold text-sm mt-1">{exp.company}</p>
                        </div>
                        {exp.duration && (
                          <span
                            className="text-xs font-bold px-4 py-1.5 rounded-full w-fit"
                            style={{
                              background: 'rgba(99,102,241,0.1)',
                              border: '1px solid rgba(99,102,241,0.2)',
                              color: '#818cf8',
                            }}
                          >
                            {exp.duration}
                          </span>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
                          {exp.description}
                        </p>
                      )}
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
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
                <GlowCard key={edu.id} glowColor="rgba(236,72,153,0.2)" className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                      style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.15)' }}
                    >
                      🎓
                    </div>
                    <h3 className="font-black text-lg text-white">{edu.college}</h3>
                    <p className="text-white/40 text-sm mt-1">{edu.degree}</p>
                    {edu.year && (
                      <span
                        className="inline-block mt-4 text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{
                          background: 'rgba(236,72,153,0.1)',
                          border: '1px solid rgba(236,72,153,0.2)',
                          color: '#f472b6',
                        }}
                      >
                        {edu.year}
                      </span>
                    )}
                  </motion.div>
                </GlowCard>
              ))}
            </div>
          </RevealSection>
        )}

        {/* PROJECTS */}
        {portfolio.projects.length > 0 && (
          <RevealSection>
            <div className="mb-10">
              <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-3">Work</p>
              <h2 className="text-4xl md:text-5xl font-black">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, i) => (
                <GlowCard key={project.id} glowColor="rgba(74,222,128,0.15)" className="p-8 group">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <motion.div
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(16,185,129,0.15))',
                          border: '1px solid rgba(74,222,128,0.2)',
                        }}
                      >
                        <span className="text-green-400 text-xl">⚡</span>
                      </motion.div>
                      <div className="flex gap-2">
                        {project.link && (
                          <motion.a
                            whileHover={{ scale: 1.1, y: -2 }}
                            href={project.link}
                            target="_blank"
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm border transition-all"
                            style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#818cf8' }}
                          >
                            ↗
                          </motion.a>
                        )}
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.1, y: -2 }}
                            href={project.github}
                            target="_blank"
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm border transition-all text-white/30 hover:text-white/70"
                            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                          >
                            ⌥
                          </motion.a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-green-400 transition-colors">
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

        {/* CERTIFICATIONS */}
        {portfolio.certifications.length > 0 && (
          <RevealSection>
            <div className="mb-10">
              <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-3">Achievements</p>
              <h2 className="text-4xl md:text-5xl font-black">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, i) => (
                <GlowCard key={cert.id} glowColor="rgba(234,179,8,0.15)" className="p-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-yellow-400 shrink-0"
                        style={{
                          background: 'rgba(234,179,8,0.1)',
                          border: '1px solid rgba(234,179,8,0.2)',
                        }}
                      >
                        ✦
                      </motion.div>
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
                        className="text-indigo-400 text-xs font-black ml-4 shrink-0"
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

        {/* CONTACT */}
        <RevealSection>
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center border"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08), rgba(236,72,153,0.08))',
              borderColor: 'rgba(99,102,241,0.15)',
            }}
          >
            {/* Decorative rings */}
            {[1, 2].map((ring) => (
              <motion.div
                key={ring}
                animate={{ rotate: ring === 1 ? 360 : -360 }}
                transition={{ duration: 30 * ring, repeat: Infinity, ease: 'linear' }}
                className="absolute rounded-full border border-indigo-500/5"
                style={{ inset: `-${ring * 60}px` }}
              />
            ))}

            <div className="relative">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
              >
                👋
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Let's Build Together</h2>
              <p className="text-white/40 text-lg max-w-md mx-auto mb-10">
                Open to exciting opportunities and collaborations.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                {portfolio.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(99,102,241,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.linkedin}
                    target="_blank"
                    className="relative overflow-hidden font-black px-8 py-4 rounded-2xl text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative">Connect on LinkedIn →</span>
                  </motion.a>
                )}
                {portfolio.github && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolio.github}
                    target="_blank"
                    className="font-black px-8 py-4 rounded-2xl text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
                  >
                    View GitHub →
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
        <div className="flex justify-center gap-6 mb-6">
          {portfolio.github && <a href={portfolio.github} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">GitHub</a>}
          {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">LinkedIn</a>}
          {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="text-white/20 hover:text-white/50 text-sm transition-colors">Twitter</a>}
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
      </footer>

    </main>
  )
}
// 'use client'
 
// import { useEffect, useRef, useState, useCallback } from 'react'
// import {
//   motion,
//   useInView,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValue,
//   AnimatePresence,
// } from 'framer-motion'
 
// // ============================================================
// // TYPES
// // ============================================================
// type Project = { id: string; title: string; description: string | null; link: string | null; github: string | null }
// type Education = { id: string; college: string; degree: string; year: string | null }
// type Experience = { id: string; company: string; role: string; duration: string | null; description: string | null }
// type Certification = { id: string; name: string; issuer: string | null; link: string | null }
// type Portfolio = {
//   name: string; bio: string | null; avatar: string | null; skills: string[]
//   github: string | null; linkedin: string | null; twitter: string | null; website: string | null
//   projects: Project[]; education: Education[]; experience: Experience[]; certifications: Certification[]
// }
 
// // ============================================================
// // DESIGN TOKENS — Architectural Monochrome + Electric Violet
// // ============================================================
// const INK    = '#0a0a0a'
// const PAPER  = '#f4f1eb'
// const MUTED  = '#8a8680'
// const VIOLET = '#5b21b6'
// const VIOLET_LT = '#7c3aed'
// const CREAM  = '#ede8df'
// const RULE   = 'rgba(10,10,10,0.1)'
 
// // ============================================================
// // MAGNETIC BUTTON — follows cursor within proximity
// // ============================================================
// function MagneticButton({ children, className = '', style = {}, href, target }: {
//   children: React.ReactNode; className?: string; style?: React.CSSProperties
//   href?: string; target?: string
// }) {
//   const ref = useRef<HTMLElement>(null)
//   const x = useMotionValue(0)
//   const y = useMotionValue(0)
//   const sx = useSpring(x, { stiffness: 200, damping: 18 })
//   const sy = useSpring(y, { stiffness: 200, damping: 18 })
 
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!ref.current) return
//     const rect = ref.current.getBoundingClientRect()
//     const cx = rect.left + rect.width / 2
//     const cy = rect.top + rect.height / 2
//     x.set((e.clientX - cx) * 0.35)
//     y.set((e.clientY - cy) * 0.35)
//   }
//   const handleMouseLeave = () => { x.set(0); y.set(0) }
 
//   const Tag = href ? motion.a : motion.div
//   return (
//     <Tag
//       ref={ref as any}
//       href={href}
//       target={target}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ ...style, x: sx, y: sy }}
//       className={className}
//       whileTap={{ scale: 0.96 }}
//     >
//       {children}
//     </Tag>
//   )
// }
 
// // ============================================================
// // MARQUEE TICKER — skills strip
// // ============================================================
// function Marquee({ items }: { items: string[] }) {
//   const doubled = [...items, ...items]
//   return (
//     <div className="overflow-hidden" style={{ borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
//       <motion.div
//         className="flex gap-0 whitespace-nowrap"
//         animate={{ x: ['0%', '-50%'] }}
//         transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
//         style={{ willChange: 'transform' }}
//       >
//         {doubled.map((item, i) => (
//           <span
//             key={i}
//             className="inline-flex items-center gap-4 px-8 py-3 text-xs font-black uppercase tracking-widest"
//             style={{ color: MUTED, borderRight: `1px solid ${RULE}` }}
//           >
//             <span style={{ color: VIOLET, fontSize: 8 }}>◆</span>
//             {item}
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   )
// }
 
// // ============================================================
// // REVEAL — editorial slide-up
// // ============================================================
// function Reveal({ children, delay = 0, direction = 'up' }: {
//   children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right'
// }) {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-60px' })
//   const initial = direction === 'up' ? { y: 48 } : direction === 'left' ? { x: -48 } : { x: 48 }
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, ...initial }}
//       animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
//       transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
//     >
//       {children}
//     </motion.div>
//   )
// }
 
// // ============================================================
// // OVERLINE LABEL
// // ============================================================
// function Overline({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
//   return (
//     <div className="flex items-center gap-3 mb-5">
//       <div className="w-8 h-px" style={{ background: accent ? VIOLET : INK }} />
//       <p
//         className="text-xs font-black uppercase tracking-[0.25em]"
//         style={{ color: accent ? VIOLET : MUTED }}
//       >
//         {children}
//       </p>
//     </div>
//   )
// }
 
// // ============================================================
// // SPOTLIGHT CARD — radial gradient follows mouse
// // ============================================================
// function SpotlightCard({ children, className = '', dark = false }: {
//   children: React.ReactNode; className?: string; dark?: boolean
// }) {
//   const ref = useRef<HTMLDivElement>(null)
//   const [pos, setPos] = useState({ x: 0, y: 0 })
//   const [hov, setHov] = useState(false)
 
//   const onMove = (e: React.MouseEvent) => {
//     if (!ref.current) return
//     const r = ref.current.getBoundingClientRect()
//     setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
//   }
 
//   const bg = dark ? INK : PAPER
//   const spotColor = dark ? 'rgba(124,58,237,0.15)' : 'rgba(91,33,182,0.06)'
//   const border = dark ? 'rgba(255,255,255,0.07)' : RULE
 
//   return (
//     <div
//       ref={ref}
//       onMouseMove={onMove}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       className={`relative overflow-hidden ${className}`}
//       style={{ background: bg, border: `1px solid ${border}`, borderRadius: 20 }}
//     >
//       {hov && (
//         <div
//           className="absolute inset-0 pointer-events-none transition-opacity duration-300"
//           style={{
//             background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, ${spotColor}, transparent 70%)`,
//           }}
//         />
//       )}
//       {children}
//     </div>
//   )
// }
 
// // ============================================================
// // SCROLL PROGRESS
// // ============================================================
// function ScrollProgress() {
//   const { scrollYProgress } = useScroll()
//   const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 h-[2px] z-[9998] origin-left"
//       style={{ scaleX, background: VIOLET }}
//     />
//   )
// }
 
// // ============================================================
// // CUSTOM CURSOR — minimal crosshair
// // ============================================================
// function CustomCursor() {
//   const mx = useMotionValue(-100)
//   const my = useMotionValue(-100)
//   const lx = useSpring(mx, { stiffness: 600, damping: 35 })
//   const ly = useSpring(my, { stiffness: 600, damping: 35 })
//   const [vis, setVis] = useState(false)
//   const [hov, setHov] = useState(false)
 
//   useEffect(() => {
//     const m = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVis(true) }
//     const over = (e: MouseEvent) => {
//       const t = e.target as HTMLElement
//       setHov(!!(t.closest('a') || t.closest('button') || t.closest('[data-hover]')))
//     }
//     window.addEventListener('mousemove', m)
//     window.addEventListener('mouseover', over)
//     return () => { window.removeEventListener('mousemove', m); window.removeEventListener('mouseover', over) }
//   }, [])
 
//   return (
//     <>
//       {/* Outer ring */}
//       <motion.div
//         className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full"
//         style={{
//           x: lx, y: ly,
//           translateX: '-50%', translateY: '-50%',
//           opacity: vis ? 1 : 0,
//           width: hov ? 48 : 32, height: hov ? 48 : 32,
//           border: `1.5px solid ${INK}`,
//           transition: 'width 0.2s, height 0.2s, opacity 0.2s',
//           mixBlendMode: 'multiply',
//         }}
//       />
//       {/* Dot */}
//       <motion.div
//         className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block rounded-full"
//         style={{
//           x: mx, y: my,
//           translateX: '-50%', translateY: '-50%',
//           width: 5, height: 5,
//           background: INK,
//           opacity: vis ? 1 : 0,
//           mixBlendMode: 'multiply',
//         }}
//       />
//     </>
//   )
// }
 
// // ============================================================
// // SECTION DIVIDER
// // ============================================================
// function Divider({ label }: { label: string }) {
//   return (
//     <div className="flex items-center gap-4 my-2">
//       <div className="flex-1 h-px" style={{ background: RULE }} />
//       <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: MUTED }}>{label}</span>
//       <div className="flex-1 h-px" style={{ background: RULE }} />
//     </div>
//   )
// }
 
// // ============================================================
// // STAT PILL — animated counter
// // ============================================================
// function StatPill({ value, label, accent = false }: { value: number; label: string; accent?: boolean }) {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true })
//   const [n, setN] = useState(0)
 
//   useEffect(() => {
//     if (!inView) return
//     let cur = 0
//     const step = value / 36
//     const iv = setInterval(() => {
//       cur += step
//       if (cur >= value) { setN(value); clearInterval(iv) }
//       else setN(Math.floor(cur))
//     }, 28)
//     return () => clearInterval(iv)
//   }, [inView, value])
 
//   return (
//     <div
//       ref={ref}
//       className="flex flex-col items-center justify-center gap-1 px-6 py-5 rounded-2xl"
//       style={{
//         background: accent ? VIOLET : PAPER,
//         border: `1px solid ${accent ? VIOLET : RULE}`,
//       }}
//     >
//       <span
//         className="text-3xl font-black tabular-nums"
//         style={{ color: accent ? '#fff' : INK }}
//       >
//         {n}+
//       </span>
//       <span
//         className="text-[10px] font-black uppercase tracking-widest"
//         style={{ color: accent ? 'rgba(255,255,255,0.6)' : MUTED }}
//       >
//         {label}
//       </span>
//     </div>
//   )
// }
 
// // ============================================================
// // BENTO CARD
// // ============================================================
// function BentoCard({ children, className = '', dark = false, span = 1 }: {
//   children: React.ReactNode; className?: string; dark?: boolean; span?: 1 | 2
// }) {
//   return (
//     <SpotlightCard
//       dark={dark}
//       className={`p-7 ${span === 2 ? 'md:col-span-2' : ''} ${className}`}
//     >
//       {children}
//     </SpotlightCard>
//   )
// }
 
// // ============================================================
// // EXPERIENCE ACCORDION
// // ============================================================
// function ExperienceAccordion({ exp, index }: { exp: Experience; index: number }) {
//   const [open, setOpen] = useState(index === 0)
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-40px' })
 
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 30 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//       style={{ borderBottom: `1px solid ${RULE}` }}
//     >
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between py-6 text-left group"
//         data-hover
//       >
//         <div className="flex items-center gap-6">
//           {/* Index */}
//           <span
//             className="text-xs font-black tabular-nums w-6 shrink-0"
//             style={{ color: MUTED }}
//           >
//             {String(index + 1).padStart(2, '0')}
//           </span>
//           <div>
//             <p className="text-base font-black" style={{ color: INK }}>{exp.role}</p>
//             <p className="text-sm mt-0.5" style={{ color: VIOLET }}>{exp.company}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4 shrink-0 ml-4">
//           {exp.duration && (
//             <span className="text-xs font-bold hidden md:block" style={{ color: MUTED }}>{exp.duration}</span>
//           )}
//           <motion.div
//             animate={{ rotate: open ? 45 : 0 }}
//             transition={{ duration: 0.25 }}
//             className="w-7 h-7 rounded-full flex items-center justify-center"
//             style={{ border: `1px solid ${RULE}`, background: open ? INK : 'transparent' }}
//           >
//             <span
//               className="text-sm font-black leading-none"
//               style={{ color: open ? '#fff' : INK }}
//             >+</span>
//           </motion.div>
//         </div>
//       </button>
 
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//             style={{ overflow: 'hidden' }}
//           >
//             <div className="pb-6 pl-12">
//               {exp.duration && (
//                 <span
//                   className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 md:hidden"
//                   style={{ background: CREAM, color: MUTED }}
//                 >
//                   {exp.duration}
//                 </span>
//               )}
//               {exp.description && (
//                 <p className="text-sm leading-relaxed" style={{ color: MUTED, maxWidth: '56ch' }}>
//                   {exp.description}
//                 </p>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   )
// }
 
// // ============================================================
// // PROJECT CARD — editorial style
// // ============================================================
// function ProjectCard({ project, index }: { project: Project; index: number }) {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-40px' })
//   const [hov, setHov] = useState(false)
 
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ delay: index * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       className="group"
//     >
//       <SpotlightCard className="h-full">
//         <div className="p-7 flex flex-col h-full">
//           {/* Top row */}
//           <div className="flex items-start justify-between mb-6">
//             {/* Project number */}
//             <div
//               className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black"
//               style={{
//                 background: hov ? VIOLET : CREAM,
//                 color: hov ? '#fff' : MUTED,
//                 transition: 'all 0.25s',
//               }}
//             >
//               {String(index + 1).padStart(2, '0')}
//             </div>
//             {/* Links */}
//             <div className="flex gap-2">
//               {project.link && (
//                 <motion.a
//                   whileHover={{ scale: 1.1 }}
//                   href={project.link}
//                   target="_blank"
//                   className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black"
//                   style={{
//                     background: CREAM,
//                     color: MUTED,
//                     border: `1px solid ${RULE}`,
//                   }}
//                   data-hover
//                 >
//                   ↗
//                 </motion.a>
//               )}
//               {project.github && (
//                 <motion.a
//                   whileHover={{ scale: 1.1 }}
//                   href={project.github}
//                   target="_blank"
//                   className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black"
//                   style={{
//                     background: CREAM,
//                     color: MUTED,
//                     border: `1px solid ${RULE}`,
//                   }}
//                   data-hover
//                 >
//                   ⌥
//                 </motion.a>
//               )}
//             </div>
//           </div>
 
//           {/* Divider */}
//           <div className="h-px mb-5" style={{ background: hov ? VIOLET : RULE, transition: 'background 0.3s' }} />
 
//           <h3
//             className="text-lg font-black mb-3 transition-colors"
//             style={{ color: hov ? VIOLET : INK, letterSpacing: '-0.01em' }}
//           >
//             {project.title}
//           </h3>
//           {project.description && (
//             <p className="text-sm leading-relaxed flex-1" style={{ color: MUTED }}>
//               {project.description}
//             </p>
//           )}
 
//           {/* Bottom arrow */}
//           <motion.div
//             animate={{ x: hov ? 4 : 0 }}
//             className="mt-6 text-xs font-black uppercase tracking-widest flex items-center gap-2"
//             style={{ color: hov ? VIOLET : MUTED, transition: 'color 0.25s' }}
//           >
//             View project <span>→</span>
//           </motion.div>
//         </div>
//       </SpotlightCard>
//     </motion.div>
//   )
// }
 
// // ============================================================
// // SKILL TAG — clean pill
// // ============================================================
// function SkillTag({ skill, index }: { skill: string; index: number }) {
//   const [hov, setHov] = useState(false)
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.85 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.03, type: 'spring', stiffness: 200 }}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       className="px-4 py-2 rounded-full text-xs font-black cursor-default select-none"
//       style={{
//         background: hov ? INK : PAPER,
//         color: hov ? '#fff' : INK,
//         border: `1px solid ${hov ? INK : RULE}`,
//         letterSpacing: '0.02em',
//         transition: 'all 0.18s',
//       }}
//       data-hover
//     >
//       {skill}
//     </motion.div>
//   )
// }
 
// // ============================================================
// // MAIN TEMPLATE 2 ADVANCED — Architectural Editorial
// // ============================================================
// export default function Template2Advanced({
//   portfolio,
//   showWatermark = true,
// }: {
//   portfolio: Portfolio
//   showWatermark?: boolean
// }) {
//   const { scrollY } = useScroll()
//   const heroY = useTransform(scrollY, [0, 600], [0, -80])
//   const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])
 
//   const firstName = portfolio.name.split(' ')[0]
//   const lastName = portfolio.name.split(' ').slice(1).join(' ')
 
//   return (
//     <main
//       className="min-h-screen overflow-x-hidden"
//       style={{ background: PAPER, color: INK, fontFamily: "'DM Sans', 'Inter', sans-serif", cursor: 'none' }}
//     >
//       {/* Fonts + global styles */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=DM+Mono:wght@400;500&display=swap');
//         * { cursor: none !important; box-sizing: border-box; }
//         ::-webkit-scrollbar { width: 3px; }
//         ::-webkit-scrollbar-track { background: ${PAPER}; }
//         ::-webkit-scrollbar-thumb { background: ${INK}30; border-radius: 2px; }
//         ::selection { background: ${VIOLET}20; color: ${VIOLET}; }
//       `}</style>
 
//       <CustomCursor />
//       <ScrollProgress />
 
//       {/* ── NAV ── */}
//       <motion.header
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//         className="fixed top-0 left-0 right-0 z-50"
//         style={{ background: `${PAPER}e8`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${RULE}` }}
//       >
//         <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
//           {/* Logo wordmark */}
//           <div className="flex items-center gap-3">
//             {portfolio.avatar ? (
//               <img
//                 src={portfolio.avatar}
//                 alt={portfolio.name}
//                 className="w-8 h-8 rounded-xl object-cover"
//                 style={{ border: `1px solid ${RULE}` }}
//               />
//             ) : (
//               <div
//                 className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white"
//                 style={{ background: INK }}
//               >
//                 {portfolio.name.charAt(0)}
//               </div>
//             )}
//             <span className="font-black text-sm tracking-tight" style={{ color: INK }}>
//               {firstName}<span style={{ color: MUTED }}>{lastName ? ` ${lastName}` : ''}</span>
//             </span>
//           </div>
 
//           {/* Nav links — desktop */}
//           <nav className="hidden md:flex items-center gap-6 text-xs font-bold" style={{ color: MUTED }}>
//             {['Skills', 'Experience', 'Projects', 'Education'].map(l => (
//               <motion.span
//                 key={l}
//                 whileHover={{ color: INK }}
//                 className="transition-colors"
//                 data-hover
//               >{l}</motion.span>
//             ))}
//           </nav>
 
//           {/* CTA */}
//           <div className="flex items-center gap-3">
//             {portfolio.github && (
//               <MagneticButton
//                 href={portfolio.github}
//                 target="_blank"
//                 className="text-xs font-black px-4 py-2 rounded-xl border transition-all hidden md:block"
//                 style={{ borderColor: RULE, color: MUTED }}
//                 data-hover
//               >
//                 GitHub ↗
//               </MagneticButton>
//             )}
//             {portfolio.linkedin && (
//               <MagneticButton
//                 href={portfolio.linkedin}
//                 target="_blank"
//                 className="text-xs font-black px-4 py-2 rounded-xl text-white"
//                 style={{ background: INK }}
//                 data-hover
//               >
//                 Connect →
//               </MagneticButton>
//             )}
//           </div>
//         </div>
//       </motion.header>
 
//       {/* ── HERO ── */}
//       <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
 
//         {/* Giant background letter */}
//         <motion.div
//           initial={{ opacity: 0, scale: 1.2 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
//           className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
//           style={{ zIndex: 0 }}
//         >
//           <span
//             className="font-black leading-none"
//             style={{
//               fontSize: 'clamp(200px, 40vw, 600px)',
//               color: 'transparent',
//               WebkitTextStroke: `1px ${INK}08`,
//               letterSpacing: '-0.05em',
//             }}
//           >
//             {firstName.charAt(0)}
//           </span>
//         </motion.div>
 
//         {/* Content */}
//         <motion.div
//           style={{ y: heroY, opacity: heroOpacity }}
//           className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-16 w-full"
//         >
//           <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
 
//             {/* Left — name + bio */}
//             <div>
//               {/* Status */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-black"
//                 style={{ background: CREAM, border: `1px solid ${RULE}`, color: MUTED }}
//               >
//                 <motion.span
//                   animate={{ opacity: [1, 0.3, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="w-1.5 h-1.5 rounded-full"
//                   style={{ background: '#22c55e' }}
//                 />
//                 Available for opportunities
//               </motion.div>
 
//               {/* Name — mega display */}
//               <div className="overflow-hidden mb-6">
//                 {[firstName, lastName].filter(Boolean).map((word, i) => (
//                   <div key={i} className="overflow-hidden">
//                     <motion.h1
//                       initial={{ y: '110%' }}
//                       animate={{ y: '0%' }}
//                       transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//                       className="font-black leading-[0.9] tracking-tight block"
//                       style={{
//                         fontSize: 'clamp(3.5rem, 10vw, 8rem)',
//                         color: i === 0 ? INK : 'transparent',
//                         WebkitTextStroke: i === 1 ? `2px ${INK}` : 'none',
//                       }}
//                     >
//                       {word}
//                     </motion.h1>
//                   </div>
//                 ))}
//               </div>
 
//               {/* Bio */}
//               {portfolio.bio && (
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.7 }}
//                   className="text-base leading-relaxed max-w-lg mb-10"
//                   style={{ color: MUTED }}
//                 >
//                   {portfolio.bio}
//                 </motion.p>
//               )}
 
//               {/* CTAs */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.85 }}
//                 className="flex gap-3 flex-wrap"
//               >
//                 {portfolio.linkedin && (
//                   <MagneticButton
//                     href={portfolio.linkedin}
//                     target="_blank"
//                     className="px-7 py-3.5 rounded-2xl text-sm font-black text-white relative overflow-hidden group"
//                     style={{ background: INK }}
//                   >
//                     <motion.span
//                       className="absolute inset-0"
//                       style={{ background: VIOLET }}
//                       initial={{ x: '-101%' }}
//                       whileHover={{ x: '0%' }}
//                       transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
//                     />
//                     <span className="relative">Connect →</span>
//                   </MagneticButton>
//                 )}
//                 {portfolio.github && (
//                   <MagneticButton
//                     href={portfolio.github}
//                     target="_blank"
//                     className="px-7 py-3.5 rounded-2xl text-sm font-black border"
//                     style={{ borderColor: RULE, color: MUTED, background: PAPER }}
//                   >
//                     GitHub ↗
//                   </MagneticButton>
//                 )}
//               </motion.div>
//             </div>
 
//             {/* Right — avatar + stats bento */}
//             <motion.div
//               initial={{ opacity: 0, x: 60 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
//               className="flex flex-col gap-4"
//             >
//               {/* Avatar */}
//               {portfolio.avatar ? (
//                 <div
//                   className="w-56 h-56 rounded-3xl overflow-hidden"
//                   style={{ border: `1px solid ${RULE}` }}
//                 >
//                   <img src={portfolio.avatar} alt={portfolio.name} className="w-full h-full object-cover" />
//                 </div>
//               ) : (
//                 <div
//                   className="w-56 h-56 rounded-3xl flex items-center justify-center text-6xl font-black"
//                   style={{ background: CREAM, border: `1px solid ${RULE}`, color: `${INK}20` }}
//                 >
//                   {portfolio.name.charAt(0)}
//                 </div>
//               )}
 
//               {/* Mini stat grid */}
//               <div className="grid grid-cols-3 gap-2">
//                 <StatPill value={portfolio.skills.length} label="Skills" />
//                 <StatPill value={portfolio.projects.length} label="Projects" accent />
//                 <StatPill value={portfolio.experience.length} label="Roles" />
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
 
//         {/* Bottom rule */}
//         <div style={{ borderTop: `1px solid ${RULE}` }}>
//           {/* Skills marquee */}
//           {portfolio.skills.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.1 }}
//             >
//               <Marquee items={portfolio.skills} />
//             </motion.div>
//           )}
//         </div>
//       </section>
 
//       {/* ── CONTENT ── */}
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
 
//         {/* ── SKILLS BENTO ── */}
//         {portfolio.skills.length > 0 && (
//           <section className="py-24" style={{ borderTop: `1px solid ${RULE}` }}>
//             <Reveal>
//               <Overline accent>Skills & Technologies</Overline>
//               <h2 className="font-black text-4xl md:text-5xl mb-12 tracking-tight" style={{ color: INK }}>
//                 What I work with
//               </h2>
//             </Reveal>
//             <Reveal delay={0.1}>
//               <div className="flex flex-wrap gap-2">
//                 {portfolio.skills.map((skill, i) => (
//                   <SkillTag key={skill} skill={skill} index={i} />
//                 ))}
//               </div>
//             </Reveal>
//           </section>
//         )}
 
//         {/* ── EXPERIENCE — accordion ── */}
//         {portfolio.experience.length > 0 && (
//           <section className="py-24" style={{ borderTop: `1px solid ${RULE}` }}>
//             <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16">
//               {/* Sticky left label */}
//               <Reveal>
//                 <div className="lg:sticky lg:top-24">
//                   <Overline>Career</Overline>
//                   <h2 className="font-black text-4xl md:text-5xl tracking-tight mb-4" style={{ color: INK }}>
//                     Work<br />History
//                   </h2>
//                   <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
//                     {portfolio.experience.length} roles across companies & startups
//                   </p>
//                 </div>
//               </Reveal>
 
//               {/* Accordion */}
//               <div style={{ borderTop: `1px solid ${RULE}` }}>
//                 {portfolio.experience.map((exp, i) => (
//                   <ExperienceAccordion key={exp.id} exp={exp} index={i} />
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}
 
//         {/* ── PROJECTS ── */}
//         {portfolio.projects.length > 0 && (
//           <section className="py-24" style={{ borderTop: `1px solid ${RULE}` }}>
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//               <Reveal>
//                 <Overline accent>Portfolio</Overline>
//                 <h2 className="font-black text-4xl md:text-5xl tracking-tight" style={{ color: INK }}>
//                   Featured Projects
//                 </h2>
//               </Reveal>
//               <Reveal delay={0.1}>
//                 <p className="text-sm font-bold uppercase tracking-widest" style={{ color: MUTED }}>
//                   {portfolio.projects.length} total →
//                 </p>
//               </Reveal>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {portfolio.projects.map((project, i) => (
//                 <ProjectCard key={project.id} project={project} index={i} />
//               ))}
//             </div>
//           </section>
//         )}
 
//         {/* ── EDUCATION + CERTIFICATIONS ── side by side ── */}
//         {(portfolio.education.length > 0 || portfolio.certifications.length > 0) && (
//           <section className="py-24" style={{ borderTop: `1px solid ${RULE}` }}>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
 
//               {/* Education */}
//               {portfolio.education.length > 0 && (
//                 <div>
//                   <Reveal>
//                     <Overline>Background</Overline>
//                     <h2 className="font-black text-4xl tracking-tight mb-10" style={{ color: INK }}>Education</h2>
//                   </Reveal>
//                   <div className="space-y-4">
//                     {portfolio.education.map((edu, i) => (
//                       <Reveal key={edu.id} delay={i * 0.1}>
//                         <SpotlightCard className="p-6">
//                           <div className="flex items-start gap-4">
//                             <div
//                               className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
//                               style={{ background: CREAM, border: `1px solid ${RULE}` }}
//                             >
//                               🎓
//                             </div>
//                             <div>
//                               <h3 className="font-black text-base" style={{ color: INK }}>{edu.college}</h3>
//                               <p className="text-sm mt-0.5" style={{ color: MUTED }}>{edu.degree}</p>
//                               {edu.year && (
//                                 <span
//                                   className="inline-block mt-3 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest"
//                                   style={{ background: CREAM, color: MUTED, border: `1px solid ${RULE}` }}
//                                 >
//                                   {edu.year}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </SpotlightCard>
//                       </Reveal>
//                     ))}
//                   </div>
//                 </div>
//               )}
 
//               {/* Certifications */}
//               {portfolio.certifications.length > 0 && (
//                 <div>
//                   <Reveal>
//                     <Overline>Achievements</Overline>
//                     <h2 className="font-black text-4xl tracking-tight mb-10" style={{ color: INK }}>Certifications</h2>
//                   </Reveal>
//                   <div className="space-y-3">
//                     {portfolio.certifications.map((cert, i) => (
//                       <Reveal key={cert.id} delay={i * 0.08}>
//                         <SpotlightCard className="p-5">
//                           <div className="flex items-center justify-between gap-4">
//                             <div className="flex items-center gap-4">
//                               <div
//                                 className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
//                                 style={{ background: VIOLET, color: '#fff' }}
//                               >
//                                 ✦
//                               </div>
//                               <div>
//                                 <p className="font-black text-sm" style={{ color: INK }}>{cert.name}</p>
//                                 {cert.issuer && (
//                                   <p className="text-xs mt-0.5" style={{ color: MUTED }}>{cert.issuer}</p>
//                                 )}
//                               </div>
//                             </div>
//                             {cert.link && (
//                               <motion.a
//                                 whileHover={{ x: 3 }}
//                                 href={cert.link}
//                                 target="_blank"
//                                 className="text-xs font-black shrink-0 ml-2"
//                                 style={{ color: VIOLET }}
//                                 data-hover
//                               >
//                                 View →
//                               </motion.a>
//                             )}
//                           </div>
//                         </SpotlightCard>
//                       </Reveal>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>
//         )}
 
//         {/* ── CONTACT — full-bleed dark panel ── */}
//         <section className="py-24" style={{ borderTop: `1px solid ${RULE}` }}>
//           <Reveal>
//             <div
//               className="relative overflow-hidden rounded-3xl p-12 md:p-16"
//               style={{ background: INK }}
//             >
//               {/* Texture lines */}
//               <div
//                 className="absolute inset-0 pointer-events-none opacity-[0.03]"
//                 style={{
//                   backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
//                   backgroundSize: '12px 12px',
//                 }}
//               />
 
//               {/* Violet accent orb */}
//               <div
//                 className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
//                 style={{ background: `radial-gradient(circle, ${VIOLET}, transparent)` }}
//               />
 
//               <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                 {/* Left */}
//                 <div>
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="w-8 h-px" style={{ background: VIOLET }} />
//                     <p className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: VIOLET }}>
//                       Contact
//                     </p>
//                   </div>
//                   <h2
//                     className="font-black leading-tight tracking-tight mb-6"
//                     style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}
//                   >
//                     Let's build<br />
//                     <span style={{ color: VIOLET }}>something</span><br />
//                     great.
//                   </h2>
//                   <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '36ch' }}>
//                     Open to exciting engineering roles, collaborations, and hard technical problems.
//                   </p>
//                 </div>
 
//                 {/* Right — links */}
//                 <div className="flex flex-col gap-4">
//                   {[
//                     { href: portfolio.linkedin, label: 'Connect on LinkedIn', primary: true },
//                     { href: portfolio.github, label: 'View GitHub', primary: false },
//                     { href: portfolio.twitter, label: 'Follow on Twitter', primary: false },
//                     { href: portfolio.website, label: 'Visit Website', primary: false },
//                   ].filter(l => l.href).map((l, i) => (
//                     <MagneticButton
//                       key={l.label}
//                       href={l.href!}
//                       target="_blank"
//                       className="flex items-center justify-between px-6 py-4 rounded-2xl font-black text-sm w-full group"
//                       style={{
//                         background: l.primary ? VIOLET : 'rgba(255,255,255,0.05)',
//                         border: `1px solid ${l.primary ? VIOLET : 'rgba(255,255,255,0.08)'}`,
//                         color: l.primary ? '#fff' : 'rgba(255,255,255,0.5)',
//                       }}
//                       data-hover
//                     >
//                       <span>{l.label}</span>
//                       <motion.span
//                         animate={{ x: 0 }}
//                         whileHover={{ x: 4 }}
//                         className="font-black"
//                       >→</motion.span>
//                     </MagneticButton>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         </section>
 
//       </div>
 
//       {/* ── FOOTER ── */}
//       <footer style={{ borderTop: `1px solid ${RULE}`, background: CREAM }}>
//         <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div>
//             <p className="font-black text-sm" style={{ color: INK }}>{portfolio.name}</p>
//             {portfolio.bio && (
//               <p className="text-xs mt-0.5" style={{ color: MUTED }}>{portfolio.bio.slice(0, 55)}…</p>
//             )}
//           </div>
 
//           <div className="flex items-center gap-6 text-xs font-bold" style={{ color: MUTED }}>
//             {portfolio.github && <a href={portfolio.github} target="_blank" className="hover:opacity-70 transition-opacity" data-hover>GitHub</a>}
//             {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="hover:opacity-70 transition-opacity" data-hover>LinkedIn</a>}
//             {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="hover:opacity-70 transition-opacity" data-hover>Twitter</a>}
//           </div>
 
//           <p className="text-xs" style={{ color: `${MUTED}80` }}>
//             {showWatermark ? (
//               <span>
//                 Built with{' '}
//                 <a href="https://portfolio-saas-red.vercel.app" className="underline hover:opacity-70" data-hover>Portfolio SaaS</a>
//                 {' · '}
//                 <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:opacity-70" data-hover>Remove watermark</a>
//               </span>
//             ) : (
//               <span>Built with Portfolio SaaS</span>
//             )}
//           </p>
//         </div>
//       </footer>
//     </main>
//   )
// }