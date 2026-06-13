import { TrendingUp, CheckCircle2, ArrowRight, Users, Zap, BarChart3, MapPin } from "lucide-react"

// Facebook and Instagram icon substitutes
const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-blue-400">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12.07h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12.07h2.773l-.443 2.89h-2.33v6.988C20.343 21.128 24 16.991 24 12.073z"/>
  </svg>
)

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-pink-400">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export function BentoSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-teal-100">
            <Zap className="w-3.5 h-3.5" />
            Your Entire Business In One Screen
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-5">
            Every Tool You Need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
              Beautifully Unified
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From the moment a Meta ad fires to the day a deal closes — Vzite connects every touchpoint in your brokerage.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">

          {/* Card 1 - Large: Live Lead Pipeline */}
          <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Real-Time Pipeline</div>
                <div className="text-xl font-bold text-slate-900">Live Lead Flow</div>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Live</span>
              </div>
            </div>

            {/* Pipeline stages */}
            <div className="space-y-3">
              {[
                { stage: "New Leads", count: 24, pct: 100, color: "bg-blue-500" },
                { stage: "Contacted", count: 18, pct: 75, color: "bg-teal-500" },
                { stage: "Viewing Scheduled", count: 11, pct: 46, color: "bg-emerald-500" },
                { stage: "Offer Stage", count: 6, pct: 25, color: "bg-violet-500" },
                { stage: "Closed", count: 3, pct: 12, color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.stage} className="flex items-center gap-3">
                  <div className="w-28 text-xs text-slate-500 font-medium flex-shrink-0">{item.stage}</div>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-700 group-hover:opacity-90`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <div className="w-8 text-right text-xs font-bold text-slate-700">{item.count}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 - Lead card with Meta source */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 shadow-sm border border-slate-700 hover:shadow-xl transition-shadow">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Incoming Lead</div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                A
              </div>
              <div>
                <div className="font-bold text-white">Ahmed Al Rashidi</div>
                <div className="text-xs text-slate-400 mt-0.5">Dubai Marina · AED 3.2M</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/30 px-2.5 py-1.5 rounded-full">
                <FbIcon />
                <span className="text-xs text-blue-300 font-medium">Facebook Ad</span>
              </div>
              <div className="flex items-center gap-1.5 bg-pink-500/20 border border-pink-500/30 px-2.5 py-1.5 rounded-full">
                <IgIcon />
                <span className="text-xs text-pink-300 font-medium">Instagram</span>
              </div>
            </div>

            <div className="space-y-2.5 mb-5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Interest</span>
                <span className="text-white font-medium">2BR Apartment</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Budget</span>
                <span className="text-emerald-400 font-bold">AED 2.8M – 3.5M</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Assigned To</span>
                <span className="text-white font-medium">Sarah M.</span>
              </div>
            </div>

            <button className="w-full bg-teal-500 hover:bg-teal-400 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              Open Lead <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 - Portal sync status */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Portal Sync</div>
            <div className="text-2xl font-black text-slate-900 mb-1">All Live</div>
            <div className="text-xs text-slate-400 mb-5">3 portals · synced 2m ago</div>
            <div className="space-y-3">
              {[
                { name: "Property Finder", status: "Active", color: "text-emerald-600", bg: "bg-emerald-50" },
                { name: "Bayut", status: "Active", color: "text-emerald-600", bg: "bg-emerald-50" },
                { name: "Dubizzle", status: "Syncing", color: "text-amber-600", bg: "bg-amber-50" },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">{p.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.bg} ${p.color}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 - Wide: Mini chart */}
          <div className="md:col-span-2 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow text-white">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs font-semibold text-teal-200 uppercase tracking-wider mb-1">This Month</div>
                <div className="text-2xl font-black">AED 42.6M</div>
                <div className="text-sm text-teal-200 mt-1">Total Transaction Volume</div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-teal-100" />
                <span className="text-xs font-bold">+31%</span>
              </div>
            </div>

            {/* Mini bar chart */}
            <div className="flex items-end gap-1.5 h-16">
              {[40, 65, 45, 80, 55, 90, 70, 100, 75, 88, 95, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/25 hover:bg-white/40 rounded-t-sm transition-all"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Card 5 - WhatsApp preview */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Share via WhatsApp</div>
            <div className="bg-[#ECF8F1] rounded-xl p-3 mb-4">
              <div className="text-[11px] font-bold text-slate-700 mb-1">Marina Residences · Unit 4B</div>
              <div className="text-[10px] text-slate-500 mb-2">2BR · 1,250 sqft · Sea View</div>
              <div className="text-sm font-black text-emerald-700">AED 2,850,000</div>
              <div className="mt-2 flex gap-1">
                <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Ready</span>
                <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Verified</span>
              </div>
            </div>
            <button className="w-full bg-[#25D366] hover:bg-[#1ebe59] text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
              Share Instantly
            </button>
          </div>

          {/* Card 6 - KPI widget */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Agent KPIs</div>
            <div className="space-y-4">
              {[
                { name: "Sarah M.", deals: 7, score: 94 },
                { name: "Omar K.", deals: 5, score: 78 },
                { name: "Layla R.", deals: 6, score: 87 },
              ].map((agent) => (
                <div key={agent.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {agent.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-700 truncate">{agent.name}</span>
                      <span className="text-xs font-bold text-teal-600">{agent.score}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full" style={{ width: `${agent.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 7 - Map view teaser */}
          <div className="md:col-span-2 lg:col-span-3 bg-slate-900 rounded-3xl overflow-hidden relative shadow-sm hover:shadow-xl transition-shadow" style={{ minHeight: 200 }}>
            {/* Fake map grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-900/50 to-slate-900/80" />

            {/* Map pins */}
            {[
              { top: "30%", left: "20%", price: "AED 2.1M", active: true },
              { top: "50%", left: "45%", price: "AED 3.8M", active: false },
              { top: "25%", left: "65%", price: "AED 1.9M", active: true },
              { top: "65%", left: "75%", price: "AED 5.2M", active: false },
              { top: "70%", left: "30%", price: "AED 4.1M", active: true },
            ].map((pin, i) => (
              <div key={i} className="absolute" style={{ top: pin.top, left: pin.left }}>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold shadow-lg ${pin.active ? "bg-teal-500 text-white" : "bg-white text-slate-800"}`}>
                  <MapPin className="w-2.5 h-2.5" />
                  {pin.price}
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 left-4">
              <div className="text-xs font-semibold text-white/60 mb-1">Map View</div>
              <div className="text-lg font-black text-white">Visual Property Search</div>
              <div className="text-xs text-teal-300 mt-1 flex items-center gap-1">
                <Users className="w-3 h-3" />
                148 active listings in Dubai
              </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-semibold text-white flex items-center gap-1.5">
                <BarChart3 className="w-3 h-3 text-teal-400" />
                Heat Map On
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
