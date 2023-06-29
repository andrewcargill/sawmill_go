import React, { useState } from 'react';
import axios from 'axios';

const ImageCameraTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCaptureImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('capture', 'camera');
    input.addEventListener('change', (event) => {
      setSelectedFile(event.target.files[0]);
    });
    input.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await axios.post('http://127.0.0.1:8000/api/posts/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        // Handle the response from the backend
        console.log(response.data);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Upload Component</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" capture="camera" onChange={handleFileChange} />
        <button type="button" onClick={handleCaptureImage}>Capture Image</button>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageCameraTest;
