import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/landing/footer"

const offices = [
  {
    city: "Dubai",
    address: "Building 4, Dubai Internet City",
    phone: "+971 4 XXX XXXX",
    email: "dubai@vzite.com",
  },
  {
    city: "Abu Dhabi",
    address: "Al Maryah Tower, Al Maryah Island",
    phone: "+971 2 XXX XXXX",
    email: "abudhabi@vzite.com",
  },
]

export function ContactPage() {
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
      <section className="relative z-10 pt-16 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Have questions? We're here to help. Reach out to our team and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Send us a message</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-sm"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-sm"
                    placeholder="Your brokerage name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-sm text-slate-600">
                    <option>Sales Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 text-sm resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Email</div>
                      <a href="mailto:hello@vzite.com" className="text-sm text-slate-500 hover:text-teal-600">
                        hello@vzite.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Phone</div>
                      <a href="tel:+9714XXXXXXX" className="text-sm text-slate-500 hover:text-teal-600">
                        +971 4 XXX XXXX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Business Hours</div>
                      <div className="text-sm text-slate-500">Sun - Thu: 9:00 AM - 6:00 PM GST</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices */}
              {offices.map((office) => (
                <div key={office.city} className="bg-white rounded-2xl p-6 border border-slate-100">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-teal-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-slate-900 mb-2">{office.city} Office</div>
                      <div className="text-sm text-slate-500 space-y-1">
                        <div>{office.address}</div>
                        <div>{office.phone}</div>
                        <div>{office.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-3">Need Quick Help?</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Check out our documentation or start a live chat with our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#" className="text-center py-2 px-4 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                    Documentation
                  </a>
                  <a href="#" className="text-center py-2 px-4 bg-teal-500 rounded-lg text-sm font-medium hover:bg-teal-400 transition-colors">
                    Live Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
