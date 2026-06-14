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
import { MobilePage } from "@/components/pages/MobilePage"
import { AboutPage } from "@/components/pages/AboutPage"
import { BlogPage } from "@/components/pages/BlogPage"
import { ContactPage } from "@/components/pages/ContactPage"
import { SupportPage } from "@/components/pages/SupportPage"
import { getPageById } from "@/lib/page-data"

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

function FeatureDetailRoute() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathParts = location.pathname.split("/")
  const pageId = pathParts[2]

  const page = getPageById(pageId)
  if (!page) {
    navigate("/")
    return null
  }

  return <FeatureDetailPage page={page} />
}

function MobilePageRoute() {
  return <MobilePage />
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/features/:id" element={<FeatureDetailRoute />} />
        <Route path="/solutions/:id" element={<FeatureDetailRoute />} />
        <Route path="/integrations/:id" element={<FeatureDetailRoute />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
