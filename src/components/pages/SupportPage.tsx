import { BookOpen, MessageCircle, Video, Headphones, ChevronRight, Search } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/landing/footer"

const helpCategories = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Detailed guides and API references",
    articles: 124,
    color: "text-teal-600 bg-teal-50",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs",
    articles: 48,
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "Connect with other Vzite users",
    articles: 892,
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: Headphones,
    title: "Live Support",
    description: "Chat with our support team",
    articles: null,
    color: "text-emerald-600 bg-emerald-50",
  },
]

const popularArticles = [
  { title: "Getting Started with Vzite", category: "Basics", time: "5 min read" },
  { title: "Connecting Property Portals", category: "Integrations", time: "8 min read" },
  { title: "Setting Up Lead Distribution", category: "Lead Management", time: "6 min read" },
  { title: "Meta Ads Integration Guide", category: "Integrations", time: "10 min read" },
  { title: "Creating Custom Fields", category: "Customization", time: "4 min read" },
  { title: "Managing User Permissions", category: "Administration", time: "7 min read" },
]

export function SupportPage() {
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
            How Can We Help?
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers, learn Vzite inside out, or reach out to our support team.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search help articles, tutorials, FAQs..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-teal-500 text-sm shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpCategories.map((cat) => (
              <a
                key={cat.title}
                href="#"
                className="group p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{cat.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
                {cat.articles && (
                  <div className="text-xs text-slate-400 mt-3">{cat.articles} articles</div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Popular Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article) => (
              <a
                key={article.title}
                href="#"
                className="group flex items-center justify-between p-5 bg-white rounded-xl border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all"
              >
                <div>
                  <div className="text-xs font-semibold text-teal-600 mb-1">{article.category}</div>
                  <div className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {article.title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{article.time}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Still Need Help?
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  Our support team is available 24/7. Submit a ticket and we'll respond within 4 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Start Live Chat
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all"
                  >
                    Submit Ticket
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Average Response</div>
                  <div className="text-white font-bold text-lg">Under 4 hours</div>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Customer Satisfaction</div>
                  <div className="text-white font-bold text-lg">98.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
