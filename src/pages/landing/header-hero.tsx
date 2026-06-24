import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { TypewriterEffectSmooth } from "@/pages/ui/typewriter-effect"
import { Navigation } from "@/pages/navigation"

const words = [
  { text: "all", className: "text-blue-600" },
  { text: "your", className: "text-blue-600" },
  { text: "agents", className: "text-blue-600" },
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

          <h1 className="animate-fade-up-delay text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight mb-6 flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4">
            <span>CRM: choose the essential tool</span>
            <span className="inline-flex items-center gap-x-3 md:gap-x-4 whitespace-nowrap">
              for <TypewriterEffectSmooth words={words} cursorClassName="bg-blue-500" />
            </span>
          </h1>

          <p className="animate-fade-up-delay2 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            With Vzite, centralize all your operations to efficiently manage your files and insurance products.
          </p>

          <div className="animate-fade-up-delay2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 bg-slate-900 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-slate-800 hover:scale-[1.03] transition-all"
            >
              Contact With Expert
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 text-slate-500 hover:text-slate-800 font-semibold text-base transition-colors"
            >
              Learn More
            </Link>
          </div>

          <div className="animate-fade-up-delay2 mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: "5 Hours", label: "Time saved per employee per week" },
              { value: "5 Minutes", label: "Installation time required" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wider max-w-[200px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
