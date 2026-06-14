import { ArrowRight, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { PageData } from "@/lib/page-data"

interface SectionOverviewPageProps {
  title: string
  subtitle: string
  category: PageData["category"]
  pages: PageData[]
  onBack: () => void
}

export function SectionOverviewPage({
  title,
  subtitle,
  category,
  pages,
  onBack,
}: SectionOverviewPageProps) {
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

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {category === "integrations" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {pages.map((page) => {
                const Icon = page.icon
                return (
                  <Link
                    key={page.id}
                    to={`/${category}/${page.id}`}
                    className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                      <Icon className={cn("w-5 h-5", page.color || "text-slate-600")} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors">
                      {page.label}
                    </h3>
                    <p className="text-sm text-slate-500">{page.desc}</p>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => {
                const Icon = page.icon
                return (
                  <Link
                    key={page.id}
                    to={`/${category}/${page.id}`}
                    className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        category === "features" ? "bg-teal-100" : "bg-slate-100"
                      )}>
                        <Icon className={cn("w-6 h-6", page.color || "text-slate-600")} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {page.label}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">{page.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                        Learn more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 pb-20 px-4 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            See the Full Platform in Action
          </h2>
          <p className="text-slate-500 mb-8 text-lg">
            Get a personalized demo and see how Vzite can transform your brokerage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 bg-slate-900 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-slate-800 transition-all"
            >
              Get Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-base transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
