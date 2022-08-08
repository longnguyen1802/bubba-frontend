import React from 'react'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AlertModal from '../components/AlertModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export default function AlbumContent() {
  const[AlertIsOpen, setAlertIsOpen] = useState(false)

  return (
    <>
      <div className='homepage-container'>
        <div className='image-result-title'>
          <IconButton>
            <Link to='/search/result/album'><ArrowBackIosIcon /></Link>
          </IconButton>
          <h2>Album title</h2>
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
