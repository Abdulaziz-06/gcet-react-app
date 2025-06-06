import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import './Product.css';

export default function Product() {
  const { user, addToCart, removeFromCart, getCartItemQuantity, getCartItemsCount } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_URL}products/all`;
    
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <main>
      <div className="products-container">
        <h3>Welcome Guest!</h3>
        
        <div className="welcome-message">
          Welcome to Fake cart!!
        </div>
        
        {getCartItemsCount() > 0 && (
          <div className="checkout-banner">
            <div className="checkout-info">
              <span>{getCartItemsCount()} items in cart</span>
              <Link to="/cart" className="checkout-home-btn">
                Go to Checkout
              </Link>
            </div>
          </div>
        )}
        
        <div className="products-grid">
          {products.map(product => {
            const quantity = getCartItemQuantity(product._id);
            
            return (
              <div key={product._id} className="product-card">
                <h4>{product.name}</h4>
                <p className="price">₹{product.price}</p>
                
                <div className="cart-controls">
                  {quantity === 0 ? (
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn minus"
                        onClick={() => removeFromCart(product._id)}
                      >
                        −
                      </button>
                      <span className="quantity">{quantity}</span>
                      <button 
                        className="quantity-btn plus"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}