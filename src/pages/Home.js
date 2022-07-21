import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import {useFetch} from '../hooks/useFetch';
export default function Home() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        const {data,loading,error,reFetch} = await useFetch('https://bubba-server-test.herokuapp.com/api/images');
        if(error){
            reFetch();
        }
        setImageIds(data);
            try {
                const res = await fetch('https://bubba-server-test.herokuapp.com/api/images',{mode:'cors'});
                const data = await res.json();
                setImageIds(data);
            } catch (err) {
                console.error(err);
            } 
    };
    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div>
            <h1 className="title">Cloudinary Gallery</h1>
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
