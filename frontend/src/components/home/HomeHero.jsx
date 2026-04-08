import { Button, Chip, TextField, Typography } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import './HomeHero.css'

function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero__content">
        <div className="home-hero__copy">
          <Chip
            icon={<FontAwesomeIcon icon={faLocationDot} />}
            label="Discover nearby college fests, community nights, and city pop-ups"
            className="home-hero__chip"
          />

          <Typography variant="h1" className="home-hero__title">
            Find the right event for this weekend.
          </Typography>

          <Typography className="home-hero__description">
            Explore hyper-local experiences around you, book tickets in seconds, and get
            ready with QR-based entry.
          </Typography>
        </div>

        <div className="home-hero__search-box">
          <div className="home-hero__search-fields">
            <TextField
              placeholder="Search events, fests, or organizers"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: <FontAwesomeIcon icon={faMagnifyingGlass} />,
                },
              }}
            />
            <TextField
              placeholder="Delhi"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: <FontAwesomeIcon icon={faLocationDot} />,
                },
              }}
            />
            <TextField
              placeholder="This weekend"
              fullWidth
              size="small"
              slotProps={{
                input: {
                  startAdornment: <FontAwesomeIcon icon={faCalendarDays} />,
                },
              }}
            />
            <Button variant="contained" className="home-hero__search-button">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
