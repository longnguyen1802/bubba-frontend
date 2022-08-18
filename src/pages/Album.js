import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {URL} from '../components/constant.js';

import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AlertModal from '../components/AlertModal';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FaceFilterBox from '../components/FaceFilterBox.js';
import ImageCard from '../components/ImageCard.js';
import { useAPI } from '../dataContext.js';
export default function Album() {
    const [imageIds, setImageIds] = useState();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const[AlertIsOpen, setAlertIsOpen] = useState(false)
    const {setListAlbum} = useAPI();
    const loadData = async () => {
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
            setListAlbum([id]);
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
                setImageIds(data);
            }
            catch(err){
                console.error(err);
            }   
        } 
    };
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div>
            <div className='homepage-container'>
              <div className='image-result-title'>
                <IconButton>
                  <Link to='/search/result/album'><ArrowBackIosIcon /></Link>
                </IconButton>
                <h2>Album {id}</h2>
              </div>
              <div className='result-image-container'>
                {imageIds &&
                  imageIds.map((imageId, index) => (
                      // <Image
                      //     key={index}
                      //     cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dr4xcuczn"}
                      //     publicId={imageId}
                      //     crop="scale"
                      //     className='image-box'
                      // />
                      <ImageCard key={index} publicId={imageId} />
                  ))}
              </div>
              <FaceFilterBox />
              {/* If out of quota */}
              <AlertModal open={AlertIsOpen} onClose={() => setAlertIsOpen(false)} />
            </div>
        </div>
    );
}