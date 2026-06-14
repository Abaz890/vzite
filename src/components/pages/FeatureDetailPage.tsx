import { Check, Globe } from "lucide-react"
import { useEffect, useRef } from "react"
import type { PageData } from "@/lib/page-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/landing/footer"

function IntegrationConnector({ logo, label }: { logo?: string; label: string }) {
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dots = dotsRef.current?.querySelectorAll<HTMLSpanElement>(".dot")
    if (!dots) return
    let frame: number
    let t = 0
    const animate = () => {
      t += 0.04
      dots.forEach((dot, i) => {
        const offset = i * (Math.PI * 2 / dots.length)
        const scale = 0.5 + 0.5 * Math.sin(t - offset)
        dot.style.opacity = String(0.25 + 0.75 * scale)
        dot.style.transform = `scale(${0.7 + 0.5 * scale})`
      })
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {/* Vzite logo */}
      <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center p-2 flex-shrink-0">
        <img src="/logo.jpeg" alt="Vzite" className="w-full h-full object-contain" />
      </div>

      {/* Animated dots */}
      <div ref={dotsRef} className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} className="dot block w-2.5 h-2.5 rounded-full bg-teal-500" />
        ))}
      </div>

      {/* Integration logo */}
      <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center p-2 flex-shrink-0">
        {logo ? (
          <img src={logo} alt={label} className="w-full h-full object-contain" />
        ) : (
          <Globe className="w-9 h-9 text-teal-500" />
        )}
      </div>
    </div>
  )
}

function sectionImage(page: PageData, idx: number): string {
  const seed = `${page.id}-${idx}-${page.sections[idx].title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  return `https://picsum.photos/seed/${seed}/800/600`
}

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
          {/* Integration connector */}
          {page.category === "integrations" && (
            <IntegrationConnector logo={page.logo} label={page.label} />
          )}
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

                {/* Stat Card or Image */}
                <div className={sectionIdx % 2 === 1 ? "lg:order-1" : ""}>
                  {section.stat ? (
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-100">
                      <div className="text-5xl md:text-6xl font-black text-teal-700 mb-2">
                        {section.stat.value}
                      </div>
                      <div className="text-lg text-slate-600">{section.stat.label}</div>
                    </div>
                  ) : page.category === "integrations" && page.logo ? (
                    <div className="rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center h-72 md:h-96">
                      <img src={page.logo} alt={page.label} className="w-40 h-40 object-contain" />
                    </div>
                  ) : (
                    <div className="rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 shadow-sm">
                      <img
                        src={section.image || sectionImage(page, sectionIdx)}
                        alt={section.title}
                        className="w-full h-72 md:h-96 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
