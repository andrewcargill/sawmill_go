import React, { useState } from 'react';
import axios from 'axios';

const UploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/upload/', formData, {
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
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadComponent;
