import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      {data.map((item) => (
        <div key={item.id}>
          <h3>Plank Ref: {item.id}</h3>
          <p>Log: {item.log}</p>
          <p>Width: {item.width}</p>
          <p>Depth: {item.depth}</p>
          <p>Grade: {item.grade}</p>
        </div>
      ))}
    </div>
  );
};

export default TreePlank;