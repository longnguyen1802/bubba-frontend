import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CatagoryModal from '../components/CatagoryModal.js';
import FaceModal from '../components/FaceModal.js';
import DateModal from '../components/DateModal.js';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';


export default function Search() {
  const[CatagoryIsOpen, setCatagoryIsOpen] = useState(false)
  const[DateIsOpen, setDateIsOpen] = useState(false)
  const[FaceIsOpen, setFaceIsOpen] = useState(false)


  return (
    <div className='search-container' > 
      <h1 className="home-title">Search image</h1>
      <Link to='/search' className='search-bar'> 
        <i class="material-icons">search</i>
        <input className='search-field' type="text" placeholder="Search here"></input>
      </Link>

      <div className='button-group'>
        <button class="button album-button" type="button" autoFocus >Album</button>
        <button class="button image-button" >Image</button>
      </div>

      <h3>Filter by</h3>
      <div className='filter-container'>
        <div className='filter-box' onClick={() => setCatagoryIsOpen(true)}>
          <LocalOfferOutlinedIcon sx={{ fontSize: 45 }} className='filter-icon' />
          <span>Catagory</span>
        </div>
        {/* catagory filter popup */}
        <CatagoryModal open={CatagoryIsOpen} onClose={() => setCatagoryIsOpen(false)} />

        <div className='filter-box' onClick={() => setDateIsOpen(true)}>
          <CalendarMonthOutlinedIcon sx={{ fontSize: 45 }}  className='filter-icon' />
          <span>Date</span>
        </div>
        {/* Date filter popup */}
        <DateModal open={DateIsOpen} onClose={() => setDateIsOpen(false)} />

        <div className='filter-box' onClick={() => setFaceIsOpen(true)}>
          <AccountBoxOutlinedIcon sx={{ fontSize: 45 }}  className='filter-icon' />
          <span>Face</span>
        </div>
        {/* Face filter popup */}
        <FaceModal open={FaceIsOpen} onClose={() => setFaceIsOpen(false)} />
      </div>
      <div className='button-container'>
        <Link to='/search/result' className='search-button button' >Search</Link>
        <button className='clear-button button' >Clear Filter</button> 
        <button className='continue-button button'>Continue</button>
      </div>
      
    </div>
  )
}
