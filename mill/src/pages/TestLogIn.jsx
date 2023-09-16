import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomFormHeading from '../components/CustomForm/CustomFormHeading';
import FormBoxMain from '../components/CustomForm/FormBoxMain';
import { Button, Grid } from '@mui/material';
import CustomInput from '../components/CustomForm/CustomInput';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Create the submit method.


  const submit = async e => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };
    // Create the POST requuest
    const { data } = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/token/',
      user,
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

    window.location.href = 'home_secure';
  }
  return (


    <div>
      <Grid container pt={4}></Grid>
      <CustomFormHeading title="Log In" />
      <FormBoxMain>
        <form onSubmit={submit}>
          <Grid item xs={12}>
            <CustomInput
              label="Username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </form>
      </FormBoxMain>
    </div>
  )
}

const Logout = () => {


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


export { Login, Logout };
