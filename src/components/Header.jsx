import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'

export default function Header() {
  const { getCartItemsCount, user, logout } = useContext(AppContext)
  const cartCount = getCartItemsCount()

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <h1 style={{margin: 0, fontSize: '1.5rem'}}>🛒 Fake Cart: By Abdul</h1>
      <nav style={{display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap'}}>
        <Link to="/" style={{
          color: 'white', 
          textDecoration: 'none', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.1)',
          transition: 'all 0.3s ease'
        }}>🏠 Home</Link>
        
        <Link to="/cart" style={{
          color: 'white', 
          textDecoration: 'none', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.1)',
          transition: 'all 0.3s ease',
          position: 'relative'
        }}>
          🛒 Cart {cartCount > 0 && <span style={{
            background: '#ff4757',
            color: 'white',
            borderRadius: '50%',
            padding: '0.2rem 0.5rem',
            fontSize: '0.8rem',
            marginLeft: '0.5rem'
          }}>({cartCount})</span>}
        </Link>
        
        <Link to="/orders" style={{
          color: 'white', 
          textDecoration: 'none', 
          padding: '0.5rem 1rem', 
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.1)',
          transition: 'all 0.3s ease'
        }}>📦 Orders</Link>
        
        {user ? (
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <span style={{fontSize: '0.9rem'}}>Welcome, {user.name || user.email}!</span>
            <button onClick={logout} style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>🚪 Logout</button>
          </div>
        ) : (
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <Link to="/login" style={{
              color: 'white', 
              textDecoration: 'none', 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>🔑 Login</Link>
            <Link to="/signup" style={{
              color: 'white', 
              textDecoration: 'none', 
              padding: '0.5rem 1rem', 
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.4)'
            }}>📝 Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  )
}
