import React from 'react'
import FilterTag from '../components/FilterTag'
import { Link ,useNavigate} from 'react-router-dom';
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useAPI } from '../dataContext';
import { Image } from 'cloudinary-react';

export default function SearchResultAlbum() {
  const {listAlbum,imageIds,listAlbumThumbnail,listAllAlbum,currentImageId,setCurrentImageId,setListAlbum} = useAPI()
  const navigate = useNavigate();
  const navigateAlbum = (albumId) =>{
    navigate('/album/'+albumId);
}
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
        {/* <div className='album-container'>
          <div className='album'>
            {/* <img src='' className='album-profile' alt='album profile picture'></img>
            <Link to='/search/result/album/content'  className='album-info'>
              <p>Album title</p>
              <span>Created in yyyy/mm/dd</span>
            </Link>
          </div>
        </div> */}
        <div className='album-container'>
          <h2>What's New</h2>
          { 
          listAlbumThumbnail.length>0 
          && 
          listAlbumThumbnail.map((value,index)=>(
              <div className='album' onClick={()=>{
                  navigateAlbum(listAllAlbum[index])
              }}>
                  <Image
                      key={index}
                      cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dfrouqxub"}
                      publicId={value}
                      width="400"
                      height="200"
                      crop="scale"
                  />
                  {/* <div className='album-info' id = {"album-"+index}>
                      <p>Album title</p>
                      <span>Created in yyyy/mm/dd</span>
                  </div> */}
              </div>
          ))   
          }
        </div>
    </div>
   
    </>
  )
}
