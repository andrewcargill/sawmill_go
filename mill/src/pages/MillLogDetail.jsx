import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Col, Table } from "react-bootstrap";
import css from "../styles/testApiGps.module.css";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import { Chip, Grid, Typography } from "@mui/material";
import CustomHeaderWithNavEdit from "../components/CustomFormHeaders/CustomHeaderWithNavEdit";
import LogChildren from "./ListViews/Plank/Components/LogChildren";

const LogDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [tree, setTree] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/log/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setLog(response.data);
        setTree(response.data.tree);
        setIsLoading(false);
        console.log("rd", response.data);
      } catch (error) {
        console.error("Error fetching log:", error);
        setIsLoading(false);
      }
    };

    fetchLog();
  }, [id]);

  useEffect(() => {
    console.log("log", log);
  }, [log]);

  const getBuckStatus = (buck) => {
    return buck ? "Yes" : "No";
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/log/${id}/edit`);
  };

  const handleTreeIdClick = () => {
    navigate(`/tree/${log.tree.id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContentContainer>
      <Grid container>
        <Grid item container xs={12}>
          <CustomHeaderWithNavEdit
            title={`Log ${id}`}
            handleGoBack={handleGoBack}
            handleEditClick={handleEditClick}
          />
        </Grid>
        <Grid item container xs={12} pt={1}>
          <Col>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Date:</th>
                  <td>{log.date}</td>
                </tr>
                <tr>
                  <th>Buck:</th>
                  <td>{getBuckStatus(log.buck)}</td>
                </tr>
                <tr>
                  <th>Length:</th>
                  <td>{log.length}</td>
                </tr>
                <tr>
                  <th>Diameter:</th>
                  <td>{log.diameter}</td>
                </tr>
                <tr>
                  <th>Tree:</th>
                  <td>
                    <Chip
                      label={log.tree.id}
                      onClick={handleTreeIdClick}
                      varient="outlined"
                      color="dark"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Species:</th>
                  <td>{log.tree.species}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Grid>
      </Grid>
      <Grid container sm={12} bgcolor={"dark.main"} p={2}>
        <Typography color={"dark.contrastText"} variant="h6">
          Planks
        </Typography>
        <LogChildren logId={id} length={log.length} />
      </Grid>
    </PageContentContainer>
  );
};


export default LogDetail;
