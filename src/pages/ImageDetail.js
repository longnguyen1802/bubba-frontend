import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

export default function ImageDetail() {
  return (
    <>
      <div className='homepage-container'>
        <div className='image-result-title'>
          <IconButton>
            <Link to='/search/result'><ArrowBackIosIcon /></Link>
          </IconButton>
          <h2>Taken by XXX</h2>
        </div>
        <div className='image-container'>

        </div>
        <div className='face-search-box'>
          <span>Click and search the face:</span>
          <div className='face-icon'></div>
        </div>
      </div>
    </>
  )
}

