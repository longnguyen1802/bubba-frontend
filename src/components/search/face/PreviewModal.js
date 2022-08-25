import React, { useState } from 'react'
import ReactDom from 'react-dom'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import '../../css/Modal.css'
import {URL} from '../../util/constant.js'
import { useAPI } from '../../../context/dataContext';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../notify/AlertModal';
import { getNumberImage } from '../../../util/filter/filter';
import SelectInput from '@mui/material/Select/SelectInput';
export default function PreviewModal({open, onClose,quota}) {
  const navigate = useNavigate();
  const {listAlbum,setFaceImageId,imageIds} = useAPI();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [errMsg, setErrMsg] = useState('');
  const [search,setSearch] = useState(false);
  const [alertOpen,setAlertOpen] = useState(false);
  const[AlertIsOpen, setAlertIsOpen] = useState(true)
  const [imageId,setImageId] = useState();
  const numImage = getNumberImage(listAlbum,imageIds);
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
  const handleSearchSpecial = (e) => {
      e.preventDefault();
      if (!selectedFile) return;
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
          try {
              const response = await fetch(URL+'/api/image/uploadSearch', {
                  mode:'cors',
                  method: 'POST',
                  body: JSON.stringify({ 
                      data: reader.result,
                    }),
                  headers: { 'Content-Type': 'application/json' },
              });
              const data = await response.json();
              setImageId(data.imageId);
              setFileInputState('');
              setPreviewSource('');
              setAlertOpen(true);
              // End in here
            
          } catch (err) {
              try{
                const response = await fetch(URL+'/api/image/uploadSearch', {
                    mode:'cors',
                    method: 'POST',
                    body: JSON.stringify({ 
                        data: reader.result,
                      }),
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await response.json();
                setImageId(data.imageId);
                setFileInputState('');
                setPreviewSource('');
                setAlertOpen(true);
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
                      quota:quota ,
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
                  body: JSON.stringify({ data: reader.result,quota:quota ,listFolder:listAlbum}),
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
                { quota===0 ? 
                        // Help to handle
                        <button className="search-button-form button" type="submit" onClick={handleSearchSpecial}>
                            Search
                        </button>
                        :
                        // Done 
                        <button className="search-button-form button" type="submit" onClick={handleSearch}>
                            {search? "Search inprogress" : "Search"}
                        </button>
                    }
                </form>
                
        </div> 
        {
            <AlertModal open={AlertIsOpen} onClose={() => setAlertIsOpen(false)} numberImages={numImage} searchImageId={imageId}/>
        }
        </>,
    document.getElementById('portal-2')
    
  )
}
