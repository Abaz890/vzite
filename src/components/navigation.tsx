import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  ChevronDown, Users, Home, Building2, MapPin,
  Calendar, Database, GitBranch, TrendingUp, Settings,
  SlidersHorizontal, RotateCcw, Briefcase, Megaphone,
  Shield, DollarSign, Monitor, Search, Globe, Phone, Mail,
  BookOpen, Headphones, Zap, AtSign,
  Menu, X, ChevronRight, Video, MessageSquare, RadioTower, Layers,
  Star, FileText, UserCheck, Target
} from "lucide-react"
import { cn } from "@/lib/utils"

type MenuKey = "features" | "solutions" | "integrations" | "company" | null

interface DropdownItem {
  icon: React.ElementType
  label: string
  desc?: string
  color?: string
}

const featuresItems: DropdownItem[] = [
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

const solutionsItems: DropdownItem[] = [
  { icon: Briefcase, label: "Management", desc: "Full organizational control" },
  { icon: TrendingUp, label: "Sales", desc: "Close deals faster" },
  { icon: Megaphone, label: "Marketing", desc: "Smarter campaign tools" },
  { icon: Settings, label: "Admins & Operations", desc: "Streamline back-office" },
  { icon: DollarSign, label: "Accounts", desc: "Financial transparency" },
  { icon: Monitor, label: "IT", desc: "Secure infrastructure" },
]

const integrationsItems: DropdownItem[] = [
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

const companyItems: DropdownItem[] = [
  { icon: BookOpen, label: "About Us", desc: "Our story & mission" },
  { icon: FileText, label: "Blog", desc: "Insights & resources" },
  { icon: Mail, label: "Contact Us", desc: "Get in touch" },
  { icon: Headphones, label: "Customer Support", desc: "We're here to help" },
]

function toSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

interface NavigationProps {
  onLoginClick?: () => void
}

export function Navigation({ onLoginClick }: NavigationProps) {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [location.pathname])

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
    <div className="relative z-30 px-4 pt-5" ref={navRef}>
      <nav className="mx-auto max-w-7xl bg-white rounded-full px-6 py-3 shadow-lg flex items-center justify-between gap-4 border border-slate-200">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="font-black text-slate-900 text-xl tracking-tighter">VZITE</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => toggle("features")}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all",
              openMenu === "features" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            Features
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openMenu === "features" && "rotate-180")} />
          </button>
          <button
            onClick={() => toggle("solutions")}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all",
              openMenu === "solutions" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            Solutions
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openMenu === "solutions" && "rotate-180")} />
          </button>
          <button
            onClick={() => toggle("integrations")}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all",
              openMenu === "integrations" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            Integrations
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openMenu === "integrations" && "rotate-180")} />
          </button>
          <Link
            to="/mobile"
            className="px-3 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            Mobile
          </Link>
          <button
            onClick={() => toggle("company")}
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-all",
              openMenu === "company" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            Company
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", openMenu === "company" && "rotate-180")} />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button onClick={onLoginClick} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
            Login
          </button>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all hover:bg-slate-800"
          >
            Get Free Demo
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <button
          className="lg:hidden p-2 rounded-full hover:bg-slate-100 transition-colors"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
        </button>
      </nav>

      {openMenu && (
        <div className="hidden lg:block absolute left-4 right-4 top-[calc(100%-8px)] animate-fade-in">
          <div className="mx-auto max-w-7xl">
            <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-slate-100 overflow-hidden">

              {openMenu === "features" && (
                <div className="p-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Platform Features</p>
                  <div className="grid grid-cols-4 gap-1">
                    {featuresItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.label}
                          to={`/features/${toSlug(item.label)}`}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-slate-200 transition-colors">
                            <Icon className="w-3.5 h-3.5 text-slate-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{item.label}</div>
                            {item.desc && <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {openMenu === "solutions" && (
                <div className="p-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Built For Every Team</p>
                  <div className="grid grid-cols-3 gap-1">
                    {solutionsItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.label}
                          to={`/solutions/${toSlug(item.label)}`}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-slate-200 transition-colors">
                            <Icon className="w-3.5 h-3.5 text-slate-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{item.label}</div>
                            {item.desc && <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {openMenu === "integrations" && (
                <div className="p-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Connected Platforms</p>
                  <div className="grid grid-cols-6 gap-1">
                    {integrationsItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.label}
                          to={`/integrations/${toSlug(item.label)}`}
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <Icon className={cn("w-4 h-4 flex-shrink-0", item.color)} />
                          <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium truncate">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {openMenu === "company" && (
                <div className="p-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Company</p>
                  <div className="grid grid-cols-4 gap-1">
                    {companyItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <a
                          key={item.label}
                          href="#"
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-slate-200 transition-colors">
                            <Icon className="w-3.5 h-3.5 text-slate-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{item.label}</div>
                            {item.desc && <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>}
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 bg-white rounded-2xl shadow-2xl p-4 animate-fade-up border border-slate-200">
          <div className="flex flex-col gap-1">
            <MobileNavItem label="Features" items={featuresItems} category="features" onClose={() => setMobileOpen(false)} />
            <MobileNavItem label="Solutions" items={solutionsItems} category="solutions" onClose={() => setMobileOpen(false)} />
            <MobileNavItem label="Integrations" items={integrationsItems} category="integrations" onClose={() => setMobileOpen(false)} />
            <Link
              to="/mobile"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Mobile
            </Link>
            <Link
              to="/company"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Company
            </Link>
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button onClick={() => { onLoginClick?.(); setMobileOpen(false) }} className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors text-center">Login</button>
              <a href="#" className="flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                Get Free Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MobileNavItem({ label, items, category, onClose }: { label: string; items: DropdownItem[]; category: string; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
      >
        {label}
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="pl-4 mt-1 space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={`/${category}/${toSlug(item.label)}`}
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Icon className={cn("w-4 h-4", item.color || "text-slate-500")} />
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
