import { ArrowRight, ArrowLeft, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { PageData } from "@/lib/page-data"

interface FeatureDetailPageProps {
  page: PageData
  relatedPages: PageData[]
  onBack: () => void
}

export function FeatureDetailPage({ page, relatedPages, onBack }: FeatureDetailPageProps) {
  const Icon = page.icon

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

      {/* Header */}
      <div className="relative z-10 px-4 pt-5">
        <nav className="mx-auto max-w-7xl bg-white rounded-full px-6 py-3 shadow-lg flex items-center justify-between gap-4 border border-slate-200">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-black text-slate-900 text-xl tracking-tighter">VZITE</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
              Login
            </button>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-sm font-bold px-5 py-2 rounded-full transition-all hover:bg-slate-800"
            >
              Get Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
            <Icon className={cn("w-4 h-4", page.color || "text-slate-600")} />
            {page.category === "integrations" ? "Integration" : page.category.slice(0, -1)}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            {page.heroTitle || page.label}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            {page.heroSubtitle || page.desc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {page.sections.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-16 last:mb-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className={sectionIdx % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-lg text-slate-500 leading-relaxed mb-8">
                    {section.description}
                  </p>

                  {/* Features List */}
                  {section.features && (
                    <ul className="space-y-4">
                      {section.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-teal-600" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900">{feature.title}</span>
                            <span className="text-slate-500"> — {feature.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Stat Card */}
                <div className={sectionIdx % 2 === 1 ? "lg:order-1" : ""}>
                  {section.stat ? (
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-100">
                      <div className="text-5xl md:text-6xl font-black text-teal-700 mb-2">
                        {section.stat.value}
                      </div>
                      <div className="text-lg text-slate-600">{section.stat.label}</div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                      <Icon className={cn("w-16 h-16", page.color || "text-slate-400")} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {(page.cta?.primary || page.cta?.secondary) && (
        <section className="relative z-10 pb-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-slate-900 rounded-3xl p-10 md:p-14">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Transform Your {page.category === "integrations" ? "Integrations" : "Operations"}?
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                See how Vzite's {page.label.toLowerCase()} can help your brokerage close more deals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {page.cta?.primary && (
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2.5 bg-white text-slate-900 font-bold text-base px-8 py-4 rounded-full hover:bg-slate-100 transition-all"
                  >
                    {page.cta.primary}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                {page.cta?.secondary && (
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-base transition-colors"
                  >
                    {page.cta.secondary}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Pages */}
      {relatedPages.length > 0 && (
        <section className="relative z-10 pb-20 px-4 border-t border-slate-100">
          <div className="max-w-7xl mx-auto pt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900">
                More {page.category.charAt(0).toUpperCase() + page.category.slice(1)}
              </h3>
              <button onClick={onBack} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                View all →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPages.slice(0, 3).map((relatedPage) => {
                const RelatedIcon = relatedPage.icon
                return (
                  <Link
                    key={relatedPage.id}
                    to={`/${relatedPage.category}/${relatedPage.id}`}
                    className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                      <RelatedIcon className={cn("w-5 h-5", relatedPage.color || "text-slate-600")} />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors">
                      {relatedPage.label}
                    </h4>
                    <p className="text-sm text-slate-500">{relatedPage.desc}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
