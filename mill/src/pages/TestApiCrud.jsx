import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TestPostApi from './TestPostApi';
import TestEditForm from './TestEditForm';

const TestApi = () => {
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/lumber/', {
        params: {
          search: searchQuery,
        },
      });
      setData(response.data);
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
      await axios.delete(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/lumber/${deleteItemId}/`);
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

  return (
    <div>
      <h1>Test Database</h1>

      <div>
        <TestPostApi />
      </div>
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h2>List of test</h2>
      {data.map((item) => (
        <div key={item.id}>
          {selectedItemId === item.id ? (
            <TestEditForm
              id={item.id}
              initialData={item}
              onCancel={handleCancelEdit}
              onSave={handleSaveEdit}
            />
          ) : (
            <>
              <h3>Data1: {item.data1}</h3>
              <p>Data2: {item.data2}</p>
              <p>Data3: {item.data3}</p>
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

export default TestApi;
