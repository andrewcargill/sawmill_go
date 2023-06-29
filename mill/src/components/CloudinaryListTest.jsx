import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const UploadComponentNew = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/cloud-post/');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
        const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/cloud-post/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
  
        // Handle the response from the backend
        console.log(response.data);
  
        // Fetch the updated posts
        fetchPosts();
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
    
    <Row className="d-flex flex-wrap">
      {posts.map((post) => (
        <Col key={post.id} xs={6}>
          <img src={post.image} alt={`Post ${post.id}`} className="img-thumbnail" />
        </Col>
      ))}
    </Row>
  </div>
  
  );
};

export default UploadComponentNew;
