import React, { useState } from 'react';
import axios from 'axios';

const TreePlankEditForm = ({ id, initialData, onCancel, onSave }) => {
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
      await axios.put(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/${id}/`,
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
      <h2>Edit Entry for Plank ID:{data.id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Width:
            <input type="number" name="width" value={data.width} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Depth:
            <input type="number" name="depth" value={data.depth} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Grade:
            <input type="text" name="wood_grade" value={data.wood_grade} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Parent Log:
            {data.log} 
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

export default TreePlankEditForm;
