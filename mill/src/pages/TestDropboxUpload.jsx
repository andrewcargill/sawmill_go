import React, { useState } from 'react';
import axios from 'axios';

const TestDropboxUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('file:', selectedImage);
  
      const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/upload-image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
  
      setUploadStatus('Image uploaded successfully.');
      console.log(response.data);
    } catch (error) {
      setUploadStatus('Error uploading image.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleImageSelect} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default TestDropboxUpload;
