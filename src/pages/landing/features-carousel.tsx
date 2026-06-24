import { useRef } from "react"
import { Building2, RotateCcw, Zap, Share2 } from "lucide-react"
import { getAssetUrl } from "@/lib/utils"

interface CardData {
  id: number
  category: string
  title: string
  description: string
  image: string
  accentColor: string
  cardBg: string
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
    image: "/marketing.png",
    accentColor: "from-blue-600/80 to-indigo-900/90",
    cardBg: "#1e3a6e",
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
    image: "/presentation.png",
    accentColor: "from-emerald-700/80 to-teal-900/90",
    cardBg: "#134e45",
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
    image: "/property-finder.png",
    accentColor: "from-orange-700/80 to-red-900/90",
    cardBg: "#7c2d12",
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
    image: "/leads.png",
    accentColor: "from-violet-700/80 to-purple-900/90",
    cardBg: "#2e1065",
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
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 md:py-32 bg-slate-50/50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Platform Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Powerful Tools for
              <br />
              Real Estate Success
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm md:text-right leading-relaxed">
            Each feature is purpose-built for UAE brokerages. Experience the full desktop workflow below.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div ref={containerRef} className="relative flex flex-col gap-10 md:gap-16" style={{ scrollBehavior: 'smooth' }}>
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className="sticky top-0 md:top-0 w-full"
              style={{ 
                marginTop: idx === 0 ? 0 : '2rem',
                scrollMarginTop: '0px',
                transitionDelay: `${idx * 80}ms`,
                transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <div className="rounded-[2rem] overflow-hidden border border-slate-200/50 shadow-md relative group">
                {/* Full bleed image */}
                <img
                  src={getAssetUrl(card.image)}
                  alt={card.title}
                  className="w-full h-auto"
                />

                {/* Gradient overlay so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                {/* Content overlaid at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 z-10">
                  <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-2">
                    {card.title}
                  </h3>

                  <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
