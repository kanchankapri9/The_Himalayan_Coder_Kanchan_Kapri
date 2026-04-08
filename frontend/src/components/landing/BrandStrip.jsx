import './BrandStrip.css'

const labels = ['COLLEGE FESTS', 'CAMPUS CLUBS', 'POP-UPS', 'COMMUNITY EVENTS', 'QR ENTRY']

function BrandStrip() {
  return (
    <section className="brand-strip">
      {labels.map((label) => (
        <span key={label} className="brand-strip__item">
          {label}
        </span>
      ))}
    </section>
  )
}

export default BrandStrip
