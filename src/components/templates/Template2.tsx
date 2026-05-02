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

export default function Template2({
  portfolio,
  showWatermark = true,
}: {
  portfolio: Portfolio
  showWatermark?: boolean
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-6 flex flex-col md:flex-row gap-10">

        {/* Sidebar */}
        <aside className="md:w-1/3 space-y-6 h-fit">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
              {portfolio.name.charAt(0)}
            </div>
            <h1 className="text-2xl font-bold mb-2">{portfolio.name}</h1>
            {portfolio.bio && (
              <p className="text-gray-500 text-sm mb-6">{portfolio.bio}</p>
            )}

            {/* Skills */}
            {portfolio.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {portfolio.skills.map((skill) => (
                    <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="space-y-2">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Links</h2>
              {portfolio.github && <a href={portfolio.github} target="_blank" className="block text-sm text-gray-600 hover:text-black">→ GitHub</a>}
              {portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" className="block text-sm text-gray-600 hover:text-black">→ LinkedIn</a>}
              {portfolio.twitter && <a href={portfolio.twitter} target="_blank" className="block text-sm text-gray-600 hover:text-black">→ Twitter</a>}
              {portfolio.website && <a href={portfolio.website} target="_blank" className="block text-sm text-gray-600 hover:text-black">→ Website</a>}
            </div>
          </div>

          {/* Education Sidebar */}
          {portfolio.education.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Education</h2>
              <div className="space-y-3">
                {portfolio.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-sm">{edu.college}</p>
                    <p className="text-gray-500 text-xs">{edu.degree}</p>
                    {edu.year && <p className="text-gray-400 text-xs">{edu.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Sidebar */}
          {portfolio.certifications.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Certifications</h2>
              <div className="space-y-3">
                {portfolio.certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm">{cert.name}</p>
                      {cert.issuer && <p className="text-gray-400 text-xs">{cert.issuer}</p>}
                    </div>
                    {cert.link && <a href={cert.link} target="_blank" className="text-blue-600 text-xs underline">View</a>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div className="md:w-2/3 space-y-8">

          {/* Experience */}
          {portfolio.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Experience</h2>
              <div className="space-y-4">
                {portfolio.experience.map((exp) => (
                  <div key={exp.id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold">{exp.role}</h3>
                      {exp.duration && <span className="text-gray-400 text-xs">{exp.duration}</span>}
                    </div>
                    <p className="text-blue-600 text-sm mb-2">{exp.company}</p>
                    {exp.description && <p className="text-gray-500 text-sm">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          <div>
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            {portfolio.projects.length === 0 && (
              <p className="text-gray-400">No projects added yet.</p>
            )}
            <div className="space-y-4">
              {portfolio.projects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                  <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                  {project.description && <p className="text-gray-500 text-sm mb-3">{project.description}</p>}
                  <div className="flex gap-4">
                    {project.link && <a href={project.link} target="_blank" className="text-blue-600 text-sm font-medium hover:underline">Live Demo →</a>}
                    {project.github && <a href={project.github} target="_blank" className="text-gray-500 text-sm font-medium hover:underline">GitHub →</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <footer className="text-center py-6 text-gray-400 text-xs border-t">
        {showWatermark ? (
          <span>
            Made with{' '}
            <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-gray-600">Portfolio SaaS</a>
            {' — '}
            <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-gray-600">Remove watermark</a>
          </span>
        ) : (
          <span>Built with Portfolio SaaS</span>
        )}
      </footer>
    </main>
  )
}