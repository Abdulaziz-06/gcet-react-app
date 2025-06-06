import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'
import './Orders.css'

export default function Orders() {
  const { user } = useContext(AppContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      fetchOrders()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('Fetching orders for user:', user._id)
      console.log('API URL:', `${import.meta.env.VITE_API_URL}orders/user/${user._id}`)
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}orders/user/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Response status:', response.status)
      
      if (response.status === 404) {
        // API endpoint doesn't exist yet
        setError('Orders API endpoint not implemented yet. Please contact support.')
        return
      }

      const data = await response.json()
      console.log('Orders data received:', data)

      if (response.ok) {
        setOrders(data.orders || data || []) // Handle different response formats
      } else {
        setError(data.message || 'Failed to fetch orders')
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      
      if (error.message.includes('fetch') || error.name === 'TypeError') {
        setError('Unable to connect to orders service. The orders API endpoint may not be implemented yet.')
      } else {
        setError('Network error. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getOrderStatus = (order) => {
    // You can customize this based on your order status logic
    return 'Delivered' // Default status
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#4caf50'
      case 'pending':
        return '#ff9800'
      case 'cancelled':
        return '#f44336'
      default:
        return '#2196f3'
    }
  }

  if (!user) {
    return (
      <div className="orders-container">
        <div className="login-prompt">
          <h2>Please Login to View Orders</h2>
          <p>You need to be logged in to view your order history.</p>
          <Link to="/login" className="login-btn">
            🔑 Login
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">
          <h2>Loading your orders...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error">
          <h2>Unable to Load Orders</h2>
          <p>{error}</p>
          {error.includes('API endpoint not implemented') ? (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <p><strong>For Developer:</strong></p>
              <p>The orders API endpoint needs to be implemented in the backend. Check the ORDERS_API_IMPLEMENTATION.md file for details.</p>
            </div>
          ) : (
            <button onClick={fetchOrders} className="retry-btn">
              Try Again
            </button>
          )}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="no-orders">
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          <Link to="/" className="start-shopping-btn">
            🛒 Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Your Orders ({orders.length})</h2>
        <p>Track and manage your order history</p>
      </div>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                <p className="order-date">{formatDate(order.createdAt)}</p>
              </div>
              <div className="order-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(getOrderStatus(order)) }}
                >
                  {getOrderStatus(order)}
                </span>
              </div>
            </div>

            <div className="order-items">
              <h4>Items Ordered:</h4>
              <div className="items-list">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <div className="item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>₹{order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total Paid:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="order-actions">
              <button className="reorder-btn" onClick={() => {
                // You can implement reorder functionality here
                alert('Reorder functionality coming soon!')
              }}>
                🔄 Reorder
              </button>
              <button className="help-btn" onClick={() => {
                alert('Help & Support coming soon!')
              }}>
                ❓ Need Help?
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}