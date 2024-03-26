import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SecureLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const [loginError, setLoginError] = useState(''); 
 

  const submit = async e => {
       e.preventDefault();
      setLoading(true);
      setLoginError('');
      try {
        const user = {
          username: username,
          password: password
         };
    // Create the POST requuest
    const {data} = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/token/',
     user ,
     {
       headers: {
         'Content-Type': 'application/json'
       },
        withCredentials: true
       }
     );
     console.log('Data received:', data); // Log the data received from the API

   // Initialize the access & refresh token in localstorage.      
   localStorage.clear();
   localStorage.setItem('access_token', data.access);
   localStorage.setItem('refresh_token', data.refresh);
   axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
   setLoading(false);
   window.location.href = 'home_secure';
  } catch (error) {
    setLoading(false); // Stop loading on error
    setLoginError('Login failed. Please check your credentials.'); // Update the user with a login error
    console.error('Login error:', error);
  }
 };

 return(

  
   <div className="page">
    {/* Olf Login Code */}
     <form className="Auth-form" onSubmit={submit}>
       <div className="Auth-form-content">
         <h3 className="Auth-form-title">Sign In</h3>
         <div className="form-group mt-3">
           <label>Username</label>
           <input className="form-control mt-1" 
             placeholder="Enter Username" 
             name='username'  
             type='text' value={username}
             required 
             onChange={e => setUsername(e.target.value)}/>
         </div>
         <div className="form-group mt-3">
           <label>Password</label>
           <input name='password' 
             type="password"     
             className="form-control mt-1"
             placeholder="Enter password"
             value={password}
             required
             onChange={e => setPassword(e.target.value)}/>
         </div>
         <div className="d-grid gap-2 mt-3">
           <button type="submit" 
              className="btn btn-primary">Submit</button>
         </div>
       </div>
    </form>
  </div>
  )
}

const SecureLogout = () => {


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          'https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/logout/',
          {
            refresh_token: localStorage.getItem('refresh_token'),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        window.location.href = 'logout_success';
      } catch (e) {
        console.log('logout not working', e);
      }
    })();
  }, []);

  return (
    <div></div>
  );
}


export { SecureLogin, SecureLogout };
