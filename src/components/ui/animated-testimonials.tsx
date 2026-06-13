"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  quote: string
  name: string
  designation: string
  src: string
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[]
  autoplay?: boolean
  className?: string
  heading?: string
}

export function AnimatedTestimonials({ testimonials, autoplay = true, className }: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  useEffect(() => {
    if (!autoplay) return
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [autoplay, isAnimating])

  const t = testimonials[active]

  return (
    <section className={cn("pb-12 bg-white overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image section */}
          <div className="lg:col-span-2">
            <div className="relative h-[400px] md:h-[500px]">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute inset-0 rounded-3xl overflow-hidden transition-all duration-500",
                    i === active
                      ? "opacity-100 scale-100 translate-x-0 rotate-0 z-10"
                      : i < active
                        ? "opacity-0 scale-95 -translate-x-8 -rotate-2 z-0"
                        : "opacity-0 scale-95 translate-x-8 rotate-2 z-0"
                  )}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-slate-900/80 border border-white/20 rounded-2xl p-4">
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-sm text-white/70 mt-0.5">{testimonial.designation}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation arrows on mobile */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20 lg:hidden">
                <button onClick={prev} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-lg">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={next} className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quote section */}
          <div className="lg:col-span-3">
            <div className={cn(
              "transition-all duration-500",
              isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            )}>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-teal-600" />
              </div>

              <blockquote className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              <div className="mb-10">
                <div className="font-bold text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-400 mt-0.5">{t.designation}</div>
              </div>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-11 h-11 rounded-full border border-slate-200 hover:border-slate-400 hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-700 flex items-center justify-center text-white transition-colors shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === active ? "w-8 bg-slate-900" : "w-1.5 bg-slate-200 hover:bg-slate-300"
                    )}
                  />
                ))}
              </div>

              <div className="text-sm text-slate-400 ml-auto">
                {active + 1} / {testimonials.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
