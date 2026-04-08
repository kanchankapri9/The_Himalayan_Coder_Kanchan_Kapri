import './NumbersSection.css'

const numbers = [
  { value: '4', label: 'student actions covered' },
  { value: '5', label: 'organizer tools planned' },
  { value: '6', label: 'core screens for MVP' },
]

function NumbersSection() {
  return (
    <section className="numbers-section">
      <p className="numbers-section__eyebrow">Focused MVP structure</p>
      <div className="numbers-section__grid">
        {numbers.map((item) => (
          <div key={item.value} className="numbers-section__item">
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NumbersSection
