import React from 'react'
import { Image } from 'cloudinary-react';

export default function AlbumCard({title, value, index, caption}) {
  return (
    <div className='album-card-container'>
      <div className='image-container'>
        {/* image source */}
        <Image
            key={index}
            cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dfrouqxub"}
            publicId={value}
            width="400"
            height="200"
            crop="scale"
        />
      </div>
      <div className='album-info'>
          <p>{title}</p>
          <span>{caption}</span>
      </div>
  </div>
  )
}
