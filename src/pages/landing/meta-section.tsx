import { Link } from "react-router-dom"
import { ArrowUpRight, Target, Zap, Users, BarChart3, DollarSign } from "lucide-react"
import { getAssetUrl } from "@/lib/utils"


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
              src={getAssetUrl("/crm-realestate.png")}
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
                <div className="text-xl font-black text-slate-900">+47 <span className="text-xs font-semibold" style={{ color: '#0F4291' }}>↑ 12%</span></div>
              </div>
            </div>

            {/* Top-right: sync badge */}
            <div className="absolute -top-4 -right-2 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: '#0F4291' }} />
              <div className="text-[11px] font-bold text-slate-700">Meta Sync</div>
              <div className="text-[10px] text-slate-400">Live · 2s ago</div>
            </div>

            {/* Middle-left: cost per lead */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-2 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3">
              <div className="text-[11px] text-slate-400 font-medium mb-0.5">Cost per Lead</div>
              <div className="text-xl font-black text-slate-900">$4.20</div>
              <div className="text-[10px] font-semibold" style={{ color: '#0F4291' }}>↓ 31% vs last month</div>
            </div>

            {/* Middle-right: closed deals */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 z-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e8f0fc' }}>
                <Target className="w-4 h-4" style={{ color: '#0F4291' }} />
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
              <div className="text-[10px] font-semibold" style={{ color: '#0F4291' }}>across active campaigns</div>
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
                  color: "bg-blue-50 text-[#0F4291]",
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
              <Link
                to="/integrations/meta-ads"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-4 rounded-full transition-all"
              >
                See Meta Integration in Action
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/integrations/meta-ads"
                className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold text-sm px-7 py-4 rounded-full hover:bg-slate-50 transition-all"
              >
                <DollarSign className="w-4 h-4" />
                Calculate Your ROI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

