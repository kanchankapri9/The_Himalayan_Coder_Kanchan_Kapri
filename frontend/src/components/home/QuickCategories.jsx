import './QuickCategories.css'

const categories = [
  'Music',
  'Food & Drink',
  'College Fest',
  'Technology',
  'Nightlife',
  'Startup',
  'Community',
  'Workshops',
]

function QuickCategories() {
  return (
    <section className="quick-categories">
      {categories.map((category) => (
        <button key={category} className="quick-categories__chip">
          {category}
        </button>
      ))}
    </section>
  )
}

export default QuickCategories
