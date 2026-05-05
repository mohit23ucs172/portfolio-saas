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