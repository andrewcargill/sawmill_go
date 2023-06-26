import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreeMoisturePost from './TreeMoisturePost';
import TreeMoistureEditForm from './TreeMoistureEditForm';

const TreeMoistureCrud = () => {
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [idSearchQuery, setIdSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const params = {};
      if (searchQuery) {
        params.search = searchQuery;
      }
      if (idSearchQuery) {
        params.id = idSearchQuery;
      }
  
      const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/', { 
        params,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  const handleEdit = (id) => {
    setSelectedItemId(id);
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
  };

  const handleSaveEdit = () => {
    setSelectedItemId(null);
    fetchData();
  };

  const handleDelete = (id) => {
    setConfirmDelete(true);
    setDeleteItemId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/${deleteItemId}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    
      setConfirmDelete(false);
      setDeleteItemId(null);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setDeleteItemId(null);
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleIdSearch = () => {
    const id = parseInt(idSearchQuery);
  setIdSearchQuery(id);
    fetchData();
  };

  return (
    <div className='mainContainer'>
      <h1>Moisture Check Database</h1>

      <div>
        <TreeMoisturePost />
      </div>
      <div>
        <input type="text" placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <input type="number" value={idSearchQuery} onChange={(e) => setIdSearchQuery(e.target.value)} />
<button onClick={handleIdSearch}>Search by ID</button>
      </div>
      <h2>List of Moisture Checks</h2>
      {data.map((item) => (
        <div key={item.id}>
          {selectedItemId === item.id ? (
            <TreeMoistureEditForm
              id={item.id}
              initialData={item}
              onCancel={handleCancelEdit}
              onSave={handleSaveEdit}
            />
          ) : (
            <>
              <h3>ID: {item.id}</h3>
              <p>Date: {item.date}</p>
              <p>Water %: {item.water_percentage}</p>
              <p>Plank ID: {item.plank}</p>
             
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              {confirmDelete && deleteItemId === item.id ? (
                <>
                  <p>Are you sure you want to delete this item?</p>
                  <button onClick={handleConfirmDelete}>Yes</button>
                  <button onClick={handleCancelDelete}>No</button>
                </>
              ) : (
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              )}
            </>
          )}
        </div>
      ))}
     
    </div>
  );
};

export default TreeMoistureCrud;
