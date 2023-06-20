import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreeMoisturePost from './TreeMoisturePost';

const TreeMoisture = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Moisture Checks</h1>
   
      <TreeMoisturePost />

      <h2>List of Water Content Checks</h2>

      {data.map((item) => (
        <div key={item.id}>
          <h3>Check ID: {item.id}</h3>
          <p>Date: {item.date}</p>
          <p>Plank ID: {item.plank}</p>
          <p>Moisture Content: {item.water_percentage}%</p>
         
        </div>
      ))}
    </div>
  );
};

export default TreeMoisture;