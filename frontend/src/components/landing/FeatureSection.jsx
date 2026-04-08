import Grid from '@mui/material/Grid'
import {
  faEnvelopeCircleCheck,
  faLocationDot,
  faQrcode,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons'
import SectionIntro from '../common/SectionIntro'
import InfoCard from '../common/InfoCard'
import './FeatureSection.css'

const featureItems = [
  {
    icon: faLocationDot,
    title: 'Explore nearby events',
    description: 'Show students the right events first with location-based discovery and clear category browsing.',
  },
  {
    icon: faEnvelopeCircleCheck,
    title: 'Pass sent by email',
    description: 'After registration or approval, attendees receive a digital pass directly in their inbox.',
  },
  {
    icon: faQrcode,
    title: 'QR entry at the gate',
    description: 'Make check-ins easy for organizers with QR-based attendance and duplicate-scan prevention.',
  },
  {
    icon: faUserCheck,
    title: 'Approval-based access',
    description: 'For closed or curated events, organizers can approve requests before the final pass is issued.',
  },
]

function FeatureSection() {
  return (
    <section className="feature-section">
      <SectionIntro
        label="Core flow"
        title="A landing page that explains the product fast"
        description="Keep each section focused. Explain what FestFlow does, who it helps, and why the event experience becomes smoother."
      />

      <Grid container spacing={2.4}>
        {featureItems.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 6 }}>
            <InfoCard {...item} />
          </Grid>
        ))}
      </Grid>
    </section>
  )
}

export default FeatureSection
