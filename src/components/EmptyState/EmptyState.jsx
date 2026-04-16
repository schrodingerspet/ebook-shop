import Button from '../Button/Button'
import './EmptyState.css'

function EmptyState({ title, description, actionText, actionLink = '/shop' }) {
  return (
    <section className="empty-state card">
      <div className="empty-state__icon" aria-hidden="true">
        📚
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {actionText ? <Button to={actionLink}>{actionText}</Button> : null}
    </section>
  )
}

export default EmptyState

