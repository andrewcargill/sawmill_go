import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TreeLog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/');
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
          <h3>Log Ref: {item.id}</h3>
          <p>Tree: {item.tree}</p>
          <p>Date: {item.date}</p>
          <p>Length: {item.length}</p>
        </div>
      ))}
    </div>
  );
};

export default TreeLog;