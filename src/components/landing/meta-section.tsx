import { useState, useEffect } from "react"
import { TrendingUp, ArrowUpRight, CheckCircle2, Target, Zap, Shield, Users, BarChart3, DollarSign } from "lucide-react"

const FbIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-3.5 h-3.5 text-blue-400"}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12.07h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12.07h2.773l-.443 2.89h-2.33v6.988C20.343 21.128 24 16.991 24 12.073z"/>
  </svg>
)

const IgIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-3 h-3 text-pink-400"}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const leads = [
  { name: "Fatima Al Hassan", source: "fb", budget: "AED 4.2M", time: "2s ago", status: "new" },
  { name: "James Patterson", source: "ig", budget: "AED 1.9M", time: "18s ago", status: "assigned" },
  { name: "Wei Chen", source: "fb", budget: "AED 8.5M", time: "1m ago", status: "contacted" },
  { name: "Aisha Mohammed", source: "ig", budget: "AED 2.8M", time: "3m ago", status: "viewing" },
]

export function MetaSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveIndex(i => (i + 1) % leads.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section badge */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Meta Integration Engine</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4">
            Turn Ad Spend Into Revenue
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Vzite's native Meta integration closes the attribution loop — your campaigns learn from closed deals, not just clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: interactive UI visualization */}
          <div className="relative">
            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center">
                    <FbIcon className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-sm font-semibold text-white">Meta Lead Stream</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-300">LIVE</span>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                {leads.map((lead, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 ${
                      i === activeIndex ? "bg-white/10 border border-white/10" : "bg-white/5"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {lead.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white truncate">{lead.name}</span>
                        {lead.source === "fb" ? (
                          <FbIcon className="w-3 h-3 text-blue-400 flex-shrink-0" />
                        ) : (
                          <IgIcon className="w-3 h-3 text-pink-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-[10px] text-emerald-400 font-bold">{lead.budget}</span>
                        <span className="text-[9px] text-slate-500">{lead.time}</span>
                      </div>
                    </div>
                    <StatusBadge status={lead.status} />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Conversions API Active</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Server-to-server · 100% lead capture · No pixel dependency</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto flex-shrink-0" />
              </div>
            </div>

            <div className="absolute -right-4 top-8 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 hidden md:block">
              <div className="text-xs text-slate-400 mb-1">Cost Per Lead</div>
              <div className="text-2xl font-black text-emerald-600">AED 12</div>
              <div className="flex items-center gap-1 text-xs text-emerald-500 font-semibold mt-1">
                <ArrowUpRight className="w-3 h-3" /> 41% lower
              </div>
            </div>

            <div className="absolute -left-4 bottom-8 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 hidden md:block">
              <div className="text-xs text-slate-400 mb-1">ROAS This Month</div>
              <div className="text-2xl font-black text-blue-600">3.4×</div>
              <div className="flex items-center gap-1 text-xs text-blue-500 font-semibold mt-1">
                <TrendingUp className="w-3 h-3" /> Meta Optimized
              </div>
            </div>
          </div>

          {/* Right: marketing copy */}
          <div>
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: Zap,
                  title: "Instant Lead Capture",
                  desc: "Every Facebook & Instagram lead form submission lands in your CRM in under 3 seconds via our server-to-server Conversions API.",
                  color: "bg-yellow-50 text-yellow-600",
                },
                {
                  icon: Target,
                  title: "Pipeline Stage Mapping",
                  desc: "Map CRM stages — Contacted, Viewing, Offer, Closed — back to Meta as conversion events. Your campaigns optimize on revenue, not vanity.",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: Users,
                  title: "Custom Lookalike Audiences",
                  desc: "Automatically sync your best-performing buyer profiles back to Meta to generate high-intent lookalike audiences for the next campaign.",
                  color: "bg-violet-50 text-violet-600",
                },
                {
                  icon: BarChart3,
                  title: "Real-Time Attribution",
                  desc: "See exactly which campaigns, ads, and audiences drive closed deals. Close the loop from impression to commission.",
                  color: "bg-teal-50 text-teal-600",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 mb-1">{item.title}</div>
                    <div className="text-sm text-slate-500 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-4 rounded-full transition-all"
              >
                See Meta Integration in Action
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold text-sm px-7 py-4 rounded-full hover:bg-slate-50 transition-all"
              >
                <DollarSign className="w-4 h-4" />
                Calculate Your ROI
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    assigned: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    contacted: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    viewing: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  }
  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border capitalize flex-shrink-0 ${map[status] ?? ""}`}>
      {status}
    </span>
  )
}
