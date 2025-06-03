import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import './Product.css';

export default function Product() {
  const {user}= useContext(AppContext);
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    console.log('Product component mounted, fetching products...');
    fetch('http://localhost:8080/products')
      .then(res=>{
        console.log('Response received:', res.status);
        return res.json();
      })
      .then(data=>{
        console.log('Products data:', data);
        setProducts(data);
      })
      .catch(err=>{
        console.error('Error fetching products:', err);
      });
  }, []);

  console.log('Product component rendering, products:', products);
  return (
    <main>
      <div className="products-container fade-in">
        <h3>Welcome {user?.name?user.name:'Guest'}!</h3>
        <div className="welcome-message">
          Welcome to Fake cart!!
        </div>
        <div className="products-grid">
          {products.length > 0 ? (
            products.map(product=>(
              <div key={product.id} className="product-card">
                <h4>{product.name}</h4>
                <p className="price">₹{product.price}</p>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products available. Make sure your backend server is running on http://localhost:8080</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}