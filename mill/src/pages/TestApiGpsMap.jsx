import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import css from '../styles/testApiGps.module.css'

const TestApiGpsMap = () => {
  const [testId, setTestId] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleTestIdChange = (event) => {
    setTestId(event.target.value);
  };

  const handleFetchLocation = async () => {
    try {
      const response = await axios.get(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/lumber/${testId}/`);
      const locationData = response.data;
      setLatitude(locationData.latitude);
      setLongitude(locationData.longitude);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  return (
    <div>
      <h2>Location Map</h2>
      <div>
        <label htmlFor="testId">Test ID:</label>
        <input type="text" id="testId" value={testId} onChange={handleTestIdChange} />
        <button onClick={handleFetchLocation}>Fetch Location</button>
      </div>
      {latitude && longitude ? (
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U' }}
            defaultCenter={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
            defaultZoom={18}
            options={{ mapTypeId: 'satellite' }}
          >
            <Marker lat={parseFloat(latitude)} lng={parseFloat(longitude)} testId={testId} />
          </GoogleMapReact>
        </div>
      ) : (
        <p>Enter a Test ID and click "Fetch Location" to display the map.</p>
      )}
    </div>
  );
};

const Marker = ({ testId }) => <div className={css.marker}>{testId}</div>;

export default TestApiGpsMap;
