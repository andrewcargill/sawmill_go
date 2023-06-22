import React, { useState } from 'react';
import axios from 'axios';

const TestApiGps = ({ onSave }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [data3, setData3] = useState('');

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSaveLocation = async () => {
    try {
      console.log('Lat and Long', latitude, longitude)
      const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/lumber/', {
        latitude: parseFloat(String(latitude).replace(',', '.')),
      longitude: parseFloat(String(longitude).replace(',', '.')),

        data1,
        data2,
        data3,
        
      });
      
      console.log('Location saved:', response.data);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <div>
      <h1>GPS ADD</h1>
      <button onClick={handleGetLocation}>Get Location</button>
      <div>
        Longitude: <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
      </div>
      <div>
        Latitude: <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
      </div>
      <div>
        Data1: <input type="text" value={data1} onChange={(e) => setData1(e.target.value)} />
      </div>
      <div>
        Data2: <input type="number" value={data2} onChange={(e) => setData2(e.target.value)} />
      </div>
      <div>
        Data3: <input type="text" value={data3} onChange={(e) => setData3(e.target.value)} />
      </div>
      <button onClick={handleSaveLocation}>Save Location</button>
    </div>
  );
};

export default TestApiGps;
