import React from 'react'
import '../../css/Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Link ,useNavigate} from 'react-router-dom';
import "react-month-picker/css/month-picker.css";
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { dateFilter } from '../../../util/filter/filter';
import { useAPI } from '../../../context/dataContext';
export default function DateModal({open, onClose,isAlbum}) {
  const {imageIds,setCurrentImageId,setListAlbum} = useAPI()
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const clearDate = () => {
    setStartDate(null);
    setEndDate(null);
  }
  const navigate = useNavigate();
  
  if(!open) return null
  const handleSearch =async ()=>{
    const startDates = `${startDate.getFullYear()}-${startDate.getMonth()+1}-01`;
    const endDates = `${endDate.getFullYear()}-${endDate.getMonth()+1}-28`;
    await dateFilter(startDates,endDates,setListAlbum,setCurrentImageId,imageIds);
    if(!isAlbum)
    {
      navigate('/search/result');
    }
    else{
      navigate('/search/result/album')
    }
    
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
          dateFormat="MM/yyyy"
          showMonthYearPicker
          inline
          showFourColumnMonthYearPicker
          className='month-picker'
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
        />
      </div>

      <div className='button-container'>
        {/* <Link to='/search/result'  className='search-button button' >Search</Link> */}
        <button className='search-button button' onClick={handleSearch}>Search</button> 
        <button className='clear-button button' onClick={clearDate}>Clear Filter</button> 
        <button className='continue-button button' onClick={onClose}>Continue</button>
      </div>
      
    </div>
    </>,
    document.getElementById('portal')
    
  )
}
