import { useState } from 'react'
import Button from '../Button/Button'
import './NewsletterSection.css'

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) {
      setMessage('Please enter your email first.')
      return
    }
    setMessage('Subscribed successfully! You will receive our latest updates.')
    setEmail('')
  }

  return (
    <section className="newsletter card">
      <div>
        <h3>Get Weekly Ebook Deals</h3>
        <p className="muted">
          Receive fresh arrivals, student offers, and top picks directly in your
          inbox.
        </p>
      </div>

      <form className="newsletter__form" onSubmit={handleSubmit}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
        <Button type="submit">Subscribe</Button>
      </form>

      {message ? <p className="newsletter__message">{message}</p> : null}
    </section>
  )
}

export default NewsletterSection
