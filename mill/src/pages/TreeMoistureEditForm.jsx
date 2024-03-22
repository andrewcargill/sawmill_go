import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from '@mui/material';

const TreeMoistureEditForm = ({ id, initialData, onCancel, onSave }) => {
  const [data, setData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/${id}/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      onSave(); // Notify parent component that edit is complete
    } catch (error) {
      console.error('Error updating data:', error);
    }
};

  return (
    <div>
   
      <form onSubmit={handleSubmit}>
     


        <div>
          <label>
            Date:
            <input type="date" name="date" value={data.date} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Water %:
            <input type="number" name="water_percentage" value={data.water_percentage} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Plank ID:
            {data.plank} 
          </label>
        </div>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TreeMoistureEditForm;
