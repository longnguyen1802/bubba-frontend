import React, { useState } from 'react';
import Alert from '../components/Alert';
import { Image } from 'cloudinary-react';
export default function Upload() {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [imageIds, setImageIds] = useState();
    const [errMsg, setErrMsg] = useState('');
    const [search,setSearch] = useState(false);
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        
        setFileInputState(e.target.value);
        setSelectedFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSearch = (e) => {
        setSearch(true);
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
            try {
                const response = await fetch('https://bubba-server-test.herokuapp.com/api/findFace', {
                    mode:'cors',
                    method: 'POST',
                    body: JSON.stringify({ data: reader.result }),
                    headers: { 'Content-Type': 'application/json' },
                });
                setFileInputState('');
                setPreviewSource('');
                setImageIds(await response.json());
                setSearch(true);
            } catch (err) {
                try{
                    const response = await fetch('https://bubba-server-test.herokuapp.com/api/findFace', {
                    mode:'cors',
                    method: 'POST',
                    body: JSON.stringify({ data: reader.result }),
                    headers: { 'Content-Type': 'application/json' },
                });
                setFileInputState('');
                setPreviewSource('');
                setImageIds(await response.json());
                setSearch(true);
                }
                catch(err){
                    console.error(err);
                    setErrMsg('Something went wrong!');
                }
            }
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
           
    };

    
    return (
        <div>
            <h1 className="title">Upload your image to search</h1>
            <Alert msg={errMsg} type="danger" />
            <form onSubmit={handleSearch} className="form">
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
                    {
                        search ? "Search" : "Searching in process ...."
                    }
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
            <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                        <Image
                            key={index}
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME||"dedaueiyq"}
                            publicId={imageId}
                            width="300"
                            crop="scale"
                        />
                    ))}
            </div>
        </div>
    );
}
