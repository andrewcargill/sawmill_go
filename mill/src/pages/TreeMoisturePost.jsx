import React, { useState } from 'react';
import axios from 'axios';

const TreeMoisturePost = () => {
  const [plank, setPlank] = useState('');
  const [date, setDate] = useState('');
  const [water_percentage, setWater_percentage] = useState('');
  const [success, setSuccess] = useState(false); // State variable for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/', {
        date,
        plank,
        water_percentage,
      });
      console.log('Data created:', response.data);
      
      // Reset form fields after successful submission
      setDate('');
      setPlank('');
      setWater_percentage('');

      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <div className='mainContainer'>
      <h3>Add new check</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Plank:</label>
          <input type="text" value={plank} onChange={(e) => setPlank(e.target.value)} required />
        </div>
        <div>
          <label>Moisture Content %:</label>
          <input type="text" value={water_percentage} onChange={(e) => setWater_percentage(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      {success && <p>Success! Data created.</p>} {/* Display success message if success is true */}
    </div>
  );
};

export default TreeMoisturePost;