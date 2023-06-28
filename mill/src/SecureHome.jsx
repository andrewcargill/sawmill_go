import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import css from "./styles/millHome.module.css";
import axios from "axios";
import UploadComponentNew from './components/CloudinaryListTest';

const SecureHome = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
     if(localStorage.getItem('access_token') === null){                   
         window.location.href = '/login'
     }
     else{
      (async () => {
        try {
          const {data} = await axios.get(   
            'https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/home/',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json',
              },
            }
          );
          setMessage(data.message);
       } catch (e) {
         console.log('not auth')
       }
      })()};
  }, []);

  const navigate = useNavigate();
  
  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
     <div className="form-signin mt-5 text-center">
      <Row className='mb-4'>
       <h3>{message}</h3>
       </Row>
       <Row>
       <Col xs={12} className="d-flex justify-content-center">
            <Button
            className={css.logoutButton}
            variant="success"
             onClick={() => handleButtonClick('/mill_home')}
            >
              ADD ENTRIES
            </Button>

            
          </Col>
          <Col xs={12} className="d-flex justify-content-center">
          <UploadComponentNew />
          </Col>
       </Row>
     </div>
  );
}

export default SecureHome;
