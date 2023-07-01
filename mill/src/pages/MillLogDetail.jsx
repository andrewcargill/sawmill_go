import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { Container, Row, Col, Table } from "react-bootstrap";
import LogsByTree from "../components/LogsbyTree";
import css from "../styles/testApiGps.module.css";

const LogDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [treeSpecies, setTreeSpecies] = useState("");

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
        
        // Fetch tree data using tree id
        const treeResponse = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/${response.data.tree}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setTreeSpecies(treeResponse.data.species);
      } catch (error) {
        console.error("Error fetching log:", error);
      }
    };

    fetchLog();
  }, [id]);

  const getBuckStatus = (buck) => {
    return buck ? "Yes" : "No";
  };

  return (
    <div className="page">
      <Container className="pb-4">
        <Row>
          <Col xs={8}>
            <h2>Log {id} Info</h2>
          </Col>
          <Col xs={2}>
            <Link to={`/log_list/`}>BACK</Link>
          </Col>
          <Col xs={2}>
            <Link to={`/log/${id}/edit`}>EDIT</Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Date:</th>
                  <td>{log?.date}</td>
                </tr>
                <tr>
                  <th>Buck:</th>
                  <td>{getBuckStatus(log?.buck)}</td>
                </tr>
                <tr>
                  <th>Length:</th>
                  <td>{log?.length}</td>
                </tr>
                <tr>
                  <th>Diameter:</th>
                  <td>{log?.diameter}</td>
                </tr>
                <tr>
                  <th>Tree:</th>
                  <td>
                  <Link to={`/tree/${log?.tree}/`}>{log?.tree}</Link>
                    
                    </td>
                </tr>
                <tr>
                  <th>Species:</th>
                  <td>{treeSpecies}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Marker = () => <div className={css.marker}></div>;

export default LogDetail;
