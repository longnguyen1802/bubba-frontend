import React from 'react'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import FaceModal from './FaceModal.js';
import { useState } from 'react';

export default function FaceFilterBoxSpecial({clickFunction}) {
  const[FaceIsOpen, setFaceIsOpen] = useState(false)
  return (
    <>
      <div className='face-filter-box' onClick={() => clickFunction(true)}>
        <AccountBoxOutlinedIcon sx={{ fontSize: 45 }}  className='filter-icon' />
        <span>Face Filter</span>
      </div>
    </>
  )
}
