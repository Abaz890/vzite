import { Building2, Share2, Smartphone, CheckCircle2, ArrowRight, Globe, DollarSign, FileText } from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "Developer Inventory",
    desc: "Live unit availability from Emaar, Nakheel, DAMAC, Sobha, and 50+ developers updated daily.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: FileText,
    title: "Instant Brochure Gen",
    desc: "Create polished, branded PDF presentations in one click. Custom logos, agent details, payment plans included.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Share2,
    title: "WhatsApp Link Sharing",
    desc: "Generate trackable, mobile-optimized property links. Know exactly who opened it and when.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Globe,
    title: "Multi-Currency Support",
    desc: "AED, USD, EUR, GBP, RUB — automatic conversion for international investors with live rates.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: DollarSign,
    title: "Payment Plan Calculator",
    desc: "Interactive post-handover and instalment calculators built into every listing card.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Presentations",
    desc: "Present on your phone to walk-in clients or overseas buyers on video call — no laptop required.",
    color: "bg-rose-50 text-rose-600",
  },
]

export function OffPlanSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy + features */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-emerald-100">
              <Building2 className="w-3.5 h-3.5" />
              Off-Plan Project Suite
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Pitch Dubai's Best
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Off-Plan Projects
              </span>
              <br />
              Anywhere in the World
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              Built for the international buyer era — present Emaar, Nakheel, and DAMAC projects to investors in Moscow, London, or Mumbai with the confidence of a fully prepared agent.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}>
                    <f.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 mb-0.5">{f.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm px-7 py-4 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
            >
              Explore Off-Plan Tools
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right: Mobile mockup */}
          <div className="relative flex items-center justify-center">
            {/* Glow */}
            <div className="absolute w-80 h-80 rounded-full bg-emerald-400/20 blur-[60px]" />

            {/* Phone frame */}
            <div className="relative w-64 bg-slate-900 rounded-[40px] p-2 shadow-2xl shadow-slate-900/50 ring-1 ring-white/10">
              <div className="bg-slate-800 rounded-[34px] overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-6 py-3">
                  <div className="text-[10px] text-white/60 font-semibold">9:41</div>
                  <div className="w-20 h-4 bg-slate-900 rounded-full" />
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-white/40 rounded-sm" />
                    <div className="w-1 h-2 bg-white/40 rounded-sm" />
                  </div>
                </div>

                {/* Property image */}
                <div className="relative">
                  <img src="/feature-offplan.webp" alt="Off-plan" className="w-full h-36 object-cover" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black text-slate-900">Marina Crest Tower</div>
                        <div className="text-[9px] text-emerald-600 font-bold">Q3 2026 Handover · Emaar</div>
                      </div>
                      <div className="bg-emerald-100 rounded-lg px-2 py-1">
                        <div className="text-[9px] font-black text-emerald-700">AVAIL</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-[9px] text-slate-400">Starting from</div>
                      <div className="text-base font-black text-white">AED 1,890,000</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-slate-400">Down Payment</div>
                      <div className="text-sm font-black text-emerald-400">10%</div>
                    </div>
                  </div>

                  {/* Unit types */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {["Studio", "1BR", "2BR"].map((t, i) => (
                      <div key={t} className={`text-center py-1.5 rounded-lg text-[9px] font-bold ${i === 1 ? "bg-teal-500 text-white" : "bg-white/10 text-white/60"}`}>
                        {t}
                      </div>
                    ))}
                  </div>

                  {/* Share row */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#25D366] text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1">
                      <Share2 className="w-3 h-3" /> WhatsApp
                    </button>
                    <button className="flex-1 bg-white/10 text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1">
                      <FileText className="w-3 h-3" /> PDF
                    </button>
                  </div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="flex justify-center py-2">
                <div className="w-24 h-1 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-8 -right-2 md:-right-8 bg-white rounded-2xl shadow-xl p-3.5 border border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Verified Listing</div>
                  <div className="text-[10px] text-slate-400">DLD Approved</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 -left-2 md:-left-10 bg-white rounded-2xl shadow-xl p-3.5 border border-slate-100">
              <div className="text-[10px] text-slate-400 mb-1">Brochure sent to</div>
              <div className="flex -space-x-2">
                {["A", "J", "M", "W"].map((l, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-[8px] font-black ring-2 ring-white">
                    {l}
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[8px] font-bold ring-2 ring-white">+8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
