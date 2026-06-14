import { ArrowRight } from "lucide-react"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { Navigation } from "@/components/navigation"

const words = [
  { text: "Native", className: "text-blue-500" },
  { text: "Meta", className: "text-blue-500" },
  { text: "Integration", className: "text-blue-500" },
]

interface HeaderHeroProps {
  onLoginClick?: () => void
}

export function HeaderHero({ onLoginClick }: HeaderHeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col bg-white">
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
      <Navigation onLoginClick={onLoginClick} />

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-up flex items-center justify-center gap-2 text-slate-400 text-sm font-medium mb-6">
            Most Powerful Real Estate CRM
          </div>

          <h1 className="animate-fade-up-delay text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight mb-6">
            The Real Estate CRM Built for UAE
            <br />
            Brokerages with{" "}
            <span className="inline-flex items-center">
              <TypewriterEffectSmooth words={words} cursorClassName="bg-blue-500" />
            </span>
          </h1>

          <p className="animate-fade-up-delay2 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Instant lead distribution from Meta, automatic syncing with Property Finder, Bayut & Dubizzle, and advanced tools built for managing international investors in the UAE.
          </p>

          <div className="animate-fade-up-delay2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 bg-slate-900 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-slate-800 hover:scale-[1.03] transition-all"
            >
              Start Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-slate-500 hover:text-slate-800 font-semibold text-base transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <div className="w-0 h-0 border-l-[10px] border-l-slate-700 border-y-[6px] border-y-transparent ml-0.5" />
              </div>
              Watch Product Tour
            </a>
          </div>

          <div className="animate-fade-up-delay2 mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: "500+", label: "UAE Brokerages" },
              { value: "2M+", label: "Leads Managed" },
              { value: "98%", label: "Customer Retention" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
