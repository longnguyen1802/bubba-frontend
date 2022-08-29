import React from 'react'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { Image } from 'cloudinary-react';
import {useNavigate} from 'react-router-dom';
import { PREFIX_URL } from '../util/constant';

export default function ImageCard({key, publicId}) {
  const navigate = useNavigate();
  const navigateImage = (publicId) =>{
    const splitId = publicId.split('/');
    const albumId = splitId[0];
    const imageId = splitId[1];
    navigate('/search/result/image/'+albumId+'/'+imageId)
}
  return (
    <Card sx={{ maxWidth: "186px", maxHeight: "186px", borderRadius: "20px", overflow: "hidden"}}>
      <CardActionArea onClick={() => {
        navigateImage(publicId);
      }} >
        <img src={PREFIX_URL+publicId} alt="Default image" width="200" height="200"/>
        {/* <Image
          key={key}
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dr4xcuczn"}
          publicId={publicId}
          crop="scale"
          style={{ aspectRatio: 3/2 }}
          className='image-box'
        /> */}
      </CardActionArea>
    </Card>

  )
}
