import React from 'react'
import FilterTag from '../components/FilterTag'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


export default function SearchResultAlbum() {
  return (
    <>
    <div className='homepage-container'>
      <h1 className="home-title">XX results are found</h1>
        <Link to='/search' className='search-bar'> 
          <input className='search-field' type="text" placeholder="(User input text)"></input>
        </Link>

        <div className='filter-row'>
          <FilterTag />
        <div className='add-icon'>
          <IconButton >
            <AddIcon />
          </IconButton>
        </div>
      </div>
        <div className='album-container'>
          <div className='album'>
            {/* <img src='' className='album-profile' alt='album profile picture'></img> */}
            <Link to='/search/result/album/content'  className='album-info'>
              <p>Album title</p>
              <span>Created in yyyy/mm/dd</span>
            </Link>
          </div>
        </div>
    </div>
   
    </>
  )
}
