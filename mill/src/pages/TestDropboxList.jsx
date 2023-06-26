import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DropboxList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/dropbox/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      console.log('Response data:', response.data); // Add this console log
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };
  

  return (
    <div>
      <h1>File List</h1>
      {files && files.length > 0 ? (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <p>ID: {file.id}</p>
              <img src={file.file} alt="File" width="100" height="100" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found.</p>
      )}
    </div>
  );
};

export default DropboxList;
