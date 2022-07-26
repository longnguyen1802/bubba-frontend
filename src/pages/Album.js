import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlertModal from '../components/notify/AlertModal';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FaceFilterBox from '../components/search/face/FaceFilterBox.js';
import ImageCard from '../components/image/ImageCard.js';
import { useAPI } from '../context/dataContext.js';
import ListImage from '../components/image/ListImage.js'
export default function Album() {

    const [quotaState, setQuotaState] = useState(false)
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
              <h1>There is {listImage.length} images</h1>
              <ListImage listImage={listImage}/>
              <FaceFilterBox />
              {/* If out of quota */}
              {quotaState ? (
                <AlertModal open={AlertIsOpen} onClose={() => setAlertIsOpen(false)} />
              ):(
                null
              )}
            </div>
        </div>
    );
}