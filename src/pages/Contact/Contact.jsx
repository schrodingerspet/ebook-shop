import { useState } from 'react'
import PageBanner from '../../components/PageBanner/PageBanner'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formErrors = {}

    if (!formData.name.trim()) formErrors.name = 'Name is required.'
    if (!formData.email.trim()) formErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = 'Enter a valid email.'
    }
    if (!formData.message.trim()) formErrors.message = 'Message is required.'

    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return

    setSuccess('Message sent successfully! (Frontend simulation)')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Have questions? We are here to help you anytime."
      />

      <section className="section-space">
        <div className="page-container contact-layout">
          <div className="contact-info card">
            <h2>Get in touch</h2>
            <p className="muted">
              You can reach us through this form or by the details below.
            </p>
            <p>
              <strong>Email:</strong> support@ebookshop.com
            </p>
            <p>
              <strong>Phone:</strong> +1 123-456-7890
            </p>
            <p>
              <strong>Address:</strong> Knowledge Street, City
            </p>

            <div className="contact-faq">
              <h3>FAQ</h3>
              <p>
                <strong>Do you provide physical books?</strong> No, this platform is
                focused on ebooks only.
              </p>
              <p>
                <strong>Can I track orders?</strong> This mini project includes a
                simulated checkout flow only.
              </p>
            </div>
          </div>

          <form className="contact-form card" onSubmit={handleSubmit}>
            <h2>Send Message</h2>
            <FormInput
              id="contact-name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormInput
              id="contact-email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormInput
              id="contact-message"
              label="Message"
              name="message"
              type="textarea"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />
            <Button type="submit">Send Message</Button>
            {success ? <p className="contact-success">{success}</p> : null}
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
