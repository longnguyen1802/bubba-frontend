import React, { useState } from 'react'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import './Modal.css'
import { Image } from 'cloudinary-react';
import {URL} from '../components/constant.js'


export default function PreviewModal({open, onClose}) {

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [imageIds, setImageIds] = useState();
  const [errMsg, setErrMsg] = useState('');
  const [search,setSearch] = useState(false);
  const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewFile(file);
      
      setFileInputState(e.target.value);
      setSelectedFile(file);
  };

  const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPreviewSource(reader.result);
      };
  };

  if(!open) return null


  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='modal'>
        <IconButton onClick={onClose} className='close'>
          <CloseIcon />
        </IconButton>
        <h3 className="title">Upload your image to search</h3>
            <form className="form">
              {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
                )}
              
              <label for="fileInput" className='label-file button'>
                Choose file
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    multiple
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                    hidden
                />
              </label>

                
                <button className="search-button-form button" type="submit" onClick={()=>{
                  console.log("Search");
                }}>
                  Search
                </button>
            </form>
            
      </div>
    </>,
    document.getElementById('portal-2')
    
  )
}
