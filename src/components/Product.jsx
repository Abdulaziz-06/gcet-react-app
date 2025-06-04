import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import './Product.css';

export default function Product() {
  const { user } = useContext(AppContext);
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
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h4>{product.name}</h4>
              <p className="price">₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}