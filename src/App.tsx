import { HeaderHero } from "@/components/landing/header-hero"
import { LogoTicker } from "@/components/landing/logo-ticker"
import { BentoSection } from "@/components/landing/bento-section"
import { FeaturesCarousel } from "@/components/landing/features-carousel"
import { MetaSection } from "@/components/landing/meta-section"
import { OffPlanSection } from "@/components/landing/offplan-section"
import { Testimonials } from "@/components/landing/testimonials"
import { Footer } from "@/components/landing/footer"

export function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderHero />
      <LogoTicker />
      <BentoSection />
      <FeaturesCarousel />
      <MetaSection />
      <OffPlanSection />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App
