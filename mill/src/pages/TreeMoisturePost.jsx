import React, { useState } from 'react';
import axios from 'axios';

const TreeMoisturePost = () => {
  const [plank, setPlank] = useState('');
  const [date, setDate] = useState('');
  const [water_percentage, setWater_percentage] = useState('');
  const [success, setSuccess] = useState(false);
  const [plankIdExists, setPlankIdExists] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/',
        {
          date,
          plank,
          water_percentage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
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
  

  const handlePlankChange = (e) => {
    const plankId = e.target.value;
    setPlank(plankId);
  };

  const handlePlankBlur = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/validate/${plank}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { exists } = response.data;
      console.log("PlankIdExists:", exists);
      setPlankIdExists(exists);
    } catch (error) {
      console.error("Error validating Plank ID:", error);
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
          <label>Plank ID:</label>
          <input 
          type="text" 
          placeholder='Enter ID'
          value={plank} 
          onChange={handlePlankChange}
          onBlur={handlePlankBlur}
          required 
          inputMode="numeric"
          />
          {plankIdExists !== null && !plankIdExists && (
                <div>ID not in system</div>
              )}
        </div>
        <div>
          <label>Moisture Content %:</label>
          <input type="text" value={water_percentage} onChange={(e) => setWater_percentage(e.target.value)} required />
        </div>
        <button 
        type="submit"
        disabled={!plankIdExists}
        >
          Submit
        </button>
      </form>

      {success && <p>Success! Data created.</p>} {/* Display success message if success is true */}
    </div>
  );
};

export default TreeMoisturePost;