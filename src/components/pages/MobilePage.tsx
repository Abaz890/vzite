import { ArrowRight, Smartphone, QrCode, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"

export function MobilePage() {
  return (
    <div className="min-h-screen bg-white">
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

      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
            <Smartphone className="w-4 h-4" />
            Mobile App
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Your Entire CRM<br />in Your Pocket
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Native iOS and Android apps for agents on the move. Viewings, calls, leads, and deals—all accessible anywhere, anytime.
          </p>
        </div>
      </section>

      {/* App Store Section */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Download the Vzite App
                </h2>
                <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                  Get full CRM access from your phone. Manage leads, schedule viewings, chat with clients, and close deals—whether you're in the office or on-site.
                </p>

                {/* Store buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {/* App Store */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 bg-white text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all group"
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.36-.36 2.72-1.04 3.69-.69.96-1.84 1.67-2.97 1.58-.15-1.32.46-2.7 1.07-3.77z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs text-slate-500">Download on the</div>
                      <div className="text-base font-bold">App Store</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {/* Play Store */}
                  <a
                    href="#"
                    className="inline-flex items-center gap-3 bg-white text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all group"
                  >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs text-slate-500">Get it on</div>
                      <div className="text-base font-bold">Google Play</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    iOS 15+ compatible
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    Android 10+ compatible
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center lg:items-end">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="w-44 h-44 bg-slate-100 rounded-xl flex items-center justify-center">
                    <div className="w-36 h-36 bg-slate-900 rounded-lg relative">
                      {/* Simplified QR code representation */}
                      <div className="absolute inset-3 grid grid-cols-7 gap-0.5">
                        {Array.from({ length: 49 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "rounded-sm",
                              // Corner squares
                              (i < 9 || i > 39 && i < 49 || i % 7 === 0 || i % 7 === 6 || i < 7 || (i >= 42 && i < 49)) ? "bg-white" :
                              // Random pattern
                              Math.random() > 0.5 ? "bg-white" : "bg-transparent"
                            )}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-white opacity-30" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scan to Download</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
            Everything You Need in the Field
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Lead Inbox on the Go",
                description: "Every lead from every source, instantly on your phone. Quick actions for calls, WhatsApp, and qualification.",
                icon: "📱",
              },
              {
                title: "Viewing Scheduler",
                description: "See today's viewings, get directions with one tap, and log outcomes before you leave the property.",
                icon: "🗓️",
              },
              {
                title: "Instant Notifications",
                description: "Get alerted the moment a new lead arrives or a client replies. Never miss a hot opportunity.",
                icon: "🔔",
              },
              {
                title: "Offline Access",
                description: "Access lead details and property info even when you're in a basement or elevator.",
                icon: "📶",
              },
              {
                title: "One-Tap Calling",
                description: "Call leads directly from the app with automatic call logging. Every conversation, recorded.",
                icon: "📞",
              },
              {
                title: "WhatsApp Integration",
                description: "Send property details and brochures through WhatsApp without leaving the app.",
                icon: "💬",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 pb-20 px-4 border-t border-slate-100">
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
            <a
              href="#"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-base transition-colors"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
