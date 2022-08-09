import React from 'react'
import { Link } from 'react-router-dom'
import FilterTag from '../components/FilterTag'
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AlertModal from '../components/AlertModal';
import { useState } from 'react';

export default function SearchResultImage() {
  const[AlertIsOpen, setAlertIsOpen] = useState(true)
  return (
    
    <>
    <div className='homepage-container'>
      <h2 className='search-result-title'>1564 results are found</h2>
      <Link to='/search' className='search-bar'> 
        <input className='search-field' type="text" placeholder="(User input Text)"></input>
      </Link>
      <div className='filter-row'>
        
        {/* if it is search with face filter show the below element, which should be showing the face client searching*/}
        <div className='face-icon'></div>
        
          <FilterTag />

        <div className='add-icon'>
          <IconButton >
            <AddIcon />
          </IconButton>
        </div>
       
      </div>
      <div className='result-image-container'>
        <Link to='/search/result/image' className='image-box'></Link>
        <Link to='/search/result/image' className='image-box'></Link>
        <Link to='/search/result/image' className='image-box'></Link>
        <Link to='/search/result/image' className='image-box'></Link>
        <Link to='/search/result/image' className='image-box'></Link>
        <Link to='/search/result/image' className='image-box'></Link>
      </div>
      <div className='face-filter-box'>
        <AccountBoxOutlinedIcon sx={{ fontSize: 45 }}  className='filter-icon' />
        <span>Face Filter</span>
      </div>
      {/* If out of quota */}
      <AlertModal open={AlertIsOpen} onClose={() => setAlertIsOpen(false)} />
    </div>
    </>
  )
}
