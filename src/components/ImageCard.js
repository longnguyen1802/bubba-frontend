import React from 'react'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import { Image } from 'cloudinary-react';


export default function ImageCard({key, publicId}) {
  return (
    <Card sx={{ maxWidth: "186px", maxHeight: "186px", borderRadius: "20px"}}>
      <CardActionArea>
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
