import { ArrowRight, ArrowLeft, Smartphone, Zap, Shield, Users, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobilePageProps {
  onBack: () => void
}

const features = [
  {
    icon: Smartphone,
    title: "Native Mobile Apps",
    description: "Dedicated iOS and Android apps built for speed. Access your entire CRM, viewings, and leads from anywhere.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Zap,
    title: "Offline-First Design",
    description: "Work without connectivity. Viewings, notes, and lead updates sync when you're back online.",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: Shield,
    title: "Biometric Security",
    description: "Face ID and fingerprint authentication keep your data secure, even on shared devices.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Users,
    title: "Team Communication",
    description: "In-app messaging and activity feeds keep your team aligned without switching apps.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: MapPin,
    title: "Navigation Integration",
    description: "One-tap navigation to viewings. See nearby listings and optimize your route.",
    color: "bg-emerald-50 text-emerald-600",
  },
]

export function MobilePage({ onBack }: MobilePageProps) {
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

      {/* Header */}
      <div className="relative z-10 px-4 pt-5">
        <nav className="mx-auto max-w-7xl bg-white rounded-full px-6 py-3 shadow-lg flex items-center justify-between gap-4 border border-slate-200">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-black text-slate-900 text-xl tracking-tighter">VZITE</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100">
              Login
            </button>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-sm font-bold px-5 py-2 rounded-full transition-all hover:bg-slate-800"
            >
              Get Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-16 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
            <Smartphone className="w-4 h-4" />
            Mobile
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Real Estate in Your Pocket
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Native iOS and Android apps that keep your agents productive on the go. Viewings, calls, messages, and updates—all from your phone.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.color)}>
                  <feature.icon className="w-6 h-6" />
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
            See Mobile App in Action
          </h2>
          <p className="text-slate-500 mb-8 text-lg">
            Get a personalized demo and see how your team can work from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 bg-slate-900 text-white font-bold text-base px-8 py-4 rounded-full hover:bg-slate-800 transition-all"
            >
              Get Free Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold text-base transition-colors"
            >
              Download App
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
