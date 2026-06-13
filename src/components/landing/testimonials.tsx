import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Nibal Al-Rashid",
    role: "Managing Partner",
    company: "Ophir Properties",
    image: "/testimonial-1.webp",
    quote: "Vzite completely transformed how we handle Meta leads. Before, leads from Facebook would sit for hours before an agent even saw them. Now they're assigned within 30 seconds and our closing rate has nearly doubled. The portal sync alone saves each agent 2 hours every day.",
    stat: "2× closing rate",
    location: "Dubai, UAE",
  },
  {
    id: 2,
    name: "Faissel Al-Mansouri",
    role: "CEO & Founder",
    company: "Pacific Investment Real Estate",
    image: "/testimonial-2.webp",
    quote: "As a brokerage focused on off-plan and international buyers, Vzite's presentation tools are unmatched. I can create a full branded brochure for any Emaar project in under a minute and share it to a Moscow investor on WhatsApp before the call ends. It's a genuine competitive advantage.",
    stat: "68% faster deal cycles",
    location: "Dubai, UAE",
  },
  {
    id: 3,
    name: "Sarah Whitfield",
    role: "Head of Sales",
    company: "Pinnacle Real Estate Group",
    image: "/testimonial-1.webp",
    quote: "The KPI dashboard keeps my entire team accountable without micromanagement. I can see lead response times, conversion rates, and deal progression for every agent in real-time. Vzite didn't just give us software — it gave us visibility we never had before.",
    stat: "44% team efficiency gain",
    location: "Abu Dhabi, UAE",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const navigate = (dir: "prev" | "next") => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrent(i => dir === "next" ? (i + 1) % testimonials.length : (i - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 200)
  }

  useEffect(() => {
    const t = setInterval(() => navigate("next"), 6000)
    return () => clearInterval(t)
  }, [isAnimating])

  const active = testimonials[current]

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-amber-100">
            <Quote className="w-3.5 h-3.5" />
            Client Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Trusted by UAE's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Top Brokerages
            </span>
          </h2>
        </div>

        {/* Main testimonial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Left: image card */}
          <div className="lg:col-span-2">
            <div className={cn("transition-all duration-300", isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100")}>
              <div className="relative">
                {/* Image */}
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-slate-100 relative">
                  <img
                    src={active.image}
                    alt={active.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3">
                      <div className="font-bold text-white">{active.name}</div>
                      <div className="text-xs text-white/70 mt-0.5">{active.role} · {active.company}</div>
                    </div>
                  </div>
                </div>

                {/* Stat badge */}
                <div className="absolute -right-4 top-6 bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl p-4 shadow-xl shadow-teal-500/30">
                  <div className="text-lg font-black">{active.stat}</div>
                  <div className="text-[10px] text-teal-100 mt-0.5 font-medium">{active.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: quote + controls */}
          <div className="lg:col-span-3">
            <div className={cn("transition-all duration-300", isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0")}>
              {/* Large quote mark */}
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-amber-500" />
              </div>

              <blockquote className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8">
                "{active.quote}"
              </blockquote>

              <div className="flex items-center gap-4 mb-10">
                <div>
                  <div className="font-bold text-slate-900">{active.name}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{active.role}, {active.company}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("prev")}
                  className="w-11 h-11 rounded-full border border-slate-200 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center text-slate-400 hover:text-teal-600 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate("next")}
                  className="w-11 h-11 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center text-white transition-colors shadow-lg shadow-teal-500/25"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === current ? "w-8 bg-teal-500" : "w-1.5 bg-slate-200 hover:bg-slate-300"
                    )}
                  />
                ))}
              </div>

              <div className="text-sm text-slate-400 ml-auto">
                {current + 1} / {testimonials.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
