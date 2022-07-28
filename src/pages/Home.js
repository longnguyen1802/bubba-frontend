import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import FacereCognition from './FaceRecognition.js';
import {URL} from '../components/constant.js'
export default function Home() {
    const [imageIds, setImageIds] = useState([]);
    const [getData,setGetData] = useState(false);
    const [photographer,setPhotographer] = useState('');
    const [date,setDate] = useState('');
    const [event,setEvent] = useState('');
    const [currentImageId,setCurrentImageId] = useState();
    // const [listAlbum,setListAlbum] = useState([]);
    const loadData = async () => {
        try {
            const res = await axios.get(URL+'/api/image',{mode:'cors'});
            const data = await res.data;
            setImageIds(arr =>[...arr,...data]);
            // const resp = await axios.get('http://localhost:3001/api/album',{mode:'cors'})
            // setListAlbum(resp.data);
            const respo = await axios.get(URL+'/api/image/all',{mode:'cors'});
            setCurrentImageId(
                respo.data
            )
            setGetData(true);
        } catch (err) {
            try{
                const res = await axios.get(URL+'/api/image',{mode:'cors'});
                const data = await res.data;
                setImageIds(arr =>[...arr,...data]);
                // const resp = await axios.get('http://localhost:3001/api/album',{mode:'cors'})
                // setListAlbum(resp.data);
                const respo = await axios.get(URL+'/api/image/all',{mode:'cors'});
                setCurrentImageId(
                    respo.data
                )
                setGetData(true);
            } catch(err){
                setGetData(true);
                console.error(err);
            }   
        } 
    };
    useEffect( () => {
        if(!getData){
             loadData();
        }
    }, []);
    const handleFilter = async () =>{
        const res = await axios.get(URL+'/api/album/find',{
            mode:'cors',
            params:{
                photographer: photographer,
                date:date
            }
        })
        // setListAlbum(res.data);
        setCurrentImageId(
            imageIds
            .filter((e) => (res.data.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
            .map((e) => e.files)
            .flat()
        );       
    }
    return (
        <div>
            <h1 className="title">Cloudinary Gallery</h1>
            <br></br>
            <h2>There is current {currentImageId&& currentImageId.length} images</h2>
            <br></br>
            <label>Photographer</label>
            <input
                className="search"
                onChange={(e) => setPhotographer(e.target.value.toLowerCase())}
            />
            <br></br>
            <label>Date</label>
            <input
                className="search"
                onChange={(e) => setDate(e.target.value.toLowerCase())}
            />
            <br></br>
            <label>Event</label>
            <input
                className="search"
                onChange={(e) => setEvent(e.target.value.toLowerCase())}
            />
            <br></br>
            <button onClick={handleFilter}>Filter</button> 
            <br></br>
            
            <FacereCognition/>
            <br></br>
            <h1>Preview of all image</h1>
            <div className="gallery">
            {
                // imageIds
                // && 
                // listAlbum
                // &&
                // imageIds
                // .filter((e) => (listAlbum.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
                // .map((e) => e.files)
                // .flat()
                // .map((imageId,index)=>(
                //     <Image
                //         key={index}
                //         cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dedaueiyq"}
                //         publicId={imageId}
                //         width="300"
                //         crop="scale"
                //     />
                // ))
                currentImageId && currentImageId.map((imageId,index)=>(
                        <Image
                        key={index}
                        cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dedaueiyq"}
                        publicId={imageId}
                        width="300"
                        crop="scale"
                    />
                ))
            }
            </div>
        </div>
    );
}
