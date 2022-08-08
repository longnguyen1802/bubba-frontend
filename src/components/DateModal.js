import React from 'react'
import './Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function DateModal({open, onClose}) {
  if(!open) return null

  return ReactDom.createPortal(
    <>
    <div className='overlay' />
    <div className='modal'>
      <div className='divider' />
      <div className='modal-title'>
        <p>Filter by date</p>
        <IconButton onClick={onClose} >
          <CloseIcon />
        </IconButton>
      </div>
      <div className='types'>
      <input type="month" id="start"></input>
      </div>
      <div className='button-container'>
        <button className='search-button button' >Search</button>
        <button className='clear-button button' >Clear Filter</button> 
        <button className='continue-button button'>Continue</button>
      </div>
      
    </div>
    </>,
    document.getElementById('portal')
    
  )
}
