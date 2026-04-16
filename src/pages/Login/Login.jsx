import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../../components/PageBanner/PageBanner'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'
import './Login.css'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formErrors = {}

    if (!formData.email.trim()) formErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      formErrors.email = 'Enter a valid email.'
    }

    if (!formData.password.trim()) formErrors.password = 'Password is required.'
    else if (formData.password.length < 6) {
      formErrors.password = 'Password should be at least 6 characters.'
    }

    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return

    setMessage('Login successful! (Frontend simulation)')
    setFormData({ email: '', password: '' })
  }

  return (
    <>
      <PageBanner title="Login" subtitle="Welcome back! Sign in to your account." />

      <section className="section-space">
        <div className="page-container">
          <div className="auth-card card">
            <div className="auth-card__left">
              <h2>Sign in for faster checkout</h2>
              <p>
                Access wishlist, manage cart items, and place ebook orders smoothly.
              </p>
              <ul>
                <li>Track your saved ebooks</li>
                <li>Get student-only offers</li>
                <li>Faster checkout experience</li>
              </ul>
            </div>

            <form className="auth-card__right" onSubmit={handleSubmit}>
              <FormInput
                id="login-email"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <FormInput
                id="login-password"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <Button type="submit" fullWidth>
                Login
              </Button>
              {message ? <p className="auth-message">{message}</p> : null}
              <p className="auth-link">
                New user? <Link to="/register">Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
