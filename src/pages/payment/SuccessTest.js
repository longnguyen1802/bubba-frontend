import React,{useMemo,useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import PreviewModal from '../../components/search/face/PreviewModal';
import { useAPI } from '../../context/dataContext';
import { URL } from '../../components/util/constant';
import axios from 'axios';
const SuccessState = () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [success,setSuccess] = useState(false);
  useEffect(() => {
    const setListAlbumAgain = async () => {
      try{
        const resp = await sleep(5000);
        setSuccess(true);
      } catch(err){
      }
    }
    setListAlbumAgain()
  }, []);
  return (
      <>
        {
          success? <h1>"Go to here" </h1>: <h1></h1>
        }
      </>
  )
}

export default SuccessState