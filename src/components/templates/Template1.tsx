// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { motion, useInView, useScroll, useTransform } from 'framer-motion'

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

// function FadeInSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: '-100px' })

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
//     >
//       {children}
//     </motion.div>
//   )
// }

// export default function Template1({
//   portfolio,
//   showWatermark = true,
// }: {
//   portfolio: Portfolio
//   showWatermark?: boolean
// }) {
//   const { scrollY } = useScroll()
//   const heroY = useTransform(scrollY, [0, 500], [0, -100])
//   const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

//   useEffect(() => {
//     const handleMouse = (e: MouseEvent) => {
//       setMousePos({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener('mousemove', handleMouse)
//     return () => window.removeEventListener('mousemove', handleMouse)
//   }, [])

//   return (
//     <main className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans overflow-x-hidden">

//       {/* Cursor glow effect */}
//      {/* Cursor glow effect */}
//       <div
//         className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-15 blur-3xl transition-all duration-200"
//         style={{
//           background: 'radial-gradient(circle, #818cf8, #c084fc, #f472b6)',
//           left: mousePos.x - 192,
//           top: mousePos.y - 192,
//         }}
//       />

//       {/* Nav */}
//       <motion.nav
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="fixed top-0 left-0 right-0 z-40"
//         style={{
//           background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
//           backdropFilter: 'blur(20px)',
//           borderBottom: '1px solid rgba(168,85,247,0.2)',
//         }}
//       >
//         <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             {portfolio.avatar ? (
//               <motion.img
//                 whileHover={{ scale: 1.15, rotate: 5 }}
//                 src={portfolio.avatar}
//                 alt={portfolio.name}
//                 className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-400 ring-offset-2"
//               />
//             ) : (
//               <motion.div
//                 whileHover={{ scale: 1.15, rotate: 5 }}
//                 className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-purple-200"
//               >
//                 {portfolio.name.charAt(0)}
//               </motion.div>
//             )}
//             <span className="font-bold text-sm bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               {portfolio.name}
//             </span>
//           </div>
//           <div className="hidden md:flex items-center gap-6 text-sm">
//             {portfolio.github && (
//               <motion.a
//                 whileHover={{ y: -2 }}
//                 href={portfolio.github}
//                 target="_blank"
//                 className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
//               >
//                 GitHub
//               </motion.a>
//             )}
//             {portfolio.linkedin && (
//               <motion.a
//                 whileHover={{ y: -2 }}
//                 href={portfolio.linkedin}
//                 target="_blank"
//                 className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
//               >
//                 LinkedIn
//               </motion.a>
//             )}
//             {portfolio.twitter && (
//               <motion.a
//                 whileHover={{ y: -2 }}
//                 href={portfolio.twitter}
//                 target="_blank"
//                 className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
//               >
//                 Twitter
//               </motion.a>
//             )}
//             {portfolio.website && (
//               <motion.a
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 href={portfolio.website}
//                 target="_blank"
//                 className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-shadow"
//               >
//                 Website →
//               </motion.a>
//             )}
//           </div>
//         </div>
//       </motion.nav>

//       {/* Hero */}
//       <section className="relative min-h-screen flex items-center overflow-hidden">

//         {/* Animated gradient background */}
//         <motion.div
//           animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
//           transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
//           className="absolute inset-0"
//           style={{
//             background: 'linear-gradient(-45deg, #ede9fe, #fce7f3, #dbeafe, #ede9fe, #fdf2f8)',
//             backgroundSize: '400% 400%',
//           }}
//         />

//         {/* Floating orbs */}
//         <div className="absolute inset-0 overflow-hidden">
//           <motion.div
//             animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
//             transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
//             className="absolute top-20 left-20 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-40"
//           />
//           <motion.div
//             animate={{ x: [0, -60, 0], y: [0, 80, 0], scale: [1.2, 1, 1.2] }}
//             transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
//             className="absolute top-40 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"
//           />
//           <motion.div
//             animate={{ x: [0, 40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
//             transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
//             className="absolute bottom-20 left-1/3 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-40"
//           />
//           <motion.div
//             animate={{ x: [0, -40, 0], y: [0, -40, 0] }}
//             transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
//             className="absolute bottom-40 right-1/3 w-48 h-48 bg-blue-300 rounded-full blur-3xl opacity-30"
//           />
//         </div>

//         {/* Grid pattern overlay */}
//         <div
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
//             backgroundSize: '40px 40px',
//           }}
//         />

//         <motion.div
//           style={{ y: heroY, opacity: heroOpacity }}
//           className="relative max-w-6xl mx-auto px-8 pt-32 pb-20 w-full"
//         >
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

//             {/* Avatar */}
//             <motion.div
//               initial={{ scale: 0, rotate: -10 }}
//               animate={{ scale: 1, rotate: 0 }}
//               transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
//               className="relative shrink-0"
//             >
//               {portfolio.avatar ? (
//                 <div className="relative">
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
//                     className="absolute -inset-1 rounded-3xl opacity-90"
//                     style={{
//                       background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f97316, #6366f1)',
//                     }}
//                   />
//                   <motion.div
//                     animate={{ rotate: -360 }}
//                     transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
//                     className="absolute -inset-2 rounded-3xl opacity-40 blur-sm"
//                     style={{
//                       background: 'conic-gradient(from 180deg, #6366f1, #a855f7, #ec4899, #6366f1)',
//                     }}
//                   />
//                   <img
//                     src={portfolio.avatar}
//                     alt={portfolio.name}
//                     className="relative w-48 h-48 rounded-3xl object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="relative">
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
//                     className="absolute -inset-1 rounded-3xl"
//                     style={{
//                       background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f97316, #6366f1)',
//                     }}
//                   />
//                   <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-7xl font-bold text-white">
//                     {portfolio.name.charAt(0)}
//                   </div>
//                 </div>
//               )}

//               {/* Floating badges */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0, x: 20 }}
//                 animate={{ opacity: 1, scale: 1, x: 0 }}
//                 transition={{ delay: 1, type: 'spring' }}
//                 className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-green-200"
//               >
//                 ✦ Available
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, scale: 0, x: -20 }}
//                 animate={{ opacity: 1, scale: 1, x: 0 }}
//                 transition={{ delay: 1.2, type: 'spring' }}
//                 className="absolute -top-4 -left-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-orange-200"
//               >
//                 🚀 Open to work
//               </motion.div>
//             </motion.div>

//             {/* Text */}
//             <div className="flex-1 text-center md:text-left">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 border"
//                 style={{
//                   background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
//                   borderColor: 'rgba(168,85,247,0.3)',
//                   color: '#7c3aed',
//                 }}
//               >
//                 <motion.span
//                   animate={{ scale: [1, 1.5, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="w-2 h-2 bg-purple-500 rounded-full"
//                 />
//                 Personal Portfolio
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.8 }}
//                 className="text-6xl md:text-7xl font-black tracking-tight leading-none mb-6"
//               >
//                 {portfolio.name.split(' ').map((word, i) => (
//                   <motion.span
//                     key={i}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 + i * 0.1 }}
//                     className={`inline-block mr-3 ${
//                       i % 2 === 1
//                         ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'
//                         : 'text-gray-900'
//                     }`}
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </motion.h1>

//               {portfolio.bio && (
//                 <motion.p
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="text-xl text-gray-500 max-w-xl leading-relaxed mb-8"
//                 >
//                   {portfolio.bio}
//                 </motion.p>
//               )}

//               {/* Stats row */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//                 className="flex gap-8 mb-8 justify-center md:justify-start"
//               >
//                 {portfolio.skills.length > 0 && (
//                   <div>
//                     <p className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                       {portfolio.skills.length}+
//                     </p>
//                     <p className="text-xs text-gray-400 font-medium">Skills</p>
//                   </div>
//                 )}
//                 {portfolio.projects.length > 0 && (
//                   <div>
//                     <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                       {portfolio.projects.length}+
//                     </p>
//                     <p className="text-xs text-gray-400 font-medium">Projects</p>
//                   </div>
//                 )}
//                 {portfolio.experience.length > 0 && (
//                   <div>
//                     <p className="text-2xl font-black bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
//                       {portfolio.experience.length}+
//                     </p>
//                     <p className="text-xs text-gray-400 font-medium">Experience</p>
//                   </div>
//                 )}
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//                 className="flex gap-3 flex-wrap justify-center md:justify-start"
//               >
//                 {portfolio.github && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, y: -3 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.github}
//                     target="_blank"
//                     className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-shadow"
//                   >
//                     GitHub
//                   </motion.a>
//                 )}
//                 {portfolio.linkedin && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, y: -3 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.linkedin}
//                     target="_blank"
//                     className="flex items-center gap-2 bg-[#0077b5] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-shadow"
//                   >
//                     LinkedIn
//                   </motion.a>
//                 )}
//                 {portfolio.twitter && (
//                   <motion.a
//                     whileHover={{ scale: 1.05, y: -3 }}
//                     whileTap={{ scale: 0.95 }}
//                     href={portfolio.twitter}
//                     target="_blank"
//                     className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-shadow"
//                   >
//                     Twitter
//                   </motion.a>
//                 )}
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Scroll indicator */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5 }}
//           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//         >
//           <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
//           <motion.div
//             animate={{ y: [0, 8, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="w-5 h-8 border-2 border-purple-300 rounded-full flex items-start justify-center pt-1.5"
//           >
//             <motion.div
//               animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//               className="w-1 h-2 bg-purple-400 rounded-full"
//             />
//           </motion.div>
//         </motion.div>
//       </section>

//       <div className="max-w-6xl mx-auto px-8 space-y-32 pb-32">

//         {/* Skills */}
//         {portfolio.skills.length > 0 && (
//           <FadeInSection>
//             <div className="text-center mb-12">
//               <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">What I know</span>
//               <h2 className="text-4xl font-black mt-2">Skills & Technologies</h2>
//             </div>
//             <div className="flex flex-wrap gap-3 justify-center">
//               {portfolio.skills.map((skill, i) => (
//                 <motion.span
//                   key={skill}
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.05, type: 'spring' }}
//                   whileHover={{ scale: 1.1, y: -3 }}
//                   className="bg-white text-gray-700 px-6 py-3 rounded-2xl text-sm font-semibold shadow-sm border border-gray-100 cursor-default hover:shadow-lg hover:border-blue-100 hover:text-blue-600 transition-all"
//                 >
//                   {skill}
//                 </motion.span>
//               ))}
//             </div>
//           </FadeInSection>
//         )}

//         {/* Experience */}
//         {portfolio.experience.length > 0 && (
//           <FadeInSection>
//             <div className="text-center mb-12">
//               <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Where I've worked</span>
//               <h2 className="text-4xl font-black mt-2">Experience</h2>
//             </div>
//             <div className="relative">
//               <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-transparent hidden md:block"></div>
//               <div className="space-y-6">
//                 {portfolio.experience.map((exp, i) => (
//                   <motion.div
//                     key={exp.id}
//                     initial={{ opacity: 0, x: -40 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                     whileHover={{ x: 4 }}
//                     className="relative md:pl-20 group"
//                   >
//                     <div className="absolute left-5 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg hidden md:flex items-center justify-center">
//                       <div className="w-2 h-2 bg-white rounded-full"></div>
//                     </div>
//                     <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:border-blue-50 transition-all">
//                       <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
//                         <div>
//                           <h3 className="text-xl font-bold">{exp.role}</h3>
//                           <p className="text-blue-600 font-semibold text-sm mt-1">{exp.company}</p>
//                         </div>
//                         {exp.duration && (
//                           <span className="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full border mt-2 md:mt-0 w-fit font-medium">
//                             {exp.duration}
//                           </span>
//                         )}
//                       </div>
//                       {exp.description && (
//                         <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-50">
//                           {exp.description}
//                         </p>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </FadeInSection>
//         )}

//         {/* Education */}
//         {portfolio.education.length > 0 && (
//           <FadeInSection>
//             <div className="text-center mb-12">
//               <span className="text-xs font-bold text-green-600 uppercase tracking-widest">Where I studied</span>
//               <h2 className="text-4xl font-black mt-2">Education</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {portfolio.education.map((edu, i) => (
//                 <motion.div
//                   key={edu.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   whileHover={{ y: -4 }}
//                   className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
//                 >
//                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 mb-4 flex items-center justify-center text-white text-xl font-black">
//                     🎓
//                   </div>
//                   <h3 className="font-black text-lg group-hover:text-green-600 transition-colors">{edu.college}</h3>
//                   <p className="text-gray-500 text-sm mt-1">{edu.degree}</p>
//                   {edu.year && (
//                     <span className="inline-block mt-3 text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border font-medium">
//                       {edu.year}
//                     </span>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           </FadeInSection>
//         )}

//         {/* Projects */}
//         {portfolio.projects.length > 0 && (
//           <FadeInSection>
//             <div className="text-center mb-12">
//               <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">What I've built</span>
//               <h2 className="text-4xl font-black mt-2">Projects</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {portfolio.projects.map((project, i) => (
//                 <motion.div
//                   key={project.id}
//                   initial={{ opacity: 0, y: 40 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: i * 0.1 }}
//                   whileHover={{ y: -6 }}
//                   className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative"
//                 >
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                   <div className="relative">
//                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 mb-6 shadow-lg"></div>
//                     <h3 className="text-xl font-black mb-3 group-hover:text-blue-600 transition-colors">
//                       {project.title}
//                     </h3>
//                     {project.description && (
//                       <p className="text-gray-500 text-sm mb-6 leading-relaxed">{project.description}</p>
//                     )}
//                     <div className="flex gap-4">
//                       {project.link && (
//                         <motion.a
//                           whileHover={{ x: 4 }}
//                           href={project.link}
//                           target="_blank"
//                           className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
//                         >
//                           Live Demo →
//                         </motion.a>
//                       )}
//                       {project.github && (
//                         <motion.a
//                           whileHover={{ x: 4 }}
//                           href={project.github}
//                           target="_blank"
//                           className="text-gray-400 text-sm font-medium hover:text-gray-700 flex items-center gap-1"
//                         >
//                           GitHub →
//                         </motion.a>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </FadeInSection>
//         )}

//         {/* Certifications */}
//         {portfolio.certifications.length > 0 && (
//           <FadeInSection>
//             <div className="text-center mb-12">
//               <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Achievements</span>
//               <h2 className="text-4xl font-black mt-2">Certifications</h2>
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
//                   className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-lg transition-all group"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shrink-0">
//                       ✦
//                     </div>
//                     <div>
//                       <p className="font-bold text-sm group-hover:text-yellow-600 transition-colors">{cert.name}</p>
//                       {cert.issuer && <p className="text-gray-400 text-xs mt-0.5">{cert.issuer}</p>}
//                     </div>
//                   </div>
//                   {cert.link && (
//                     <motion.a
//                       whileHover={{ x: 3 }}
//                       href={cert.link}
//                       target="_blank"
//                       className="text-blue-600 text-xs font-bold hover:underline ml-4 shrink-0"
//                     >
//                       View →
//                     </motion.a>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           </FadeInSection>
//         )}

//       </div>

//       {/* Footer */}
//       <footer className="border-t border-gray-100 bg-white py-12 text-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="max-w-6xl mx-auto px-8"
//         >
//           <p className="text-2xl font-black mb-2">{portfolio.name}</p>
//           <p className="text-gray-400 text-sm mb-6">{portfolio.bio?.slice(0, 60)}...</p>
//           <div className="flex justify-center gap-4 mb-8">
//             {portfolio.github && <a href={portfolio.github} target="_blank" className="text-gray-400 hover:text-black text-sm transition">GitHub</a>}
//             {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="text-gray-400 hover:text-black text-sm transition">LinkedIn</a>}
//             {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="text-gray-400 hover:text-black text-sm transition">Twitter</a>}
//           </div>
//           <p className="text-xs text-gray-300">
//             {showWatermark ? (
//               <span>
//                 Made with{' '}
//                 <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-gray-500">Portfolio SaaS</a>
//                 {' — '}
//                 <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-gray-500">Remove watermark</a>
//               </span>
//             ) : (
//               <span>Built with Portfolio SaaS</span>
//             )}
//           </p>
//         </motion.div>
//       </footer>
// {/* Contact */}
//       <FadeInSection>
//         <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          
//           {/* Background decoration */}
//           <motion.div
//             animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
//             transition={{ duration: 15, repeat: Infinity }}
//             className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"
//           />
//           <motion.div
//             animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
//             transition={{ duration: 20, repeat: Infinity }}
//             className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"
//           />

//           <div className="relative">
//             <motion.div
//               initial={{ scale: 0 }}
//               whileInView={{ scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ type: 'spring', bounce: 0.5 }}
//               className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6"
//             >
//               👋
//             </motion.div>

//             <h2 className="text-4xl font-black mb-4">Let's Work Together</h2>
//             <p className="text-white/80 text-lg max-w-md mx-auto mb-8">
//               Have a project in mind? I'd love to hear about it. Let's build something amazing together.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               {portfolio.linkedin && (
//                 <motion.a
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   href={portfolio.linkedin}
//                   target="_blank"
//                   className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:shadow-xl transition-all"
//                 >
//                   Connect on LinkedIn →
//                 </motion.a>
//               )}
//               {portfolio.github && (
//                 <motion.a
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   href={portfolio.github}
//                   target="_blank"
//                   className="bg-white/20 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/30 transition-all border border-white/30"
//                 >
//                   View GitHub →
//                 </motion.a>
//               )}
//             </div>
//           </div>
//         </div>
//       </FadeInSection>
//     </main>
//   )
// }









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
// SKILL GROUPING
// ============================================================
function groupSkills(skills: string[]) {
  const frontend = ['react', 'next', 'vue', 'angular', 'tailwind', 'css', 'html', 'javascript', 'typescript', 'redux', 'svelte', 'sass', 'webpack', 'vite', 'figma', 'ui', 'ux']
  const backend = ['node', 'express', 'python', 'django', 'flask', 'java', 'spring', 'php', 'laravel', 'ruby', 'rails', 'go', 'rust', 'c++', 'c#', '.net', 'graphql', 'rest', 'api']
  const tools = ['git', 'docker', 'aws', 'gcp', 'azure', 'linux', 'bash', 'ci/cd', 'jenkins', 'kubernetes', 'firebase', 'supabase', 'mongodb', 'postgres', 'mysql', 'redis', 'prisma']

  const groups: { [key: string]: string[] } = {
    'Frontend': [],
    'Backend': [],
    'Tools & DevOps': [],
    'Other': [],
  }

  skills.forEach(skill => {
    const lower = skill.toLowerCase()
    if (frontend.some(f => lower.includes(f))) {
      groups['Frontend'].push(skill)
    } else if (backend.some(b => lower.includes(b))) {
      groups['Backend'].push(skill)
    } else if (tools.some(t => lower.includes(t))) {
      groups['Tools & DevOps'].push(skill)
    } else {
      groups['Other'].push(skill)
    }
  })

  return Object.entries(groups).filter(([, skills]) => skills.length > 0)
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

    const handleHover = () => setIsHovering(true)
    const handleUnhover = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMove)

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleUnhover)
    })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleUnhover)
      })
    }
  }, [isVisible])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border-2 border-indigo-500/60 hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-indigo-500 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[9998] origin-left"
      style={{ scaleX }}
    />
  )
}

// ============================================================
// PARTICLE BACKGROUND
// ============================================================
function ParticleBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ============================================================
// TILT CARD
// ============================================================
function TiltCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// MAGNETIC BUTTON
// ============================================================
function MagneticButton({ children, className = '', href, target, style }: {
  children: React.ReactNode
  className?: string
  href?: string
  target?: string
  style?: React.CSSProperties
}){
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const content = (
    <motion.div
  ref={ref}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={{ x: springX, y: springY, ...style }}
  whileTap={{ scale: 0.95 }}
  className={className}
>
  {children}
</motion.div>
  )

  if (href) {
    return <a href={href} target={target}>{content}</a>
  }

  return content
}

// ============================================================
// SECTION REVEAL
// ============================================================
function SectionReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
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
// ANIMATED GRADIENT TEXT
// ============================================================
function GradientText({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      style={{ backgroundSize: '200% 200%' }}
    >
      {children}
    </motion.span>
  )
}

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
    }, isDeleting ? 50 : 80)

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, currentIndex, texts])

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-indigo-500"
      >
        |
      </motion.span>
    </span>
  )
}

// ============================================================
// ANIMATED TIMELINE ITEM
// ============================================================
function TimelineItem({ children, index }: { children: React.ReactNode, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8 md:pl-16"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, type: 'spring', bounce: 0.5 }}
        className="absolute left-0 md:left-4 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 z-10"
      />
      {children}
    </motion.div>
  )
}

// ============================================================
// MAIN TEMPLATE
// ============================================================
export default function Template1({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -120])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const skillGroups = groupSkills(portfolio.skills)

  const roles = [
    portfolio.bio ?? 'Developer',
    'Problem Solver',
    'Creative Thinker',
    'Tech Enthusiast',
  ]

  // Dark mode toggle
  const bg = darkMode ? '#0a0a0f' : '#fafafa'
  const text = darkMode ? '#ffffff' : '#1a1a1a'

  return (
    <div style={{ background: bg, color: text }} className="min-h-screen font-sans overflow-x-hidden transition-colors duration-500">

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-30 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* NAV */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-4xl"
      >
        <div
          className="flex items-center justify-between px-4 md:px-6 h-14 rounded-2xl border backdrop-blur-xl"
          style={{
            background: darkMode ? 'rgba(10,10,15,0.85)' : 'rgba(255,255,255,0.85)',
            borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            {portfolio.avatar ? (
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                src={portfolio.avatar}
                alt={portfolio.name}
                className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-500/30"
              />
            ) : (
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-black"
              >
                {portfolio.name.charAt(0)}
              </motion.div>
            )}
            <span className="font-black text-sm tracking-tight">{portfolio.name.split(' ')[0]}</span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
            {['Skills', 'Experience', 'Projects', 'Education'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
                className="px-3 py-1.5 rounded-xl transition-colors opacity-60 hover:opacity-100"
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
              style={{
                background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
              }}
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>

            {portfolio.github && (
              <MagneticButton
                href={portfolio.github}
                target="_blank"
                className="text-xs font-black px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-200 transition-shadow cursor-pointer"
              >
                GitHub
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        <ParticleBackground />

        {/* Animated mesh gradient background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: darkMode
                ? ['radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.1) 0%, transparent 60%)']
                : ['radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 60%)'],
            }}
            className="absolute inset-0"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #6366f1, #a855f7)' }}
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: 'radial-gradient(circle, #ec4899, #6366f1)' }}
          />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20 w-full"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold mb-8"
                style={{
                  background: 'rgba(99,102,241,0.08)',
                  borderColor: 'rgba(99,102,241,0.2)',
                  color: '#6366f1',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-indigo-500"
                />
                Available for opportunities
              </motion.div>

              {/* Name */}
              <div className="mb-4">
                {portfolio.name.split(' ').map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
                  >
                    {i % 2 === 0 ? (
                      <span>{word}</span>
                    ) : (
                      <GradientText>{word}</GradientText>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Typewriter bio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl md:text-2xl font-medium mb-4 h-8"
                style={{ color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
              >
                <TypewriterText texts={roles} />
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-8 my-8 justify-center lg:justify-start"
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
                    transition={{ delay: 0.9 + i * 0.1, type: 'spring', bounce: 0.5 }}
                    className="text-center lg:text-left"
                  >
                    <p className="text-3xl font-black">
                      <GradientText>{stat.value}</GradientText>
                    </p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)' }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex gap-3 flex-wrap justify-center lg:justify-start"
              >
                {portfolio.linkedin && (
                  <MagneticButton
                    href={portfolio.linkedin}
                    target="_blank"
                    className="relative overflow-hidden px-6 py-3 rounded-2xl text-sm font-black text-white cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                      boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
                    } as any}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.4 }}
                    />
                    <span className="relative">Connect →</span>
                  </MagneticButton>
                )}
                {portfolio.github && (
                  <MagneticButton
                    href={portfolio.github}
                    target="_blank"
                    className="px-6 py-3 rounded-2xl text-sm font-black cursor-pointer border"
                    style={{
                      borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    } as any}
                  >
                    GitHub
                  </MagneticButton>
                )}
                {portfolio.website && (
                  <MagneticButton
                    href={portfolio.website}
                    target="_blank"
                    className="px-6 py-3 rounded-2xl text-sm font-black cursor-pointer border"
                    style={{
                      borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                      color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    } as any}
                  >
                    Website
                  </MagneticButton>
                )}
              </motion.div>
            </div>

            {/* Right — Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0"
            >
              <div className="relative w-56 h-56 md:w-72 md:h-72">

                {/* Animated gradient ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-2 rounded-3xl"
                  style={{
                    background: 'conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f97316, #6366f1)',
                    borderRadius: '28px',
                    padding: '2px',
                  }}
                />

                {/* Glow */}
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-3xl blur-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4))' }}
                />

                {portfolio.avatar ? (
                  <img
                    src={portfolio.avatar}
                    alt={portfolio.name}
                    className="relative w-full h-full rounded-3xl object-cover z-10"
                    style={{ position: 'relative' }}
                  />
                ) : (
                  <div
                    className="relative w-full h-full rounded-3xl flex items-center justify-center text-8xl font-black text-white z-10"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                  >
                    {portfolio.name.charAt(0)}
                  </div>
                )}

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 z-20 text-xs font-black px-4 py-2 rounded-2xl text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                >
                  ✦ Available
                </motion.div>

                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -left-4 z-20 text-xs font-black px-4 py-2 rounded-2xl text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
                >
                  🚀 Open to work
                </motion.div>

              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium opacity-30">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: 'rgba(99,102,241,0.4)' }}
          >
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-indigo-500"
            />
          </motion.div>
        </motion.div>

      </section>

      {/* CONTENT SECTIONS */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-32 pb-32">

        {/* SKILLS */}
        {portfolio.skills.length > 0 && (
          <SectionReveal>
            <div className="text-center mb-12">
              <motion.span
                className="text-xs font-black uppercase tracking-widest text-indigo-500"
              >
                What I know
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-black mt-2">
                Skills & <GradientText>Technologies</GradientText>
              </h2>
            </div>

            <div className="space-y-8">
              {skillGroups.map(([category, skills], groupIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-4">{category}</p>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => (
                      <TiltCard key={skill}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.04, type: 'spring' }}
                          whileHover={{ y: -4 }}
                          className="relative px-5 py-2.5 rounded-2xl text-sm font-bold cursor-default group"
                          style={{
                            background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                          }}
                        >
                          {/* Hover glow */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="relative">{skill}</span>
                        </motion.div>
                      </TiltCard>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        )}

        {/* EXPERIENCE */}
        {portfolio.experience.length > 0 && (
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-purple-500">Career</span>
              <h2 className="text-4xl md:text-5xl font-black mt-2">
                <GradientText>Experience</GradientText>
              </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-2 md:left-6 top-0 bottom-0 w-0.5 hidden md:block"
                style={{ background: 'linear-gradient(to bottom, #6366f1, #a855f7, transparent)' }}
              />

              <div className="space-y-6">
                {portfolio.experience.map((exp, i) => (
                  <TimelineItem key={exp.id} index={i}>
                    <TiltCard>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="rounded-3xl p-6 md:p-8 border group"
                        style={{
                          background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                          borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                          boxShadow: darkMode ? 'none' : '0 4px 24px rgba(0,0,0,0.04)',
                        }}
                      >
                        {/* Animated gradient border on hover */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
                          }}
                        />
                        <div className="relative flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                          <div>
                            <h3 className="text-xl font-black">{exp.role}</h3>
                            <p className="text-indigo-500 font-bold text-sm mt-1">{exp.company}</p>
                          </div>
                          {exp.duration && (
                            <span
                              className="text-xs font-bold px-4 py-2 rounded-full w-fit"
                              style={{
                                background: darkMode ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.08)',
                                color: '#6366f1',
                                border: '1px solid rgba(99,102,241,0.2)',
                              }}
                            >
                              {exp.duration}
                            </span>
                          )}
                        </div>
                        {exp.description && (
                          <p className="relative text-sm leading-relaxed mt-4 pt-4 border-t opacity-60"
                            style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
                          >
                            {exp.description}
                          </p>
                        )}
                      </motion.div>
                    </TiltCard>
                  </TimelineItem>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* EDUCATION */}
        {portfolio.education.length > 0 && (
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-green-500">Background</span>
              <h2 className="text-4xl md:text-5xl font-black mt-2">
                <GradientText>Education</GradientText>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.education.map((edu, i) => (
                <TiltCard key={edu.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="rounded-3xl p-8 border group relative overflow-hidden"
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                      borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                      boxShadow: darkMode ? 'none' : '0 4px 24px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08), transparent)' }}
                    />
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                      style={{ background: 'rgba(16,185,129,0.1)' }}
                    >
                      🎓
                    </div>
                    <h3 className="font-black text-lg">{edu.college}</h3>
                    <p className="opacity-50 text-sm mt-1">{edu.degree}</p>
                    {edu.year && (
                      <span className="inline-block mt-3 text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          background: 'rgba(16,185,129,0.1)',
                          color: '#10b981',
                          border: '1px solid rgba(16,185,129,0.2)',
                        }}
                      >
                        {edu.year}
                      </span>
                    )}
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </SectionReveal>
        )}

        {/* PROJECTS */}
        {portfolio.projects.length > 0 && (
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-black mt-2">
                Featured <GradientText>Projects</GradientText>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, i) => (
                <TiltCard key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="rounded-3xl p-8 border group relative overflow-hidden h-full"
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                      borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                      boxShadow: darkMode ? 'none' : '0 4px 24px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Animated gradient border on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(236,72,153,0.08))',
                      }}
                    />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                          style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
                        >
                          <span className="text-white text-lg font-black">
                            {project.title.charAt(0)}
                          </span>
                        </motion.div>

                        <div className="flex gap-2">
                          {project.link && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -2 }}
                              href={project.link}
                              target="_blank"
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm border transition-all"
                              style={{
                                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                                color: '#6366f1',
                              }}
                            >
                              ↗
                            </motion.a>
                          )}
                          {project.github && (
                            <motion.a
                              whileHover={{ scale: 1.1, y: -2 }}
                              href={project.github}
                              target="_blank"
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm border transition-all"
                              style={{
                                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                                opacity: 0.6,
                              }}
                            >
                              ⌥
                            </motion.a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-black mb-2 group-hover:text-indigo-500 transition-colors">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-sm leading-relaxed opacity-50">{project.description}</p>
                      )}
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </SectionReveal>
        )}

        {/* CERTIFICATIONS */}
        {portfolio.certifications.length > 0 && (
          <SectionReveal>
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-yellow-500">Achievements</span>
              <h2 className="text-4xl md:text-5xl font-black mt-2">
                <GradientText>Certifications</GradientText>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="rounded-3xl p-6 border flex justify-between items-center group"
                  style={{
                    background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                    borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                    boxShadow: darkMode ? 'none' : '0 4px 24px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-yellow-500 font-black shrink-0"
                      style={{ background: 'rgba(234,179,8,0.1)' }}
                    >
                      ✦
                    </motion.div>
                    <div>
                      <p className="font-black text-sm group-hover:text-indigo-500 transition-colors">{cert.name}</p>
                      {cert.issuer && <p className="text-xs opacity-40 mt-0.5">{cert.issuer}</p>}
                    </div>
                  </div>
                  {cert.link && (
                    <motion.a
                      whileHover={{ x: 4 }}
                      href={cert.link}
                      target="_blank"
                      className="text-indigo-500 text-xs font-black ml-4 shrink-0"
                    >
                      View →
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        )}

        {/* CONTACT */}
        <SectionReveal>
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
            }}
          >
            {/* Animated background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-white/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full border border-white/10"
            />

            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-5xl mb-6"
              >
                👋
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Let's Work Together
              </h2>
              <p className="text-white/70 text-lg max-w-md mx-auto mb-10">
                Have a project in mind? I'd love to hear about it.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                {portfolio.linkedin && (
                  <MagneticButton
                    href={portfolio.linkedin}
                    target="_blank"
                    className="relative overflow-hidden bg-white text-indigo-600 font-black px-8 py-4 rounded-2xl shadow-xl cursor-pointer"
                  >
                    <motion.div
                      className="absolute inset-0 bg-indigo-50"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative">Connect on LinkedIn →</span>
                  </MagneticButton>
                )}
                {portfolio.github && (
                  <MagneticButton
                    href={portfolio.github}
                    target="_blank"
                    className="bg-white/15 hover:bg-white/25 text-white font-black px-8 py-4 rounded-2xl border border-white/20 cursor-pointer transition-colors"
                  >
                    View GitHub →
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        </SectionReveal>

      </div>

      {/* FOOTER */}
      <footer
        className="border-t py-10 text-center"
        style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-6xl mx-auto px-8">
          <p className="font-black text-2xl mb-2">{portfolio.name}</p>
          <p className="text-sm opacity-30 mb-6">{portfolio.bio?.slice(0, 80)}</p>
          <div className="flex justify-center gap-6 mb-8">
            {portfolio.github && <a href={portfolio.github} target="_blank" className="text-sm opacity-30 hover:opacity-70 transition-opacity">GitHub</a>}
            {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="text-sm opacity-30 hover:opacity-70 transition-opacity">LinkedIn</a>}
            {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="text-sm opacity-30 hover:opacity-70 transition-opacity">Twitter</a>}
          </div>
          <p className="text-xs opacity-20">
            {showWatermark ? (
              <span>
                Made with{' '}
                <a href="https://portfolio-saas-red.vercel.app" className="underline hover:opacity-50">Portfolio SaaS</a>
                {' — '}
                <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:opacity-50">Remove watermark</a>
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
