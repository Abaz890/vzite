import { useState, useRef, useEffect } from "react"
import {
  ChevronDown, ChevronRight, Users, Home, Building2, MapPin,
  BarChart3, Calendar, Database, GitBranch, TrendingUp, Settings,
  SlidersHorizontal, RotateCcw, Briefcase, Megaphone,
  Shield, DollarSign, Monitor, Search, Globe, Phone, Mail,
  BookOpen, Headphones, Zap, AtSign,
  Menu, X, ArrowRight, Video, MessageSquare, RadioTower, Layers,
  Star, FileText, UserCheck, Target,
  Share2, Smartphone
} from "lucide-react"
import { cn } from "@/lib/utils"

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
    <section className="relative min-h-screen overflow-hidden hero-gradient flex flex-col">
      {/* Decorative floating blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="animate-float-blob absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-teal-400/20 blur-[80px]" />
        <div className="animate-float-blob-delay absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-emerald-300/15 blur-[60px]" />
        <div className="animate-float-blob-delay2 absolute bottom-10 left-1/3 w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-[70px]" />
        <div className="absolute top-20 right-1/4 w-[200px] h-[200px] rounded-full bg-cyan-300/10 blur-[50px]" />

        {/* Floating mini UI decorations */}
        <FloatingWidget className="top-28 right-16 animate-float-blob-delay" delay="0s">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-400/80 flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">New Lead</div>
              <div className="text-[10px] text-white/60">Meta Ads · 2s ago</div>
            </div>
            <div className="ml-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </FloatingWidget>

        <FloatingWidget className="top-1/2 left-8 animate-float-blob" delay="1s">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-400/80 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">47 Leads Today</div>
              <div className="text-[10px] text-emerald-300">↑ 23% vs yesterday</div>
            </div>
          </div>
        </FloatingWidget>

        <FloatingWidget className="bottom-32 right-24 animate-float-blob-delay2" delay="0.5s">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-400/80 flex items-center justify-center">
              <Share2 className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Portal Synced</div>
              <div className="text-[10px] text-white/60">PF · Bayut · Dubizzle</div>
            </div>
          </div>
        </FloatingWidget>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Capsule Nav */}
      <div className="relative z-30 px-4 pt-5">
        <nav
          ref={navRef}
          className="mx-auto max-w-7xl bg-white/95 backdrop-blur-xl rounded-full px-5 py-2.5 shadow-2xl shadow-black/20 flex items-center justify-between gap-4"
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Building2 className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">vzite</span>
          </a>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Features */}
            <NavItem label="Features" isOpen={openMenu === "features"} onClick={() => toggle("features")}>
              {openMenu === "features" && (
                <DropdownPanel wide className="left-0">
                  <div className="p-4">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">Platform Features</div>
                    <div className="grid grid-cols-2 gap-0.5">
                      {featuresItems.map((item) => (
                        <DropdownItem key={item.label} icon={item.icon} label={item.label} desc={item.desc} />
                      ))}
                    </div>
                  </div>
                </DropdownPanel>
              )}
            </NavItem>

            {/* Solutions */}
            <NavItem label="Solutions" isOpen={openMenu === "solutions"} onClick={() => toggle("solutions")}>
              {openMenu === "solutions" && (
                <DropdownPanel className="left-0">
                  <div className="p-4">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">Built For Every Team</div>
                    <div className="flex flex-col gap-0.5">
                      {solutionsItems.map((item) => (
                        <DropdownItem key={item.label} icon={item.icon} label={item.label} desc={item.desc} />
                      ))}
                    </div>
                  </div>
                </DropdownPanel>
              )}
            </NavItem>

            {/* Integrations */}
            <NavItem label="Integrations" isOpen={openMenu === "integrations"} onClick={() => toggle("integrations")}>
              {openMenu === "integrations" && (
                <DropdownPanel wide className="-left-20">
                  <div className="p-4">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">Connected Platforms</div>
                    <div className="grid grid-cols-3 gap-0.5">
                      {integrationsItems.map((item) => (
                        <a
                          key={item.label}
                          href="#"
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <item.icon className={cn("w-4 h-4 flex-shrink-0", item.color)} />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium">{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </DropdownPanel>
              )}
            </NavItem>

            {/* Mobile App */}
            <a href="#" className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <Smartphone className="w-4 h-4" />
              Mobile App
            </a>

            {/* Company */}
            <NavItem label="Company" isOpen={openMenu === "company"} onClick={() => toggle("company")}>
              {openMenu === "company" && (
                <DropdownPanel className="-left-10">
                  <div className="p-4">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3 px-1">Company</div>
                    <div className="flex flex-col gap-0.5">
                      {companyItems.map((item) => (
                        <DropdownItem key={item.label} icon={item.icon} label={item.label} desc={item.desc} />
                      ))}
                    </div>
                  </div>
                </DropdownPanel>
              )}
            </NavItem>
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a href="#" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
              Login
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all"
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
            {mobileOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mx-auto max-w-7xl mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 animate-fade-up">
            <div className="flex flex-col gap-1">
              {["Features", "Solutions", "Integrations", "Mobile App", "Company"].map(item => (
                <a key={item} href="#" className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">{item}</a>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <a href="#" className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors text-center">Login</a>
                <a href="#" className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-semibold px-5 py-3 rounded-xl">
                  Get Free Demo <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-8 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            UAE's Most Powerful Real Estate CRM
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">2025</span>
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-up-delay text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-8">
            The Real Estate CRM{" "}
            <span className="shimmer-text">Built for UAE</span>
            <br />
            Brokerages with{" "}
            <span className="relative">
              <span className="shimmer-text">Native Meta</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3C50 0.5 100 5.5 150 3C200 0.5 250 5.5 300 3" stroke="rgba(110,231,183,0.7)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Integration
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up-delay2 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12">
            Instant lead distribution from Meta, automatic syncing with Property Finder, Bayut & Dubizzle, and advanced tools built for managing international investors in the UAE.
          </p>

          {/* CTA row */}
          <div className="animate-fade-up-delay2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 bg-white text-slate-900 font-bold text-base px-8 py-4 rounded-full shadow-2xl shadow-black/20 hover:shadow-black/30 hover:scale-[1.03] transition-all"
            >
              Start Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-white/80 hover:text-white font-semibold text-base transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-0.5" />
              </div>
              Watch Product Tour
            </a>
          </div>

          {/* Social proof */}
          <div className="animate-fade-up-delay2 mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { value: "500+", label: "UAE Brokerages" },
              { value: "2M+", label: "Leads Managed" },
              { value: "98%", label: "Customer Retention" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-white animate-count-pulse">{stat.value}</div>
                <div className="text-xs text-white/50 mt-0.5 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="white" fillOpacity="1" />
        </svg>
      </div>
    </section>
  )
}

// Sub-components

function FloatingWidget({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: string }) {
  return (
    <div
      className={cn("absolute glass-card rounded-2xl px-3.5 py-2.5 shadow-xl shadow-black/10 hidden lg:block", className)}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  )
}

function NavItem({
  label,
  isOpen,
  onClick,
  children,
}: {
  label: string
  isOpen: boolean
  onClick: () => void
  children?: React.ReactNode
}) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all",
          isOpen ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        )}
      >
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      {children}
    </div>
  )
}

function DropdownPanel({
  children,
  className,
  wide,
}: {
  children: React.ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        "absolute top-[calc(100%+8px)] bg-white rounded-2xl shadow-2xl shadow-black/10 border border-slate-100 animate-fade-in z-50 overflow-hidden",
        wide ? "min-w-[480px]" : "min-w-[280px]",
        className
      )}
    >
      {children}
    </div>
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
      <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal-100 transition-colors">
        <Icon className="w-3.5 h-3.5 text-teal-600" />
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{label}</div>
        {desc && <div className="text-xs text-slate-400 mt-0.5">{desc}</div>}
      </div>
    </a>
  )
}
