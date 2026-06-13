import { Building2, ArrowRight, Smartphone, QrCode } from "lucide-react"

// SVG social icons
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
    "Lead Management",
    "Listing Management",
    "Owners Management",
    "Off-Plan Projects",
    "Map View",
    "Transactions & Commissions",
    "Lead Rotation",
    "KPI & Insights",
  ],
  Integrations: [
    "Property Finder",
    "Bayut",
    "Dubizzle",
    "Meta Ads",
    "Google Ads",
    "Zapier",
    "TikTok",
    "SleekFlow",
  ],
  Company: [
    "About Vzite",
    "Blog",
    "Careers",
    "Contact Us",
    "Customer Support",
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
  ],
}

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-teal-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                Ready to Transform Your Brokerage?
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                Join 500+ UAE Brokerages
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                  Growing With Vzite
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Start your free demo today. No credit card required. Full onboarding support included.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-sm px-6 py-4 rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-[1.02] transition-all"
              >
                Get Free Demo
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-white/80 hover:text-white hover:border-white/20 font-semibold text-sm px-6 py-4 rounded-2xl transition-all hover:bg-white/5"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <Building2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-black text-white text-xl tracking-tight">vzite</span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
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
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <s.Icon />
                </a>
              ))}
            </div>

            {/* QR Code app download */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-start gap-4">
                {/* QR code placeholder */}
                <div className="w-20 h-20 bg-white rounded-xl p-2 flex-shrink-0">
                  <div className="w-full h-full relative">
                    <QrCode className="w-full h-full text-slate-900" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Smartphone className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-white">Download the App</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    Scan to download Vzite for iOS or Android. Manage leads on the go.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-white/10 text-white/70 px-2.5 py-1 rounded-full font-medium">iOS</span>
                    <span className="text-[10px] bg-white/10 text-white/70 px-2.5 py-1 rounded-full font-medium">Android</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <div className="text-xs font-bold text-white uppercase tracking-widest mb-5">{heading}</div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Vzite Technologies LLC. All rights reserved. Dubai, UAE.
          </div>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
              <a key={link} href="#" className="text-xs text-slate-500 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
