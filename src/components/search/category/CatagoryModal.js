import React, { useState } from 'react'
import '../../css/Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { sportsType } from '../../staticData/SportsType';
import { Link,useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {tagFilter} from '../../../util/filter/filter';
import { useAPI } from '../../../context/dataContext';

export default function CatagoryModal({open, onClose, selected,isAlbum}) {
  const {imageIds,setCurrentImageId,setListAlbum} = useAPI()
  const [sportData, setSportData] = useState(sportsType)
  const initialState = sportsType
  const handleSelect = (index) => {
    let newState = [...sportData]
    newState[index].state = !newState[index].state
    
    setSportData(newState)
  }
  const clearFilter = () =>{
    let newState = [...sportData]
    for(let i=0;i<newState.length;i++){
      newState[i].state = false;
    }
    setSportData(newState);

  }
  const navigate = useNavigate();
  const handleSearch =async ()=>{
    const listTag = sportData.filter(e=>e.state===true).map(e=>e.label.toLowerCase());
    console.log(listTag);
    await tagFilter(listTag,setListAlbum,setCurrentImageId,imageIds);
    if(!isAlbum)
    {
      navigate('/search/result');
    }
    else{
      navigate('/search/result/album')
    }
    
  }
  

  if(!open) return null

  return ReactDom.createPortal(
    <>
    <div className='overlay' />
    <div className='modal'>
      <div className='divider' />
      <div className='modal-title'>
        <p>Filter by catagory</p>
        <IconButton onClick={onClose} >
          <CloseIcon />
        </IconButton>
      </div>
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
      <div className='button-container'>
        {/* <Link to='/search/result' className='search-button button' >Search</Link> */}
        <button className='search-button button' onClick={handleSearch}>Search</button>
        <button className='clear-button button' onClick={clearFilter} >Clear Filter</button> 
        <button className='continue-button button' onClick={onClose}>Continue</button>
      </div>
      
    </div>
    </>,
    document.getElementById('portal')
    
  )
}