import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider"
import { Clock, Zap, Users, Target } from "lucide-react"

export function BentoSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Your Entire Business In One Screen</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Every Tool You Need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-teal-500 to-emerald-500">
              Beautifully Unified
            </span>
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            See the difference Vzite makes — drag to compare life before and after.
          </p>
        </div>

        {/* Compare Slider */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <ReactCompareSlider
            style={{ width: "100%", height: "520px" }}
            handle={
              <div className="flex flex-col items-center gap-0 h-full justify-center select-none">
                <div className="w-0.5 flex-1 bg-white/80" />
                <div className="w-10 h-10 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-slate-700" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="w-0.5 flex-1 bg-white/80" />
              </div>
            }
            itemOne={
              <ReactCompareSliderImage
                src="/mailbox.svg"
                alt="Without Vzite — old way"
                style={{ objectFit: "cover", width: "100%", height: "100%", background: "#f8fafc" }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="/crm-realestate.png"
                alt="With Vzite — modern CRM"
                style={{ objectFit: "cover", width: "100%", height: "100%", background: "#f8fafc" }}
              />
            }
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { icon: Clock, value: "< 90s", sub: "Average lead response" },
            { icon: Zap, value: "17+", sub: "Connected platforms" },
            { icon: Users, value: "500+", sub: "UAE brokerages" },
            { icon: Target, value: "98%", sub: "Customer retention" },
          ].map((s) => (
            <div key={s.sub} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-slate-200 transition-colors">
              <s.icon className="w-4 h-4 text-slate-400 mb-3" />
              <p className="text-2xl font-black text-slate-900 mb-0.5">{s.value}</p>
              <p className="text-xs text-slate-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
