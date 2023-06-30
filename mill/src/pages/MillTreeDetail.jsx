import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import css from '../styles/testApiGps.module.css';

const TreeDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setTree(response.data);
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
      } catch (error) {
        console.error('Error fetching tree:', error);
      }
    };

    fetchTree();
  }, [id]);

  if (!tree) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Tree {id} Details</h2>
      <p>Date: {tree.date}</p>
      <p>Species: {tree.species}</p>
      <p>Reason for Felling: {tree.reason_for_felling}</p>
      <p>Age: {tree.age}</p>
      <p>Lumberjack: {tree.lumberjack}</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      {tree.image && (
        <img
          src={tree.image}
          alt="Tree Image"
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      )}

      {latitude && longitude ? (
        <div style={{ height: '400px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U' }}
            defaultCenter={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
            defaultZoom={18}
            options={{ mapTypeId: 'satellite' }}
          >
            <Marker lat={parseFloat(latitude)} lng={parseFloat(longitude)} />
          </GoogleMapReact>
          <div>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
          </div>
        </div>
      ) : (
        <p>No location data available.</p>
      )}
    </div>
  );
};

const Marker = () => <div className={css.marker}></div>;

export default TreeDetail;
