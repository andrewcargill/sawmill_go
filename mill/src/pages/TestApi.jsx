import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TestPostApi from './TestPostApi';

const TestApi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/lumber/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Database</h1>

      <div>
        <TestPostApi />
      </div>
      <h2>List of test</h2>
      {data.map((item) => (
        <div key={item.id}>
          <h3>Data1: {item.data1}</h3>
          <p>Data2: {item.data2}</p>
          <p>Data3: {item.data3}</p>
        </div>
      ))}
      Test Component Content
    </div>
  );
};

export default TestApi;