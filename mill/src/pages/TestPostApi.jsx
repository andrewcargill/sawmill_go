import React, { useState } from 'react';
import axios from 'axios';

const TestPostApi = () => {
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [data3, setData3] = useState('');
  const [success, setSuccess] = useState(false); // State variable for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/lumber/', {
        data1,
        data2,
        data3,
      });
      console.log('Data created:', response.data);
      
      // Reset form fields after successful submission
      setData1('');
      setData2('');
      setData3('');

      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <div>
      <h3>Create Data</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data 1:</label>
          <input type="text" value={data1} onChange={(e) => setData1(e.target.value)} required />
        </div>
        <div>
          <label>Data 2:</label>
          <input type="number" value={data2} onChange={(e) => setData2(e.target.value)} required />
        </div>
        <div>
          <label>Data 3:</label>
          <input type="text" value={data3} onChange={(e) => setData3(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      {success && <p>Success! Data created.</p>} {/* Display success message if success is true */}
    </div>
  );
};

export default TestPostApi;