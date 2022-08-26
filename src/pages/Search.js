import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CatagoryModal from '../components/search/category/CatagoryModal.js';
import FaceModal from '../components/search/face/FaceModal.js';
import DateModal from '../components/search/date/DateModal.js';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { sportsType } from '../components/staticData/SportsType.js';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DatePicker from 'react-datepicker';
import { dateFilter } from '../util/filter/filter.js';
import { useAPI } from '../context/dataContext.js';
import FaceFilterBox from '../components/search/face/FaceFilterBox.js';
import Divider from '@mui/material/Divider';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

export default function Search() {
  const {imageIds,setCurrentImageId,setListAlbum} = useAPI()
  const[CatagoryIsOpen, setCatagoryIsOpen] = useState(false)
  const[DateIsOpen, setDateIsOpen] = useState(false)
  const[FaceIsOpen, setFaceIsOpen] = useState(false)
  const[isAlbumSearch, setIsAlbumSearch] = useState(false)
  const[isImageSearch, setIsImageSearch] = useState(true)
  const[selectedCatagory, setSelectedCatagory] = useState(false)
  const[selectedDate, setSelectedDate] = useState(false)
  const[windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sportData, setSportData] = useState(sportsType)
  const initialState = sportsType
  const navigate = useNavigate();

  const handleSelect = (index) => {
    let newState = [...sportData]
    newState[index].state = !newState[index].state
    
    setSportData(newState)
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSearchType = () => {
    setIsAlbumSearch(!isAlbumSearch)
    setIsImageSearch(!isImageSearch)
  }

  const handleSearch =async ()=>{
    const startDates = `${startDate.getFullYear()}-${startDate.getMonth()+1}-01`;
    const endDates = `${endDate.getFullYear()}-${endDate.getMonth()+1}-28`;
    await dateFilter(startDates,endDates,setListAlbum,setCurrentImageId,imageIds);
    if(!isAlbumSearch)
    {
      navigate('/search/result');
    }
    else{
      navigate('/search/result/album')
    }
    
  }

  return (
    <div className='search-container' >
      {windowWidth < 768 ? (
        <>
          <h1 className="home-title">Search image</h1>
          <Link to='/search' className='search-bar'> 
            <i class="material-icons">search</i>
            <input className='search-field' type="text" placeholder="Search here"></input>
          </Link>

          <div className='button-group'>
            <button className={isAlbumSearch?'button album-button-focus':'button album-button'} onClick={() => {handleSearchType()}}>Album</button>
            <button className={isImageSearch?'button image-button-focus':'button image-button'} onClick={() => {handleSearchType()}}>Image</button>
          </div>

          <h3>Filter by</h3>
          <div className='filter-container'>
            <div className='filter-box' onClick={() => setCatagoryIsOpen(true)}>
              <LocalOfferOutlinedIcon sx={{ fontSize: 45 }} className='filter-icon' />
              <span>Catagory</span>
            </div>
            {/* catagory filter popup */}
            <CatagoryModal open={CatagoryIsOpen} onClose={() => setCatagoryIsOpen(false)} selected={() => setSelectedCatagory(true)}/>

            <div className='filter-box' onClick={() => setDateIsOpen(true)}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 45 }}  className='filter-icon' />
              <span>Date</span>
            </div>
            {/* Date filter popup */}
            <DateModal open={DateIsOpen} onClose={() => setDateIsOpen(false)}  isAlbum={isAlbumSearch} />
            {isImageSearch
            ?(
            <div className='filter-box' onClick={() => setFaceIsOpen(true)}>
              <AccountBoxOutlinedIcon sx={{ fontSize: 45 }}  className='filter-icon' />
              <span>Face</span>
            </div>
            ):
            null
            }
            
            {/* Face filter popup */}
            <FaceModal open={FaceIsOpen} onClose={() => setFaceIsOpen(false)} />
          </div>
          <div className='button-container'>
            <Link to='/search/result' className='search-button button' >Search</Link>
          </div>

        </>
      ) : (
        <div className='search-container-desktop'>
          <div className='search-type'>
            <span>Search by: </span>
            <div className='button-group'>
              <button className={isAlbumSearch?'button album-button-focus':'button album-button'} onClick={() => {handleSearchType()}}>Album</button>
              <button className={isImageSearch?'button image-button-focus':'button image-button'} onClick={() => {handleSearchType()}}>Image</button>
            </div>
          </div>
          
          <div className='filter-type-container'>
            <div className='catagory-container'>
              <span className="filter-title">Filter by catagory</span>
              <div className='types'>
                {sportsType.map((text, index) => (
                  <div className='types-box' onClick={() => handleSelect(index)}>
                    {sportData[index].state ? (<CheckCircleIcon className='check-icon' sx={{ fontSize: 30 }} />) : null }
                      {text.icon}
                    <span>{text.label}</span>
                  </div>
                ))
                }

              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <div className='date-container'>
              <span className="filter-title">Filter by date</span>
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
            </div>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <div className='upload-container'>
              <span className="filter-title">Filter by face</span>
              <div className='upload-box' onClick={() => setFaceIsOpen(true)}>
                <AddAPhotoOutlinedIcon sx={{ fontSize: 60 }}/>
                <span>Upload photo</span>
              </div>
            </div>
          </div>
          <FaceModal open={FaceIsOpen} onClose={() => setFaceIsOpen(false)} />

          <div className='button-container'>
            <Link to='/search/result' className='search-button button' >Search</Link>
          </div>
          
        </div>
      )} 
      
    </div>
  )
}
