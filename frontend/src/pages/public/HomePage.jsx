import { useEffect, useState } from 'react'
import { Alert, CircularProgress } from '@mui/material'
import HomeHero from '../../components/home/HomeHero'
import QuickCategories from '../../components/home/QuickCategories'
import EventShowcaseSection from '../../components/home/EventShowcaseSection'
import OrganizerBanner from '../../components/home/OrganizerBanner'
import InterestGrid from '../../components/home/InterestGrid'
import { fetchEvents } from '../../api/eventApi'
import { events as mockEvents } from '../../data/events'
import './LandingPage.css'

function HomePage() {
  const [events, setEvents] = useState(mockEvents)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true)
        const response = await fetchEvents({ limit: 8 })
        setEvents(response.data || [])
        setErrorMessage('')
      } catch (error) {
        setEvents(mockEvents)
        setErrorMessage(error.response?.data?.message || 'Using fallback event data because the API is unavailable.')
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  return (
    <div className="landing-page">
      <HomeHero />
      <QuickCategories />
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
      {isLoading && <CircularProgress />}
      <EventShowcaseSection
        label="Trending events in your area"
        title="Events students are booking now"
        items={events}
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
