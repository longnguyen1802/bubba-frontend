import React from 'react';
import ReactDom from 'react-dom';
import './Modal.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function AlertModal({open, onClose}) {
  if(!open) return null
  return ReactDom.createPortal (
    <>
    <div className='alert-modal-quota modal'>
      <div className='message-modal' >
        <IconButton onClick={onClose} className='close'>
            <CloseIcon />
        </IconButton>
          <div className='modal-title'>
            <p>Out of Quota!!!</p>
          </div>
          <div className='modal-text'>
            Find Your Photos in the remaining 1464 for HKD 146.4.          </div>
          <div className='button-container'>
            <button className='button go-button'>Go</button>
          </div>
        </div>
    </div>
    </>,
    document.getElementById('portal')
  )
}
