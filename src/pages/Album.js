import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function Album() {
    const [imageIds, setImageIds] = useState();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const loadImages = async () => {
        try {
            const res = await axios.get('https://bubba-testnet.herokuapp.com/api/image/album/'+id,{mode:'cors'});
            const data = await res.data;
            //return data;
            setImageIds(data);
        } catch (err) {
            try{
                const res = await axios.get('https://bubba-testnet.herokuapp.com/api/image/album/'+id,{mode:'cors'});
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
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dedaueiyq"}
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}
