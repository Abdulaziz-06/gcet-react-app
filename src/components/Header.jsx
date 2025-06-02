import React from 'react'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <>
        <h1>Fake Cart:By Abdul</h1>
          <Link to="/">Home</Link>-
          <Link to="/cart">Cart</Link>-
          <Link to="/login">Login</Link>
          </>
  )
}
