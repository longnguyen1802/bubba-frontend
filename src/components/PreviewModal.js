import React, { useState } from 'react'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import './Modal.css'
import {URL} from '../components/constant.js'
import { useAPI } from '../dataContext';
import { useNavigate } from 'react-router-dom';

export default function PreviewModal({open, onClose}) {
  const navigate = useNavigate();
  const {listAlbum,setFaceImageId} = useAPI();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  //const [imageIds, setImageIds] = useState();
  
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
  const handleSearch = (e) => {
      setSearch(true);
      e.preventDefault();
      if (!selectedFile) return;
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
          try {
              const response = await fetch(URL+'/api/image/find', {
                  mode:'cors',
                  method: 'POST',
                  body: JSON.stringify({ 
                      data: reader.result,
                      quota:50 ,
                      listFolder:listAlbum}),
                  headers: { 'Content-Type': 'application/json' },
              });
              setFileInputState('');
              setPreviewSource('');
              setFaceImageId(await response.json());
              setSearch(false);
              navigate('/search/result/face');
          } catch (err) {
              try{
                  const response = await fetch(URL+'/api/image/find', {
                  mode:'cors',
                  method: 'POST',
                  body: JSON.stringify({ data: reader.result,quota:50 ,listFolder:listAlbum}),
                  headers: { 'Content-Type': 'application/json' },
              });
              setFileInputState('');
              setPreviewSource('');
              setFaceImageId(await response.json());
              setSearch(false);
              }
              catch(err){
                  console.error(err);
                  setErrMsg('Something went wrong!');
              }
          }
      };
      reader.onerror = () => {
          console.error('AHHHHHHHH!!');
          setErrMsg('something went wrong!');
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

                
                <button className="search-button-form button" type="submit" onClick={handleSearch}>
                  Search
                </button>
            </form>
            
      </div>
    </>,
    document.getElementById('portal-2')
    
  )
}
