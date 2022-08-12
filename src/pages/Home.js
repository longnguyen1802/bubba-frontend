import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import FacereCognition from './FaceRecognition.js';
import {URL} from '../components/constant.js';
import './Home.css'
import { Link ,useNavigate} from 'react-router-dom';
import AlbumCard from '../components/AlbumCard.js'
import { Album } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Home() {
    const eventList = [
        "香港健球總會港青京士柏健球校際賽",
        "世界綠色組織主辦大新銀行敢動呈獻「地球。敢「動」行」",
        "仲夏越野賽",
        "世界舞蹈家演藝總會第九屆世界舞蹈家錦標賽",
        "香港學界體育聯會2021-2022年全港學界精英田徑（團體）比賽"
    ]
    const navigate = useNavigate();
    const [imageIds, setImageIds] = useState([]);
    const [getData,setGetData] = useState(false);
    const [photographer,setPhotographer] = useState('');
    const [date,setDate] = useState('');
    const [event,setEvent] = useState('');
    const [currentImageId,setCurrentImageId] = useState();
    const [credit,setCredit] = useState();
    const [listAlbum,setListAlbum] = useState([]);
    const [updateCredit,setUpdateCredit] = useState(false);
    const [listAlbumThumbnail,setListAlbumThumbnail] = useState([]);
    //const[isOpen, setIsOpen] = useState(false)
    const [listEvent,setListEvent] = useState([false,false,false,false,false]);
    const [eventName, setEventName] = useState('');

    const loadCredit = async () => {
        const res = await axios.get(URL+'/api/limit',{mode:'cors'});
        const data = await res.data;
        setCredit(data.limit)
    }
    const loadData = async () => {
        try {
            const [res1,res2,res3]= await Promise.all([
                axios.get(URL+'/api/image',{mode:'cors'}),
                axios.get(URL+'/api/album',{mode:'cors'}),
                axios.get(URL+'/api/image/all',{mode:'cors'})
            ])
            setImageIds(arr =>[...arr,...res1.data]);
            setListAlbum(res2.data);
            setCurrentImageId(res3.data)
            // const res = await axios.get(URL+'/api/image',{mode:'cors'});
            // const data = await res.data;
            // setImageIds(arr =>[...arr,...data]);
            // const resp = await axios.get(URL+'/api/album',{mode:'cors'})
            // setListAlbum(resp.data);
            // const respo = await axios.get(URL+'/api/image/all',{mode:'cors'});
            // setCurrentImageId(
            //     respo.data
            // )
            const listData = await res2.data.forEach(async (folder) => {
                const respon = await axios.get(URL+'/api/image/album',
                {
                    mode:'cors',
                    params:{
                        albumId: folder
                    }
                });
                const imageId = respon.data[0];
                setListAlbumThumbnail(arr => [...arr,imageId]);
            })
            setGetData(true);
        } catch (err) {
            try{
                const [res1,res2,res3]= await Promise.all([
                    axios.get(URL+'/api/image',{mode:'cors'}),
                    axios.get(URL+'/api/album',{mode:'cors'}),
                    axios.get(URL+'/api/image/all',{mode:'cors'})
                ])
                setImageIds(arr =>[...arr,...res1.data]);
                setListAlbum(res2.data);
                setCurrentImageId(res3.data)
                const listData = await res2.data.forEach(async (folder) => {
                    const respon = await axios.get(URL+'/api/image/album',
                    {
                        mode:'cors',
                        params:{
                            albumId: folder
                        }
                    });
                    const imageId = respon.data[0];
                    setListAlbumThumbnail(arr => [...arr,imageId]);
                })
                // const res = await axios.get(URL+'/api/image',{mode:'cors'});
                // const data = await res.data;
                // setImageIds(arr =>[...arr,...data]);
                // const resp = await axios.get(URL+'/api/album',{mode:'cors'})
                // setListAlbum(resp.data);
                // const respo = await axios.get(URL+'/api/image/all',{mode:'cors'});
                // setCurrentImageId(
                //     respo.data
                // )
                setGetData(true);
            } catch(err){
                setGetData(true);
                console.error(err);
            }   
        } 
    };
    useEffect( () => {
        console.log("Update credit");
        loadCredit();
        if(!getData){
             loadData();
        }
    }, [updateCredit]);
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
                console.log(index);
                return {
                    data: [],
                }
            }
        }));
        const listAlbum = listResponse.map(value => value.data).flat();
        setListAlbum(listAlbum)
        setCurrentImageId(
            imageIds
            .filter((e) => (listAlbum.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
            .map((e) => e.files)
            .flat()
        );  
        // const res = await axios.get(URL+'/api/album/find',{
        //     mode:'cors',
        //     params:{
        //         photographer: photographer,
        //         date:date,
        //         event:event
        //     }
        // })
        //setListAlbum(res.data);
        // setCurrentImageId(
        //     imageIds
        //     .filter((e) => (res.data.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
        //     .map((e) => e.files)
        //     .flat()
        // );     
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
    const handleChange = (event) => {
      setEventName(event.target.value);
    };
    return (
        <div className='homepage-container'>
            <h1 className="home-title">Explore your image</h1>
            <Link to='/search' className='search-bar'> 
              <i class="material-icons">search</i>
              <input className='search-field' type="text" placeholder="Search here"></input>
            </Link>
            <h3>Filter Album</h3>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Event</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eventName}
                label="Event"
                onChange={handleChange}
              >
                {eventList.map((eventName) => (
                  <MenuItem 
                    key={eventName}
                    value={eventName}
                  >
                    {eventName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className='event-filter-container'>
              <div className={listEvent[0]?'event-box-after':'event-box'} id = "box-0" onClick={()=>{
                handleFilterClick(0)
              }}>
                <span>香港健球總會港青
                    <br/>京士柏健球校際賽 </span>
              </div>
              <div className={listEvent[1]?'event-box-after':'event-box'} id = "box-1" onClick={async ()=> {
                handleFilterClick(1);
              }}>
                <span>世界綠色組織主辦、<br/>大新銀行敢動呈獻的<br/>「地球。敢「動」行」</span>
              </div>
              <div className={listEvent[2]?'event-box-after':'event-box'} id = "box-2" onClick={()=>{
                handleFilterClick(2)
              }}>
                <span>仲夏越野賽 1</span>
              </div>
              <div className={listEvent[3]?'event-box-after':'event-box'} id = "box-3" onClick={()=>{
                handleFilterClick(3)
              }}>
                <span>世界舞蹈家演藝總會<br/>第九屆世界舞蹈家錦標賽</span>
              </div>
              <div className={listEvent[4]?'event-box-after':'event-box'} id = "box-4" onClick={()=>{
                handleFilterClick(4)
              }}>
                <span>香港學界體育聯會 <br/> 2021 -2022 年<br/>全港學界精英田徑（團體）比賽</span>
              </div>
            </div>
            {/* <div className='album-container'>
                <h2>What's New</h2>
                    <div className='album'>
                        <AlbumCard 
                          title='Card title'
                          imageSource=''
                          caption='Created in yyyy/mm/dd' 
                        />
                    </div>
            </div> */}
              
            {
                listEvent.filter(Boolean).length === 0
                ?
                (
                    <div className='album-container'>
                        <h2>What's New</h2>
                        { 
                        listAlbumThumbnail.length > 0 
                        && 
                        listAlbumThumbnail.map((value,index)=>(
                            <div className='album' onClick={()=>{
                                navigateAlbum(listAlbum[index])
                            }}>
                                {/* <Image
                                    key={index}
                                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dfrouqxub"}
                                    publicId={value}
                                    width="400"
                                    height="200"
                                    crop="scale"
                                /> */}
                                {/* <div className='album-info' id = {"album-"+index}>
                                    <p>Album title</p>
                                    <span>Created in yyyy/mm/dd</span>
                                </div> */}
                                <AlbumCard 
                                  title='Card title'
                                  imageSource=''
                                  caption='Created in yyyy/mm/dd' 
                                />
                            </div>
                        ))   
                        }
                    </div>
                )
                :
                (
                    <div>
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
        </div>
    );
}
