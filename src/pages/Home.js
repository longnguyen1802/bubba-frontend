import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import FacereCognition from './FaceRecognition.js';
import {URL} from '../components/constant.js';
import './Home.css'
<<<<<<< HEAD
import { Link ,useNavigate} from 'react-router-dom';
import CatagoryModal from '../components/CatagoryModal.js';
=======
import { Link } from 'react-router-dom';

>>>>>>> origin/front-end

export default function Home() {
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
<<<<<<< HEAD
    const [listAlbumThumbnail,setListAlbumThumbnail] = useState([]);
    const[isOpen, setIsOpen] = useState(false)
=======

>>>>>>> origin/front-end

    const loadCredit = async () => {
        const res = await axios.get(URL+'/api/limit',{mode:'cors'});
        const data = await res.data;
        setCredit(data.limit)
    }
    const loadData = async () => {
        try {
            const res = await axios.get(URL+'/api/image',{mode:'cors'});
            const data = await res.data;
            setImageIds(arr =>[...arr,...data]);
            const resp = await axios.get(URL+'/api/album',{mode:'cors'})
            setListAlbum(resp.data);
            const respo = await axios.get(URL+'/api/image/all',{mode:'cors'});
            setCurrentImageId(
                respo.data
            )
            const listData = await resp.data.forEach(async (folder) => {
                const respon = await axios.get(URL+'/api/image/album/'+folder,{mode:'cors'});
                const imageId = respon.data[0];
                setListAlbumThumbnail(arr => [...arr,imageId]);
            })
            setGetData(true);
        } catch (err) {
            try{
                const res = await axios.get(URL+'/api/image',{mode:'cors'});
                const data = await res.data;
                setImageIds(arr =>[...arr,...data]);
                const resp = await axios.get(URL+'/api/album',{mode:'cors'})
                setListAlbum(resp.data);
                const respo = await axios.get(URL+'/api/image/all',{mode:'cors'});
                setCurrentImageId(
                    respo.data
                )
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
    const handleFilter = async () =>{
        const res = await axios.get(URL+'/api/album/find',{
            mode:'cors',
            params:{
                photographer: photographer,
                date:date,
                event:event
            }
        })
        setListAlbum(res.data);
        setCurrentImageId(
            imageIds
            .filter((e) => (res.data.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
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
    return (
        <div className='homepage-container'>
            <h1 className="home-title">Explore your image</h1>
            <Link to='/search' className='search-bar'> 
              <i class="material-icons">search</i>
              <input className='search-field' type="text" placeholder="Search here"></input>
            </Link>

            <div className='album-container'>
              <h2>What's New</h2>
<<<<<<< HEAD
              { 
                listAlbumThumbnail.length>0 
                && 
                listAlbumThumbnail.map((value,index)=>(
                    <div className='album' onClick={()=>{
                        navigateAlbum(listAlbum[index])
                    }}>
                        <Image
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dfrouqxub"}
                            publicId={value}
                            width="400"
                            height="200"
                            crop="scale"
                        />
                        <div className='album-info' id = {"album-"+index}>
                            <p>Album title</p>
                            <span>Created in yyyy/mm/dd</span>
                        </div>
                    </div>
                ))
                
              }
=======
              <div className='album'>
                {/* <img src='' className='album-profile' alt='album profile picture'></img> */}
                <Link to='/search/result/album/content' className='album-info'>
                  <p>Album title</p>
                  <span>Created in yyyy/mm/dd</span>
                </Link>
              </div>
>>>>>>> origin/front-end
            </div>

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
