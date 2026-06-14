import { useState, useRef, useEffect } from "react"
import {
  ChevronDown, ChevronRight, Users, Home, Building2, MapPin,
  Calendar, Database, GitBranch, TrendingUp, Settings,
  SlidersHorizontal, RotateCcw, Briefcase, Megaphone,
  Shield, DollarSign, Monitor, Search, Globe, Phone, Mail,
  BookOpen, Headphones, Zap, AtSign,
  Menu, X, ArrowRight, Video, MessageSquare, RadioTower, Layers,
  Star, FileText, UserCheck, Target,
  Share2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"

type MenuKey = "features" | "solutions" | "integrations" | "company" | null

const featuresItems = [
  { icon: Users, label: "Lead Management", desc: "Capture, qualify & distribute" },
  { icon: Home, label: "Listing Management", desc: "Sync across all portals" },
  { icon: UserCheck, label: "Owners Management", desc: "Build lasting relationships" },
  { icon: Building2, label: "Off-Plan Projects", desc: "Catalog & pitch instantly" },
  { icon: MapPin, label: "Map View", desc: "Geo-visual property search" },
  { icon: DollarSign, label: "Transactions & Commissions", desc: "Full deal lifecycle" },
  { icon: Calendar, label: "Calendar", desc: "Smart scheduling & reminders" },
  { icon: Database, label: "Vzite Database", desc: "Proprietary property data" },
  { icon: Shield, label: "Database Management", desc: "Clean, structured records" },
  { icon: GitBranch, label: "Workflow & Approvals", desc: "Automate any process" },
  { icon: TrendingUp, label: "KPI & Insights", desc: "Real-time performance data" },
  { icon: SlidersHorizontal, label: "Custom Fields", desc: "Tailor your pipeline" },
  { icon: RotateCcw, label: "Lead Rotation", desc: "Intelligent auto-routing" },
]

const solutionsItems = [
  { icon: Briefcase, label: "Management", desc: "Full organizational control" },
  { icon: TrendingUp, label: "Sales", desc: "Close deals faster" },
  { icon: Megaphone, label: "Marketing", desc: "Smarter campaign tools" },
  { icon: Settings, label: "Admins & Operations", desc: "Streamline back-office" },
  { icon: DollarSign, label: "Accounts", desc: "Financial transparency" },
  { icon: Monitor, label: "IT", desc: "Secure infrastructure" },
]

const integrationsItems = [
  { icon: Search, label: "Property Finder", color: "text-red-500" },
  { icon: Home, label: "Bayut", color: "text-orange-500" },
  { icon: Building2, label: "Dubizzle", color: "text-green-500" },
  { icon: Star, label: "JamesEdition", color: "text-yellow-500" },
  { icon: Target, label: "Meta Ads", color: "text-blue-500" },
  { icon: Target, label: "Google Ads", color: "text-red-400" },
  { icon: Calendar, label: "Google Calendar", color: "text-blue-400" },
  { icon: Video, label: "TikTok", color: "text-pink-500" },
  { icon: Zap, label: "Zapier", color: "text-orange-400" },
  { icon: AtSign, label: "LinkedIn", color: "text-blue-600" },
  { icon: Globe, label: "Websites & Landing Pages", color: "text-teal-500" },
  { icon: MessageSquare, label: "ManyChat", color: "text-purple-500" },
  { icon: RadioTower, label: "Property Booster", color: "text-emerald-500" },
  { icon: Phone, label: "BrightCall", color: "text-cyan-500" },
  { icon: Phone, label: "CallGear", color: "text-indigo-500" },
  { icon: MessageSquare, label: "SleekFlow", color: "text-violet-500" },
  { icon: Layers, label: "Liana", color: "text-rose-500" },
]

const companyItems = [
  { icon: BookOpen, label: "About Us", desc: "Our story & mission" },
  { icon: FileText, label: "Blog", desc: "Insights & resources" },
  { icon: Mail, label: "Contact Us", desc: "Get in touch" },
  { icon: Headphones, label: "Customer Support", desc: "We're here to help" },
]

const words = [
  { text: "Native", className: "text-blue-500" },
  { text: "Meta", className: "text-blue-500" },
  { text: "Integration", className: "text-blue-500" },
]

export function HeaderHero() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const toggle = (key: MenuKey) => setOpenMenu(prev => prev === key ? null : key)

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

      {/* Nav wrapper — full width for mega menu */}
      <div className="relative z-30 px-4 pt-5" ref={navRef}>
        {/* Pill nav bar */}
        <nav className="mx-auto max-w-7xl bg-white rounded-full px-6 py-3 shadow-lg flex items-center justify-between gap-4 border border-slate-200">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-black text-slate-900 text-xl tracking-tighter">VZITE</span>
          </a>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-1">
            {["features", "solutions", "integrations", "mobile", "company"].map((key) => {
              if (key === "mobile") {
                return (
                  <a
                    key={key}
                    href="#"
                    className="px-3 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all capitalize"
                  >
                    {key}
                  </a>
                )
              }
              const menuKey = key as MenuKey
              return (
                <button
                  key={key}
                  onClick={() => toggle(menuKey)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all capitalize",
                    openMenu === menuKey ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  {key}
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openMenu === menuKey && "rotate-180")} />
                </button>
              )
            })}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
              Login
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all hover:bg-slate-800"
            >
              Get Free Demo
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
          </button>
        </nav>

        {/* Full-width Mega Menu Dropdowns */}
        {openMenu && (
          <div className="hidden lg:block absolute left-4 right-4 top-[calc(100%-8px)] animate-fade-in">
            <div className="mx-auto max-w-7xl">
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-slate-100 overflow-hidden">

                {openMenu === "features" && (
                  <div className="p-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Platform Features</p>
                    <div className="grid grid-cols-4 gap-1">
                      {featuresItems.map((item) => (
                        <DropdownItem key={item.label} icon={item.icon} label={item.label} desc={item.desc} />
                      ))}
                    </div>
                  </div>
                )}

                {openMenu === "solutions" && (
                  <div className="p-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Built For Every Team</p>
                    <div className="grid grid-cols-3 gap-1">
                      {solutionsItems.map((item) => (
                        <DropdownItem key={item.label} icon={item.icon} label={item.label} desc={item.desc} />
                      ))}
                    </div>
                  </div>
                )}

                {openMenu === "integrations" && (
                  <div className="p-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Connected Platforms</p>
                    <div className="grid grid-cols-6 gap-1">
                      {integrationsItems.map((item) => (
                        <a
                          key={item.label}
                          href="#"
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <item.icon className={cn("w-4 h-4 flex-shrink-0", item.color)} />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium truncate">{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {openMenu === "company" && (
                  <div className="p-6">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Company</p>
                    <div className="grid grid-cols-4 gap-1">
                      {companyItems.map((item) => (
                        <DropdownItem key={item.label} icon={item.icon} label={item.label} desc={item.desc} />
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mx-auto max-w-7xl mt-2 bg-white rounded-2xl shadow-2xl p-4 animate-fade-up border border-slate-200">
            <div className="flex flex-col gap-1">
              {["Features", "Solutions", "Integrations", "Mobile", "Company"].map(item => (
                <a key={item} href="#" className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">{item}</a>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a href="#" className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors text-center">Login</a>
                <a href="#" className="flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                  Get Free Demo
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="animate-fade-up flex items-center justify-center gap-2 text-slate-400 text-sm font-medium mb-6">
            Most Powerful Real Estate CRM
          </div>

          <h1 className="animate-fade-up-delay text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.08] tracking-tight mb-6">
            The Real Estate CRM Built for UAE
            <br />
            Brokerages with{" "}
            <span className="inline-flex items-center">
              <TypewriterEffectSmooth words={words} cursorClassName="bg-blue-500" />
            </span>
          </h1>

          <p className="animate-fade-up-delay2 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Instant lead distribution from Meta, automatic syncing with Property Finder, Bayut & Dubizzle, and advanced tools built for managing international investors in the UAE.
          </p>

          <div className="animate-fade-up-delay2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 bg-slate-900 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-slate-800 hover:scale-[1.03] transition-all"
            >
              Start Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-slate-500 hover:text-slate-800 font-semibold text-base transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <div className="w-0 h-0 border-l-[10px] border-l-slate-700 border-y-[6px] border-y-transparent ml-0.5" />
              </div>
              Watch Product Tour
            </a>
          </div>

          <div className="animate-fade-up-delay2 mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: "500+", label: "UAE Brokerages" },
              { value: "2M+", label: "Leads Managed" },
              { value: "98%", label: "Customer Retention" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DropdownItem({
  icon: Icon,
  label,
  desc,
}: {
  icon: React.ElementType
  label: string
  desc?: string
}) {
  return (
    <a
      href="#"
      className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
    >
      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-slate-200 transition-colors">
        <Icon className="w-3.5 h-3.5 text-slate-600" />
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{label}</div>
        {desc && <div className="text-xs text-slate-400 mt-0.5">{desc}</div>}
      </div>
    </a>
  )
}
