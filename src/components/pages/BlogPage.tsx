import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/landing/footer"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"

const blogPosts = [
  {
    title: "How to Close 30% More Deals with Lead Scoring",
    excerpt: "Learn how top UAE brokerages use Vzite's lead scoring to prioritize hot leads and close more deals in less time.",
    category: "Sales Tips",
    date: "June 10, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    title: "Meta Ads Integration: Complete Guide",
    excerpt: "Step-by-step instructions for connecting your Meta ad campaigns and automating lead capture.",
    category: "Integrations",
    date: "June 8, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    title: "UAE Real Estate Market Report: Q2 2024",
    excerpt: "Our analysis of transaction volumes, price trends, and buyer demographics across Dubai and Abu Dhabi.",
    category: "Market Insights",
    date: "June 5, 2024",
    readTime: "12 min read",
    featured: false,
  },
  {
    title: "5 Ways to Reduce Lead Response Time",
    excerpt: "Speed to lead matters. Here's how leading brokerages are cutting response times to under 5 minutes.",
    category: "Sales Tips",
    date: "June 3, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    title: "Property Portal Sync Best Practices",
    excerpt: "Maximize your listing visibility across Property Finder, Bayut, and Dubizzle with these optimization tips.",
    category: "Integrations",
    date: "May 28, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    title: "Building a High-Performing Sales Team",
    excerpt: "Recruitment, training, and incentive structures that work for UAE real estate brokerages.",
    category: "Management",
    date: "May 25, 2024",
    readTime: "10 min read",
    featured: false,
  },
]

const categories = ["All Posts", "Sales Tips", "Integrations", "Market Insights", "Management"]

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
            <TypewriterEffectSmooth words={[{ text: "Vzite Blog", className: "text-slate-900" }]} cursorClassName="bg-teal-500" />
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Insights, guides, and market analysis for UAE real estate professionals.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="relative z-10 pb-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === "All Posts"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <article
                key={post.title}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-teal-600">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                    <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 group-hover:gap-2 transition-all">
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
                    <span className="font-semibold text-teal-600">{post.category}</span>
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
                  <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{post.excerpt}</p>
                </div>
                <a href="#" className="flex-shrink-0 self-center text-sm font-semibold text-teal-600">
                  Read →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 text-center border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Stay Updated</h2>
            <p className="text-slate-500 mb-6">Get the latest articles and market insights delivered to your inbox weekly.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
