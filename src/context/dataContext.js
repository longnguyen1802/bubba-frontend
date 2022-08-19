import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { URL } from "../components/util/constant";
const DataContext = createContext();

export function DataContextProvider({ children }) {
    const [imageIds, setImageIds] = useState([]);
    const [currentImageId,setCurrentImageId] = useState();
    const [listAlbum,setListAlbum] = useState([]);
    const [listAlbumThumbnail,setListAlbumThumbnail] = useState([]);
    const [listAlbumInfo,setListAlbumInfo] = useState([]);
    const [listAlbumDate,setListAlbumDate] = useState([]);
    const [listAllAlbum,setListAllAlbum] = useState([]);
    const [faceImageId,setFaceImageId] = useState();
  useEffect(() => {
    async function fetchData() {
        try{
            const [resImage,resAlbum,resAllImage,resThumbnail,resInfo,resDate]= await Promise.all([
                axios.get(URL+'/api/image',{mode:'cors'}),
                axios.get(URL+'/api/album',{mode:'cors'}),
                axios.get(URL+'/api/image/all',{mode:'cors'}),
                axios.get(URL+'/api/album/thumbnail',{mode:'cors'}),
                axios.get(URL+'/api/album/info',{mode:'cors'}),
                axios.get(URL+'/api/album/date',{mode:'cors'}),
            ])
            setImageIds(arr =>[...arr,...resImage.data]);
            setListAlbum(resAlbum.data);
            setListAllAlbum(resAlbum.data);
            setCurrentImageId(resAllImage.data);
            setListAlbumThumbnail(resThumbnail.data);
            setListAlbumInfo(resInfo.data);
            setListAlbumDate(resDate.data);
            //console.log(resThumbnail.data)
        } catch(err){
            try{
              const [resImage,resAlbum,resAllImage,resThumbnail,resInfo,resDate]= await Promise.all([
                axios.get(URL+'/api/image',{mode:'cors'}),
                axios.get(URL+'/api/album',{mode:'cors'}),
                axios.get(URL+'/api/image/all',{mode:'cors'}),
                axios.get(URL+'/api/album/thumbnail',{mode:'cors'}),
                axios.get(URL+'/api/album/info',{mode:'cors'}),
                axios.get(URL+'/api/album/date',{mode:'cors'}),
            ])
            setImageIds(arr =>[...arr,...resImage.data]);
            setListAlbum(resAlbum.data);
            setListAllAlbum(resAlbum.data);
            setCurrentImageId(resAllImage.data);
            //setListAlbumThumbnail(resThumbnail.data.map((value)=>value.thumbnail));
            setListAlbumInfo(resInfo.data);
            setListAlbumDate(resDate.data);
            } catch(err){
                console.error(err);
            }
        }

    }
    fetchData();
  }, []);
  return (
    <DataContext.Provider
      value={{
        imageIds:imageIds,
        currentImageId:currentImageId,
        listAlbum:listAlbum,
        listAlbumThumbnail:listAlbumThumbnail,
        listAllAlbum:listAllAlbum,
        setListAlbum:setListAlbum,
        setCurrentImageId:setCurrentImageId,
        faceImageId:faceImageId,
        setFaceImageId:setFaceImageId,
        listAlbumInfo:listAlbumInfo,
        listAlbumDate:listAlbumDate
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
