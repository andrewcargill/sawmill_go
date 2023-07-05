import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import css from "../styles/testApiGps.module.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogsByTree from "../components/LogsbyTree";
import WaterByPlank from "../components/WaterByPlank";

const PlankDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setTree(response.data);
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
      } catch (error) {
        console.error("Error fetching tree:", error);
      }
    };

    fetchTree();
  }, [id]);

  if (!tree) {
    return <p>Loading...</p>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="page">
      <Container className="pb-4">
        <Row className="pb-4">
          <Col xs={6}>
            <h2>Plank {id} Info</h2>
          </Col>
          <Col xs={3}>
          <Button onClick={handleGoBack}>BACK</Button>
          </Col>
          <Col xs={3}>
            <Link to={`/tree/${tree.id}/edit`}>
              <Button>Edit</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Date:</th>
                  <td>{tree.date}</td>
                </tr>
                <tr>
                  <th>Width:</th>
                  <td>{tree.width}</td>
                </tr>
                <tr>
                  <th>Depth:</th>
                  <td>{tree.depth}</td>
                </tr>
                <tr>
                  <th>info:</th>
                  <td>{tree.info}</td>
                </tr>
                <tr>
                  <th>Operator:</th>
                  <td>{tree.operator}</td>
                </tr>
                <tr>
                  <th>Longitude:</th>
                  <td>{tree.longitude}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <strong>Reason For Felling:</strong>
                    <p>{tree.reason_for_felling}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <strong>Logs:</strong>

                    <div>
                      <WaterByPlank plankId={id} />
                    </div>
                  </td>
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

export default PlankDetail;
