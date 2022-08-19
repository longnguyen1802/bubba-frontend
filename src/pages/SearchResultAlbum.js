import React from 'react'
import FilterTag from '../components/search/tag/FilterTag'
import { Link ,useNavigate} from 'react-router-dom';
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useAPI } from '../context/dataContext';
import ListAlbum from '../components/album/ListAlbum';

export default function SearchResultAlbum() {
  const {listAlbum,listAlbumThumbnail,listAlbumInfo,listAlbumDate} = useAPI()
  const navigate = useNavigate();
  const navigateAlbum = (albumId) =>{
    navigate('/album/'+albumId);
  }
  const actualAlbumThumbnail = listAlbumThumbnail
                                .filter((e)=>(listAlbum.some(elem => (elem.toLowerCase() === e.albumId.toLowerCase()))))
                                .map(e=>e.thumbnail);
  const actualAlbumInfo = listAlbumInfo
                                .filter((e)=>(listAlbum.some(elem => (elem.toLowerCase() === e.albumId.toLowerCase()))))
                                .map(e=>e.description);
  const actualAlbumDate = listAlbumDate
                                .filter((e)=>(listAlbum.some(elem => (elem.toLowerCase() === e.albumId.toLowerCase()))))
                                .map(e=>e.date);                       
  return (
    <>
      <div className='homepage-container'>
        <h1 className="home-title">{actualAlbumThumbnail.length} results are found</h1>
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
        <ListAlbum listAlbumThumbnail={actualAlbumThumbnail} listAllAlbum={listAlbum} 
                    navigateAlbum={navigateAlbum} listAlbumDate={actualAlbumDate} listAlbumInfo={actualAlbumInfo}/>
      </div>
    </>
  )
}
