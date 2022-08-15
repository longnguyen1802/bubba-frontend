import React from 'react'
import FilterTag from '../components/FilterTag'
import { Link ,useNavigate} from 'react-router-dom';
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useAPI } from '../dataContext';
import { Image } from 'cloudinary-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function SearchResultAlbum() {
  const {listAlbum,imageIds,listAlbumThumbnail,listAllAlbum,currentImageId,setCurrentImageId,setListAlbum} = useAPI()
  const navigate = useNavigate();
  const navigateAlbum = (albumId) =>{
    navigate('/album/'+albumId);
}
  return (
    <>
      <div className='homepage-container'>
        <h1 className="home-title">{listAlbumThumbnail.length} results are found</h1>
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
          { 
            listAlbumThumbnail.length>0 
            && 
            listAlbumThumbnail.map((value,index)=>(
              <div className='album' onClick={()=>{
                  navigateAlbum(listAllAlbum[index])
              }}>
                <Card sx={{ maxWidth: "388px", borderRadius: "20px", marginTop: "20px"}}>
                  <CardActionArea>
                      <Image
                        key={index}
                        cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dr4xcuczn"}
                        publicId={value}
                        className="card-image"
                        width="388"
                        height="233"
                        crop="scale"
                    />
                    <CardContent className='album-info'>
                      <Typography gutterBottom component="div">
                        Album Title
                      </Typography>
                      <Typography variant="body3" color="text.secondary">
                        Created in yyyy/mm/dd
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))   
          }
        </div>
      </div>
    </>
  )
}
