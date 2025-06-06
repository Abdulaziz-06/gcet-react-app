import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'
import './Cart.css'

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartItemsCount, user } = useContext(AppContext)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState('')

  const handleCheckout = async () => {
    // Check if user is logged in
    if (!user) {
      setCheckoutMessage('Please login to proceed with checkout.')
      return
    }

    setIsCheckingOut(true)
    setCheckoutMessage('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user._id,
          email: user.email,
          items: cart,
          subtotal: getCartTotal(),
          deliveryFee: 40,
          total: getCartTotal() + 40
        })
      })

      const data = await response.json()

      if (response.ok) {
        setCheckoutMessage('Order placed successfully!')
        console.log('Order created:', data.order)
        clearCart()
        
        setTimeout(() => {
          setCheckoutMessage('')
        }, 3000)
      } else {
        setCheckoutMessage(data.message || 'Checkout failed. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setCheckoutMessage('Network error. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some delicious items to your cart!</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart ({getCartItemsCount()} items)</h2>
        <button onClick={clearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <div className="item-details">
              <h4>{item.name}</h4>
              <p className="item-price">₹{item.price} each</p>
            </div>
            
            <div className="item-controls">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn minus"
                  onClick={() => removeFromCart(item._id)}
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn plus"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-section">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Delivery Fee:</span>
            <span>₹40.00</span>
          </div>
          <div className="total-row grand-total">
            <span>Total:</span>
            <span>₹{(getCartTotal() + 40).toFixed(2)}</span>
          </div>
        </div>
        
        <div className="checkout-section">
          {checkoutMessage && (
            <div className={`checkout-message ${checkoutMessage.includes('successfully') ? 'success' : 'error'}`}>
              {checkoutMessage}
            </div>
          )}
          
          {!user && (
            <div style={{
              background: '#e3f2fd',
              border: '1px solid #90caf9',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <p style={{margin: 0, color: '#1565c0', fontWeight: '500'}}>
                Please <Link to="/login" style={{color: '#1976d2', fontWeight: '700'}}>login</Link> to proceed with checkout
              </p>
            </div>
          )}
          
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={isCheckingOut || !user}
            style={{
              background: !user ? '#a0aec0' : undefined,
              cursor: !user ? 'not-allowed' : undefined
            }}
          >
            {isCheckingOut ? 'Processing...' : !user ? 'Login Required' : 'Proceed to Checkout'}
          </button>
          <Link to="/" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}