import React from 'react'
import ImageCard from './ImageCard'
const ListImage = ({listImage}) => {
  return (
    <div className='result-image-container'>
      {listImage &&
        listImage.map((imageId, index) => (
            <ImageCard key={index} publicId={imageId} />
        ))}
    </div>
  )
}

export default ListImage