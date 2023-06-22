import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

const TestApiGpsMap = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/lumber/26/');
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
      {latitude && longitude ? (
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U' }}
            defaultCenter={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
            defaultZoom={10}
            options={{ mapTypeId: 'satellite' }} // Set the mapTypeId to 'satellite' for satellite view
          >
            <Marker lat={parseFloat(latitude)} lng={parseFloat(longitude)} />
          </GoogleMapReact>
        </div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

const Marker = () => <div className="marker">Marker</div>;

export default TestApiGpsMap;
