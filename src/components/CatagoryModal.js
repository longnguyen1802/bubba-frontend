import React from 'react'
import './Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { sportsType } from './SportsType';
import { Icon } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CatagoryModal({open, onClose}) {
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
          <div className='types-box'>
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
