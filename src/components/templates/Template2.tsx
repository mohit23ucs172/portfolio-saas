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
export default function Template1({
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
        <aside className="md:w-1/3 bg-white rounded-2xl p-8 shadow-sm h-fit">
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
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Links
            </h2>
            {portfolio.github && (
              <a href={portfolio.github} target="_blank"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
                → GitHub
              </a>
            )}
            {portfolio.linkedin && (
              <a href={portfolio.linkedin} target="_blank"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
                → LinkedIn
              </a>
            )}
            {portfolio.twitter && (
              <a href={portfolio.twitter} target="_blank"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
                → Twitter
              </a>
            )}
            {portfolio.website && (
              <a href={portfolio.website} target="_blank"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
                → Website
              </a>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-bold mb-6">Projects</h2>

          {portfolio.projects.length === 0 && (
            <p className="text-gray-400">No projects added yet.</p>
          )}

          <div className="space-y-4">
            {portfolio.projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                {project.description && (
                  <p className="text-gray-500 text-sm mb-3">{project.description}</p>
                )}
                <div className="flex gap-4">
                  {project.link && (
                    <a href={project.link} target="_blank"
                      className="text-blue-600 text-sm font-medium hover:underline">
                      Live Demo →
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank"
                      className="text-gray-500 text-sm font-medium hover:underline">
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
    <footer className="text-center py-8 text-gray-400 text-sm border-t">
  {showWatermark ? (
    <span>
      Made with{' '}
      <a href="https://portfolio-saas-red.vercel.app" className="underline hover:text-gray-600">
        Portfolio SaaS
      </a>{' '}
      —{' '}
      <a href="https://portfolio-saas-red.vercel.app/pricing" className="underline hover:text-gray-600">
        Remove watermark
      </a>
    </span>
  ) : (
    <span>Built with Portfolio SaaS</span>
  )}
</footer>
    </main>
  )
}