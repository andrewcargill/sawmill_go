import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import css from "../styles/testApiGps.module.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogsByTree from "../components/LogsbyTree";

const TreeDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/${id}/`,
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

  return (
    <div className="page">
      <Container className="pb-4">
        <Row className="pb-4">
          <Col xs={6}>
            <h2>Tree {id} Info</h2>
          </Col>
          <Col xs={3}>
            <Link to={`/tree_list/`}>
              <Button>Back</Button>
            </Link>
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
                  <th>Species:</th>
                  <td>{tree.species}</td>
                </tr>
                <tr>
                  <th>Age:</th>
                  <td>{tree.age}</td>
                </tr>
                <tr>
                  <th>Lumberjack:</th>
                  <td>{tree.lumberjack}</td>
                </tr>
                <tr>
                  <th>Latitude:</th>
                  <td>{tree.latitude}</td>
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
                      <LogsByTree treeId={id} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col xs={6}>
          {latitude && longitude ? (
            <div style={{ height: "400px", width: "100%" }} className="pb-4">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U",
                }}
                defaultCenter={{
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude),
                }}
                defaultZoom={18}
                options={{ mapTypeId: "satellite" }}
              >
                <Marker
                  lat={parseFloat(latitude)}
                  lng={parseFloat(longitude)}
                />
              </GoogleMapReact>
            </div>
          ) : (
            <p>NO GPS DATA.</p>
          )}
        </Col>
        <Col xs={6}>
          <div className="pb-4">
            {tree.image && (
              <img
                src={tree.image}
                alt="Tree Image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

const Marker = () => <div className={css.marker}></div>;

export default TreeDetail;
