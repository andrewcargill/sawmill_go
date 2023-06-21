import React, { useState } from 'react';
import axios from 'axios';

const TreeEditForm = ({ id, initialData, onCancel, onSave }) => {
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
      await axios.put(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/${id}/`, data);
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
            Species:
            <input type="text" name="species" value={data.species} onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Reason for felling:
            <input type="text" name="reason_for_felling" value={data.reason_for_felling} onChange={handleInputChange} />
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

export default TreeEditForm;
