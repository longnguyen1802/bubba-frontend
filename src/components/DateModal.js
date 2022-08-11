import React from 'react'
import './Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import "react-month-picker/css/month-picker.css";
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";


export default function DateModal({open, onClose}) {
  
  const [startDate, setStartDate] = useState(new Date());
  
  if(!open) return null

  return ReactDom.createPortal(
    <>
    <div className='overlay' />
    <div className='modal modal-date'>
      <div className='divider' />
      <div className='modal-title'>
        <p>Filter by date</p>
        <IconButton onClick={onClose} >
          <CloseIcon />
        </IconButton>
      </div>
      <div className='date-container'>
        <DatePicker 
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          inline
          showFourColumnMonthYearPicker
          className='month-picker'
        />
      </div>

      <div className='button-container'>
        <Link to='/search/result'  className='search-button button' >Search</Link>
        <button className='clear-button button' >Clear Filter</button> 
        <button className='continue-button button'>Continue</button>
      </div>
      
    </div>
    </>,
    document.getElementById('portal')
    
  )
}
