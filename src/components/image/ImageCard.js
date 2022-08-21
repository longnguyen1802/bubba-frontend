import React from 'react'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { Image } from 'cloudinary-react';
import {useNavigate} from 'react-router-dom';


export default function ImageCard({key, publicId}) {
  const navigate = useNavigate();
  const navigateImage = (publicId) =>{
    const splitId = publicId.split('/');
    const albumId = splitId[1];
    const imageId = splitId[2];
    navigate('/search/result/image/'+albumId+'/'+imageId)
}
  return (
    <Card sx={{ maxWidth: "186px", maxHeight: "186px", borderRadius: "20px", overflow: "hidden"}}>
      <CardActionArea onClick={() => {
        navigateImage(publicId);
      }} >
        <Image
          key={key}
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dr4xcuczn"}
          publicId={publicId}
          crop="scale"
          className='image-box'
        />
      </CardActionArea>
    </Card>

  )
}
