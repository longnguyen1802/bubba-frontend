import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlertModal from '../components/notify/AlertModal';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FaceFilterBox from '../components/search/face/FaceFilterBox.js';
import ImageCard from '../components/image/ImageCard.js';
import { useAPI } from '../context/dataContext.js';
export default function Album() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const[AlertIsOpen, setAlertIsOpen] = useState(false)
    const {imageIds,setListAlbum} = useAPI();
    const listImage = imageIds.filter((value)=>(value.folder===id)).map(e=>e.files).flat();
    useEffect(() => {
        setListAlbum([id]);
    }, []);
    return (
        <div>
            <div className='homepage-container'>
              <div className='image-result-title'>
                <IconButton>
                  <Link to='/search/result/album'><ArrowBackIosIcon /></Link>
                </IconButton>
                <h2>Album {id}</h2>
              </div>
              <div className='result-image-container'>
                {listImage &&
                  listImage.map((imageId, index) => (
                      <ImageCard key={index} publicId={imageId} />
                  ))}
              </div>
              <FaceFilterBox />
              {/* If out of quota */}
              <AlertModal open={AlertIsOpen} onClose={() => setAlertIsOpen(false)} />
            </div>
        </div>
    );
}