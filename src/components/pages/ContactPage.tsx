import { useRef, useState, useEffect } from "react"
import emailjs from "@emailjs/browser"
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/landing/footer"

const WorldMapSVG = () => (
  <svg
    viewBox="0 0 1009 665"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full opacity-60"
  >
    {/* Simplified world map using dots/blobs for each continent */}
    {/* North America */}
    <ellipse cx="190" cy="210" rx="110" ry="90" fill="#cbd5e1" opacity="0.6" />
    <ellipse cx="160" cy="270" rx="50" ry="60" fill="#cbd5e1" opacity="0.5" />
    <ellipse cx="230" cy="300" rx="30" ry="40" fill="#cbd5e1" opacity="0.5" />
    {/* Greenland */}
    <ellipse cx="280" cy="110" rx="40" ry="35" fill="#cbd5e1" opacity="0.4" />
    {/* South America */}
    <ellipse cx="260" cy="430" rx="55" ry="85" fill="#cbd5e1" opacity="0.6" />
    <ellipse cx="240" cy="510" rx="35" ry="50" fill="#cbd5e1" opacity="0.5" />
    {/* Europe */}
    <ellipse cx="490" cy="175" rx="60" ry="55" fill="#cbd5e1" opacity="0.6" />
    <ellipse cx="510" cy="215" rx="35" ry="30" fill="#cbd5e1" opacity="0.5" />
    {/* Scandinavia */}
    <ellipse cx="500" cy="125" rx="25" ry="35" fill="#cbd5e1" opacity="0.4" />
    {/* UK */}
    <ellipse cx="440" cy="160" rx="15" ry="25" fill="#cbd5e1" opacity="0.4" />
    {/* Africa */}
    <ellipse cx="490" cy="340" rx="70" ry="110" fill="#cbd5e1" opacity="0.6" />
    <ellipse cx="490" cy="440" rx="55" ry="80" fill="#cbd5e1" opacity="0.55" />
    {/* Madagascar */}
    <ellipse cx="582" cy="410" rx="12" ry="25" fill="#cbd5e1" opacity="0.4" />
    {/* Middle East / Arabian Peninsula */}
    <ellipse cx="596" cy="270" rx="45" ry="50" fill="#cbd5e1" opacity="0.55" />
    {/* Asia - Central */}
    <ellipse cx="680" cy="200" rx="130" ry="80" fill="#cbd5e1" opacity="0.6" />
    {/* Asia - South */}
    <ellipse cx="680" cy="280" rx="70" ry="55" fill="#cbd5e1" opacity="0.55" />
    {/* India */}
    <ellipse cx="655" cy="320" rx="35" ry="50" fill="#cbd5e1" opacity="0.5" />
    {/* Southeast Asia */}
    <ellipse cx="750" cy="320" rx="45" ry="50" fill="#cbd5e1" opacity="0.5" />
    {/* Japan */}
    <ellipse cx="828" cy="220" rx="14" ry="30" fill="#cbd5e1" opacity="0.4" />
    {/* Australia */}
    <ellipse cx="810" cy="440" rx="75" ry="65" fill="#cbd5e1" opacity="0.6" />
    {/* New Zealand */}
    <ellipse cx="880" cy="510" rx="12" ry="22" fill="#cbd5e1" opacity="0.4" />
    {/* Russia */}
    <ellipse cx="680" cy="140" rx="160" ry="55" fill="#cbd5e1" opacity="0.5" />
    {/* Iceland */}
    <ellipse cx="400" cy="115" rx="18" ry="14" fill="#cbd5e1" opacity="0.35" />

    {/* UAE pin marker */}
    <g transform="translate(610, 280)">
      {/* pin line */}
      <line x1="0" y1="0" x2="0" y2="-40" stroke="#0f172a" strokeWidth="1.5" />
      {/* dot at base */}
      <circle cx="0" cy="0" r="4" fill="#0f172a" />
      {/* label box */}
      <rect x="-36" y="-65" width="72" height="22" rx="4" fill="#0f172a" />
      <text x="0" y="-50" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">We are here</text>
    </g>
  </svg>
)

export function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [sent, setSent] = useState(false)

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setSent(true)
        formRef.current?.reset()
      })
      .catch(() => alert("Failed to send. Try again."))
  }

  useEffect(() => {
    if (sent) {
      const t = setTimeout(() => setSent(false), 5000)
      return () => clearTimeout(t)
    }
  }, [sent])

  if (sent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Message Sent!</h2>
          <p className="text-slate-500 mt-2">We'll get back to you shortly.</p>
        </div>
      </div>
    )
  }

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

      {/* Main Content */}
      <section className="relative z-10 pt-12 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[560px]">

            {/* Left panel - Info + Map */}
            <div className="bg-slate-50 rounded-3xl p-8 md:p-10 flex flex-col border border-slate-100">
              {/* Mail icon */}
              <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                <Mail className="w-6 h-6 text-slate-700" />
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Contact us</h1>

              <p className="text-slate-500 leading-relaxed mb-6 max-w-sm">
                We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
              </p>

              {/* Contact links */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 text-sm">
                <a href="mailto:hello@vzite.com" className="text-[#0F4291] hover:text-[#0F4291]/80 font-medium transition-colors">
                  support@vzite.com
                </a>
                <span className="text-slate-300">•</span>
                <a href="tel:+97141234567" className="text-[#0F4291] hover:text-[#0F4291]/80 font-medium transition-colors">
                  +971 58 588 9961
                </a>
              </div>

              {/* World map */}
              <div className="flex-1 flex items-end">
                <div className="w-full">
                  <WorldMapSVG />
                </div>
              </div>
            </div>

            {/* Right panel - Form */}
            <div className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100">
              <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5 h-full">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full name</label>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Manu Arora"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4291] focus:border-transparent text-sm text-slate-800 placeholder:text-slate-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="from_email"
                    placeholder="support@aceternity.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4291] focus:border-transparent text-sm text-slate-800 placeholder:text-slate-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Aceternity Labs LLC"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4291] focus:border-transparent text-sm text-slate-800 placeholder:text-slate-400 transition"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    placeholder="Type your message here"
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F4291] focus:border-transparent text-sm text-slate-800 placeholder:text-slate-400 resize-none transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-fit px-8 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-700 transition-colors text-sm"
                >
                  Submit
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Additional contact info */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: MapPin, title: "Dubai HQ", detail: "Building 4, Dubai Internet City, Dubai, UAE" },
            { icon: Phone, title: "Phone", detail: "+971 4 XXX XXXX (Sun–Thu, 9am–6pm GST)" },
            { icon: Mail, title: "Email", detail: "hello@vzite.com · support@vzite.com" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-[#0F4291]" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                <div className="text-sm text-slate-500 mt-0.5">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
