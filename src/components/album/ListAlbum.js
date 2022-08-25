import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
//import axios from 'axios';
// import FacereCognition from './FaceRecognition.js';
//import {URL} from '../components/constant.js';
import '../../pages/Home.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { convertDate } from '../../util/filter/convert';
const ListAlbum = ({listAlbumThumbnail,listAllAlbum,navigateAlbum,listAlbumInfo,listAlbumDate}) => {
  return (
    <div className='album-container'>      
        {   
        listAlbumThumbnail.length>0 
        && 
        listAlbumInfo
        &&
        listAlbumDate
        &&
        listAlbumThumbnail.map((value,index)=>(
            <div className={`album`+index} onClick={()=>{
                navigateAlbum(listAllAlbum[index])
            }}>
                <Card sx={{ maxWidth: "388px", borderRadius: "20px", marginTop: "20px"}}>
                <CardActionArea>
                    <Image
                        key={index}
                        cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dr4xcuczn"}
                        publicId={value}
                        className="card-image"
                        width="388"
                        height="233"
                        crop="scale"
                    />
                    <CardContent className='album-info'>
                    <Typography gutterBottom component="div">
                        {listAlbumInfo[index]}
                    </Typography>
                    <Typography variant="body3" color="text.secondary">
                        {convertDate(listAlbumDate[index])}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            </div>
        ))   
        }
    </div>
  )
}

export default ListAlbum