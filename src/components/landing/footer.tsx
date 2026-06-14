import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12.07h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12.07h2.773l-.443 2.89h-2.33v6.988C20.343 21.128 24 16.991 24 12.073z"/>
  </svg>
)

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const LiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const XIcon2 = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857-8.164-10.643h7.242l4.262 5.633L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
)

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
              <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-4">
                Ready to Transform Your Brokerage?
              </p>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                <span className="text-slate-900">Join 500+ UAE Brokerages</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                  Growing With Vzite
                </span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Start your free demo today. No credit card required. Full onboarding support included.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all hover:bg-slate-800"
              >
                Get Free Demo
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 font-semibold text-sm px-6 py-4 rounded-2xl transition-all hover:bg-slate-50"
              >
                Talk to Sales
              </a>
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

            {/* Social links */}
            <div className="flex gap-3 mb-10">
              {[
                { Icon: FbIcon, href: "#", label: "Facebook" },
                { Icon: IgIcon, href: "#", label: "Instagram" },
                { Icon: LiIcon, href: "#", label: "LinkedIn" },
                { Icon: XIcon2, href: "#", label: "X / Twitter" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all"
                >
                  <s.Icon />
                </a>
              ))}
            </div>
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
