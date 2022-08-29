import React,{useState,useEffect} from 'react';
import { Image } from 'cloudinary-react';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { URL ,PREFIX_URL} from '../components/util/constant';
export default function ImageDetail() {
  const [photographer,setPhotographer] = useState();
  const location = useLocation();
  const albumId = location.pathname.split("/")[4];
  const imageId = location.pathname.split("/")[5];
  const navigate = useNavigate();
  useEffect(()=>{
    const loadPhotograher = async () => {
      const res = await axios.get(URL+'/api/album/getphotographer',{
        mode:'cors',
        params:{
            albumId: albumId
        }
    });
    //const data = await res.data;
    setPhotographer(res.data.photographer);
    }
    loadPhotograher();
  },[]);
  
  return (
    <>
      <div className='homepage-container'>
        <div className='image-result-title'>
          <IconButton onClick={()=>{
            //console.log("navigate");
            navigate('/search/result');
          }}>
            <ArrowBackIosIcon />
          </IconButton>
          {<h2>Taken by {photographer}</h2>}
        </div>
        <div className='image-container'>
          <img src={PREFIX_URL+albumId+'/'+imageId} alt="Default image" width="200" height="200"/>
          {/* <Image
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dr4xcuczn"}
              publicId={"bubba_test/"+albumId+'/'+imageId}
              crop="scale"
              className="image-detail-result"
          /> */}
        </div>
      </div>
    </>
  )
}

