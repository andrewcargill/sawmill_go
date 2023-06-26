import React, { useState } from 'react';
import axios from 'axios';

const TreeLogEditForm = ({ id, initialData, onCancel, onSave }) => {
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
      const response = await axios.put(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/${id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      onSave(); // Notify parent component that edit is complete
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  return (
    <div>
      <h2>Edit Tree Entry for ID:{data.id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input type="date" name="date" value={data.date} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Length:
            <input type="text" name="length" value={data.length} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Parent Tree:
            {data.tree} 
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

export default TreeLogEditForm;
