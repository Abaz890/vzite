import { ArrowRight, Inbox, CalendarCheck, Bell, WifiOff, Phone, MessageCircle, Star, Shield, Zap } from "lucide-react"
import { Navigation } from "@/pages/navigation"
import { Footer } from "@/pages/landing/footer"
import { TypewriterEffectSmooth } from "@/pages/ui/typewriter-effect"

const features = [
  {
    icon: Inbox,
    title: "Lead Inbox on the Go",
    description: "Every lead from every source, instantly on your phone. Quick actions for calls, WhatsApp, and qualification.",
  },
  {
    icon: CalendarCheck,
    title: "Viewing Scheduler",
    description: "See today's viewings, get directions with one tap, and log outcomes before you leave the property.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Get alerted the moment a new lead arrives or a client replies. Never miss a hot opportunity.",
  },
  {
    icon: WifiOff,
    title: "Offline Access",
    description: "Access lead details and property info even when you're in a basement or elevator.",
  },
  {
    icon: Phone,
    title: "One-Tap Calling",
    description: "Call leads directly from the app with automatic call logging. Every conversation, recorded.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Integration",
    description: "Send property details and brochures through WhatsApp without leaving the app.",
  },
]

const mobileWords = [
  { text: "iOS", className: "text-[#0F4291]" },
  { text: "Android", className: "text-[#0F4291]" },
  { text: "Mobile", className: "text-[#0F4291]" },
]

export function MobilePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-16 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Your Entire CRM
            <br />
            in Your Pocket{" "}
            <span className="inline-flex items-center">
              <TypewriterEffectSmooth words={mobileWords} cursorClassName="bg-[#0F4291]" />
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Native iOS and Android apps for agents on the move. Viewings, calls, leads, and deals—all accessible anywhere, anytime.
          </p>
        </div>
      </section>

      {/* App Store Section */}
      <section className="relative pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Download the Vzite App</h2>
                <p className="text-slate-400 mb-6 text-lg leading-relaxed">
                  Get full CRM access from your phone. Manage leads, schedule viewings, chat with clients, and close deals—whether you're in the office or on-site.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Instant Sync</div>
                      <div className="text-slate-500 text-xs">Real-time updates</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">Secure</div>
                      <div className="text-slate-500 text-xs">End-to-end encrypted</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">4.9 Rating</div>
                      <div className="text-slate-500 text-xs">500+ reviews</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#" className="inline-flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-all border border-zinc-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.36-.36 2.72-1.04 3.69-.69.96-1.84 1.67-2.97 1.58-.15-1.32.46-2.7 1.07-3.77z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[10px] text-zinc-400 leading-none">Download on the</div>
                      <div className="text-sm font-semibold leading-tight">App Store</div>
                    </div>
                  </a>

                  <a href="#" className="inline-flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-all border border-zinc-700">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[10px] text-zinc-400 leading-none">Get it on</div>
                      <div className="text-sm font-semibold leading-tight">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <img
                  src="https://pngimg.com/uploads/iphone_14/iphone_14_PNG5.png"
                  alt="iPhone 14 Pro Mockup"
                  className="w-full max-w-[320px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">
            Everything You Need in the Field
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group bg-white rounded-2xl p-7 border border-slate-100 hover:border-[#0F4291]/20 hover:bg-[#0F4291]/5 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Icon className="w-5 h-5 text-[#0F4291]" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-20 px-4 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Start Using Vzite Mobile Today
          </h2>
          <p className="text-slate-500 mb-8 text-lg">
            Download the app and log in with your Vzite credentials.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 bg-slate-900 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-slate-800 transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-base transition-colors">
              Request a Demo
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
