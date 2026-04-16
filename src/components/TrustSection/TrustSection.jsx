import './TrustSection.css'

const trustItems = [
  {
    title: 'Instant Download',
    text: 'Get immediate digital access after successful purchase.',
    icon: '⚡',
  },
  {
    title: 'Student-Friendly Prices',
    text: 'Affordable pricing and regular offers for learners.',
    icon: '💰',
  },
  {
    title: 'Curated Categories',
    text: 'Practical ebooks selected for real project needs.',
    icon: '📂',
  },
  {
    title: 'Reliable Support',
    text: 'Quick help through contact form and support channels.',
    icon: '🛟',
  },
]

function TrustSection() {
  return (
    <section className="trust-section">
      {trustItems.map((item) => (
        <article className="trust-section__item card" key={item.title}>
          <span>{item.icon}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  )
}

export default TrustSection

