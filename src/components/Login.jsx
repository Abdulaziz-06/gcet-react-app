import React, { useState, useContext } from 'react'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    pass: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const { user, setUser } = useContext(AppContext)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Login successful!')
        const userData = data.user || data
        setUser(userData) 
        
        if (data.token) {
          localStorage.setItem('authToken', data.token)
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        setFormData({ email: '', pass: '' })
        
      } else {
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Welcome back!</h2>
          <p>You are logged in as: {user.email || user.name || 'User'}</p>
          <button 
            onClick={() => {
              setUser(null)
              localStorage.removeItem('authToken')
              localStorage.removeItem('userData')
              setSuccess('Logged out successfully!')
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="login-btn"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
}