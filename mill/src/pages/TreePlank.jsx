import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreePlankPost from './TreePlankPost';

const TreePlank = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Planks</h1>
      <div>
        <TreePlankPost />
      </div>
      {data.map((item) => (
        <div key={item.id}>
          <h3>Plank Ref: {item.id}</h3>
          <p>Log: {item.log}</p>
          <p>Width: {item.width}</p>
          <p>Depth: {item.depth}</p>
          <p>Grade: {item.wood_grade}</p>
        </div>
      ))}
    </div>
  );
};

export default TreePlank;