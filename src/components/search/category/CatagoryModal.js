import React, { useState } from 'react'
import '../../css/Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { sportsType } from '../../staticData/SportsType';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CatagoryModal({open, onClose}) {

  const [typeSelected, setTypeSelected] = useState(false)
  const [sportData, setSportData] = useState(sportsType)
  const initialState = sportsType
  const handleSelect = (index) => {
    let newState = [...sportData]
    newState[index].state = !newState[index].state
    setSportData(newState)
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
        <Link to='/search/result' className='search-button button' >Search</Link>
        <button className='clear-button button' >Clear Filter</button> 
        <button className='continue-button button'>Continue</button>
      </div>
      
    </div>
    </>,
    document.getElementById('portal')
    
  )
}
