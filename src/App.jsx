import { useState, createContext, useEffect } from "react";
import "./App.css";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');
    const storedCart = localStorage.getItem('cartData');
    
    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }

    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        localStorage.removeItem('cartData');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item._id !== productId);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemQuantity = (productId) => {
    const item = cart.find(item => item._id === productId);
    return item ? item.quantity : 0;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    clearCart();
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      getCartItemQuantity, 
      getCartTotal, 
      getCartItemsCount,
      logout 
    }}>
      <div>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route index element={<Product />} />
              <Route path="/cart" element={<Cart/>}></Route>
              <Route path="/orders" element={<Orders/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/signup" element={<Signup/>}></Route>
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}
export default App;