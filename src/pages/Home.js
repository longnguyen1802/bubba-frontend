import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import FacereCognition from './FaceRecognition.js';
import {URL} from '../components/constant.js';
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
import ImageCard from '../components/ImageCard.js';


export default function Home() {
    const {listAlbum,imageIds,listAlbumThumbnail,listAllAlbum,currentImageId,setCurrentImageId,setListAlbum} = useAPI()
    const eventList = [
        "GS1 Event",
        "Community Connect Programme",
        "Road To GBA Start-Up Programme 2.0 Launch Event",
        "Investors Matching Programme",
        "Jumpstarter 2022",
        "Visit Of Shenzhen Hong Kong Macau Women Directors Alliance"
    ]
    const[FaceIsOpen, setFaceIsOpen] = useState(false)
    const navigate = useNavigate();
    const [getData,setGetData] = useState(false);
    const [photographer,setPhotographer] = useState('');
    const [date,setDate] = useState('');
    const [event,setEvent] = useState('');
    const [credit,setCredit] = useState();
    const [updateCredit,setUpdateCredit] = useState(false);
    const [listEvent,setListEvent] = useState([false,false,false,false,false]);
    const [eventName, seteventName] = useState('');

    const handleChange = (event) => {
      seteventName(event.target.value);
    };

    const loadCredit = async () => {
        const res = await axios.get(URL+'/api/limit',{mode:'cors'});
        const data = await res.data;
        setCredit(data.limit)
    }
    const handleFilter = async (listBoolean) =>{
        const listResponse = await Promise.all(listBoolean.map((value, index) => {
            if (value) {
                return axios.get(URL + '/api/album/find', {
                    mode: 'cors',
                    params: {
                        event: eventList[index]
                    }
                })
            } else {
                return {
                    data: [],
                }
            }
        }));
        const listAlbum = listResponse.map(value => value.data).flat();
        setListAlbum(listAlbum);
        setCurrentImageId(
            imageIds
            .filter((e) => (listAlbum.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
            .map((e) => e.files)
            .flat()
        );   
    }
    const navigateAlbum = (albumId) =>{
        navigate('/album/'+albumId);
    }
    const showFilter = () =>{
      console.log("test")
    }
    const handleFilterClick = (i) => {
        const newArr = [...listEvent];
        newArr[i] = !newArr[i];
        handleFilter(newArr);
        setListEvent(newArr);
    }
    return (
        <div className='homepage-container'>
            <h1 className="home-title">Explore your image</h1>
            <Link to='/search' className='search-bar'> 
              <i class="material-icons">search</i>
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
              
            {
                listEvent.filter(Boolean).length === 0
                ?
                (
                <>
                   <h2>What's New</h2>
                    <div className='album-container'>
                      
                        { 
                        listAlbumThumbnail.length>0 
                        && 
                        listAlbumThumbnail.map((value,index)=>(
                            <div className='album' onClick={()=>{
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
                )
                :
                (
                    <div>
                        {/* <FacereCognition listFolder={listAlbum}/> */}
                        <br></br>
                        <h1>Preview of all filter image</h1>
                        <h2>There is current {currentImageId&& currentImageId.length} images</h2>
                        <div className="gallery">
                        {
                            currentImageId && currentImageId.map((imageId,index)=>(
                                //     <Image
                                //     key={index}
                                //     cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dr4xcuczn"}
                                //     publicId={imageId}
                                //     width="300"
                                //     height="300"
                                //     crop="scale"
                                // />
                                <ImageCard key={index} publicId={imageId} />

                            ))
                        }
                        </div>
                    </div>
                )
            }
            
            {/* <h2>There is current {currentImageId&& currentImageId.length} images</h2>
            <br></br>
            <p> You have {credit} free credit</p>
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
            
            <FacereCognition listFolder ={listAlbum}/>
            <br></br>
            <h1>Preview of all image</h1>
            <div className="gallery">
            {
                currentImageId && currentImageId.map((imageId,index)=>(
                        <Image
                        key={index}
                        cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dfrouqxub"}
                        publicId={imageId}
                        width="300"
                        crop="scale"
                    />
                ))
            }
            </div> */}
        </div>
    );
}                        
