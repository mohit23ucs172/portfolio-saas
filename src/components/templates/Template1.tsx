import Link from 'next/link'

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
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="bg-black text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">{portfolio.name}</h1>
        {portfolio.bio && (
          <p className="text-gray-300 text-lg max-w-xl mx-auto">{portfolio.bio}</p>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          {portfolio.github && (
            <a href={portfolio.github} target="_blank" className="text-gray-300 hover:text-white underline">
              GitHub
            </a>
          )}
          {portfolio.linkedin && (
            <a href={portfolio.linkedin} target="_blank" className="text-gray-300 hover:text-white underline">
              LinkedIn
            </a>
          )}
          {portfolio.twitter && (
            <a href={portfolio.twitter} target="_blank" className="text-gray-300 hover:text-white underline">
              Twitter
            </a>
          )}
          {portfolio.website && (
            <a href={portfolio.website} target="_blank" className="text-gray-300 hover:text-white underline">
              Website
            </a>
          )}
        </div>
      </section>

      {/* Skills */}
      {portfolio.skills.length > 0 && (
        <section className="py-16 px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {portfolio.skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
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
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((project) => (
              <div key={project.id} className="border rounded-xl p-6 hover:shadow-md transition">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                {project.description && (
                  <p className="text-gray-500 text-sm mb-4">{project.description}</p>
                )}
                <div className="flex gap-3">
                  {project.link && (
                    <a href={project.link} target="_blank" className="text-blue-600 text-sm underline">
                      Live
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" className="text-gray-600 text-sm underline">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

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