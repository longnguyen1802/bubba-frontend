import React from 'react'
import { Link } from 'react-router-dom'
import FilterTag from '../components/FilterTag'
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AlertModal from '../components/AlertModal';
import { useState } from 'react';
import { useAPI } from '../dataContext';
import FaceFilterBox from '../components/FaceFilterBox'
import ImageCard from '../components/ImageCard';

export default function SearchResultFace() {
  const {faceImageId} = useAPI()
  const[AlertIsOpen, setAlertIsOpen] = useState(true)
  return (
    <>
    <div className='homepage-container'>
      <h2 className='search-result-title'> {faceImageId && faceImageId.length} results are found</h2>
      <Link to='/search' className='search-bar'> 
        <input className='search-field' type="text" placeholder="(User input Text)"></input>
      </Link>
      <div className='filter-row'>
        
        {/* if it is search with face filter show the below element, which should be showing the face client searching*/}
        <div className='face-icon'></div>
        
          <FilterTag />

        <div className='add-icon'>
          <IconButton >
            <AddIcon />
          </IconButton>
        </div>
       
      </div>
      <div>
          <div className="result-image-container">
          {
              faceImageId && faceImageId.map((imageId,index)=>(
                <ImageCard key={index} publicId={imageId} />
              ))
          }
          </div>
      </div>
      <FaceFilterBox />
      {/* If out of quota */}
      <AlertModal open={AlertIsOpen} onClose={() => setAlertIsOpen(false)} />
    </div>
    </>
  )
}
