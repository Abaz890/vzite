import { Check, Globe } from "lucide-react"
import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
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
      <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center p-2 flex-shrink-0">
        <img src="/logo.jpeg" alt="Vzite" className="w-full h-full object-contain" />
      </div>
      <div ref={dotsRef} className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map(i => (
          <span key={i} className="dot block w-2.5 h-2.5 rounded-full bg-teal-500" />
        ))}
      </div>
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

const featureScreenshots: Record<string, string> = {
  "lead-management": "/leads.png",
  "listing-management": "/listing-management.png",
  "owners-management": "/owner-management.png",
  "offplan-projects": "/off-plan.png",
  "map-view": "/off-plan.png",
  "transactions-commissions": "/transactions.png",
  "calendar": "/calendar.png",
  "vzite-database": "/database-1.png",
  "database-management": "/database-2.png",
  "workflow-approvals": "/workflow-approvals.png",
  "kpi-insights": "/kpi-insight.png",
  "custom-fields": "/custom-fileds.png",
  "lead-rotation": "/lead-rotation.png",
  "management": "/kpi-insight.png",
  "sales": "/leads.png",
  "marketing": "/marketing.png",
  "admins-operations": "/workflow-approvals.png",
  "accounts": "/transactions.png",
  "it": "/database-2.png",
}

interface FeatureDetailPageProps {
  page: PageData
}

export function FeatureDetailPage({ page }: FeatureDetailPageProps) {
  const prefersReducedMotion = useReducedMotion()

  const spring = { type: "spring" as const, damping: 28, stiffness: 110, mass: 1 }

  const anim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : { initial: { opacity: 0, y: 36 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { ...spring, delay } }

  const imgSrc = featureScreenshots[page.id] ?? ""

  // Flatten all features from all sections
  const allFeatures = page.sections.flatMap(s => s.features ?? [])

  // Build section summaries (title + description only, no stats)
  const sectionSummaries = page.sections.map(s => ({ title: s.title, description: s.description }))

  return (
    <div className="min-h-screen bg-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <Navigation />

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {page.category === "integrations" && (
            <IntegrationConnector logo={page.logo} label={page.label} />
          )}
          <motion.h1
            {...anim(0.1)}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6"
          >
            {page.heroTitle || page.label}
          </motion.h1>
          <motion.p
            {...anim(0.25)}
            className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            {page.heroSubtitle || page.desc}
          </motion.p>
        </div>
      </section>

      {/* Single Big Screenshot — same proportions as FeaturesCarousel cards */}
      {imgSrc && (
        <section className="relative z-10 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              {...anim(0.35)}
              className="rounded-[2rem] overflow-hidden border border-slate-200/50 shadow-[0_24px_64px_rgba(0,0,0,0.12)] relative group"
            >
              {/* Browser chrome */}
              <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-1.5 flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <img
                src={imgSrc}
                alt={page.label}
                className="w-full h-auto block"
                loading="eager"
              />
              {/* Subtle gradient at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </section>
      )}

      {/* Section overviews */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionSummaries.map((s, i) => (
              <motion.div
                key={i}
                {...anim(0.1 * i)}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50/40 hover:border-teal-200 hover:bg-teal-50/30 transition-colors duration-300"
              >
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      {allFeatures.length > 0 && (
        <section className="relative z-10 pb-28 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.p
              {...anim(0)}
              className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8"
            >
              What's included
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  {...anim(0.05 * idx)}
                  className="flex items-start gap-3 p-5 rounded-2xl border border-slate-100 bg-white hover:shadow-md hover:border-teal-100 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">{feature.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
