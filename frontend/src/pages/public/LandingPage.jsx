import HeroSection from '../../components/landing/HeroSection'
import BrandStrip from '../../components/landing/BrandStrip'
import ShowcaseSection from '../../components/landing/ShowcaseSection'
import FeatureSection from '../../components/landing/FeatureSection'
import NumbersSection from '../../components/landing/NumbersSection'
import CTASection from '../../components/landing/CTASection'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <BrandStrip />
      <ShowcaseSection />
      <FeatureSection />
      <NumbersSection />
      <CTASection />
    </div>
  )
}

export default LandingPage
