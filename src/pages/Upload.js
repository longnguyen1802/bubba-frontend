import React, { useState } from 'react';
import Alert from '../components/Alert';
import axios from 'axios';
export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    //  const [dataFile,setDataFile] = useState([]);
    const [folderName,setFolderName] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        
        setFileInputState(e.target.value);
        for(let file of e.target.files){
            setSelectedFile(arr => [...arr,file]);
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        for(let file of selectedFile){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                uploadImage(reader.result);
            };
            reader.onerror = () => {
                console.error('AHHHHHHHH!!');
                setErrMsg('something went wrong!');
            };
        }    
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await axios({
                method:'post',
                url: 'https://bubba-testnet.herokuapp.com/api/image/upload',
                headers:{ 'Content-Type': 'application/json' },
                data:{
                    data: base64EncodedImage,
                    folder: folderName
                }
            })
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            try{
                await axios({
                    method:'post',
                    url: 'https://bubba-testnet.herokuapp.com/api/image/upload',
                    headers:{ 'Content-Type': 'application/json' },
                    data:{
                        data: base64EncodedImage
                    }
                })
                setFileInputState('');
                setPreviewSource('');
                setSuccessMsg('Image uploaded successfully');
            }
            catch{
                console.error(err);
                setErrMsg('Something went wrong!');
            }  
        }
    };
    return (
        <div>
            <h1 className="title">Upload an Image</h1>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <label htmlFor="" className="name">Foldername</label>
                <input type="text" className="nameInput" onChange={e => setFolderName(e.target.value)}/>
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    multiple
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
}
