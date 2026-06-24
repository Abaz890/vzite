import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Navigation } from "@/pages/navigation"
import { Footer } from "@/pages/landing/footer"
import { TypewriterEffectSmooth } from "@/pages/ui/typewriter-effect"

const blogPosts = [
  {
    title: "How to Close 30% More Deals with Lead Scoring",
    excerpt: "Learn how top UAE brokerages use Vzite's lead scoring to prioritize hot leads and close more deals in less time.",
    category: "Sales Tips",
    date: "June 10, 2024",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    featured: true,
  },
  {
    title: "Meta Ads Integration: Complete Guide",
    excerpt: "Step-by-step instructions for connecting your Meta ad campaigns and automating lead capture.",
    category: "Integrations",
    date: "June 8, 2024",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    featured: true,
  },
  {
    title: "UAE Real Estate Market Report: Q2 2024",
    excerpt: "Our analysis of transaction volumes, price trends, and buyer demographics across Dubai and Abu Dhabi.",
    category: "Market Insights",
    date: "June 5, 2024",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    featured: false,
  },
  {
    title: "5 Ways to Reduce Lead Response Time",
    excerpt: "Speed to lead matters. Here's how leading brokerages are cutting response times to under 5 minutes.",
    category: "Sales Tips",
    date: "June 3, 2024",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800&q=80",
    featured: false,
  },
  {
    title: "Property Portal Sync Best Practices",
    excerpt: "Maximize your listing visibility across Property Finder, Bayut, and Dubizzle with these optimization tips.",
    category: "Integrations",
    date: "May 28, 2024",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    featured: false,
  },
  {
    title: "Building a High-Performing Sales Team",
    excerpt: "Recruitment, training, and incentive structures that work for UAE real estate brokerages.",
    category: "Management",
    date: "May 25, 2024",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: false,
  },
]

export function BlogPage() {
  const featuredPosts = blogPosts.filter(p => p.featured)
  const recentPosts = blogPosts.filter(p => !p.featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            <TypewriterEffectSmooth words={[{ text: "Vzite Blog", className: "text-slate-900" }]} cursorClassName="bg-[#0F4291]" />
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Insights, guides, and market analysis for UAE real estate professionals.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <article
                key={post.title}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <img src={post.imageUrl} alt={post.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="font-semibold" style={{ color: '#0F4291' }}>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0F4291] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                    <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: '#0F4291' }}>
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Articles</h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <article
                key={post.title}
                className="group flex flex-col sm:flex-row gap-4 p-5 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="font-semibold" style={{ color: '#0F4291' }}>{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#0F4291] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{post.excerpt}</p>
                </div>

              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
