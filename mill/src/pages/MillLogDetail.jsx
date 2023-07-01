import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import css from "../styles/testApiGps.module.css";

const LogDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [treeSpecies, setTreeSpecies] = useState("");

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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="page">
      <Container className="pb-4">
        <Row className="pb-4">
          <Col xs={6}>
            <h2>Log {id} Info</h2>
          </Col>
          <Col xs={3}>
            <Button onClick={handleGoBack}>BACK</Button>
          </Col>
          <Col xs={3}>
            <Link to={`/log/${id}/edit`}>
              <Button>EDIT</Button>
            </Link>
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
