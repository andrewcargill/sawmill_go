import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

const LogsByTree = ({ treeId }) => {
  // Accept treeId as a prop

  // Remove the useState for treeId and its corresponding onChange handler

  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  const fetchLogsByTree = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/logs/by_tree/?tree_id=${treeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLogs(response.data);
      console.log("logs by tree data: ", response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    if (treeId) {
      fetchLogsByTree();
    }
  }, [treeId]); // Fetch logs when the treeId prop changes

  const handleLogClick = (logId) => {
    navigate(`/log/${logId}`);
  };

  return (
    <Grid container spacing={2} m={1}>
      {logs && logs.length > 0 ? (
        logs.map((log) => (
          <Grid item xs={6} sm={3} lg={2} key={log.id}>
            <div
              style={{
                backgroundColor: "lightgrey",
                padding: "20px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleLogClick.bind(this, log.id)}
            >
              {" "}
              {/* Added some styling for vertical alignment */}
              <Typography variant="h6" align="center" gutterBottom>
                LOG ID: {log.id}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Date Cut: {log.date.substring(2)}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Length: {log.length}
              </Typography>
            </div>
          </Grid>
        ))
      ) : (
        <Typography>No logs found for Tree ID: {treeId}</Typography>
      )}
    </Grid>
  );
};

export default LogsByTree;
