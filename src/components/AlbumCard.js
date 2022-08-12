import React from 'react'

export default function AlbumCard({title, imageSource, caption}) {
  return (
    <div className='album-card-container'>
      <div className='image-container'>
        {/* image source */}
      </div>
      <div className='album-info'>
          <p>{title}</p>
          <span>{caption}</span>
      </div>
  </div>
  )
}
