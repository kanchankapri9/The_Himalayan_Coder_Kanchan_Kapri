import HomeHero from '../../components/home/HomeHero'
import QuickCategories from '../../components/home/QuickCategories'
import EventShowcaseSection from '../../components/home/EventShowcaseSection'
import CollectionGrid from '../../components/home/CollectionGrid'
import OrganizerBanner from '../../components/home/OrganizerBanner'
import InterestGrid from '../../components/home/InterestGrid'
import './LandingPage.css'

function HomePage() {
  return (
    <div className="landing-page">
      <HomeHero />
      <QuickCategories />
      <EventShowcaseSection
        label="Trending events in your area"
        title="Events students are booking now"
      />
      {/* <CollectionGrid />
      <EventShowcaseSection
        label="This weekend"
        title="Plan your next fest, pop-up, or meetup"
        compact
      /> */}
      <InterestGrid />
      <OrganizerBanner />
    </div>
  )
}

export default HomePage
