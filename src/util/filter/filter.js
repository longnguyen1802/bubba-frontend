import axios from 'axios';
import {
    URL
} from '../../components/constant';
export const dateFilter = async(date, setListAlbum, setCurrentImageId, imageIds) => {
    const resp = await axios.get(URL + '/api/album/find', {
        mode: 'cors',
        params: {
            date: date
        }
    })
    const listAlbum = resp.data;
    setListAlbum(resp.data)
    setCurrentImageId(
        imageIds
        .filter((e) => (listAlbum.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
        .map((e) => e.files)
        .flat()
    );
}

export const eventFilter = async(event, setListAlbum, setCurrentImageId, imageIds) => {
    const resp = await axios.get(URL + '/api/album/find', {
        mode: 'cors',
        params: {
            event: event
        }
    })
    const listAlbum = resp.data;
    setListAlbum(resp.data)
    setCurrentImageId(
        imageIds
        .filter((e) => (listAlbum.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
        .map((e) => e.files)
        .flat()
    );
}