import React, { useState } from 'react';
import axios from 'axios';

const TestEditForm = ({ id, initialData, onCancel, onSave }) => {
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
      await axios.put(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/lumber/${id}/`, data, {
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
      <h2>Edit Test Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Data 1:
            <input type="text" name="data1" value={data.data1} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Data 2:
            <input type="text" name="data2" value={data.data2} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Data 3:
            <input type="text" name="data3" value={data.data3} onChange={handleInputChange} />
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

export default TestEditForm;
