import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LogsByTree = ({ treeId }) => { // Accept treeId as a prop

  // Remove the useState for treeId and its corresponding onChange handler

  const [logs, setLogs] = useState([]);

  const fetchLogsByTree = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/logs/by_tree/?tree_id=${treeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    if (treeId) {
      fetchLogsByTree();
    }
  }, [treeId]); // Fetch logs when the treeId prop changes




  return (
    <div>


      {/* Remove the input field and button for searching */}

      {logs && logs.length > 0 ? (
        <div className='button-container'>
          {logs.map((log) => (
           <Link classname='button-link' key={log.id} to={`/log/${log.id}`}>
            <Button id='detail-button'>
              <h3>LOG ID: {log.id}</h3>
              <p>Date Cut: {log.date}</p>
              <p>Cut Length: {log.length}</p>
       
            </Button>
            </Link>
        
          ))}
        </div>
      ) : (
        <p>No logs found for Tree ID: {treeId}</p>
      )}
    </div>
  );
};

export default LogsByTree;
