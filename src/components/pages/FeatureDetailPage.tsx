import { ArrowRight, Check } from "lucide-react"
import type { PageData } from "@/lib/page-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/landing/footer"

interface FeatureDetailPageProps {
  page: PageData
}

export function FeatureDetailPage({ page }: FeatureDetailPageProps) {
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

      {/* Hero Section */}
      <section className="relative z-10 pt-8 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
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
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
                      <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-slate-900 rounded-3xl p-10 md:p-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get Started with {page.label}
            </h2>
            <p className="text-slate-400 mb-8 text-lg">
              Book a demo to see {page.label.toLowerCase()} in action.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-2.5 bg-white text-slate-900 font-bold text-base px-8 py-4 rounded-full hover:bg-slate-100 transition-all"
              >
                Book Your Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-semibold text-base transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
