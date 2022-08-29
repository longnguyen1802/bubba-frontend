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
  const [quota,setQuotaState] = useState();
  const {listAlbum,imageIds}= useAPI();
  useEffect(() => {
    const getQuota = async () =>{
      const resLimit = await axios.get(URL+'/api/limit',{mode:'cors'});
      setQuotaState(resLimit.data);
    }
    getQuota();
  }, []);
  const handleModal =async () => {
      setIsActive(true);
  };
  if(!open) return null

  return ReactDom.createPortal(
    <>
    {/* <div className='overlay' /> */}
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
            <div className='button-container'>
              <button className='back-button button' onClick={onClose}  >Back</button> 
              <button className='try-button button' id='try' onClick={() => setPreviewIsOpen(true)} >Try</button>
            </div>
            </>
            :
            <>
                <div className='modal-title'>
                  <p>Out of quota</p>
                </div>
                <div className='modal-text'>
                  You has 0 quota left upload your image to search
                </div>
                <div className='button-container'>
                  <button className='button go-button' onClick={() => setPreviewIsOpen(true)} >Go</button>
                </div>
            </>
        }
        
      </div>
      <PreviewModal open={PreviewIsOpen} onClose={() => setPreviewIsOpen(false) } quota={quota.limit} />

    </div>
    </>,
    document.getElementById('portal')
    
  )
}
