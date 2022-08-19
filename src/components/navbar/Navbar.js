import React from "react"
import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
  return <nav className="nav">
    <Link to="/" className="site-title">BUBBA.</Link>
  </nav>
}
export default Navbar;