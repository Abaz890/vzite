import { TrendingUp, CheckCircle2, ArrowRight, Zap, Clock, Users, BarChart3, Shield, Target } from "lucide-react"

const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-blue-500">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12.07h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12.07h2.773l-.443 2.89h-2.33v6.988C20.343 21.128 24 16.991 24 12.073z"/>
  </svg>
)

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-pink-500">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export function BentoSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Your Entire Business In One Screen</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Every Tool You Need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-teal-500 to-emerald-500">
              Beautifully Unified
            </span>
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            From the moment a Meta ad fires to the day a deal closes — Vzite connects every touchpoint.
          </p>
        </div>

        {/* Grid — 3 cols, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Card 1 — Live Pipeline (spans 2 cols) */}
          <div className="md:col-span-2 bg-slate-50 rounded-2xl p-6 border border-slate-100 group hover:border-slate-200 transition-colors">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Real-Time Pipeline</p>
                <p className="text-lg font-bold text-slate-900">Live Lead Flow</p>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700">Live</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { stage: "New Leads", count: 24, pct: 100, color: "bg-blue-400" },
                { stage: "Contacted", count: 18, pct: 75, color: "bg-violet-400" },
                { stage: "Viewing Scheduled", count: 11, pct: 46, color: "bg-teal-400" },
                { stage: "Offer Stage", count: 6, pct: 25, color: "bg-emerald-400" },
                { stage: "Closed", count: 3, pct: 12, color: "bg-slate-400" },
              ].map((item) => (
                <div key={item.stage} className="flex items-center gap-3">
                  <div className="w-32 text-xs text-slate-500 font-medium flex-shrink-0">{item.stage}</div>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <div className="w-6 text-right text-xs font-bold text-slate-600">{item.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — Incoming Lead */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Incoming Lead</p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">A</div>
              <div>
                <p className="font-bold text-white text-sm">Ahmed Al Rashidi</p>
                <p className="text-xs text-slate-400 mt-0.5">Dubai Marina · AED 3.2M</p>
              </div>
            </div>
            <div className="flex gap-2 mb-4 flex-wrap">
              <div className="flex items-center gap-1 bg-blue-500/15 px-2 py-1 rounded-full">
                <FbIcon /><span className="text-xs text-blue-300 font-medium">Facebook</span>
              </div>
              <div className="flex items-center gap-1 bg-pink-500/15 px-2 py-1 rounded-full">
                <IgIcon /><span className="text-xs text-pink-300 font-medium">Instagram</span>
              </div>
            </div>
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Budget</span>
                <span className="text-emerald-400 font-bold">AED 2.8M – 3.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned</span>
                <span className="text-white font-medium">Sarah M.</span>
              </div>
            </div>
            <button className="w-full bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5">
              Open Lead <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3 — Portal Sync */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-colors">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Portal Sync</p>
            <p className="text-2xl font-black text-slate-900 mb-1">All Live</p>
            <p className="text-xs text-slate-400 mb-5">3 portals · synced 2m ago</p>
            <div className="space-y-3">
              {[
                { name: "Property Finder", status: "Active", dot: "bg-emerald-500" },
                { name: "Bayut", status: "Active", dot: "bg-emerald-500" },
                { name: "Dubizzle", status: "Syncing", dot: "bg-amber-400" },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">{p.name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                    <span className="text-[10px] font-semibold text-slate-500">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 — Revenue */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">This Month</p>
            <p className="text-2xl font-black text-white mb-0.5">AED 42.6M</p>
            <p className="text-xs text-slate-500 mb-5">Total Transaction Volume</p>
            <div className="flex items-end gap-1 h-12">
              {[40, 65, 45, 80, 55, 90, 70, 100, 75, 88, 95, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-white/15 hover:bg-white/30 rounded-sm transition-all" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">+31% vs last month</span>
            </div>
          </div>

          {/* Card 5 — Agent KPIs */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-colors">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Agent KPIs</p>
            <div className="space-y-4">
              {[
                { name: "Sarah M.", score: 94 },
                { name: "Omar K.", score: 78 },
                { name: "Layla R.", score: 87 },
              ].map((agent) => (
                <div key={agent.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-[10px] font-bold flex-shrink-0">
                    {agent.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-700">{agent.name}</span>
                      <span className="text-xs font-bold text-slate-900">{agent.score}</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-700 rounded-full" style={{ width: `${agent.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { icon: Clock, label: "Lead Response", value: "< 90s", sub: "Average response time" },
            { icon: Zap, label: "Integrations", value: "17+", sub: "Connected platforms" },
            { icon: Users, label: "UAE Brokerages", value: "500+", sub: "Active clients" },
            { icon: Target, label: "Retention", value: "98%", sub: "Customer retention rate" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-slate-200 transition-colors">
              <s.icon className="w-4 h-4 text-slate-400 mb-3" />
              <p className="text-2xl font-black text-slate-900 mb-0.5">{s.value}</p>
              <p className="text-xs text-slate-500">{s.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
