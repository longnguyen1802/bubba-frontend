import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import { URL } from "./components/constant";
const DataContext = createContext();

export function DataContextProvider({ children }) {
    const [imageIds, setImageIds] = useState([]);
    const [currentImageId,setCurrentImageId] = useState();
    const [listAlbum,setListAlbum] = useState([]);
    const [listAlbumThumbnail,setListAlbumThumbnail] = useState([]);
    const [listAllAlbum,setListAllAlbum] = useState([]);
  useEffect(() => {
    async function fetchData() {
        try{
            const [res1,res2,res3]= await Promise.all([
                axios.get(URL+'/api/image',{mode:'cors'}),
                axios.get(URL+'/api/album',{mode:'cors'}),
                axios.get(URL+'/api/image/all',{mode:'cors'})
            ])
            setImageIds(arr =>[...arr,...res1.data]);
            setListAlbum(res2.data);
            setListAllAlbum(res2.data);
            setCurrentImageId(res3.data);
            await res2.data.forEach(async (folder) => {
                const respon = await axios.get(URL+'/api/image/album',
                {
                    mode:'cors',
                    params:{
                        albumId: folder
                    }
                });
                const imageId = respon.data[0];
                setListAlbumThumbnail(arr => [...arr,imageId]);
            })
        } catch(err){
            try{
                const [res1,res2,res3]= await Promise.all([
                    axios.get(URL+'/api/image',{mode:'cors'}),
                    axios.get(URL+'/api/album',{mode:'cors'}),
                    axios.get(URL+'/api/image/all',{mode:'cors'})
                ])
                setImageIds(arr =>[...arr,...res1.data]);
                setListAlbum(res2.data);
                setListAllAlbum(res2.data);
                setCurrentImageId(res3.data);
                await res2.data.forEach(async (folder) => {
                    const respon = await axios.get(URL+'/api/image/album',
                    {
                        mode:'cors',
                        params:{
                            albumId: folder
                        }
                    });
                    const imageId = respon.data[0];
                    setListAlbumThumbnail(arr => [...arr,imageId]);
                })
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
