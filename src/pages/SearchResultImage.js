import React from 'react'
import { Link } from 'react-router-dom'
import FilterTag from '../components/search/tag/FilterTag'
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AlertModal from '../components/notify/AlertModal';
import { useState } from 'react';
import { useAPI } from '../context/dataContext';
import FaceFilterBox from '../components/search/face/FaceFilterBox'
import ImageCard from '../components/image/ImageCard';
import ListImage from '../components/image/ListImage';
export default function SearchResultImage() {
  const {currentImageId} = useAPI()
  const[AlertIsOpen, setAlertIsOpen] = useState(true)
  const [quotaState, setQuotaState] = useState(false)

  return (
    <>
    <div className='homepage-container'>
      <h2 className='search-result-title'> {currentImageId&& currentImageId.length} results are found</h2>
      <Link to='/search' className='search-bar'> 
        <input className='search-field' type="text" placeholder="(User input Text)"></input>
      </Link>

      {/* <div className='filter-row'>
        
          <FilterTag />

        <div className='add-icon'>
          <IconButton >
            <AddIcon />
          </IconButton>
        </div>
       
      </div> */}

      {currentImageId && <ListImage listImage={currentImageId} /> }
      <FaceFilterBox />
      {/* If out of quota */}
      {quotaState ? (
        <AlertModal open={AlertIsOpen} onClose={() => setAlertIsOpen(false)} />
      ):(
        null
      )}    
      </div>
    </>
  )
}
