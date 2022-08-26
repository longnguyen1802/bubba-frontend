import React,{useMemo,useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import PreviewModal from '../../components/search/face/PreviewModal';
import { useAPI } from '../../context/dataContext';
import { URL } from '../../components/util/constant';
import axios from 'axios';
import ListImage from '../../components/image/ListImage';
import LoadingIcons from 'react-loading-icons'
import { getRemaining } from '../../util/filter/filter';
const Success = () => {
  const {setListAlbum,setFaceImageId,imageIds}  = useAPI();
  const [resultFace,setResultFace] = useState();
  const [valid,setValid] = useState();
  const [success,setSuccess] = useState(false);
  const [remainingImage,setRemainingImage] = useState();
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const listAlbum = localStorage.getItem("listAlbumBefore");
  const faceSearchId = localStorage.getItem("faceImageSearchBefore")
  const result = listAlbum.split(',');
  const quota  =parseInt(localStorage.getItem("quotaSearchBefore"))
  const noQuota = localStorage.getItem("noQuotaBefore")
  const query = useQuery();
  
  useEffect(()=>{
    const handleSearchSpecial = async () => {
      try {
          const response = await fetch(URL+'/api/image/findSpecial', {
              mode:'cors',
              method: 'POST',
              body: JSON.stringify({ 
                  listFolder: result,
                  quota:quota ,
                  publicId:faceSearchId,
                  noQuota:noQuota
                }),
              headers: { 'Content-Type': 'application/json' },
          });
          const resImage = await axios.get(URL+'/api/image',{mode:'cors'});
          const resultResponse = await response.json()
          setResultFace(resultResponse);
          const listRemaining = getRemaining(resultResponse,listAlbum.split(','),resImage.data);
          setRemainingImage(listRemaining);
          setSuccess(true);
      } catch (err) {
          try{
            const response = await fetch(URL+'/api/image/findSpecial', {
              mode:'cors',
              method: 'POST',
              body: JSON.stringify({ 
                  listFolder: result,
                  quota:quota ,
                  publicId:faceSearchId,
                  noQuota:noQuota
                }),
              headers: { 'Content-Type': 'application/json' },
          });
          const resImage = await axios.get(URL+'/api/image',{mode:'cors'});
          const resultResponse = await response.json()
          setResultFace(resultResponse);
          const listRemaining = getRemaining(resultResponse,listAlbum.split(','),resImage.data);
          setRemainingImage(listRemaining);
          setSuccess(true);
          }
          catch(err){
              console.error(err);
          }
      }
  };
  handleSearchSpecial();
  },[]);
  
  return (
    <>
    {
      success 
        ? 
          resultFace&&
          <>
          <div className='homepage-container'>
              <h1>There is {resultFace.length} Image with your face!</h1>
              <ListImage listImage={resultFace}/>
          </div>
          <div className='without-face'>
            <h2>Here is {remainingImage.length} images without your face</h2>
            <ListImage listImage={remainingImage}/>
          </div>
          </>
        :
        <div className='loading-container'>
          <LoadingIcons.ThreeDots fill="#4D258E"/>
          <h2>LOADING</h2>
        </div>  
  }
    </>
  )
}

export default Success