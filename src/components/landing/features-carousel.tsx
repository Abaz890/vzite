import { useState, useRef, useEffect } from "react"
import { X, ArrowLeft, ArrowRight, Building2, RotateCcw, Zap, Share2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface CardData {
  id: number
  category: string
  title: string
  description: string
  image: string
  accentColor: string
  icon: React.ElementType
  details: {
    headline: string
    points: string[]
    stat: { value: string; label: string }
  }
}

const cards: CardData[] = [
  {
    id: 1,
    category: "META AD SYNC",
    title: "Meta Ads & Conversions API",
    description: "Instantly capture and sync leads from Instagram & Facebook ads directly into your CRM pipeline.",
    image: "/feature-meta.webp",
    accentColor: "from-blue-600/80 to-indigo-900/90",
    icon: Share2,
    details: {
      headline: "Zero lead leakage from your Meta campaigns",
      points: [
        "Server-to-server Conversions API for 100% lead capture",
        "Auto-populate CRM fields from Facebook Lead Ads",
        "Real-time lead alerts to assigned agent's phone",
        "Map pipeline stages back to Meta for ROAS optimization",
        "Custom audience sync from your closed deals",
        "Campaign-level attribution per deal closed",
      ],
      stat: { value: "3.4×", label: "Average ROAS improvement" },
    },
  },
  {
    id: 2,
    category: "OFF-PLAN SUITE",
    title: "Off-Plan Launch Presenter",
    description: "Browse Emaar, Nakheel & DAMAC data layouts. Generate instant clean sheets for overseas buyers.",
    image: "/feature-offplan.webp",
    accentColor: "from-emerald-700/80 to-teal-900/90",
    icon: Building2,
    details: {
      headline: "Win off-plan mandates with a single tap",
      points: [
        "Live inventory from top UAE developers",
        "One-click professional PDF brochure generation",
        "WhatsApp-optimized sharing links for international buyers",
        "Payment plan calculator with auto AED/USD conversion",
        "Floor plan and unit type visual comparison",
        "Track buyer interest per project per agent",
      ],
      stat: { value: "68%", label: "Faster brochure delivery" },
    },
  },
  {
    id: 3,
    category: "PORTAL PUBLISHING",
    title: "Portal Multi-Posting Engine",
    description: "Publish and validate listings across Property Finder, Bayut & Dubizzle simultaneously in seconds.",
    image: "/feature-portals.webp",
    accentColor: "from-orange-700/80 to-red-900/90",
    icon: Zap,
    details: {
      headline: "One listing. Every major UAE portal.",
      points: [
        "Single-form publishing to all major portals",
        "Automatic compliance validation before submission",
        "TruCheck & Verified badge management",
        "Listing performance analytics by portal",
        "Bulk listing updates across all platforms at once",
        "Auto-refresh to maintain top search placement",
      ],
      stat: { value: "5×", label: "Faster listing publishing" },
    },
  },
  {
    id: 4,
    category: "LEAD ROUTING",
    title: "Lead Rotation Engine",
    description: "Intelligent, automated routing to connect hot leads with the right available agent in seconds.",
    image: "/feature-leads.webp",
    accentColor: "from-violet-700/80 to-purple-900/90",
    icon: RotateCcw,
    details: {
      headline: "No lead waits. No lead is lost.",
      points: [
        "Rule-based rotation: by area, language, or budget",
        "Round-robin fairness with weighted priority",
        "Agent availability detection via mobile app status",
        "Escalation logic if lead isn't claimed within X minutes",
        "Full audit trail of every assignment decision",
        "SLA enforcement with manager alerts",
      ],
      stat: { value: "< 90s", label: "Average lead response time" },
    },
  },
]

export function FeaturesCarousel() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [currentExpanded, setCurrentExpanded] = useState<CardData | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const expandCard = (card: CardData) => {
    setCurrentExpanded(card)
    setExpandedId(card.id)
    document.body.style.overflow = "hidden"
  }

  const closeCard = () => {
    setExpandedId(null)
    document.body.style.overflow = ""
  }

  const navigateCard = (dir: "prev" | "next") => {
    if (!currentExpanded) return
    const idx = cards.findIndex(c => c.id === currentExpanded.id)
    const newIdx = dir === "prev" ? (idx - 1 + cards.length) % cards.length : (idx + 1) % cards.length
    setCurrentExpanded(cards[newIdx])
    setExpandedId(cards[newIdx].id)
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCard()
      if (e.key === "ArrowLeft") navigateCard("prev")
      if (e.key === "ArrowRight") navigateCard("next")
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [currentExpanded])

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-xs font-semibold px-4 py-2 rounded-full mb-5 border border-violet-100">
              <Users className="w-3.5 h-3.5" />
              Platform Capabilities
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Powerful Tools for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Real Estate Success
              </span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm md:text-right leading-relaxed">
            Each feature is purpose-built for UAE brokerages. Click any card to explore the full workflow.
          </p>
        </div>

        {/* Scrollable card track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cards.map((card) => (
            <FeatureCard key={card.id} card={card} onExpand={() => expandCard(card)} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="flex items-center gap-2 mt-6 justify-center">
          <div className="text-xs text-slate-400">Scroll to explore</div>
          <div className="flex gap-1">
            {cards.map((c) => (
              <div key={c.id} className={cn("w-1.5 h-1.5 rounded-full transition-all", expandedId === c.id ? "bg-teal-500 w-4" : "bg-slate-200")} />
            ))}
          </div>
        </div>
      </div>

      {/* Expanded overlay */}
      {expandedId && currentExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={closeCard}>
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-fade-up max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card top image area */}
            <div className={`relative h-56 md:h-64 bg-gradient-to-br ${currentExpanded.accentColor} overflow-hidden`}>
              <img
                src={currentExpanded.image}
                alt={currentExpanded.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-full w-fit mb-3">
                  {currentExpanded.category}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white">{currentExpanded.title}</h3>
              </div>

              {/* Nav arrows */}
              <button onClick={() => navigateCard("prev")} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={() => navigateCard("next")} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={closeCard} className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 mb-5">{currentExpanded.details.headline}</h4>
                  <ul className="space-y-3">
                    {currentExpanded.details.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        </div>
                        <span className="text-sm text-slate-600 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-48 flex-shrink-0">
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 text-center border border-teal-100">
                    <div className="text-4xl font-black text-teal-700 mb-1">{currentExpanded.details.stat.value}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{currentExpanded.details.stat.label}</div>
                  </div>

                  <a
                    href="#"
                    className="mt-4 block w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-bold py-3 rounded-xl text-center hover:shadow-lg hover:shadow-teal-500/25 transition-all"
                  >
                    Book a Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function FeatureCard({ card, onExpand }: { card: CardData; onExpand: () => void }) {
  return (
    <button
      onClick={onExpand}
      className="flex-shrink-0 w-72 md:w-80 snap-start group relative rounded-2xl overflow-hidden cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      style={{ height: 420 }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${card.accentColor}`} />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-full w-fit mb-3">
          {card.category}
        </div>
        <h3 className="text-xl font-black text-white leading-tight mb-2">{card.title}</h3>
        <p className="text-sm text-white/70 leading-relaxed line-clamp-2">{card.description}</p>

        <div className="mt-4 flex items-center gap-2 text-white/80 text-xs font-semibold group-hover:text-white transition-colors">
          Explore feature
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  )
}
