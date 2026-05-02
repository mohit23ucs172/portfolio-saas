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

export default function Template3({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Hero */}
      <section className="relative py-24 px-8 text-center bg-linear-to-br from-purple-900 via-gray-900 to-blue-900">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-400 to-blue-400 flex items-center justify-center text-4xl font-bold mx-auto mb-6">
          {portfolio.name.charAt(0)}
        </div>
        <h1 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {portfolio.name}
        </h1>
        {portfolio.bio && (
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">{portfolio.bio}</p>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          {portfolio.github && <a href={portfolio.github} target="_blank" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">GitHub</a>}
          {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">LinkedIn</a>}
          {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">Twitter</a>}
          {portfolio.website && <a href={portfolio.website} target="_blank" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">Website</a>}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-8">

        {/* Skills */}
        {portfolio.skills.length > 0 && (
          <section className="py-12">
            <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-6">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill) => (
                <span key={skill} className="border border-purple-500/30 bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {portfolio.experience.length > 0 && (
          <section className="py-12 border-t border-white/10">
            <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6">Experience</h2>
            <div className="space-y-6">
              {portfolio.experience.map((exp) => (
                <div key={exp.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-white">{exp.role}</h3>
                    {exp.duration && <span className="text-gray-400 text-xs">{exp.duration}</span>}
                  </div>
                  <p className="text-purple-400 text-sm mb-2">{exp.company}</p>
                  {exp.description && <p className="text-gray-400 text-sm">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {portfolio.education.length > 0 && (
          <section className="py-12 border-t border-white/10">
            <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6">Education</h2>
            <div className="space-y-4">
              {portfolio.education.map((edu) => (
                <div key={edu.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold text-white">{edu.college}</h3>
                  <p className="text-gray-400 text-sm">{edu.degree}</p>
                  {edu.year && <p className="text-gray-500 text-xs mt-1">{edu.year}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio.projects.length > 0 && (
          <section className="py-12 border-t border-white/10">
            <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project) => (
                <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                  <h3 className="text-lg font-semibold mb-2 text-white">{project.title}</h3>
                  {project.description && <p className="text-gray-400 text-sm mb-4">{project.description}</p>}
                  <div className="flex gap-4">
                    {project.link && <a href={project.link} target="_blank" className="text-blue-400 text-sm hover:underline">Live →</a>}
                    {project.github && <a href={project.github} target="_blank" className="text-purple-400 text-sm hover:underline">GitHub →</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {portfolio.certifications.length > 0 && (
          <section className="py-12 border-t border-white/10">
            <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6">Certifications</h2>
            <div className="space-y-3">
              {portfolio.certifications.map((cert) => (
                <div key={cert.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white text-sm">{cert.name}</p>
                    {cert.issuer && <p className="text-gray-400 text-xs">{cert.issuer}</p>}
                  </div>
                  {cert.link && <a href={cert.link} target="_blank" className="text-blue-400 text-xs underline">View</a>}
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      <footer className="text-center py-8 text-gray-600 text-xs border-t border-white/10 mt-8">
        {showWatermark ? (
          <span>
            Made with{' '}
            <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-gray-400">Portfolio SaaS</a>
            {' — '}
            <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-gray-400">Remove watermark</a>
          </span>
        ) : (
          <span>Built with Portfolio SaaS</span>
        )}
      </footer>

    </main>
  )
}