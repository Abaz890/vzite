import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

const testimonials = [
  {
    quote:
      "Vzite completely transformed how we handle Meta leads. Before, leads from Facebook would sit for hours before an agent even saw them. Now they're assigned within 30 seconds and our closing rate has nearly doubled. The portal sync alone saves each agent 2 hours every day.",
    name: "Nibal Al-Rashid",
    designation: "Managing Partner, Ophir Properties",
    src: "/testimonial-1.webp",
  },
  {
    quote:
      "As a brokerage focused on off-plan and international buyers, Vzite's presentation tools are unmatched. I can create a full branded brochure for any Emaar project in under a minute and share it to a Moscow investor on WhatsApp before the call ends. It's a genuine competitive advantage.",
    name: "Faissel Al-Mansouri",
    designation: "CEO & Founder, Pacific Investment Real Estate",
    src: "/testimonial-2.webp",
  },
  {
    quote:
      "The KPI dashboard keeps my entire team accountable without micromanagement. I can see lead response times, conversion rates, and deal progression for every agent in real-time. Vzite didn't just give us software — it gave us visibility we never had before.",
    name: "Sarah Whitfield",
    designation: "Head of Sales, Pinnacle Real Estate Group",
    src: "/testimonial-1.webp",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="text-center mb-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Client Stories</p>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          Trusted by UAE's Top Brokerages
        </h2>
      </div>
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  )
}
