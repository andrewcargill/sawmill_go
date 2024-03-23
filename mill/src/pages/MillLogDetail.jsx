import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import css from "../styles/testApiGps.module.css";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import { Chip, Grid, Typography } from "@mui/material";
import CustomHeaderWithNavEdit from "../components/CustomFormHeaders/CustomHeaderWithNavEdit";
import LogChildren from "./ListViews/Plank/Components/LogChildren";
import CustomTypography from "../components/Typography/CustomTypography";

const LogDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [tree, setTree] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/${id}/`,
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
            title={`Log ${id} Info`}
            handleGoBack={handleGoBack}
            handleEditClick={handleEditClick}
          />
        </Grid>
        <Grid item container xs={12}>
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
      <Grid container sm={12} bgcolor={'dark.main'} p={2} >
        <Typography color={'dark.contrastText'} variant="h6">Planks</Typography>  
        <LogChildren logId={id} length={log.length} />
      </Grid>
    </PageContentContainer>
  );
};

const Marker = () => <div className={css.marker}></div>;

export default LogDetail;
