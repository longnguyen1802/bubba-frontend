import React from 'react'
import { Link } from 'react-router-dom'
import FilterTag from '../components/search/tag/FilterTag'
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AlertModal from '../components/notify/AlertModal';
import { useState ,useEffect} from 'react';
import { useAPI } from '../context/dataContext';
import FaceFilterBox from '../components/search/face/FaceFilterBox';
import ImageCard from '../components/image/ImageCard';
import {getNumberImage,getNotContainFace,getNotSearch} from '../util/filter/filter.js';
import { URL } from '../components/util/constant';
import axios from 'axios';
import FaceFilterBoxSpecial from '../components/search/face/FaceFilterBoxSpecial';
export default function SearchResultFace() {

  const [quotaState, setQuotaState] = useState(false)

  const {faceImageId,listAlbum,imageIds} = useAPI()
  const[AlertIsOpen, setAlertIsOpen] = useState(true)
  const numImage = getNumberImage(listAlbum,imageIds);
  const listImage = faceImageId?.listImage;
  useEffect(() => {
    const getQuota = async () =>{
      const resLimit = await axios.get(URL+'/api/limit',{mode:'cors'});
      setQuotaState(resLimit.data);
    }
    getQuota();
  }, []);
  if(!faceImageId?.imageId){
    return <></>
  }
  const listNotFound  = getNotContainFace(listImage,listAlbum,imageIds);
  const listNotSearch = getNotSearch(listAlbum,imageIds);
  return (
    <>
    <div className='homepage-container'>
      <h2 className='search-result-title'> {listImage && listImage.length} results are found</h2>
      <Link to='/search' className='search-bar'> 
        <input className='search-field' type="text" placeholder="(User input Text)"></input>
      </Link>
      <div>
          <div className='with-face'>
            <h4>There is {listImage.length} photos with your face</h4>
            <div className="result-image-container">
            {
                listImage && listImage.map((imageId,index)=>(
                  <ImageCard key={index} publicId={imageId} />
                ))
            }
            </div>
          </div>
          <div className='without-face'>
            <h4>Here is {listNotFound.length} images without your face</h4>
            <div className="result-image-container">
            {
                listNotFound && listNotFound.map((imageId,index)=>(
                  <ImageCard key={index} publicId={imageId} />
                ))
            }
            </div>
          </div>

          <div className='not-yet-search'>
            <h4>There is {listNotSearch.length} photo that maybe has your face?</h4>
            <div className="result-image-container">
            {
                listNotSearch && listNotSearch.map((imageId,index)=>(
                  <ImageCard key={index} publicId={imageId} />
                ))
            }
            </div>
          </div>
      </div>
      <FaceFilterBoxSpecial clickFunction={setAlertIsOpen} />

      {/* If out of quota */}
      {quotaState ? (
        <AlertModal open={AlertIsOpen} onClose={() => setAlertIsOpen(false)} numberImages={numImage-100} searchImageId={faceImageId.imageId} isQuota={true}/>
      ):(
        null
      )}    
      </div>
    </>
  )
}
