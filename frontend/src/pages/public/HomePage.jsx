import { useEffect, useState } from 'react'
import { Alert, CircularProgress } from '@mui/material'
import HomeHero from '../../components/home/HomeHero'
import QuickCategories from '../../components/home/QuickCategories'
import EventShowcaseSection from '../../components/home/EventShowcaseSection'
import OrganizerBanner from '../../components/home/OrganizerBanner'
import InterestGrid from '../../components/home/InterestGrid'
import { fetchEvents } from '../../api/eventApi'
import { events as mockEvents } from '../../data/events'
import { getApiErrorMessage } from '../../utils/apiError'
import './LandingPage.css'

function HomePage() {
  const [events, setEvents] = useState([])
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
        setErrorMessage(
          `${getApiErrorMessage(error, 'Could not load live events right now.')} Showing demo event data instead.`,
        )
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
      {errorMessage ? <Alert severity="warning">{errorMessage}</Alert> : null}
      {isLoading && !events.length ? <CircularProgress /> : null}
      <EventShowcaseSection
        label="Trending events in your area"
        title="Events students are booking now"
        items={events}
      />
      <InterestGrid />
      <OrganizerBanner />
    </div>
  )
}

export default HomePage
