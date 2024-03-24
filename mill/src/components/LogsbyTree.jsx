import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Tooltip, Typography } from "@mui/material";
import CustomTypography from "./Typography/CustomTypography";

const LogsByTree = ({ treeId }) => {
  const [logs, setLogs] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const fetchLogsByTree = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/logs/by_tree/?tree_id=${treeId}`,
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
  }, [treeId]);

  const handleLogClick = (logId) => {
    navigate(`/log/${logId}`);
  };

  return (
    <Grid container spacing={2} m={1}>
      {logs && logs.length > 0 ? (
        logs.map((log) => (
          <Tooltip
            arrow
            title={` Milled:
          
           ${log.date.substring(2)}
         `}
            key={log.id}
          >
            <Grid item xs={6} sm={3} lg={2} key={log.id}>
              <Grid
                item
                bgcolor={"secondary.main"}
                style={{
                  border: "2px solid green",
                  borderRadius: "50%",
                  width: "100px",
                  maxWidth: "100px",
                  maxHeight: "100px",
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  boxSizing: "border-box",
                }}
                onClick={handleLogClick.bind(this, log.id)}
              >
                {" "}
                <CustomTypography.subReportHeading>
                  ID: {log.id}
                </CustomTypography.subReportHeading>
                <CustomTypography.subReportContent>
                  L={Math.floor(log.length)}
                </CustomTypography.subReportContent>
                <CustomTypography.subReportContent>
                  D={Math.floor(log.diameter)}
                </CustomTypography.subReportContent>
              </Grid>
            </Grid>
          </Tooltip>
        ))
      ) : (
        <Typography>No logs found for Tree ID: {treeId}</Typography>
      )}
    </Grid>
  );
};

export default LogsByTree;
