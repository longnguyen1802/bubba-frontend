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
        </div>
    );
}                        
