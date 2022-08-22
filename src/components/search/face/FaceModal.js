import React from 'react'
import '../../css/Modal.css'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useState ,useEffect} from 'react';
import PreviewModal from './PreviewModal';
import {getNumberImage} from '../../../util/filter/filter.js';
import { useAPI } from '../../../context/dataContext';
import axios from 'axios';
import { URL } from '../../util/constant';
export default function FaceModal({open, onClose}) {
  const [isActive, setIsActive] = useState(false);
  const[PreviewIsOpen, setPreviewIsOpen] = useState(false)
  const {quota,listAlbum,imageIds}= useAPI();
  const handleModal =async () => {
    if(quota.limit>0)
    {
      setIsActive(true);
    } else{
      const value = localStorage.getItem("listAlbumBefore");
      if(value!==undefined){
        localStorage.removeItem("listAlbumBefore");
      }
      localStorage.setItem("listAlbumBefore",listAlbum);
      const resp = await axios({
        method: 'post',
        url: URL+'/api/payment/create-checkout-session',
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          items: [{
              id: 1,
              quantity: getNumberImage(listAlbum,imageIds)
          } ],
        }
      })
      window.location.replace(resp.data.url);
  }
    
  };
  if(!open) return null

  return ReactDom.createPortal(
    <>
    <div className='overlay' />
    <div className='modal modal-face'>
      <div className='message-modal' style={{
          display: isActive ? 'none' : 'flex',
        }}>
        <IconButton onClick={onClose} className='close'>
            <CloseIcon />
        </IconButton>

        {
          quota.limit > 0 
          ?
            <>
            <div className='modal-title'>
              <p>Free Quota For You</p>
            </div>
            <div className='modal-text'>
              Congratulations! You are awarded for {quota.limit} free facial recognition! Try it now & have a better search result!
            </div>
            </>
            :
            <>
              <div className='modal-title'>
                <p>Out of quota</p>
              </div>
              <div className='modal-text'>
                Use {getNumberImage(listAlbum,imageIds)/10}$ HKD to find your image in remain {getNumberImage(listAlbum,imageIds)} image
              </div>
            </>
        }
        <div className='button-container'>
          <button className='back-button button' onClick={onClose}  >Back</button> 
          <button className='try-button button' id='try' onClick={handleModal} >Try</button>
        </div>
      </div>

      <div className='try-face-modal' id='try-face-modal' 
        style={{
          display: isActive ? 'flex' : 'none',
        }}>
        <div className='modal-title'>
          Open file with
        </div>
        <div className='method-container'>
          <div className='method-box camera'>
            <div className='icon-box'></div>
            <span>Camera</span>
          </div>
          <div className='method-box gallery' onClick={() => setPreviewIsOpen(true)}>
            <div className='icon-box'></div>
            <span>Gallery</span>
          </div>
          <PreviewModal open={PreviewIsOpen} onClose={() => setPreviewIsOpen(false) } quota={quota.limit} special={false}/>

        </div>
        <div className='divider' />
        <button className='button cancel-button' onClick={onClose} >Cancel</button>
      </div>

    </div>
    </>,
    document.getElementById('portal')
    
  )
}
