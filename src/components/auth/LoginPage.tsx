import { useRef, useEffect, useState } from "react"
import { User, Lock, ArrowRight } from "lucide-react"

export function LoginPage({ onBack }: { onBack: () => void }) {
  const userRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const [userFocus, setUserFocus] = useState(false)
  const [passFocus, setPassFocus] = useState(false)

  useEffect(() => {
    const handleBlur = (input: HTMLInputElement, setValue: (v: boolean) => void) => {
      if (!input.value) setValue(false)
    }
    const u = userRef.current!
    const p = passRef.current!
    const uBlur = () => handleBlur(u, setUserFocus)
    const pBlur = () => handleBlur(p, setPassFocus)
    u.addEventListener("blur", uBlur)
    p.addEventListener("blur", pBlur)
    return () => {
      u.removeEventListener("blur", uBlur)
      p.removeEventListener("blur", pBlur)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Same subtle grid as landing */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm animate-fade-up">
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-black/5 p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-400 mb-8">Sign in to your account</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Username */}
            <div className={`relative flex items-center gap-3 border-b-2 pb-2 transition-colors duration-300 ${userFocus ? "border-slate-900" : "border-slate-200"}`}>
              <User className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${userFocus ? "text-slate-900" : "text-slate-300"}`} />
              <div className="relative flex-1 h-[42px]">
                <label
                  className={`absolute left-2 transition-all duration-300 pointer-events-none font-medium ${
                    userFocus ? "text-[11px] top-0 text-slate-900" : "text-sm top-1/2 -translate-y-1/2 text-slate-400"
                  }`}
                >
                  Email
                </label>
                <input
                  ref={userRef}
                  type="email"
                  className="absolute inset-0 w-full bg-transparent outline-none border-none px-2 pt-4 text-sm text-slate-800 font-medium"
                  onFocus={() => setUserFocus(true)}
                />
              </div>
            </div>

            {/* Password */}
            <div className={`relative flex items-center gap-3 border-b-2 pb-2 transition-colors duration-300 ${passFocus ? "border-slate-900" : "border-slate-200"}`}>
              <Lock className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${passFocus ? "text-slate-900" : "text-slate-300"}`} />
              <div className="relative flex-1 h-[42px]">
                <label
                  className={`absolute left-2 transition-all duration-300 pointer-events-none font-medium ${
                    passFocus ? "text-[11px] top-0 text-slate-900" : "text-sm top-1/2 -translate-y-1/2 text-slate-400"
                  }`}
                >
                  Password
                </label>
                <input
                  ref={passRef}
                  type="password"
                  className="absolute inset-0 w-full bg-transparent outline-none border-none px-2 pt-4 text-sm text-slate-800 font-medium"
                  onFocus={() => setPassFocus(true)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-xs text-slate-400 hover:text-slate-900 transition-colors font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-slate-900 font-semibold hover:underline">
            Request a demo
          </a>
        </p>
      </div>
    </div>
  )
}
