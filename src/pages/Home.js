import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
export default function Home() {
    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            const res = await axios.get('https://bubba-server-test.herokuapp.com/api/images',{mode:'cors'});
            const data = await res.data;
            setImageIds(data);
        } catch (err) {
            try{
                const res = await axios.get('https://bubba-server-test.herokuapp.com/api/images',{mode:'cors'});
            const data = await res.data;
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
