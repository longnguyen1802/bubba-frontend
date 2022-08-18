import React from 'react'
import './Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Link ,useNavigate} from 'react-router-dom';
import "react-month-picker/css/month-picker.css";
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { dateFilter } from '../util/filter/filter';
import { useAPI } from '../dataContext';
export default function DateModal({open, onClose}) {
  const {listAlbum,imageIds,listAlbumThumbnail,listAllAlbum,currentImageId,setCurrentImageId,setListAlbum} = useAPI()
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  if(!open) return null
  const handleSearch =async ()=>{
    const date = `${startDate.getMonth()+1}/${startDate.getFullYear()}`;
    await dateFilter(date,setListAlbum,setCurrentImageId,imageIds);
    navigate('/search/result');
  }
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
          onChange={(date) => {
            setStartDate(date);
          }}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          inline
          showFourColumnMonthYearPicker
          className='month-picker'
        />
      </div>

      <div className='button-container'>
        {/* <Link to='/search/result'  className='search-button button' >Search</Link> */}
        <button className='search-button button' onClick={handleSearch}>Search</button> 
        <button className='clear-button button' >Clear Filter</button> 
        <button className='continue-button button'>Continue</button>
      </div>
      
    </div>
    </>,
    document.getElementById('portal')
    
  )
}
