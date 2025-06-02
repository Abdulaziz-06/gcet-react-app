import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route index element={<Product />} />
            <Route path="/" element={<Product/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
             <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;