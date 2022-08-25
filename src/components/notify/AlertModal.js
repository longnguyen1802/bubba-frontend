import React from 'react';
import ReactDom from 'react-dom';
import '../css/Modal.css';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAPI } from '../../context/dataContext';
import { getNumberImage } from '../../util/filter/filter';
import axios from 'axios';
import { URL } from '../util/constant';
// Set numberImages = []
// searchImageId = ""
export default function AlertModal({open, onClose,numberImages,searchImageId}) {
  const {listAlbum}  = useAPI();
  if(!open) return null
  const handleModal =async () => {
      const ListAlbumValue = localStorage.getItem("listAlbumBefore");
      const faceIdImageValue = localStorage.getItem("faceImageSearchBefore");
      const quotaValue =  localStorage.getItem("quotaSearchBefore");
      if(ListAlbumValue!==undefined){
        localStorage.removeItem("listAlbumBefore");
      }
      if(faceIdImageValue!==undefined){
        localStorage.removeItem("faceImageSearchBefore");
      }
      if(quotaValue!==undefined){
        localStorage.removeItem("quotaSearchBefore");
      }
      localStorage.setItem("listAlbumBefore",listAlbum);
      localStorage.setItem("faceImageSearchBefore",searchImageId);
      localStorage.setItem("quotaSearchBefore",numberImages);
      const resp = await axios({
        method: 'post',
        url: URL+'/api/payment/create-checkout-session',
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          items: [{
              id: 1,
              quantity: numberImages
          } ],
        }
      })
      window.location.replace(resp.data.url);
  };
  return ReactDom.createPortal (
    <>
    <div className='alert-modal-quota modal'>
      <div className='message-modal' >
        <IconButton onClick={onClose} className='close'>
            <CloseIcon />
        </IconButton>
          <div className='modal-title'>
            <p>Out of Quota!!!</p>
          </div>
          <div className='modal-text'>
            Find Your Photos in the remaining {numberImages} photos for HKD {numberImages/10}$.     
          </div>
          <div className='button-container'>
            <button className='button go-button' onClick={handleModal}>Go</button>
          </div>
        </div>
    </div>
    </>,
    document.getElementById('portal')
  )
}
