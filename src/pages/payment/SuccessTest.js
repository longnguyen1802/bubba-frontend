import React,{useMemo,useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import PreviewModal from '../../components/search/face/PreviewModal';
import { useAPI } from '../../context/dataContext';
import { URL } from '../../components/util/constant';
import axios from 'axios';
const Success = () => {
  const {setListAlbum}  = useAPI();
  const [quota,setQuota] = useState();
  const [valid,setValid] = useState();
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const listAlbum = localStorage.getItem("listAlbumBefore");
  const result = listAlbum.split(',');
  const query = useQuery();
  useEffect(() => {
    const setListAlbumAgain = async () => {
      try{
        const resp = await axios({
          method: 'post',
          url: URL+'/api/payment/getSessionInfo',
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            session_id : query.get("session_id")
          }
        })
        setQuota(resp.data.quota);
        setValid(true);
      } catch(err){
        setValid(false);
      }
    }
    setListAlbumAgain()
  }, []);
  return (
      <>
      { valid && valid === true ? <PreviewModal open={true} quota={quota} special={true} listRealAlbum = {result}/> : <h1>Invalid Payment</h1> }  
      </>
  )
}

export default Success