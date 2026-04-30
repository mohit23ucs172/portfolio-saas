type Project = {
  id: string
  title: string
  description: string | null
  link: string | null
  github: string | null
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
}

export default function Template3({ portfolio }: { portfolio: Portfolio }) {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Hero */}
      <section className="relative py-24 px-8 text-center bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-4xl font-bold mx-auto mb-6">
          {portfolio.name.charAt(0)}
        </div>
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {portfolio.name}
        </h1>
        {portfolio.bio && (
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
            {portfolio.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4 flex-wrap">
          {portfolio.github && (
            <a href={portfolio.github} target="_blank"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">
              GitHub
            </a>
          )}
          {portfolio.linkedin && (
            <a href={portfolio.linkedin} target="_blank"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">
              LinkedIn
            </a>
          )}
          {portfolio.twitter && (
            <a href={portfolio.twitter} target="_blank"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">
              Twitter
            </a>
          )}
          {portfolio.website && (
            <a href={portfolio.website} target="_blank"
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition">
              Website
            </a>
          )}
        </div>
      </section>

      {/* Skills */}
      {portfolio.skills.length > 0 && (
        <section className="py-16 px-8 max-w-4xl mx-auto">
          <h2 className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {portfolio.skills.map((skill) => (
              <span
                key={skill}
                className="border border-purple-500/30 bg-purple-500/10 text-purple-300 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {portfolio.projects.length > 0 && (
        <section className="py-16 px-8 max-w-4xl mx-auto">
          <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>
                )}
                <div className="flex gap-4">
                  {project.link && (
                    <a href={project.link} target="_blank"
                      className="text-blue-400 text-sm hover:underline">
                      Live →
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank"
                      className="text-purple-400 text-sm hover:underline">
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-xs border-t border-white/10">
        Built with Portfolio SaaS
      </footer>

    </main>
  )
}