import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {URL} from '../components/constant.js';
export default function Album() {
    const [imageIds, setImageIds] = useState();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const loadImages = async () => {
        try {
            const res = await axios.get(URL+'/api/image/album',
                {
                    mode:'cors',
                    params:{
                        albumId:id
                    }
                }
            );
            const data = await res.data;
            //return data;
            setImageIds(data);
        } catch (err) {
            try{
                const res = await axios.get(URL+'/api/image/album',
                {
                    mode:'cors',
                    params:{
                        albumId:id
                    }
                }
            );
                const data = await res.data;
                //return data;
                setImageIds(data);
            }
            catch(err){
                console.error(err);
            }   
        } 
    };
    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div>
            <h1 className="title">Album {id}</h1>
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dfrouqxub"}
                            publicId={imageId}
                            width="300"
                            height="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}