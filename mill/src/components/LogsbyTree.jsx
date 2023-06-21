import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogsByTree = () => {
  const [logs, setLogs] = useState([]);
  const [treeId, setTreeId] = useState('');

  const fetchLogsByTree = async () => {
    try {
      const response = await axios.get(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/logs/by_tree/?tree_id=${treeId}`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleSearch = () => {
    if (treeId) {
      fetchLogsByTree();
    }
  };

  return (
    <div>
      <h1>Logs by Tree</h1>
      <input type="number" placeholder="Enter Tree ID" value={treeId} onChange={(e) => setTreeId(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {logs.length > 0 ? (
        <div>
          <h2>Logs for Tree ID: {treeId}</h2>
          {logs.map((log) => (
            <div key={log.id}>
              <h3>LOG ID: {log.id}</h3>
              <p>Date Cut: {log.date}</p>
              <p>Cut Length: {log.length}</p>
              {/* Display other log information */}
            </div>
          ))}
        </div>
      ) : (
        <p>No logs found for Tree ID: {treeId}</p>
      )}
    </div>
  );
};

export default LogsByTree;
