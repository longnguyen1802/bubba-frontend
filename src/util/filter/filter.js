import axios from 'axios';
import {
    URL
} from '../../components/util/constant';
export const getNotContainFace = (listImage, listAlbum, imageIds) => {
    if (!listImage)
        return []
    const listImages = imageIds
        .filter((e) => (listAlbum.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
        .map((e) => e.files)
        .flat().slice(0, 100);
    const notFound = listImages.filter(e => !listImage.includes(e));
    return notFound
}
export const getNotSearch = (listAlbum, imageIds) => {
    const listImages = imageIds
        .filter((e) => (listAlbum.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
        .map((e) => e.files)
        .flat();
    return listImages.slice(101);
}
export const getNumberImage = (listAlbum, imageIds) => {
    const listImages = imageIds
        .filter((e) => (listAlbum.some(elem => (elem.toLowerCase() === e.folder.toLowerCase()))))
        .map((e) => e.files)
        .flat();
    return listImages.length;
}
export const dateFilter = async(startDate, endDate, setListAlbum, setCurrentImageId, imageIds) => {
    const resp = await axios.get(URL + '/api/album/find', {
        mode: 'cors',
        params: {
            startDate: startDate,
            endDate: endDate
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