import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreePost from './TreePost';

const Tree = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Tree Page!</h2>
      <TreePost />

      <h2>List of Trees</h2>

      {data.map((item) => (
        <div key={item.id}>
          <h3>Tree Ref: {item.id}</h3>
          <p>Date Felled: {item.date}</p>
          <p>Species: {item.species}</p>
          <p>Reason Removed: {item.reason_for_felling}</p>
        </div>
      ))}
    </div>
  );
};

export default Tree;