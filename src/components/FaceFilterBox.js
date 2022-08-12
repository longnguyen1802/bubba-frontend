import React from 'react'
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import FaceModal from '../components/FaceModal.js';
import { useState } from 'react';

export default function FaceFilterBox() {
  const[FaceIsOpen, setFaceIsOpen] = useState(false)
  return (
    <>
      <div className='face-filter-box' onClick={() => setFaceIsOpen(true)}>
        <AccountBoxOutlinedIcon sx={{ fontSize: 45 }}  className='filter-icon' />
        <span>Face Filter</span>
      </div>
      {/* Face filter popup */}
      <FaceModal open={FaceIsOpen} onClose={() => setFaceIsOpen(false)} />
    </>
  )
}
