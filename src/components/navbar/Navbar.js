import React, { useState } from "react"
import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {

  const [isSearch, setIsSearch] = useState(false)
  return <nav className="nav">
    <Link to="/" className="site-title">BUBBA.</Link>
    {isSearch ?  
      <Link to="/" className="advance-search"onClick={() => setIsSearch(false)}>Back</Link>
      : 
      <Link to='/search' className='advance-search' onClick={() => setIsSearch(true)}> 
        Advance Search
      </Link>
    }
    
  </nav>
}
export default Navbar;