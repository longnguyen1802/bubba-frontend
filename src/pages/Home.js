import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
//import axios from 'axios';
// import FacereCognition from './FaceRecognition.js';
//import {URL} from '../components/constant.js';
import './Home.css'
import { Link ,useNavigate} from 'react-router-dom';
import { useAPI } from '../dataContext.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function Home() {
    const {listAlbumThumbnail,listAllAlbum} = useAPI()
    const eventList = [
        "GS1 Event",
        "Community Connect Programme",
        "Road To GBA Start-Up Programme 2.0 Launch Event",
        "Investors Matching Programme",
        "Jumpstarter 2022",
        "Visit Of Shenzhen Hong Kong Macau Women Directors Alliance"
    ]
    const navigate = useNavigate();
    const [eventName, seteventName] = useState('');

    const handleChange = (event) => {
      seteventName(event.target.value);
    };
    const navigateAlbum = (albumId) =>{

        navigate('/album/'+albumId);
    }

    return (
        <div className='homepage-container'>
            <h1 className="home-title">Explore your image</h1>
            <Link to='/search' className='search-bar'> 
              <i className="material-icons">search</i>
              <input className='search-field' type="text" placeholder="Search here"></input>

            </Link>
            <h3>Event Album</h3>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Event</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eventName}
                label="Event"
                onChange={handleChange}
              >
                {eventList.map((eventName, index) => (
                  <MenuItem 
                    key={eventName}
                    value={eventName}
                    onClick ={()=>{
                      navigateAlbum(listAllAlbum[index])
                    }}
                  >
                    {eventName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <>
                <h2>What's New</h2>
                <div className='album-container'>
                  
                    { 
                    listAlbumThumbnail.length>0 
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
                                  Album Title
                                </Typography>
                                <Typography variant="body3" color="text.secondary">
                                  Created in yyyy/mm/dd
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </div>
                    ))   
                    }
                </div>
            </>
                
          
            
        </div>
    );
}                        
