import './RatingStars.css'

function RatingStars({ rating, reviews }) {
  const rounded = Math.round(rating)

  return (
    <div className="rating-stars" aria-label={`Rating ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rounded ? 'filled' : ''}>
          ★
        </span>
      ))}
      <span className="rating-stars__value">{rating.toFixed(1)}</span>
      {typeof reviews === 'number' ? (
        <span className="rating-stars__reviews">({reviews})</span>
      ) : null}
    </div>
  )
}

export default RatingStars
