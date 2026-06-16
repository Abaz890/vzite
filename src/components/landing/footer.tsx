import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const footerLinks = {
  Features: [
    { label: "Lead Management", to: "/features/lead-management" },
    { label: "Listing Management", to: "/features/listing-management" },
    { label: "Owners Management", to: "/features/owners-management" },
    { label: "Off-Plan Projects", to: "/features/offplan-projects" },
    { label: "Map View", to: "/features/map-view" },
    { label: "Transactions & Commissions", to: "/features/transactions-commissions" },
    { label: "Lead Rotation", to: "/features/lead-rotation" },
    { label: "KPI & Insights", to: "/features/kpi-insights" },
  ],
  Integrations: [
    { label: "Property Finder", to: "/integrations/property-finder" },
    { label: "Bayut", to: "/integrations/bayut" },
    { label: "Dubizzle", to: "/integrations/dubizzle" },
    { label: "Meta Ads", to: "/integrations/meta-ads" },
    { label: "Google Ads", to: "/integrations/google-ads" },
    { label: "Zapier", to: "/integrations/zapier" },
    { label: "TikTok", to: "/integrations/tiktok" },
    { label: "SleekFlow", to: "/integrations/sleekflow" },
  ],
  Company: [
    { label: "About Vzite", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Contact Us", to: "/contact" },
    { label: "Customer Support", to: "/support" },
    { label: "Privacy Policy", to: "#" },
    { label: "Terms of Service", to: "#" },
    { label: "Cookie Policy", to: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white text-slate-900 border-t border-slate-100 relative overflow-hidden">
      {/* CTA Banner */}
      <div className="border-b border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#0F4291' }}>
                Ready to Transform Your Brokerage?
              </p>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                <span className="text-slate-900">Join 500+ UAE Brokerages</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4291] to-blue-400">
                  Growing With Vzite
                </span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Start your free demo today. No credit card required. Full onboarding support included.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all hover:bg-slate-800"
              >
                Get Free Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-semibold text-sm px-6 py-4 rounded-2xl transition-all hover:bg-slate-50"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="mb-6">
              <img src="/logo.jpeg" alt="Vzite" className="h-9 w-auto" />
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              The next-generation Real Estate CRM designed exclusively for UAE brokerages. Built with native Meta integration, portal sync, and international investor tools.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-5">{heading}</div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Vzite Technologies LLC. All rights reserved. Dubai, UAE.
          </div>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
              <a key={link} href="#" className="text-xs text-slate-400 hover:text-slate-900 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Background stylized name */}
      <div className="absolute -bottom-12 -right-12 md:-bottom-24 md:-right-24 pointer-events-none select-none z-0">
        <span className="text-[12rem] md:text-[28rem] font-black tracking-tighter leading-none inline-block">
          <span className="text-slate-900/[0.08]">V</span>
          <span className="bg-gradient-to-r from-slate-900/[0.05] to-transparent bg-clip-text text-transparent">
            ZITE
          </span>
        </span>
      </div>
    </footer>
  )
}
