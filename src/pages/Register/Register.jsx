import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../../components/PageBanner/PageBanner'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'
import './Register.css'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

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
    if (!formData.password.trim()) formErrors.password = 'Password is required.'
    else if (formData.password.length < 6) {
      formErrors.password = 'Password should be at least 6 characters.'
    }
    if (!formData.confirmPassword.trim()) {
      formErrors.confirmPassword = 'Please confirm your password.'
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match.'
    }

    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return

    setMessage('Registration successful! (Frontend simulation)')
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  return (
    <>
      <PageBanner title="Register" subtitle="Create your Ebook Shop account." />

      <section className="section-space">
        <div className="page-container">
          <form className="register-card card" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <p className="muted">
              Create your account to save wishlist, shop faster, and checkout easily.
            </p>

            <FormInput
              id="register-name"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormInput
              id="register-email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormInput
              id="register-password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <FormInput
              id="register-confirm-password"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <Button type="submit" fullWidth>
              Register
            </Button>
            {message ? <p className="register-message">{message}</p> : null}
            <p className="register-link">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register
