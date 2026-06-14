import { useState, useEffect } from "react"
import { HeaderHero } from "@/components/landing/header-hero"
import { LogoTicker } from "@/components/landing/logo-ticker"
import { BentoSection } from "@/components/landing/bento-section"
import { FeaturesCarousel } from "@/components/landing/features-carousel"
import { MetaSection } from "@/components/landing/meta-section"
import { Testimonials } from "@/components/landing/testimonials"
import { Footer } from "@/components/landing/footer"
import { LoginPage } from "@/components/auth/LoginPage"

function getPage() {
  return window.location.hash === "#login" ? "login" : "landing"
}

export function App() {
  const [page, setPage] = useState(getPage)

  useEffect(() => {
    const onPop = () => setPage(getPage())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const goLogin = () => { history.pushState(null, "", "#login"); setPage("login") }
  const goHome = () => { history.pushState(null, "", "/"); setPage("landing") }

  if (page === "login") return <LoginPage onBack={goHome} />

  return (
    <div className="min-h-screen bg-white">
      <HeaderHero onLoginClick={goLogin} />
      <LogoTicker />
      <BentoSection />
      <FeaturesCarousel />
      <MetaSection />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App
