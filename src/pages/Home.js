import React, {useState } from 'react';
import './Home.css'
import { Link ,useNavigate} from 'react-router-dom';
import { useAPI } from '../context/dataContext.js';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListAlbum from '../components/album/ListAlbum';
export default function Home() {
    const {listAlbumThumbnail,listAllAlbum,listAlbumInfo,listAlbumDate} = useAPI()
    const eventList = [
<<<<<<< HEAD
        "Community Connect Programme",
        "GS1 Event",
        "Investors Matching Programme",
        "Jumpstarter 2022",
        "Road To GBA Start-Up Programme 2.0 Launch Event",
=======
        "GS1 Event",
        "Community Connect Programme",
        "Road To GBA Start-Up Programme 2.0 Launch Event",
        "Investors Matching Programme",
        "Jumpstarter 2022",
>>>>>>> front-end-dev
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
    const actualThumnail = listAlbumThumbnail.map((value)=>value.thumbnail);
    const actualDate = listAlbumDate.map((value)=>value.date);
    const actualInfo = listAlbumInfo.map((value)=>value.description);
    //const actualInfo = 
    return (
        <div className='homepage-container'>
            <h1 className="home-title">Explore your image</h1>
            <Link to='/search' className='search-bar'> 
              <i className="material-icons">search</i>
              <input className='search-field' type="text" placeholder="Search here"></input>
<<<<<<< HEAD
            </Link> */}
            <div className='event-filter-container'>
              <div className={listEvent[0]?'event-box-after':'event-box'} id = "box-0" onClick={()=>{
                handleFilterClick(0)
              }}>
                <span>Community Connect 
                    <br/>Programme </span>
              </div>
              <div className={listEvent[1]?'event-box-after':'event-box'} id = "box-1" onClick={async ()=> {
                handleFilterClick(1);
              }}>
                <span>GS1 Event</span>
              </div>
              <div className={listEvent[2]?'event-box-after':'event-box'} id = "box-2" onClick={()=>{
                handleFilterClick(2)
              }}>
                <span>Investors Matching <br/> Programme</span>
              </div>
              <div className={listEvent[3]?'event-box-after':'event-box'} id = "box-3" onClick={()=>{
                handleFilterClick(3)
              }}>
                <span>Jumpstarter 2022</span>
              </div>
              <div className={listEvent[4]?'event-box-after':'event-box'} id = "box-4" onClick={()=>{
                handleFilterClick(4)
              }}>
                <span>Road To GBA <br/>Start-Up Programme 2.0 <br/>Launch Event</span>
              </div>
              <div className={listEvent[5]?'event-box-after':'event-box'} id = "box-4" onClick={()=>{
                handleFilterClick(5)
              }}>
                <span>Visit Of Shenzhen <br/> Hong Kong Macau Women <br/> Directors Alliance</span>
              </div>
            </div>
              
            {
                listEvent.filter(Boolean).length === 0
                ?
                (
                    <div className='album-container'>
                        <h2>What's New</h2>
                        { 
                        listAlbumThumbnail.length>0 
                        && 
                        listAlbumThumbnail.map((value,index)=>(
                            <div className='album' onClick={()=>{
                                navigateAlbum(listAllAlbum[index])
                            }}>
                                <Image
                                    key={index}
                                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dfrouqxub"}
                                    publicId={value}
                                    width="400"
                                    height="200"
                                    crop="scale"
                                />
                                {/* <div className='album-info' id = {"album-"+index}>
                                    <p>Album title</p>
                                    <span>Created in yyyy/mm/dd</span>
                                </div> */}
                            </div>
                        ))   
                        }
                    </div>
                )
                :
                (
                    <div>
                        <FacereCognition listFolder={listAlbum}/>
                        <br></br>
                        <h1>Preview of all filter image</h1>
                        <h2>There is current {currentImageId&& currentImageId.length} images</h2>
                        <div className="gallery">
                        {
                            currentImageId && currentImageId.map((imageId,index)=>(
                                    <Image
                                    key={index}
                                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dfrouqxub"}
                                    publicId={imageId}
                                    width="300"
                                    height="300"
                                    crop="scale"
                                />
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
=======
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
                <ListAlbum listAlbumThumbnail={actualThumnail} listAllAlbum={listAllAlbum} 
                           navigateAlbum={navigateAlbum} listAlbumDate={actualDate} 
                           listAlbumInfo={actualInfo}/>
            </>     
>>>>>>> front-end-dev
        </div>
    );
}                        
