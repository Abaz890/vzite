import { Building2, Share2, Smartphone, CheckCircle2, ArrowRight, Globe, DollarSign, FileText, BarChart3 } from "lucide-react"

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

const projects = [
  { name: "Marina Crest Tower", developer: "Emaar", price: "AED 1,890,000", handover: "Q3 2026", type: "Luxury Residences" },
  { name: "Safa Heights", developer: "Nakheel", price: "AED 2,450,000", handover: "Q1 2027", type: "Premium Apartments" },
  { name: "Palm Jumeirah Villas", developer: "DAMAC", price: "AED 8,900,000", handover: "Q4 2026", type: "Exclusive Villas" },
  { name: "Creek Harbour Tower", developer: "Emaar", price: "AED 3,200,000", handover: "Q2 2027", type: "Waterfront Living" },
  { name: "Business Bay Lofts", developer: "Sobha", price: "AED 1,650,000", handover: "Q3 2027", type: "Modern Lofts" },
  { name: "Al Furjan Townhouses", developer: "Nakheel", price: "AED 2,100,000", handover: "Q1 2027", type: "Family Homes" },
]

export function OffPlanSection() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-4">Off-Plan Project Suite</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4">
            <span className="text-slate-900">Present Dubai's Finest{" "}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
              Off-Plan Projects
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Built for the international buyer era — showcase Emaar, Nakheel, and DAMAC projects to investors anywhere in the world.
          </p>
        </div>

        {/* Feature grid - 2x3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                <f.icon className="w-5 h-5" />
              </div>
              <div className="text-base font-bold text-slate-900 mb-1.5">{f.title}</div>
              <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

          <div className="text-center mb-12">
          <a
            href="#"
            className="inline-flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base px-8 py-4 rounded-full transition-all"
          >
            Explore Off-Plan Tools
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
