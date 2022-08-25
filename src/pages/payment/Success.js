import React,{useMemo,useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import PreviewModal from '../../components/search/face/PreviewModal';
import { useAPI } from '../../context/dataContext';
import { URL } from '../../components/util/constant';
import axios from 'axios';
import ListImage from '../../components/image/ListImage';
const Success = () => {
  const {setListAlbum,setFaceImageId}  = useAPI();
  const [resultFace,setResultFace] = useState();
  const [valid,setValid] = useState();
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const listAlbum = localStorage.getItem("listAlbumBefore");
  const faceSearchId = localStorage.getItem("faceImageSearchBefore")
  const result = listAlbum.split(',');
  const quota  =parseInt(localStorage.getItem("quotaSearchBefore"))
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
                  publicId:faceSearchId}),
              headers: { 'Content-Type': 'application/json' },
          });
          setResultFace(await response.json());
      } catch (err) {
          try{
            const response = await fetch(URL+'/api/image/findSpecial', {
              mode:'cors',
              method: 'POST',
              body: JSON.stringify({ 
                  listFolder: result,
                  quota:quota ,
                  publicId:faceSearchId}),
              headers: { 'Content-Type': 'application/json' },
          });
          setResultFace(await response.json());
          }
          catch(err){
              console.error(err);
          }
      }
  };
  handleSearchSpecial();
  },[]);
  
  return (
    resultFace&&
     <>
     <div className='homepage-container'>
        <h1>There is {resultFace.length} Image</h1>
        <ListImage listImage={resultFace}/>
     </div>
      
    </>
  )
}

export default Success