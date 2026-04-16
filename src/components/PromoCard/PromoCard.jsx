import Button from '../Button/Button'
import './PromoCard.css'

function PromoCard({ title, text, ctaText, ctaLink }) {
  return (
    <article className="promo-card card">
      <p className="promo-card__label">Limited Time Offer</p>
      <h3>{title}</h3>
      <p>{text}</p>
      <Button to={ctaLink} size="sm" variant="secondary">
        {ctaText}
      </Button>
    </article>
  )
}

export default PromoCard

