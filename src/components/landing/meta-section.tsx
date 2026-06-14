import { ArrowUpRight, Target, Zap, Users, BarChart3, DollarSign } from "lucide-react"

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

export function MetaSection() {
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: CRM dashboard image with floating badges */}
          <div className="relative lg:col-span-7 order-2 lg:order-1 py-16 px-8">
            <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl" />

            <img
              src="/crm-realestate.png"
              alt="CRM Real Estate Dashboard"
              className="w-full h-auto rounded-2xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative z-10 border border-slate-200/50"
            />

            {/* Top-left: leads badge */}
            <div className="absolute -top-4 -left-2 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">New leads today</div>
                <div className="text-lg font-black text-slate-900 leading-none">+47 <span className="text-xs font-semibold text-emerald-500">↑ 12%</span></div>
              </div>
            </div>

            {/* Top-right: sync badge */}
            <div className="absolute -top-4 -right-2 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <div className="text-[11px] font-bold text-slate-700">Meta Sync</div>
              <div className="text-[10px] text-slate-400">Live · 2s ago</div>
            </div>

            {/* Middle-left: cost per lead */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-2 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3">
              <div className="text-[11px] text-slate-400 font-medium mb-0.5">Cost per Lead</div>
              <div className="text-xl font-black text-slate-900">$4.20</div>
              <div className="text-[10px] text-emerald-500 font-semibold">↓ 31% vs last month</div>
            </div>

            {/* Middle-right: closed deals */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Closed This Month</div>
                <div className="text-base font-black text-slate-900 leading-none">14 deals</div>
              </div>
            </div>

            {/* Bottom-left: ROI badge */}
            <div className="absolute -bottom-4 left-4 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3">
              <div className="text-[11px] text-slate-400 font-medium mb-0.5">Avg. ROI on Ad Spend</div>
              <div className="text-xl font-black text-slate-900">8.4×</div>
              <div className="text-[10px] text-emerald-500 font-semibold">across active campaigns</div>
            </div>

            {/* Bottom-right: pipeline badge */}
            <div className="absolute -bottom-4 right-4 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Pipeline Value</div>
                <div className="text-base font-black text-slate-900 leading-none">$2.1M</div>
              </div>
            </div>
          </div>

          {/* Right: marketing copy */}
          <div className="lg:col-span-5 order-1 lg:order-2">
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
