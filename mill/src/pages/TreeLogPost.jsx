import React, { useState } from 'react';
import axios from 'axios';

const TreeLogPost = () => {
  const [tree, setTree] = useState('');
  const [date, setDate] = useState('');
  const [length, setLength] = useState('');
  const [success, setSuccess] = useState(false); // State variable for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/',
        {
          date,
          tree,
          length,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      console.log('Data created:', response.data);
  
      // Reset form fields after successful submission
      setDate('');
      setTree('');
      setLength('');
  
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };
  

  return (
    <div>
      <h3>Add new log</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Tree:</label>
          <input type="text" value={tree} onChange={(e) => setTree(e.target.value)} required />
        </div>
        <div>
          <label>Length:</label>
          <input type="text" value={length} onChange={(e) => setLength(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      {success && <p>Success! Data created.</p>} {/* Display success message if success is true */}
    </div>
  );
};

export default TreeLogPost;