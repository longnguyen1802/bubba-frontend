import React from "react"
import { Link } from "react-router-dom";
import './Navbar.css'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';


function Navbar() {
  return <nav className="nav">
    <Link to="/" className="site-title">BUBBA.</Link>
  </nav>
}
export default Navbar;