import React from 'react'
import './Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

export default function FaceModal({open, onClose}) {
  const [isActive, setIsActive] = useState(false);

  const handleModal = () => {
    setIsActive(true);
  };
  
  if(!open) return null

  return ReactDom.createPortal(
    <>
    <div className='overlay' />
    <div className='modal modal-face'>
      <div className='message-modal' style={{
          display: isActive ? 'none' : 'flex',
        }}>
      <IconButton onClick={onClose} className='close'>
          <CloseIcon />
      </IconButton>
        <div className='modal-title'>
          <p>Free Quota For You</p>
          
        </div>
        <div className='modal-text'>
          Congratulations! You are awarded for 100 free facial recognition! Try it now & have a better search result!
        </div>
        <div className='button-container'>
          <button className='back-button button' onClick={onClose}  >Back</button> 
          <button className='try-button button' id='try' onClick={handleModal} >Try</button>
        </div>
      </div>

      <div className='try-face-modal' id='try-face-modal' 
        style={{
          display: isActive ? 'flex' : 'none',
        }}>
        <div className='modal-title'>
          Open file with
        </div>
        <div className='method-container'>
          <div className='method-box camera'>
            <div className='icon-box'></div>
            <span>Camera</span>
          </div>
          <div className='method-box gallery'>
            <div className='icon-box'></div>
            <span>Gallery</span>
          </div>
        </div>
        <div className='divider' />
        <button className='button cancel-button' onClick={onClose} >Cancel</button>
      </div>

    </div>
    </>,
    document.getElementById('portal')
    
  )
}
