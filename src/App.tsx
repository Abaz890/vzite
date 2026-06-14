import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { HeaderHero } from "@/components/landing/header-hero"
import { LogoTicker } from "@/components/landing/logo-ticker"
import { BentoSection } from "@/components/landing/bento-section"
import { FeaturesCarousel } from "@/components/landing/features-carousel"
import { MetaSection } from "@/components/landing/meta-section"
import { Testimonials } from "@/components/landing/testimonials"
import { Footer } from "@/components/landing/footer"
import { LoginPage } from "@/components/auth/LoginPage"
import { FeatureDetailPage } from "@/components/pages/FeatureDetailPage"
import { SectionOverviewPage } from "@/components/pages/SectionOverviewPage"
import { MobilePage } from "@/components/pages/MobilePage"
import { featuresPages, solutionsPages, integrationsPages, getPageById, getPagesByCategory } from "@/lib/page-data"

function LandingPage() {
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

function FeaturesOverviewPage() {
  const navigate = useNavigate()

  return (
    <SectionOverviewPage
      title="Platform Features"
      subtitle="Every feature purpose-built for UAE brokerages. From lead capture to deal close, Vzite covers your entire workflow."
      category="features"
      pages={featuresPages}
      onBack={() => navigate("/")}
    />
  )
}

function SolutionsOverviewPage() {
  const navigate = useNavigate()

  return (
    <SectionOverviewPage
      title="Solutions for Every Team"
      subtitle="Whether you're in sales, marketing, management, or operations—Vzite has the tools your team needs."
      category="solutions"
      pages={solutionsPages}
      onBack={() => navigate("/")}
    />
  )
}

function IntegrationsOverviewPage() {
  const navigate = useNavigate()

  return (
    <SectionOverviewPage
      title="Seamlessly Connected"
      subtitle="Vzite integrates with the platforms UAE brokerages use every day. Your tools, unified in one CRM."
      category="integrations"
      pages={integrationsPages}
      onBack={() => navigate("/")}
    />
  )
}

function FeatureDetailRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathParts = location.pathname.split("/")
  const category = pathParts[1] as "features" | "solutions" | "integrations"
  const pageId = pathParts[2]

  const page = getPageById(pageId)
  if (!page) {
    navigate("/")
    return null
  }

  const relatedPages = getPagesByCategory(category).filter(p => p.id !== pageId)

  return (
    <FeatureDetailPage
      page={page}
      relatedPages={relatedPages}
      onBack={() => navigate(`/${category}`)}
    />
  )
}

function MobilePageRoute() {
  const navigate = useNavigate()
  return <MobilePage onBack={() => navigate("/")} />
}

function LoginPageRoute() {
  const navigate = useNavigate()
  return <LoginPage onBack={() => navigate("/")} />
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPageRoute />} />
        <Route path="/mobile" element={<MobilePageRoute />} />
        <Route path="/features" element={<FeaturesOverviewPage />} />
        <Route path="/solutions" element={<SolutionsOverviewPage />} />
        <Route path="/integrations" element={<IntegrationsOverviewPage />} />
        <Route path="/features/:id" element={<FeatureDetailRoute />} />
        <Route path="/solutions/:id" element={<FeatureDetailRoute />} />
        <Route path="/integrations/:id" element={<FeatureDetailRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
