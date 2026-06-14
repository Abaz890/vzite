import { Users, Hop as Home, UserCheck, Building2, MapPin, DollarSign, Calendar, Database, Shield, GitBranch, TrendingUp, SlidersHorizontal, RotateCcw, Briefcase, Megaphone, Settings, Monitor, Search, Star, Target, Video, Zap, AtSign, Globe, MessageSquare, RadioTower, Phone, Layers } from "lucide-react"

export interface PageData {
  id: string
  label: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
  color?: string
  category: "features" | "solutions" | "integrations"
  heroTitle?: string
  heroSubtitle?: string
  sections: {
    title: string
    description: string
    features?: { title: string; description: string }[]
    stat?: { value: string; label: string }
  }[]
  cta?: { primary?: string; secondary?: string }
}

export const featuresPages: PageData[] = [
  {
    id: "lead-management",
    label: "Lead Management",
    desc: "Capture, qualify & distribute",
    icon: Users,
    category: "features",
    heroTitle: "Capture Every Lead. Never Miss an Opportunity.",
    heroSubtitle: "From the moment a lead enters your system to the moment they sign, Vzite keeps every interaction tracked, qualified, and actionable.",
    sections: [
      {
        title: "Unified Lead Inbox",
        description: "All your leads from every source in one powerful inbox. Property Finder, Bayut, Dubizzle, Facebook, Instagram, TikTok, your website, walk-ins—centralized and ready for action.",
        stat: { value: "< 90s", label: "Average lead response time" },
        features: [
          { title: "Multi-source aggregation", description: "Automatic import from all connected portals and ad platforms" },
          { title: "Duplicate detection", description: "Smart merging prevents agents from chasing the same lead twice" },
          { title: "Priority scoring", description: "AI-powered lead scoring based on budget, intent, and engagement" },
        ]
      },
      {
        title: "Qualification Workflows",
        description: "Built-in qualification questionnaires that agents can complete in seconds, not minutes. Standardize your intake process without slowing anyone down.",
        features: [
          { title: "Custom qualification forms", description: "Build questionnaires that match your brokerage's criteria" },
          { title: "Automated field population", description: "Data from portals auto-fills, reducing manual entry" },
          { title: "Stage progression rules", description: "Leads automatically move based on qualification completion" },
        ]
      },
      {
        title: "Team Distribution",
        description: "Fair, intelligent lead distribution that keeps your team motivated and your leads responsive. Multiple routing strategies to match your culture.",
        stat: { value: "41%", label: "Faster lead-to-viewing conversion" },
        features: [
          { title: "Round-robin assignment", description: "Fair distribution with configurable weights" },
          { title: "Skill-based routing", description: "Match leads to agents by language, area, or property type" },
          { title: "Load balancing", description: "Prevent agent overload with active lead caps" },
        ]
      },
    ],
    cta: { primary: "See Lead Management Live", secondary: "Calculate Your Response ROI" }
  },
  {
    id: "listing-management",
    label: "Listing Management",
    desc: "Sync across all portals",
    icon: Home,
    category: "features",
    heroTitle: "One Listing. Every Portal. Zero Duplication.",
    heroSubtitle: "Create your listing once in Vzite, and publish it simultaneously to Property Finder, Bayut, Dubizzle, and more—all from a single screen.",
    sections: [
      {
        title: "Multi-Portal Publishing",
        description: "Stop logging into five different portals every time you have a new listing. Vzite's multi-portal engine pushes your listing everywhere in one click.",
        stat: { value: "5×", label: "Faster listing publication" },
        features: [
          { title: "Single-form entry", description: "One form to populate all portal-specific fields" },
          { title: "Validation engine", description: "Catch missing fields before submission" },
          { title: "Scheduled publishing", description: "Set listings to go live at optimal times" },
        ]
      },
      {
        title: "Portal Compliance",
        description: "Stay ahead of each portal's ever-changing requirements. Vzite validates your listings against Property Finder's TruCheck, Bayut's verification, and Dubizzle's standards.",
        features: [
          { title: "TruCheck assistant", description: "Know exactly what's needed for verified badges" },
          { title: "Photo requirements", description: "Auto-check image quality and quantity" },
          { title: "Field validation", description: "Portal-specific rules enforced before publish" },
        ]
      },
      {
        title: "Listing Performance",
        description: "See which listings perform best on which portals. Double down on what works, sunset what doesn't.",
        stat: { value: "37%", label: "Increase in listing inquiries" },
        features: [
          { title: "View and inquiry trends", description: "Track engagement across all portals" },
          { title: "Portal comparison", description: "See which platforms deliver your best leads" },
          { title: "Refresh scheduling", description: "Auto-refresh listings to maintain visibility" },
        ]
      },
    ],
    cta: { primary: "Streamline Your Listings", secondary: "See Portal Integrations" }
  },
  {
    id: "owners-management",
    label: "Owners Management",
    desc: "Build lasting relationships",
    icon: UserCheck,
    category: "features",
    heroTitle: "Property Owners Are Your Longest-Term Asset.",
    heroSubtitle: "Win more exclusive mandates by demonstrating unmatched owner care. Track every interaction, every property, and every promise.",
    sections: [
      {
        title: "Complete Owner Profiles",
        description: "Every property, every conversation, every valuation—organized and accessible. Know your owners better than they know themselves.",
        features: [
          { title: "Property portfolio tracking", description: "All properties linked to each owner profile" },
          { title: "Communication history", description: "Full timeline of calls, emails, and meetings" },
          { title: "Valuation history", description: "Track price recommendations over time" },
        ]
      },
      {
        title: "Mandate Management",
        description: "Never let an exclusive mandate expire unnoticed. Automated reminders, renewal workflows, and mandate performance tracking.",
        stat: { value: "67%", label: "Mandate renewal rate improvement" },
        features: [
          { title: "Expiry alerts", description: "Get notified before mandates expire" },
          { title: "Renewal workflows", description: "One-click mandate renewal with owner approval" },
          { title: "Performance-linked data", description: "Show owners exactly what you've done for them" },
        ]
      },
      {
        title: "Owner Engagement",
        description: "Proactive owner communication that builds trust. Send market updates, value changes, and listing performance with one click.",
        features: [
          { title: "Automated market reports", description: "Send owners monthly area insights" },
          { title: "Value change alerts", description: "Notify owners of favorable market shifts" },
          { title: "Listing performance shares", description: "Show owners how their property is performing" },
        ]
      },
    ],
    cta: { primary: "Transform Owner Relations", secondary: "Get Mandate Playbook" }
  },
  {
    id: "offplan-projects",
    label: "Off-Plan Projects",
    desc: "Catalog & pitch instantly",
    icon: Building2,
    category: "features",
    heroTitle: "Present Dubai's Finest Off-Plan Projects.",
    heroSubtitle: "Built for the international buyer era—showcase Emaar, Nakheel, and DAMAC projects to investors anywhere in the world.",
    sections: [
      {
        title: "Developer Inventory Feed",
        description: "Live unit availability from Emaar, Nakheel, DAMAC, Sobha, and 50+ developers. Updated daily with pricing, floor plans, and availability.",
        stat: { value: "50+", label: "Connected developers" },
        features: [
          { title: "Real-time availability", description: "See what's actually available, not what was listed last month" },
          { title: "Floor plan library", description: "Downloadable, shareable floor plans for every unit type" },
          { title: "Payment plan data", description: "Every developer's payment structure in one place" },
        ]
      },
      {
        title: "Instant Brochure Generation",
        description: "Create polished, branded PDF presentations in one click. Custom logos, agent details, payment plans, and unit specifications included.",
        features: [
          { title: "White-label branding", description: "Your logo, your colors, your contact details" },
          { title: "Multi-currency display", description: "AED, USD, EUR, GBP, RUB—auto-converted" },
          { title: "WhatsApp-ready links", description: "Mobile-optimized sharing for international buyers" },
        ]
      },
      {
        title: "International Buyer Tools",
        description: "Every feature designed for the global investor. Multi-currency calculators, time-zone-aware scheduling, and language preferences.",
        stat: { value: "68%", label: "Faster brochure delivery" },
        features: [
          { title: "Payment plan calculator", description: "Interactive post-handover and instalment calculators" },
          { title: "ROI projections", description: "Built-in rental yield and appreciation estimates" },
          { title: "Mobile-first presentations", description: "Present on your phone to walk-in or video-call buyers" },
        ]
      },
    ],
    cta: { primary: "Explore Off-Plan Tools", secondary: "See Developer Integrations" }
  },
  {
    id: "map-view",
    label: "Map View",
    desc: "Geo-visual property search",
    icon: MapPin,
    category: "features",
    heroTitle: "Properties in Context. Buyers with Confidence.",
    heroSubtitle: "Let your clients explore listings visually. Our map-first view shows schools, metros, malls, and key landmarks alongside every property.",
    sections: [
      {
        title: "Interactive Property Map",
        description: "Search by area, draw custom boundaries, and filter by property type—all on an interactive map that updates in real-time.",
        features: [
          { title: "Boundary drawing", description: "Define exact search areas by drawing on the map" },
          { title: "Layer controls", description: "Show/hide schools, metros, hospitals, malls" },
          { title: "Saved searches", description: "Save map views and share directly with clients" },
        ]
      },
      {
        title: "POI Integration",
        description: "Every point of interest that matters to buyers. Schools with ratings, metro stations with walking distances, and neighborhood amenities.",
        stat: { value: "12+", label: "POI categories" },
        features: [
          { title: "School catchments", description: "Show families their school zone options" },
          { title: "Transit proximity", description: "Walking time to nearest metro station" },
          { title: "Amenity clusters", description: "Malls, restaurants, healthcare within radius" },
        ]
      },
      {
        title: "Client-Facing Sharing",
        description: "Generate custom map views for clients. They see only what you want them to see—your curated selection in their preferred area.",
        features: [
          { title: "White-label maps", description: "Branded map views with your contact details" },
          { title: "Time-limited links", description: "Set expiration on shared map views" },
          { title: "Engagement tracking", description: "See which properties your client viewed most" },
        ]
      },
    ],
    cta: { primary: "See Map View in Action", secondary: "Schedule Live Demo" }
  },
  {
    id: "transactions-commissions",
    label: "Transactions & Commissions",
    desc: "Full deal lifecycle",
    icon: DollarSign,
    category: "features",
    heroTitle: "Every Dirham Tracked. Every Deal Closed.",
    heroSubtitle: "From initial offer to final handover, Vzite tracks every milestone, every document, and every commission split with full transparency.",
    sections: [
      {
        title: "Deal Pipeline",
        description: "Visual deal tracking from offer to close. See every deal in your pipeline, understand what's stuck, and forecast your month.",
        stat: { value: "100%", label: "Deal visibility" },
        features: [
          { title: "Stage tracking", description: "Offer, negotiation, SPA, deposit, handover" },
          { title: "Bottleneck alerts", description: "Get notified when deals stall" },
          { title: "Probability weighting", description: "Forecast revenue based on deal stage" },
        ]
      },
      {
        title: "Commission Management",
        description: "Complex splits made simple. Agent, team lead, brokerage, and referral commissions calculated automatically based on your rules.",
        features: [
          { title: "Custom split rules", description: "Define per-agent, per-deal-type commission structures" },
          { title: "Automated calculations", description: "Commission amounts calculated at deal creation" },
          { title: "Approval workflows", description: "Commission disbursements with manager sign-off" },
        ]
      },
      {
        title: "Document & Milestone Tracking",
        description: "Never miss a document or a deadline. SPA signing, deposit receipt, Oqood registration—all tracked and time-stamped.",
        stat: { value: "< 24h", label: "Average deal documentation time" },
        features: [
          { title: "Document checklist", description: "Per-deal-type document requirements enforced" },
          { title: "Milestone reminders", description: "Automated alerts for upcoming deadlines" },
          { title: "Full audit trail", description: "Every action logged with user and timestamp" },
        ]
      },
    ],
    cta: { primary: "Track Your Deals", secondary: "See Financial Reporting" }
  },
  {
    id: "calendar",
    label: "Calendar",
    desc: "Smart scheduling & reminders",
    icon: Calendar,
    category: "features",
    heroTitle: "Scheduling That Thinks Ahead.",
    heroSubtitle: "Property viewings, client calls, follow-ups, and team meetings—all in one calendar that syncs with your agents' devices and sends smart reminders.",
    sections: [
      {
        title: "Property Viewing Scheduler",
        description: "Let clients book viewings directly into your calendar. Auto-confirm available slots, send reminders, and log outcomes.",
        stat: { value: "82%", label: "Reduction in no-shows" },
        features: [
          { title: "Self-booking links", description: "Shareable links for clients to pick their slot" },
          { title: "Buffer time enforcement", description: "Prevent back-to-back viewings with travel time" },
          { title: "Multi-agent scheduling", description: "Coordinate viewings across your team" },
        ]
      },
      {
        title: "Smart Reminders",
        description: "Automated reminders that actually work. WhatsApp, SMS, email—your clients get reminded on their preferred channel.",
        features: [
          { title: "Multi-channel delivery", description: "WhatsApp, SMS, and email reminders" },
          { title: "Cascading alerts", description: "Remind at 24h, 2h, and 30m before" },
          { title: "Pre-visit checklists", description: "Send property notes and directions before arrival" },
        ]
      },
      {
        title: "Team Calendar Sync",
        description: "See your entire team's availability at a glance. Coordinate viewings, handoffs, and coverage without endless coordination.",
        stat: { value: "3×", label: "Faster schedule coordination" },
        features: [
          { title: "Team availability view", description: "See who's free for coverage" },
          { title: "Lead handoff scheduling", description: "Schedule viewings for colleagues' leads" },
          { title: "Google/Outlook sync", description: "Two-way sync with external calendars" },
        ]
      },
    ],
    cta: { primary: "Streamline Your Schedule", secondary: "See Calendar Integrations" }
  },
  {
    id: "vzite-database",
    label: "Vzite Database",
    desc: "Proprietary property data",
    icon: Database,
    category: "features",
    heroTitle: "Data Your Competitors Don't Have.",
    heroSubtitle: "Access Vzite's proprietary database of Dubai properties—with historical transaction data, ownership patterns, and market insights you won't find anywhere else.",
    sections: [
      {
        title: "Property Intel",
        description: "Look up any property in Dubai and see its full history: previous transactions, rental yields, developer reputation, and area trends.",
        stat: { value: "500K+", label: "Properties profiled" },
        features: [
          { title: "Transaction history", description: "Previous sale prices and dates" },
          { title: "Rental yield data", description: "Actual rental performance in the building" },
          { title: "Developer track record", description: "Delivery timelines and quality scores" },
        ]
      },
      {
        title: "Area Analytics",
        description: "Go beyond individual properties. See area-level trends: price per sqft, inventory levels, days on market, and buyer demographics.",
        features: [
          { title: "Price trend charts", description: "Historical and forecasted area prices" },
          { title: "Inventory analysis", description: "See supply dynamics in each neighborhood" },
          { title: "Buyer profile insights", description: "Understand who's buying in each area" },
        ]
      },
      {
        title: "Lead Enrichment",
        description: "When a new lead comes in, Vzite automatically enriches it with data: budget alignment, area preferences based on browsing, and recommended listings.",
        stat: { value: "45%", label: "Faster lead qualification" },
        features: [
          { title: "Budget matching", description: "Compare lead budget to area averages" },
          { title: "Interest profiling", description: "Infer area preference from engagement" },
          { title: "Listing recommendations", description: "Suggest properties likely to interest the lead" },
        ]
      },
    ],
    cta: { primary: "Explore Vzite Database", secondary: "Request Data Demo" }
  },
  {
    id: "database-management",
    label: "Database Management",
    desc: "Clean, structured records",
    icon: Shield,
    category: "features",
    heroTitle: "Your Data. Clean. Structured. Yours.",
    heroSubtitle: "Import, clean, dedupe, and maintain your brokerage's data with tools designed for real estate—not generic CRM cleanup scripts.",
    sections: [
      {
        title: "Smart Import & Mapping",
        description: "Import from Excel, legacy CRMs, or portal exports. Vzite maps fields automatically and flags inconsistencies before they become problems.",
        features: [
          { title: "Auto field mapping", description: "Vzite guesses where your data should go" },
          { title: "Format normalization", description: "Phone numbers, dates, currencies unified" },
          { title: "Preview before import", description: "See exactly what will be created" },
        ]
      },
      {
        title: "Deduplication Engine",
        description: "Find and merge duplicate records across leads, contacts, and properties. Stop agents from calling the same person twice.",
        stat: { value: "95%", label: "Duplicate detection accuracy" },
        features: [
          { title: "Fuzzy matching", description: "Find duplicates even with slight variations" },
          { title: "Merge workflows", description: "Review and approve merges before execution" },
          { title: "Continuous monitoring", description: "Alert when new duplicates are detected" },
        ]
      },
      {
        title: "Data Quality Dashboard",
        description: "See the health of your database at a glance. Missing fields, outdated info, and inactive records—all flagged and actionable.",
        features: [
          { title: "Completeness scores", description: "Track how complete your records are" },
          { title: "Freshness alerts", description: "Flag contacts not contacted in 90+ days" },
          { title: "Cleanup tasks", description: "Assign data quality tasks to your team" },
        ]
      },
    ],
    cta: { primary: "Clean Your Data", secondary: "Get Data Health Report" }
  },
  {
    id: "workflow-approvals",
    label: "Workflow & Approvals",
    desc: "Automate any process",
    icon: GitBranch,
    category: "features",
    heroTitle: "Automate the Mundane. Focus on the Deal.",
    heroSubtitle: "From lead assignment to commission disbursement, define workflows that run automatically—so your team can focus on clients, not paperwork.",
    sections: [
      {
        title: "Visual Workflow Builder",
        description: "Create complex automation without writing code. Drag, drop, and connect triggers, conditions, and actions in a visual builder.",
        stat: { value: "200+", label: "Pre-built workflow templates" },
        features: [
          { title: "Trigger library", description: "Field changes, stage moves, time events" },
          { title: "Conditional branching", description: "If this, then that—multiply branching" },
          { title: "Action palette", description: "Emails, task creation, field updates, webhooks" },
        ]
      },
      {
        title: "Approval Workflows",
        description: "Ensure nothing happens without the right sign-off. Discounts, commission splits, off-plan deals—require approval based on your rules.",
        features: [
          { title: "Multi-level approvals", description: "Team lead then manager then finance" },
          { title: "Parallel approvals", description: "Multiple approvers at the same level" },
          { title: "Escalation rules", description: "Auto-escalate if no response in X hours" },
        ]
      },
      {
        title: "Process Templates",
        description: "Start with best-practice templates for common real estate processes, then customize to your brokerage's needs.",
        stat: { value: "78%", label: "Faster process setup" },
        features: [
          { title: "Listing publication flow", description: "Draft → review → approve → publish" },
          { title: "Deal approval chain", description: "Offer → manager → finance → close" },
          { title: "Onboarding sequence", description: "New agent setup with task assignments" },
        ]
      },
    ],
    cta: { primary: "Automate Your Workflows", secondary: "See Workflow Examples" }
  },
  {
    id: "kpi-insights",
    label: "KPI & Insights",
    desc: "Real-time performance data",
    icon: TrendingUp,
    category: "features",
    heroTitle: "Data-Driven Brokerages Win More.",
    heroSubtitle: "Real-time dashboards that show what's actually happening in your business. Lead conversion, agent performance, deal velocity—at a glance.",
    sections: [
      {
        title: "Agent Performance Dashboard",
        description: "See every agent's metrics in real-time: leads worked, viewings scheduled, offers made, deals closed. Leaderboards that drive healthy competition.",
        stat: { value: "34%", label: "Performance improvement after dashboard adoption" },
        features: [
          { title: "Activity metrics", description: "Calls, emails, viewings per agent" },
          { title: "Conversion funnel", description: "Lead to viewing to offer to close" },
          { title: "Leaderboards", description: "Daily, weekly, monthly rankings" },
        ]
      },
      {
        title: "Business Health Metrics",
        description: "The numbers that matter to leadership: pipeline value, forecast revenue, inventory levels, and market share trends.",
        features: [
          { title: "Pipeline dashboard", description: "Deals by stage with probability weighting" },
          { title: "Forecast revenue", description: "Month-end predictions based on pipeline" },
          { title: "Inventory tracking", description: "Active listings vs sold vs expired" },
        ]
      },
      {
        title: "Custom Reports",
        description: "Build reports that match your exact needs. Filter by agent, area, property type, time period—and export to Excel or schedule email delivery.",
        stat: { value: "50+", label: "Report templates" },
        features: [
          { title: "Report builder", description: "Drag-and-drop report construction" },
          { title: "Scheduled delivery", description: "Auto-email reports to stakeholders" },
          { title: "Export options", description: "Excel, PDF, and live link sharing" },
        ]
      },
    ],
    cta: { primary: "See KPI Dashboard", secondary: "Request Custom Report" }
  },
  {
    id: "custom-fields",
    label: "Custom Fields",
    desc: "Tailor your pipeline",
    icon: SlidersHorizontal,
    category: "features",
    heroTitle: "Your Business. Your Fields. Your Way.",
    heroSubtitle: "Not every brokerage works the same. Create custom fields, stages, and data structures that match your unique way of doing business.",
    sections: [
      {
        title: "Custom Field Builder",
        description: "Add any field to any record type. Text, numbers, dropdowns, multi-select, dates, currency—configured exactly how you need it.",
        features: [
          { title: "Field types", description: "Text, number, date, currency, select, multi-select, file" },
          { title: "Validation rules", description: "Required fields, format constraints, min/max values" },
          { title: "Conditional visibility", description: "Show fields only when relevant" },
        ]
      },
      {
        title: "Custom Stages & Pipelines",
        description: "Define your own stages for leads, listings, and deals. Match the terminology your team actually uses.",
        stat: { value: "Unlimited", label: "Custom stages" },
        features: [
          { title: "Stage naming", description: "Call stages whatever makes sense" },
          { title: "Stage requirements", description: "Require certain fields before advancing" },
          { title: "Stage automation", description: "Auto-trigger actions on stage change" },
        ]
      },
      {
        title: "Data Migration Support",
        description: "Already have fields from your old system? Vzite's import team maps your existing data structures to your new custom fields.",
        features: [
          { title: "Legacy field mapping", description: "Preserve data from old CRM fields" },
          { title: "Bulk updates", description: "Update thousands of records at once" },
          { title: "Historical data import", description: "Bring in past records with full context" },
        ]
      },
    ],
    cta: { primary: "Customize Your CRM", secondary: "See Field Examples" }
  },
  {
    id: "lead-rotation",
    label: "Lead Rotation",
    desc: "Intelligent auto-routing",
    icon: RotateCcw,
    category: "features",
    heroTitle: "No Lead Waits. No Lead Is Lost.",
    heroSubtitle: "Intelligent, automated routing that connects hot leads with the right available agent in seconds—fairly, efficiently, and transparently.",
    sections: [
      {
        title: "Routing Strategies",
        description: "Multiple routing modes to match your team culture. Round-robin for fairness, skill-based for quality, load-balanced for efficiency.",
        stat: { value: "< 90s", label: "Average lead assignment time" },
        features: [
          { title: "Round-robin", description: "Fair distribution with configurable weights" },
          { title: "Skill-based routing", description: "Match leads to agents by language, area, expertise" },
          { title: "Load balancing", description: "Distribute based on current active lead count" },
        ]
      },
      {
        title: "Availability Detection",
        description: "Know when agents are actually available. Status signals from mobile app, calendar integration, and override controls.",
        features: [
          { title: "Mobile status sync", description: "Agent sets availability from their phone" },
          { title: "Calendar integration", description: "Auto-unavailable during blocked times" },
          { title: "Manager override", description: "Admins can force route when needed" },
        ]
      },
      {
        title: "SLA Enforcement",
        description: "When a lead isn't responded to in time, escalation kicks in. Backup agents, manager alerts, and audit trails ensure no lead falls through.",
        stat: { value: "99.9%", label: "Lead response compliance" },
        features: [
          { title: "Response time SLAs", description: "Define acceptable response windows" },
          { title: "Escalation chains", description: "When SLA breached, escalate to backup" },
          { title: "Full audit trail", description: "Every assignment, escalation, and response logged" },
        ]
      },
    ],
    cta: { primary: "See Lead Rotation Live", secondary: "Calculate Your Response ROI" }
  },
]

export const solutionsPages: PageData[] = [
  {
    id: "management",
    label: "Management",
    desc: "Full organizational control",
    icon: Briefcase,
    category: "solutions",
    heroTitle: "Complete Visibility. Total Control.",
    heroSubtitle: "For brokerage owners and managers who need to see everything, approve anything, and drive team performance without micromanagement.",
    sections: [
      {
        title: "Team Oversight Dashboard",
        description: "See every agent's activity in real-time. Who's working, who's idle, who's closing—and who needs support.",
        stat: { value: "360°", label: "Team visibility" },
        features: [
          { title: "Live activity feed", description: "Real-time actions across your team" },
          { title: "Performance comparisons", description: "Benchmark agents against each other" },
          { title: "Anomaly detection", description: "Get alerts when metrics deviate from normal" },
        ]
      },
      {
        title: "Approval Workflows",
        description: "Nothing slips through. Require approval for discounts, commission splits, and deal terms—with full audit trails.",
        features: [
          { title: "Configurable thresholds", description: "Set approval requirements by deal size" },
          { title: "Mobile approvals", description: "Approve requests from your phone" },
          { title: "Escalation timers", description: "Auto-escalate if no response in time" },
        ]
      },
      {
        title: "Strategic Reporting",
        description: "Reports designed for leadership. Monthly board packs, quarterly reviews, and year-over-year trend analysis.",
        stat: { value: "15+", label: "Leadership report templates" },
        features: [
          { title: "Executive dashboards", description: "High-level KPIs at a glance" },
          { title: "Trend analysis", description: "YoY, QoQ, MoM comparisons" },
          { title: "Scheduled delivery", description: "Auto-email reports to stakeholders" },
        ]
      },
    ],
    cta: { primary: "See Management Dashboard", secondary: "Book Leadership Demo" }
  },
  {
    id: "sales",
    label: "Sales",
    desc: "Close deals faster",
    icon: TrendingUp,
    category: "solutions",
    heroTitle: "Tools Built for Closers.",
    heroSubtitle: "Everything your sales team needs to move leads to deals faster—without the friction of jumping between tools, apps, and spreadsheets.",
    sections: [
      {
        title: "Lead Inbox",
        description: "All leads from all sources in one prioritized inbox. Smart scoring, quick qualification, and instant outreach tools.",
        stat: { value: "< 90s", label: "Average first response" },
        features: [
          { title: "Smart prioritization", description: "Leads sorted by likelihood to close" },
          { title: "Quick actions", description: "Call, WhatsApp, email from the inbox" },
          { title: "Bulk operations", description: "Process multiple leads at once" },
        ]
      },
      {
        title: "Deal Collaboration",
        description: "Work deals with your team without stepping on each other. Co-ownership, handoff workflows, and shared notes.",
        features: [
          { title: "Deal rooms", description: "Shared spaces for active deals" },
          { title: "Activity feed", description: "See all actions on your deals" },
          { title: "Mention colleagues", description: "Get help with @mentions" },
        ]
      },
      {
        title: "Commission Visibility",
        description: "See your earnings in real-time. Deal-by-deal commission tracking, period totals, and payout projections.",
        stat: { value: "100%", label: "Commission transparency" },
        features: [
          { title: "Deal calculator", description: "See commission at deal creation" },
          { title: "Period summaries", description: "Track earnings by month/quarter" },
          { title: "Payout notifications", description: "Get alerts when commissions are paid" },
        ]
      },
    ],
    cta: { primary: "See Sales Tools Live", secondary: "Calculate Agent ROI" }
  },
  {
    id: "marketing",
    label: "Marketing",
    desc: "Smarter campaign tools",
    icon: Megaphone,
    category: "solutions",
    heroTitle: "Campaigns That Actually Convert.",
    heroSubtitle: "Marketing tools built for real estate—Meta ad integration, portal performance tracking, and lead source attribution.",
    sections: [
      {
        title: "Channel Performance",
        description: "See which channels bring the best leads—Property Finder, Bayut, Facebook, Instagram, TikTok—with full attribution.",
        stat: { value: "17+", label: "Integrated channels" },
        features: [
          { title: "Cost per lead", description: "Actual CPL by channel and campaign" },
          { title: "Lead quality scores", description: "Conversion rate by source" },
          { title: "ROI tracking", description: "Marketing spend vs. closed deals" },
        ]
      },
      {
        title: "Meta Ads Integration",
        description: "Connect your Facebook and Instagram ads directly to Vzite. Conversions API for accurate tracking and lead sync for instant response.",
        features: [
          { title: "Lead form sync", description: "Facebook Lead Ads auto-import" },
          { title: "Conversions API", description: "Server-side event tracking for ROAS" },
          { title: "Audience sync", description: "Push closed buyers to Meta for lookalikes" },
        ]
      },
      {
        title: "Content Generation",
        description: "Generate listing descriptions, social posts, and email copy with AI assistance. Consistent messaging across all channels.",
        stat: { value: "10×", label: "Faster content creation" },
        features: [
          { title: "Listing descriptions", description: "AI-generated property writeups" },
          { title: "Social post templates", description: "Instagram and Facebook post builders" },
          { title: "Email campaigns", description: "Drip sequences with dynamic content" },
        ]
      },
    ],
    cta: { primary: "See Marketing Tools", secondary: "Calculate Marketing ROI" }
  },
  {
    id: "admins-operations",
    label: "Admins & Operations",
    desc: "Streamline back-office",
    icon: Settings,
    category: "solutions",
    heroTitle: "Operations That Run Like Clockwork.",
    heroSubtitle: "For the team that makes everything work—tools for onboarding, data management, compliance, and process enforcement.",
    sections: [
      {
        title: "Agent Onboarding",
        description: "Get new agents productive in days, not weeks. Automated task assignments, training checklists, and permission setup.",
        stat: { value: "70%", label: "Faster agent onboarding" },
        features: [
          { title: "Onboarding workflows", description: "Auto-assign onboarding tasks" },
          { title: "Training checklists", description: "Track training completion" },
          { title: "Permission templates", description: "Apply role-based access in one click" },
        ]
      },
      {
        title: "Data Administration",
        description: "Keep your database clean and current. Import tools, deduplication, and bulk operations.",
        features: [
          { title: "Import wizard", description: "Step-by-step data import" },
          { title: "Merge tools", description: "Find and merge duplicates" },
          { title: "Bulk edits", description: "Update thousands of records at once" },
        ]
      },
      {
        title: "System Configuration",
        description: "Configure Vzite to match your brokerage. Custom fields, stages, workflows, and integrations—all manageable without developers.",
        stat: { value: "Zero", label: "Developer required" },
        features: [
          { title: "Visual builders", description: "Configure with drag-and-drop" },
          { title: "Instant preview", description: "See changes before publishing" },
          { title: "Version history", description: "Rollback when needed" },
        ]
      },
    ],
    cta: { primary: "See Admin Tools", secondary: "Request Admin Demo" }
  },
  {
    id: "accounts",
    label: "Accounts",
    desc: "Financial transparency",
    icon: DollarSign,
    category: "solutions",
    heroTitle: "Every Dirham Accounted For.",
    heroSubtitle: "Finance teams get the visibility they need—deal-level transaction tracking, commission management, and financial reporting.",
    sections: [
      {
        title: "Deal-Level Tracking",
        description: "See the financial story of every deal: offer price, commission, splits, deductions, and net payout—all in one view.",
        stat: { value: "100%", label: "Deal financial visibility" },
        features: [
          { title: "Commission calculator", description: "See splits at deal creation" },
          { title: "Adjustment tracking", description: "Document deductions and bonuses" },
          { title: "Payout scheduling", description: "Plan and track disbursements" },
        ]
      },
      {
        title: "Financial Reporting",
        description: "Standard financial reports for brokerage accounting. Revenue by period, commission liability, and agent earnings.",
        features: [
          { title: "Revenue tracking", description: "Commission income by month/quarter" },
          { title: "Liability reports", description: "Outstanding commissions owed" },
          { title: "Agent statements", description: "Individual earnings summaries" },
        ]
      },
      {
        title: "Audit & Compliance",
        description: "Full audit trails for every financial action. Know who changed what, when, and why—with exportable logs for auditors.",
        stat: { value: "Full", label: "Audit trail coverage" },
        features: [
          { title: "Action logging", description: "Every change time-stamped and attributed" },
          { title: "Exportable logs", description: "Download for external audit" },
          { title: "Retention policies", description: "Configure data retention periods" },
        ]
      },
    ],
    cta: { primary: "See Financial Tools", secondary: "Request Finance Demo" }
  },
  {
    id: "it",
    label: "IT",
    desc: "Secure infrastructure",
    icon: Monitor,
    category: "solutions",
    heroTitle: "Enterprise-Grade. Zero Maintenance.",
    heroSubtitle: "Your IT team will love Vzite. Hosted infrastructure, SSO integration, role-based access, and security compliance—all handled.",
    sections: [
      {
        title: "Security & Compliance",
        description: "Enterprise security standards without the enterprise price tag. SSO, 2FA, encryption at rest and in transit, and access controls.",
        stat: { value: "SOC 2", label: "Compliant" },
        features: [
          { title: "SSO integration", description: "Connect to Okta, Azure AD, Google Workspace" },
          { title: "Two-factor auth", description: "Enforce 2FA for all users or specific roles" },
          { title: "Data encryption", description: "AES-256 at rest, TLS 1.3 in transit" },
        ]
      },
      {
        title: "Role-Based Access",
        description: "Granular permissions that match your org chart. Control who sees what, who can export, and who can configure.",
        features: [
          { title: "Permission templates", description: "Pre-configured roles for quick setup" },
          { title: "Custom roles", description: "Define permissions at the field level" },
          { title: "Team hierarchies", description: "Managers see their team's data" },
        ]
      },
      {
        title: "Integration Management",
        description: "Connect Vzite to your existing stack. API access for custom integrations, plus pre-built connectors for common tools.",
        stat: { value: "99.9%", label: "Uptime SLA" },
        features: [
          { title: "REST API", description: "Full API for custom integrations" },
          { title: "Webhooks", description: "Real-time event notifications" },
          { title: "Pre-built connectors", description: "Zapier, Google, Microsoft integrations" },
        ]
      },
    ],
    cta: { primary: "See IT Documentation", secondary: "Request Security Review" }
  },
]

export const integrationsPages: PageData[] = [
  {
    id: "property-finder",
    label: "Property Finder",
    desc: "UAE's leading property portal",
    icon: Search,
    color: "text-red-500",
    category: "integrations",
    heroTitle: "Property Finder Integration",
    heroSubtitle: "Automatic listing sync, lead import, and TruCheck validation—all connected to your Vzite workflow.",
    sections: [
      {
        title: "Listing Sync",
        description: "Publish listings directly to Property Finder from Vzite. Auto-validate against TruCheck requirements before submission.",
        stat: { value: "Real-time", label: "Listing sync" },
        features: [
          { title: "Multi-listing publish", description: "Push multiple listings at once" },
          { title: "TruCheck validation", description: "Know what's needed for verified badges" },
          { title: "Performance tracking", description: "Views, inquiries, and leads from Property Finder" },
        ]
      },
      {
        title: "Lead Import",
        description: "Every Property Finder inquiry lands in Vzite within seconds. Auto-assigned based on your rotation rules.",
        features: [
          { title: "Instant import", description: "Leads appear in Vzite within 30 seconds" },
          { title: "Field mapping", description: "All Property Finder fields captured" },
          { title: "Source attribution", description: "Track lead origin for reporting" },
        ]
      },
    ],
    cta: { primary: "Connect Property Finder", secondary: "See All Portal Integrations" }
  },
  {
    id: "bayut",
    label: "Bayut",
    desc: "UAE's fastest-growing portal",
    icon: Home,
    color: "text-orange-500",
    category: "integrations",
    heroTitle: "Bayut Integration",
    heroSubtitle: "Seamless sync with Bayut's ecosystem—listings, leads, and performance analytics all connected.",
    sections: [
      {
        title: "Unified Publishing",
        description: "Publish to Bayut alongside other portals from one Vzite form. Bayut-specific validation ensures your listings go live fast.",
        features: [
          { title: "Field optimization", description: "Auto-optimize for Bayut's search algorithm" },
          { title: "Photo requirements", description: "Meet Bayut's image quality standards" },
          { title: "Category mapping", description: "Correct property types for Bayut taxonomy" },
        ]
      },
      {
        title: "Lead Capture",
        description: "Bayut inquiries flow directly into your Vzite pipeline. Every call, email, and WhatsApp logged automatically.",
        stat: { value: "30s", label: "Average lead import time" },
        features: [
          { title: "Multi-channel capture", description: "Phone, email, and WhatsApp leads" },
          { title: "Lead enrichment", description: "Property interests from inquiry context" },
          { title: "Auto-assignment", description: "Route to agents by area or property type" },
        ]
      },
    ],
    cta: { primary: "Connect Bayut", secondary: "See All Portal Integrations" }
  },
  {
    id: "dubizzle",
    label: "Dubizzle",
    desc: "Dubai's classifieds leader",
    icon: Building2,
    color: "text-green-500",
    category: "integrations",
    heroTitle: "Dubizzle Integration",
    heroSubtitle: "Connect Dubai's most popular classifieds platform to your Vzite workflow for wider reach.",
    sections: [
      {
        title: "Listing Distribution",
        description: "Reach Dubizzle's audience with one-click publishing. Automatic field mapping and category selection.",
        features: [
          { title: "Category optimization", description: "Auto-select correct Dubizzle category" },
          { title: "Title optimization", description: "Dubizzle-friendly listing titles" },
          { title: "Refresh automation", description: "Auto-refresh to maintain visibility" },
        ]
      },
      {
        title: "Inquiry Management",
        description: "Dubizzle inquiries captured and logged in Vzite. Know exactly where each lead came from.",
        stat: { value: "100%", label: "Inquiry capture rate" },
        features: [
          { title: "Source tracking", description: "All Dubizzle leads labeled" },
          { title: "Response tracking", description: "Measure response time by platform" },
          { title: "Conversion analytics", description: "Compare Dubizzle to other sources" },
        ]
      },
    ],
    cta: { primary: "Connect Dubizzle", secondary: "See All Portal Integrations" }
  },
  {
    id: "jamesedition",
    label: "JamesEdition",
    desc: "Luxury property network",
    icon: Star,
    color: "text-yellow-500",
    category: "integrations",
    heroTitle: "JamesEdition Integration",
    heroSubtitle: "Connect to the global luxury property network. Showcase premium listings to international high-net-worth buyers.",
    sections: [
      {
        title: "Luxury Listing Sync",
        description: "Push your premium listings to JamesEdition's global network. Automatic formatting for luxury property standards.",
        features: [
          { title: "Luxury formatting", description: "Auto-apply JamesEdition's presentation standards" },
          { title: "Currency display", description: "Multi-currency for international buyers" },
          { title: "Photo curation", description: "Select best images for luxury showcase" },
        ]
      },
      {
        title: "International Leads",
        description: "Capture inquiries from JamesEdition's global audience. All leads flow into Vzite with source attribution.",
        stat: { value: "190+", label: "Countries reached" },
        features: [
          { title: "Global reach", description: "Access to international HNW buyers" },
          { title: "Lead routing", description: "Route international leads to specialist agents" },
          { title: "Time-zone handling", description: "Smart scheduling for global leads" },
        ]
      },
    ],
    cta: { primary: "Connect JamesEdition", secondary: "See Luxury Channel Options" }
  },
  {
    id: "meta-ads",
    label: "Meta Ads",
    desc: "Facebook & Instagram advertising",
    icon: Target,
    color: "text-blue-500",
    category: "integrations",
    heroTitle: "Native Meta Integration",
    heroSubtitle: "The only CRM with true Meta partnership. Conversions API, lead form sync, and audience optimization—all built-in.",
    sections: [
      {
        title: "Conversions API",
        description: "Server-to-server event tracking for accurate ROAS. No pixel dependency—capture every conversion even with ad blockers.",
        stat: { value: "3.4×", label: "Average ROAS improvement" },
        features: [
          { title: "Server-side tracking", description: "100% conversion capture" },
          { title: "Event optimization", description: "Feed Meta the events that matter" },
          { title: "Attribution clarity", description: "Know which ads actually closed deals" },
        ]
      },
      {
        title: "Lead Form Sync",
        description: "Facebook and Instagram Lead Ads import automatically. Leads land in Vzite within seconds of form submission.",
        features: [
          { title: "Instant import", description: "Leads appear in under 30 seconds" },
          { title: "Field mapping", description: "All lead form data captured" },
          { title: "Auto-response", description: "Trigger WhatsApp/messages on lead capture" },
        ]
      },
      {
        title: "Audience Sync",
        description: "Push your best profiles back to Meta. Create lookalike audiences from closed buyers for ever-improving campaigns.",
        stat: { value: "41%", label: "Lower cost per lead" },
        features: [
          { title: "Custom audiences", description: "Sync closed buyers to Meta" },
          { title: "Lookalike generation", description: "Find more buyers like your best" },
          { title: "Exclusion lists", description: "Don't advertise to existing clients" },
        ]
      },
    ],
    cta: { primary: "See Meta Integration Live", secondary: "Calculate Ad ROI" }
  },
  {
    id: "google-ads",
    label: "Google Ads",
    desc: "Search & display advertising",
    icon: Target,
    color: "text-red-400",
    category: "integrations",
    heroTitle: "Google Ads Integration",
    heroSubtitle: "Connect your Google Ads campaigns to Vzite for unified lead tracking and conversion optimization.",
    sections: [
      {
        title: "Conversion Tracking",
        description: "Track which Google Ads campaigns, ad groups, and keywords actually produce closed deals.",
        features: [
          { title: "Offline conversion import", description: "Feed deal closures back to Google" },
          { title: "Keyword attribution", description: "Know which searches convert" },
          { title: "Campaign optimization", description: "Optimize spend on what works" },
        ]
      },
      {
        title: "Lead Import",
        description: "Leads from Google Ads landing pages flow directly into Vzite with full source attribution.",
        stat: { value: "Real-time", label: "Lead import" },
        features: [
          { title: "UTM tracking", description: "Full campaign attribution" },
          { title: "Landing page sync", description: "Connect forms to Vzite" },
          { title: "Lead scoring", description: "Score Google Ads leads by intent" },
        ]
      },
    ],
    cta: { primary: "Connect Google Ads", secondary: "See Ad Integrations" }
  },
  {
    id: "google-calendar",
    label: "Google Calendar",
    desc: "Calendar synchronization",
    icon: Calendar,
    color: "text-blue-400",
    category: "integrations",
    heroTitle: "Google Calendar Integration",
    heroSubtitle: "Two-way sync with Google Calendar. Vzite events appear in Google, Google events appear in Vzite.",
    sections: [
      {
        title: "Two-Way Sync",
        description: "Viewings scheduled in Vzite appear in your Google Calendar. Block time in Google and it's reflected in Vzite.",
        features: [
          { title: "Instant sync", description: "Changes reflect in under 60 seconds" },
          { title: "Conflict detection", description: "Prevent double-booking" },
          { title: "Team calendars", description: "Sync team availability" },
        ]
      },
      {
        title: "Viewing Automation",
        description: "When a client books a viewing via Vzite, it instantly appears on your Google Calendar with all details.",
        stat: { value: "60s", label: "Calendar update time" },
        features: [
          { title: "Client self-booking", description: "Let clients pick their slot" },
          { title: "Automated reminders", description: "Google Calendar reminders" },
          { title: "Location links", description: "Google Maps integration" },
        ]
      },
    ],
    cta: { primary: "Connect Google Calendar", secondary: "See Calendar Tools" }
  },
  {
    id: "tiktok",
    label: "TikTok",
    desc: "Video-first advertising",
    icon: Video,
    color: "text-pink-500",
    category: "integrations",
    heroTitle: "TikTok Integration",
    heroSubtitle: "Capture the TikTok generation. Lead form sync and conversion tracking for your video campaigns.",
    sections: [
      {
        title: "Lead Form Sync",
        description: "TikTok Lead Gen forms connect directly to Vzite. Every form submission becomes a lead in your pipeline.",
        features: [
          { title: "Instant sync", description: "Leads appear in Vzite immediately" },
          { title: "Field mapping", description: "Name, phone, interests all captured" },
          { title: "Source labeling", description: "All TikTok leads clearly identified" },
        ]
      },
      {
        title: "Conversion Events",
        description: "Send conversion events back to TikTok. Help the algorithm find more people like your best buyers.",
        stat: { value: "41%", label: "Lower CPL with conversion feedback" },
        features: [
          { title: "Event tracking", description: "Lead, viewing, offer, close events" },
          { title: "Audience building", description: "Create TikTok audiences from Vzite data" },
          { title: "Campaign optimization", description: "Feed TikTok the conversions that matter" },
        ]
      },
    ],
    cta: { primary: "Connect TikTok", secondary: "See Social Ad Integrations" }
  },
  {
    id: "zapier",
    label: "Zapier",
    desc: "Connect 5000+ apps",
    icon: Zap,
    color: "text-orange-400",
    category: "integrations",
    heroTitle: "Zapier Integration",
    heroSubtitle: "Connect Vzite to 5000+ apps without code. Automate workflows across your entire tech stack.",
    sections: [
      {
        title: "Pre-Built Zaps",
        description: "Start with templates for common real estate workflows. Connect Vzite to Gmail, Slack, spreadsheets, and more.",
        stat: { value: "50+", label: "Vzite Zap templates" },
        features: [
          { title: "Template library", description: "Ready-to-use automation recipes" },
          { title: "One-click setup", description: "Connect apps in seconds" },
          { title: "Community templates", description: "Automations built by other brokers" },
        ]
      },
      {
        title: "Custom Automations",
        description: "Build your own Zaps with Vzite's triggers and actions. When X happens in Vzite, do Y in any connected app.",
        features: [
          { title: "Triggers", description: "New lead, stage change, deal close" },
          { title: "Actions", description: "Create record, update field, send notification" },
          { title: "Webhooks", description: "Real-time event streaming" },
        ]
      },
    ],
    cta: { primary: "See Zapier Templates", secondary: "Browse Integration Marketplace" }
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    desc: "Professional network",
    icon: AtSign,
    color: "text-blue-600",
    category: "integrations",
    heroTitle: "LinkedIn Integration",
    heroSubtitle: "Generate leads from LinkedIn and sync your professional network to Vzite.",
    sections: [
      {
        title: "Lead Gen Forms",
        description: "LinkedIn Lead Gen form submissions flow directly into Vzite. All professional data captured.",
        features: [
          { title: "Form sync", description: "Auto-import LinkedIn leads" },
          { title: "Professional data", description: "Job title, company, industry captured" },
          { title: "B2B targeting", description: "Reach investors and corporate buyers" },
        ]
      },
      {
        title: "Contact Sync",
        description: "Import your LinkedIn connections as contacts in Vzite. Enrich your database with professional context.",
        stat: { value: "100%", label: "Field mapping coverage" },
        features: [
          { title: "Bulk import", description: "Import connections in one click" },
          { title: "Profile enrichment", description: "Auto-fill job title, company" },
          { title: "Connection tracking", description: "See who you're connected to" },
        ]
      },
    ],
    cta: { primary: "Connect LinkedIn", secondary: "See Social Integrations" }
  },
  {
    id: "websites-landing-pages",
    label: "Websites & Landing Pages",
    desc: "Your web presence",
    icon: Globe,
    color: "text-teal-500",
    category: "integrations",
    heroTitle: "Website & Landing Page Integration",
    heroSubtitle: "Capture leads from your website and landing pages. Every form submission flows into Vzite automatically.",
    sections: [
      {
        title: "Form Integration",
        description: "Embed Vzite forms on any website. Or connect your existing forms via webhook—a few clicks, no coding.",
        features: [
          { title: "Embedded forms", description: "Vzite form code for your site" },
          { title: "Webhook connection", description: "Connect existing forms" },
          { title: "Lead enrichment", description: "Capture UTM parameters and source data" },
        ]
      },
      {
        title: "Landing Page Builder",
        description: "Create beautiful listing-specific landing pages without developers. Share individual properties with trackable links.",
        stat: { value: "10min", label: "Average landing page creation" },
        features: [
          { title: "Templates", description: "Pre-designed real estate templates" },
          { title: "Branding", description: "Your logo, colors, contact" },
          { title: "Analytics", description: "Track visits, time on page, CTA clicks" },
        ]
      },
    ],
    cta: { primary: "See Website Integration", secondary: "Create Landing Page" }
  },
  {
    id: "manychat",
    label: "ManyChat",
    desc: "Messenger automation",
    icon: MessageSquare,
    color: "text-purple-500",
    category: "integrations",
    heroTitle: "ManyChat Integration",
    heroSubtitle: "Connect your Messenger chatbot to Vzite. Bot conversations become CRM records automatically.",
    sections: [
      {
        title: "Bot-to-CRM Sync",
        description: "Every ManyChat conversation creates or updates a lead in Vzite. Capture data from bot flows automatically.",
        features: [
          { title: "Conversation sync", description: "All bot data flows to Vzite" },
          { title: "Custom fields", description: "Map ManyChat fields to Vzite fields" },
          { title: "Conversation history", description: "Full transcript logged" },
        ]
      },
      {
        title: "Handoff Automation",
        description: "When a bot conversation qualifies, automatically create a lead and alert an agent.",
        stat: { value: "24/7", label: "Lead capture" },
        features: [
          { title: "Qualification triggers", description: "Auto-create lead when qualified" },
          { title: "Agent alerts", description: "Notify agents of hot bot leads" },
          { title: "Follow-up automation", description: "Schedule outreach after handoff" },
        ]
      },
    ],
    cta: { primary: "Connect ManyChat", secondary: "See Messenger Integrations" }
  },
  {
    id: "property-booster",
    label: "Property Booster",
    desc: "Portal performance tool",
    icon: RadioTower,
    color: "text-emerald-500",
    category: "integrations",
    heroTitle: "Property Booster Integration",
    heroSubtitle: "Amplify your portal presence. Property Booster integration for enhanced listing performance.",
    sections: [
      {
        title: "Performance Enhancement",
        description: "Boost your listing visibility on connected portals. Understand what drives views and inquiries.",
        features: [
          { title: "Visibility analytics", description: "See ranking factors for each portal" },
          { title: "Optimization tips", description: "Actionable improvements per listing" },
          { title: "Competitor tracking", description: "Know where you stand in search results" },
        ]
      },
      {
        title: "ROI Tracking",
        description: "Measure the impact of boosting. See attribution from boost spend to closed deals.",
        stat: { value: "2.5×", label: "Average view increase" },
        features: [
          { title: "Spend tracking", description: "Know what you're investing" },
          { title: "Conversion attribution", description: "Link boost to view to lead to deal" },
          { title: "Performance reports", description: "Monthly boost performance summaries" },
        ]
      },
    ],
    cta: { primary: "Connect Property Booster", secondary: "See Portal Tools" }
  },
  {
    id: "brightcall",
    label: "BrightCall",
    desc: "Call tracking & analytics",
    icon: Phone,
    color: "text-cyan-500",
    category: "integrations",
    heroTitle: "BrightCall Integration",
    heroSubtitle: "Track every call from your listings. Know which portal, which ad, which listing drove each call.",
    sections: [
      {
        title: "Call Attribution",
        description: "Every call traced back to its source. Property Finder call? Instagram DM? Your website? Know exactly.",
        features: [
          { title: "Source tracking", description: "UTM and portal attribution" },
          { title: "Call recording", description: "Access call recordings in Vzite" },
          { title: "Lead creation", description: "Auto-create leads from calls" },
        ]
      },
      {
        title: "Agent Performance",
        description: "See which agents are answering calls, average response time, and call outcomes.",
        stat: { value: "100%", label: "Call capture rate" },
        features: [
          { title: "Answer rates", description: "Track agent pickup rates" },
          { title: "Call duration", description: "Know how long agents spend" },
          { title: "Outcome logging", description: "Lead, viewing, or no answer tracking" },
        ]
      },
    ],
    cta: { primary: "Connect BrightCall", secondary: "See Phone Integrations" }
  },
  {
    id: "callgear",
    label: "CallGear",
    desc: "Intelligent call routing",
    icon: Phone,
    color: "text-indigo-500",
    category: "integrations",
    heroTitle: "CallGear Integration",
    heroSubtitle: "Smart call routing with CRM integration. Calls go to the right agent with full context.",
    sections: [
      {
        title: "Intelligent Routing",
        description: "Route calls based on caller history, property interest, and agent availability. Every caller gets to the right agent.",
        features: [
          { title: "Smart routing", description: "Route by area, language, or deal stage" },
          { title: "Caller ID enrichment", description: "Pop up caller info in Vzite" },
          { title: "Missed call handling", description: "Auto-SMS and callback scheduling" },
        ]
      },
      {
        title: "Call Logging",
        description: "Every call automatically logged in Vzite. Recording, duration, and outcome—all attached to the lead.",
        stat: { value: "Zero", label: "Manual logging required" },
        features: [
          { title: "Auto-logging", description: "Calls appear in lead timeline" },
          { title: "Recording access", description: "Play recordings from Vzite" },
          { title: "Call analytics", description: "Track call volume, duration, outcomes" },
        ]
      },
    ],
    cta: { primary: "Connect CallGear", secondary: "See Phone Integrations" }
  },
  {
    id: "sleekflow",
    label: "SleekFlow",
    desc: "Omnichannel messaging",
    icon: MessageSquare,
    color: "text-violet-500",
    category: "integrations",
    heroTitle: "SleekFlow Integration",
    heroSubtitle: "Unify WhatsApp, Messenger, and more. All conversations in one place, all synced to Vzite.",
    sections: [
      {
        title: "Channel Unification",
        description: "Manage WhatsApp, Facebook Messenger, Instagram DM, and more from SleekFlow—with all context synced to Vzite.",
        features: [
          { title: "Multi-channel inbox", description: "All messages in one view" },
          { title: "Thread sync", description: "Conversations logged in Vzite" },
          { title: "Contact matching", description: "Link messages to Vzite contacts" },
        ]
      },
      {
        title: "Automated Workflows",
        description: "Trigger Vzite automations from SleekFlow events. New conversation, no response, keyword detected—take action.",
        stat: { value: "5+", label: "Integrated channels" },
        features: [
          { title: "Trigger automation", description: "SleekFlow events create Vzite actions" },
          { title: "Lead creation", description: "Auto-create leads from new conversations" },
          { title: "Status sync", description: "Lead stage reflects conversation status" },
        ]
      },
    ],
    cta: { primary: "Connect SleekFlow", secondary: "See Messaging Integrations" }
  },
  {
    id: "liana",
    label: "Liana",
    desc: "Marketing automation",
    icon: Layers,
    color: "text-rose-500",
    category: "integrations",
    heroTitle: "Liana Integration",
    heroSubtitle: "Marketing automation designed for real estate. Nurture leads with automated campaigns synced to Vzite.",
    sections: [
      {
        title: "Campaign Sync",
        description: "Run email and SMS campaigns from Liana with full CRM integration. Segmentation, personalization, and tracking.",
        features: [
          { title: "List sync", description: "Vzite segments appear in Liana" },
          { title: "Campaign triggers", description: "Vzite events trigger Liana campaigns" },
          { title: "Engagement tracking", description: "Opens, clicks logged in Vzite" },
        ]
      },
      {
        title: "Lead Nurturing",
        description: "Automated nurture sequences that keep leads warm. Personalized follow-ups based on Vzite lead data.",
        stat: { value: "47%", label: "Higher nurture conversion" },
        features: [
          { title: "Drip sequences", description: "Automated email/SMS series" },
          { title: "Personalization", description: "Dynamic content from Vzite fields" },
          { title: "Stage-based triggers", description: "Different nurture per lead stage" },
        ]
      },
    ],
    cta: { primary: "Connect Liana", secondary: "See Marketing Integrations" }
  },
]

export function getAllPages(): PageData[] {
  return [...featuresPages, ...solutionsPages, ...integrationsPages]
}

export function getPageById(id: string): PageData | undefined {
  return getAllPages().find(p => p.id === id)
}

export function getPagesByCategory(category: PageData["category"]): PageData[] {
  return getAllPages().filter(p => p.category === category)
}
