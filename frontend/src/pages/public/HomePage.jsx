import HomeHero from '../../components/home/HomeHero'
import QuickCategories from '../../components/home/QuickCategories'
import EventShowcaseSection from '../../components/home/EventShowcaseSection'
import CollectionGrid from '../../components/home/CollectionGrid'
import OrganizerBanner from '../../components/home/OrganizerBanner'
import InterestGrid from '../../components/home/InterestGrid'
<<<<<<< Updated upstream
import './LandingPage.css'

function HomePage() {
=======
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

>>>>>>> Stashed changes
  return (
    <div className="landing-page">
      <HomeHero />
      <QuickCategories />
<<<<<<< Updated upstream
=======
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
      {isLoading && !events.length && <CircularProgress />}
>>>>>>> Stashed changes
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
