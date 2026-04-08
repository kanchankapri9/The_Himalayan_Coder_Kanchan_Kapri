import { Typography } from '@mui/material'
import SectionIntro from '../common/SectionIntro'
import './ShowcaseSection.css'

function ShowcaseSection() {
  return (
    <section className="showcase-section">
      <SectionIntro
        centered
        label="Stay in the loop"
        title="Built for busy students and fast-moving event teams"
        description="The design takes inspiration from modern conference landing pages: dark stage-like sections, soft light gradients, and focused content blocks."
      />

      <div className="showcase-section__visual">
        <div className="showcase-section__shape showcase-section__shape--left" />
        <div className="showcase-section__shape showcase-section__shape--right" />
        <div className="showcase-section__card">
          <Typography className="showcase-section__card-tag">Live event dashboard preview</Typography>
          <Typography variant="h3" className="showcase-section__card-title">
            Nearby events. Instant booking. Smart check-ins.
          </Typography>
          <Typography className="showcase-section__card-text">
            Give attendees a simple booking flow and give organizers a clean interface
            to manage registrations and attendance.
          </Typography>
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection
