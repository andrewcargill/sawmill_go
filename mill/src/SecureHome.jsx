import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";

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
                         'https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/home/', {
                          headers: {
                             'Content-Type': 'application/json'
                          }}
                        );
          setMessage(data.message);
       } catch (e) {
         console.log('not auth')
       }
      })()};
  }, []);
  return (
     <div className="form-signin mt-5 text-center">
       <h3>Hi {message}</h3>
     </div>
  );
}

export default SecureHome;
