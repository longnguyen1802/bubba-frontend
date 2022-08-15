import React,{useState,useEffect} from 'react';
import { Image } from 'cloudinary-react';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link ,useLocation} from 'react-router-dom';
import axios from 'axios';
import { URL } from '../components/constant';
export default function ImageDetail() {
  const [photographer,setPhotographer] = useState();
  const location = useLocation();
  const albumId = location.pathname.split("/")[4];
  const imageId = location.pathname.split("/")[5];
  useEffect(()=>{
    const loadPhotograher = async () => {
      const res = await axios.get(URL+'/api/album/getphotographer',{
        mode:'cors',
        params:{
            albumId: albumId
        }
    });
    const data = await res.data;
    setPhotographer(data.photographer);
    }
    loadPhotograher();
  });
  
  return (
    <>
      <div className='homepage-container'>
        <div className='image-result-title'>
          <IconButton>
            <Link to='/search/result'><ArrowBackIosIcon /></Link>
          </IconButton>
          {<h2>Taken by {photographer}</h2>}
        </div>
        <div className='image-container'>
          <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dr4xcuczn"}
              publicId={"bubba_test/"+albumId+'/'+imageId}
              width="300"
              height="300"
              crop="scale"
          />
        </div>
        <div className='face-search-box'>
          <span>Click and search the face:</span>
          <div className='face-icon'></div>
        </div>
      </div>
    </>
  )
}

