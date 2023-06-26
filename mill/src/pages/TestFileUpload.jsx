import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    // Fetch existing files after component mounts
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        'https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/dropbox/',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDrop = async (acceptedFiles) => {
    try {
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('file', file);
      });

      await axios.post(
        'https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/dropbox/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      // Refresh file list after successful upload
      fetchFiles();
      setUploadMessage('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadMessage('Error uploading file');
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag and drop files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      {uploadMessage && <p>{uploadMessage}</p>}
      <h2>Uploaded Files:</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
