import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

const testimonials = [
  {
    quote:
      "Nagham specializes in ultra-luxury real estate transactions, wealth management, and exclusive investment opportunities in Dubai and global markets. With more than a decade of experience across real estate, strategic investments, and luxury brand advisory, she guides UHNWIs, family offices, and elite investors in expanding their portfolios.",
    name: "Nagham Mhd Fouad Abdulhadi",
    designation: "BRN: 66685 | Senior Wealth Manager & Real Estate Investment Strategist | Palmexa Real Estate LLC",
    src: "/female-1.avif",
  },
  {
    quote:
      "Cherry provides exceptional real estate services across Dubai, helping clients navigate the dynamic property market with confidence. Her expertise and dedication make her a trusted partner for premium real estate transactions in the UAE.",
    name: "Cherry Htun",
    designation: "Liamore Estate | Serves in Dubai",
    src: "/female-2.avif",
  },
  {
    quote:
      "Aura Luxe was founded on a simple but powerful premise: the most important financial decisions of your life should be based on data, not speculation. In Dubai's fast-paced and dynamic property market, we saw a critical need for an advisory service that prioritizes clarity, integrity, and the measurable success of its clients.",
    name: "Mohsin Khan Siddiq Ullah",
    designation: "Founder, Aura Luxe Properties LLC",
    src: "/male-1.avif",
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
