import { Building2, Target, Zap, Search, Home } from "lucide-react"

// SVG brand icons
const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12.07h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12.07h2.773l-.443 2.89h-2.33v6.988C20.343 21.128 24 16.991 24 12.073z"/>
  </svg>
)

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-pink-500">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const TkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-700">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.18 8.18 0 004.78 1.52V7.13a4.84 4.84 0 01-1.01-.44z"/>
  </svg>
)

const platforms = [
  { iconComp: () => <Search className="w-5 h-5 text-red-500" />, label: "Property Finder" },
  { iconComp: () => <Home className="w-5 h-5 text-orange-500" />, label: "Bayut" },
  { iconComp: () => <Building2 className="w-5 h-5 text-green-500" />, label: "Dubizzle" },
  { iconComp: FbIcon, label: "Facebook" },
  { iconComp: IgIcon, label: "Instagram" },
  { iconComp: () => <Target className="w-5 h-5 text-blue-500" />, label: "Meta Ads" },
  { iconComp: TkIcon, label: "TikTok" },
  { iconComp: () => <Zap className="w-5 h-5 text-orange-400" />, label: "Zapier" },
]

export function LogoTicker() {
  const doubled = [...platforms, ...platforms]

  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="mb-5 text-center">
        <p className="text-sm font-bold text-slate-900 uppercase tracking-[0.15em]">
          Seamlessly Connected With
        </p>
        <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto rounded-full" />
      </div>

      <div className="ticker-pause relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-infinite-scroll flex gap-0 whitespace-nowrap will-change-transform">
          {doubled.map((item, i) => (
            <TickerItem key={i} iconComp={item.iconComp} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TickerItem({
  iconComp: Icon,
  label,
}: {
  iconComp: React.ComponentType
  label: string
}) {
  return (
    <div className="inline-flex items-center gap-3 mx-10 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default group">
      <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-slate-100 flex items-center justify-center transition-colors border border-slate-100">
        <Icon />
      </div>
      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
