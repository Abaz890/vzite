import { useState } from "react"
import { BookOpen, MessageCircle, Video, Headphones, ChevronDown, Search, Plus } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/landing/footer"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { motion, AnimatePresence } from "framer-motion"

const helpCategories = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Detailed guides and API references",
    articles: 124,
    color: "text-teal-600 bg-teal-50",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs",
    articles: 48,
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "Connect with other Vzite users",
    articles: 892,
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: Headphones,
    title: "Live Support",
    description: "Chat with our support team",
    articles: null,
    color: "text-emerald-600 bg-emerald-50",
  },
]

const faqs = [
  { 
    question: "How do I get started with Vzite?", 
    category: "Basics", 
    answer: "Sign up for an account and follow our interactive onboarding wizard. You can import your current leads via CSV or connect your portals directly to start seeing data in real-time." 
  },
  { 
    question: "Connecting Property Portals", 
    category: "Integrations", 
    answer: "Vzite supports direct API integration with Bayut, Property Finder, and Dubizzle. Simply navigate to Settings > Integrations and provide your XML feed or API keys." 
  },
  { 
    question: "Setting Up Lead Distribution", 
    category: "Lead Management", 
    answer: "You can create round-robin rules or weight-based distribution based on agent availability, location specialization, or lead source." 
  },
  { 
    question: "Meta Ads Integration Guide", 
    category: "Integrations", 
    answer: "Connect your Facebook Business Manager directly. Vzite will automatically capture lead form data and assign it to your sales team within seconds of submission." 
  },
]

function AccordionItem({ question, answer, category, isOpen, onClick }: any) {
  return (
    <div className={`group border-b border-slate-100 last:border-0 transition-all duration-300 ${isOpen ? 'bg-slate-50/50' : ''}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <div className="flex-1 pr-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 mb-2 block">{category}</span>
          <h3 className={`font-bold text-lg transition-colors duration-200 ${isOpen ? 'text-teal-700' : 'text-slate-900 group-hover:text-teal-600'}`}>
            {question}
          </h3>
        </div>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-teal-500 border-teal-500 rotate-180' : 'border-slate-200 group-hover:border-teal-500'}`}>
          <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-teal-500'}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 pt-0 text-slate-500 leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
            <TypewriterEffectSmooth words={[{ text: "How Can We Help?", className: "text-slate-900" }]} cursorClassName="bg-teal-500" />
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers, learn Vzite inside out, or reach out to our support team.
          </p>
        </div>
      </section>

      {/* Help Categories */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpCategories.map((cat) => (
              <div
                key={cat.title}
                className="group p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-teal-100 transition-all cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-4`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{cat.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
                {cat.articles && (
                  <div className="text-xs text-slate-400 mt-3">{cat.articles} articles</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="relative z-10 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Common Questions</h2>
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                {...faq}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
