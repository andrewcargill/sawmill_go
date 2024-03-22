import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import { Grid, Input, Tooltip, Typography } from "@mui/material";
import CustomInput from "../components/CustomForm/CustomInput";

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    
  }, [currentPage, orderBy]);

  const fetchData = async () => {
    try {
      const params = {
        page: currentPage,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (orderBy) {
        params.ordering = orderBy;
      }

      const response = await axios.get(
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/",
        {
          params,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLogs(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

 

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrderBy(`-${field}`);
    } else {
      setOrderBy(field);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!isFetching) return;

    fetchData().then(() => {
      setIsFetching(false);
    });
  }, [isFetching]);

  const handleLogClick = (id) => () => {
    navigate(`/log/${id}`);
  };

  const displayTitle = (log) => {
    return (
      <>
      <Typography fontSize={12} variant="body1" component="div">Length: {log.length}</Typography>
      <Typography fontSize={12} variant="body1" component="div">Diameter: {log.diameter}</Typography>
    </>
    );
  };

  return (
    <PageContentContainer>

    <Grid container>
      <Grid container item xs={12} justifyContent="center" pt={2}>
            <Grid item xs={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              Logs 
            </Typography>
              </Grid>
              <Grid item xs={6}>
            <CustomInput
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        
          </Grid>
    
     
      </Grid>
 
      <Grid container justifyContent={"flex-start"} alignContent={"center"}>
       
            {logs && logs.length > 0 ? (
                <>
                  {logs.map((log) => (
                    <Tooltip title={displayTitle(log)} placement="top" arrow>
                     <Grid
                     item
                     container
                     xs={5}
                     sm={2}
                     lg={2}
                     key={log.id}
                     m={1}

                     style={{
                      border: "2px solid green",
                      borderRadius: "50%", // This ensures the shape is always a circle
                      width: "100px",
                      maxWidth: "100px",
                      maxHeight: "100px",
                      height: "100px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      boxSizing: "border-box", // Ensures padding is included in the width/height calculations
                    }}
                    onClick={handleLogClick(log.id)}
                   >
                   <Grid item>
                      {log.id}
                    </Grid>
                    <Grid item>
                      {log.tree.species}
                  </Grid>
                   
                    </Grid>
                    </Tooltip>
                  ))}
                </>
            ) : (
              <p>No logs found.</p>
            )}
      
        
      </Grid>
    </Grid>
    </PageContentContainer>
  );
};

export default LogList;
