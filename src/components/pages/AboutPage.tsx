import { Users, Target, Award, Globe } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/landing/footer"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"



const teamMembers = [
  {
    name: "Khalid Al-Rashid",
    designation: "CEO & Founder",
    quote: "We built Vzite because the UAE real estate market deserved a CRM that was engineered for its unique dynamics — the international buyers, the off-plan surge, the portal landscape. Everything we ship is guided by that conviction.",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Sarah Chen",
    designation: "CTO",
    quote: "The engineering challenge with Vzite is performance at scale — distributing thousands of Meta leads per minute without a single one dropped. That's the kind of problem I moved here to solve.",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Omar Hassan",
    designation: "Head of Product",
    quote: "Every feature we release starts from a real conversation with a broker. Not a spreadsheet, not a roadmap template. We spend time on the ground and that changes everything about what we build.",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Faiza Mahmoud",
    designation: "Head of Sales",
    quote: "When a brokerage doubles its lead conversion in 90 days, that's not a sales win — that's a product win. My job is to make sure the right people discover what Vzite can do for them.",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop",
  },
]

const values = [
  { title: "Innovation First", description: "We build what brokers actually need, not what looks good in a pitch deck." },
  { title: "Local Expertise", description: "Built in Dubai, for Dubai. We understand the UAE market inside out." },
  { title: "Customer Success", description: "Your success is our success. We win when you close deals." },
  { title: "Continuous Growth", description: "We ship weekly updates based on real broker feedback." },
]

export function AboutPage() {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            <TypewriterEffectSmooth words={[{ text: "Building the Future of", className: "text-slate-900" }]} cursorClassName="bg-teal-500" />
            <br />UAE Real Estate
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Vzite was founded in 2021 with a simple mission: give UAE brokers the tools they deserve. Today, we power 500+ brokerages across the Emirates.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "2021", label: "Founded" },
              { value: "500+", label: "Brokerages" },
              { value: "2M+", label: "Leads Managed" },
              { value: "50+", label: "Team Members" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-3xl md:text-4xl font-black text-teal-600">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Every UAE brokerage deserves enterprise-grade technology at an affordable price. We built Vzite because existing CRMs were either too generic or too expensive. We're changing that.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <Users className="w-8 h-8 text-teal-400 mb-3" />
                  <div className="text-white font-semibold">For Brokers</div>
                  <div className="text-slate-400 text-sm mt-1">Built by brokers, for brokers</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <Target className="w-8 h-8 text-teal-400 mb-3" />
                  <div className="text-white font-semibold">For Growth</div>
                  <div className="text-slate-400 text-sm mt-1">Scale without limits</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <Award className="w-8 h-8 text-teal-400 mb-3" />
                  <div className="text-white font-semibold">For Success</div>
                  <div className="text-slate-400 text-sm mt-1">Your wins are our wins</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <Globe className="w-8 h-8 text-teal-400 mb-3" />
                  <div className="text-white font-semibold">For UAE</div>
                  <div className="text-slate-400 text-sm mt-1">Locally built, globally minded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-4">Meet the Team</h2>
          <p className="text-center text-slate-500 mb-12">The people building Vzite every day.</p>
          <AnimatedTestimonials testimonials={teamMembers} autoplay={true} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
