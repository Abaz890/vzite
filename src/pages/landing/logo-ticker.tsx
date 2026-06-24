const platforms = [
  { logo: "https://framerusercontent.com/images/FMVG4MQPIAGceJtxQ0Hva7ro.png", label: "Property Finder" },
  { logo: "https://framerusercontent.com/images/MSm9KtAPH2GYBFDPHV1GbmHcgUU.png", label: "Bayut" },
  { logo: "https://framerusercontent.com/images/cauTZujpRYs2sp40E2XYcHvM.png", label: "Dubizzle" },
  { logo: "https://framerusercontent.com/images/F8oEd9rkULS5MnDtlSEhZB1NA.png", label: "JamesEdition" },
  { logo: "https://framerusercontent.com/images/VZBUgwg05B6i9MgYz4wJGksav3Y.png", label: "Meta Ads" },
  { logo: "https://framerusercontent.com/images/Sl6V7jA8oaJZA16wgRcKAKpZa4.png", label: "Google Ads" },
  { logo: "https://framerusercontent.com/images/EnykilyFzicRndbSKsn0lbDFV44.png", label: "Google Calendar" },
  { logo: "https://framerusercontent.com/images/9zE0MFfgfXP0WoF9v4Do6ZltN4.png", label: "TikTok" },
  { logo: "https://framerusercontent.com/images/X2zyZuDT7wAnAgiTF3cPX8xXiPQ.png", label: "Zapier" },
  { logo: "https://framerusercontent.com/images/UxQdr6qLYPb1mRd6BvernHLxySw.png", label: "LinkedIn" },
  { logo: "https://framerusercontent.com/images/nWbO1VDG90XAMtNwPOVL6BuAE.png", label: "ManyChat" },
  { logo: "https://framerusercontent.com/images/EJ2B4QmwG6YLtN7wPBJeLTRMIXQ.png", label: "BrightCall" },
  { logo: "https://framerusercontent.com/images/GGF2IFUYW35dGKsDDoaTAfIvBo.png", label: "CallGear" },
  { logo: "https://framerusercontent.com/images/0xLUITCbLRbNkl5aKfeZS0jM40.png", label: "SleekFlow" },
  { logo: "https://framerusercontent.com/images/KwDSqJ5uHCiqlgHeqPXWptwzJY.png", label: "Liana" },
]

export function LogoTicker() {
  const doubled = [...platforms, ...platforms]

  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="mb-5 text-center">
        <p className="text-sm font-bold text-slate-900 uppercase tracking-[0.15em]">
          Seamlessly Connected With
        </p>
        <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-[#0F4291] to-blue-400 mx-auto rounded-full" />
      </div>

      <div className="ticker-pause relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-infinite-scroll flex gap-0 whitespace-nowrap will-change-transform">
          {doubled.map((item, i) => (
            <TickerItem key={i} logo={item.logo} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TickerItem({ logo, label }: { logo: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-3 mx-10 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default group">
      <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-slate-50 flex items-center justify-center transition-colors border border-slate-100 p-1.5">
        <img src={logo} alt={label} className="w-full h-full object-contain" />
      </div>
      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
