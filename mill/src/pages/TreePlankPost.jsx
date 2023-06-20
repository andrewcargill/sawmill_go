import React, { useState } from 'react';
import axios from 'axios';

const TreePlankPost = () => {
  const [log, setLog] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [wood_grade, setWood_grade] = useState('');
  const [success, setSuccess] = useState(false); // State variable for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/', {
        log,
        width,
        depth,
        wood_grade,
      });
      console.log('Data created:', response.data);
      
      // Reset form fields after successful submission
      setLog('');
      setWidth('');
      setDepth('');
      setWood_grade('');

      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <div>
      <h3>Add new plank</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Log:</label>
          <input type="text" value={log} onChange={(e) => setLog(e.target.value)} required />
        </div>
        <div>
          <label>Width:</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} required />
        </div>
        <div>
          <label>Depth:</label>
          <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} required />
        </div>
        <div>
          <label>Grade:</label>
          <input type="text" value={wood_grade} onChange={(e) => setWood_grade(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      {success && <p>Success! Data created.</p>} {/* Display success message if success is true */}
    </div>
  );
};

export default TreePlankPost;