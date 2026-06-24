import "./landing.css"
import { useNavigate } from "react-router-dom"
import { HeaderHero } from "./header-hero"
import { LogoTicker } from "./logo-ticker"
import { BentoSection } from "./bento-section"
import { FeaturesCarousel } from "./features-carousel"
import { MetaSection } from "./meta-section"
import { Testimonials } from "./testimonials"
import { Footer } from "./footer"

export function LandingPage() {
  const navigate = useNavigate()

  const goLogin = () => navigate("/login")

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

export default LandingPage
