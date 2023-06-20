import React, { useState } from 'react';
import axios from 'axios';

const TreePost = () => {
  const [date, setDate] = useState('');
  const [species, setSpecies] = useState('');
  const [reason_for_felling, setReason_for_felling] = useState('');
  const [success, setSuccess] = useState(false); // State variable for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/', {
        date,
        species,
        reason_for_felling,
      });
      console.log('Data created:', response.data);
      
      // Reset form fields after successful submission
      setDate('');
      setSpecies('');
      setReason_for_felling('');

      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <div>
      <h3>Add new tree</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Species:</label>
          <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} required />
        </div>
        <div>
          <label>Reason for felling:</label>
          <input type="text" value={reason_for_felling} onChange={(e) => setReason_for_felling(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      {success && <p>Success! Data created.</p>} {/* Display success message if success is true */}
    </div>
  );
};

export default TreePost;