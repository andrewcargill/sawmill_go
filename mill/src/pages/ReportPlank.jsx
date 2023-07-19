import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import css from "../styles/testApiGps.module.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogsByTree from "../components/LogsbyTree";
import WaterByPlank from "../components/WaterByPlank";

const ReportPlank = () => {
  const { id } = useParams();
  const [plank, setPlank] = useState(null);
  const [length, setLength] = useState(null);
  const [treeId, setTreeId] = useState(null);
  const [species, setSpecies] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlank = async () => {
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
        setPlank(response.data);
        setLength(response.data.log.length);
        setSpecies(response.data.log.tree.species);
      } catch (error) {
        console.error("Error fetching plank:", error);
      }
    };

    fetchPlank();
  }, [id]);

  if (!plank) {
    return <p>Loading...</p>;
  }

  const getLiveEdgeStatus = (live_edge) => {
    return live_edge ? "Yes" : "No";
  };

  const getFurnitureStatus = (furniture) => {
    return furniture ? "Yes" : "No";
  };

  const getStructuralStatus = (structural) => {
    return structural ? "Yes" : "No";
  };

  const getGeneralStatus = (general) => {
    return general ? "Yes" : "No";
  };

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
            <Link to={`/plank/${plank.id}/edit`}>
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
                  <td>{plank.date}</td>
                </tr>
                <tr>
                  <th>Width:</th>
                  <td>{plank.width}</td>
                </tr>
                <tr>
                  <th>Depth:</th>
                  <td>{plank.depth}</td>
                </tr>
                <tr>
                  <th>Length:</th>
                  <td>{length}</td>
                </tr>
                <tr>
                  <th>Species:</th>
                  <td>{species}</td>
                </tr>
                <tr>
                  <th>Grade:</th>
                  <td>{plank.wood_grade}</td>
                </tr>

                <tr>
                  <th>Operator:</th>
                  <td>{plank.operator}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <strong>Operator's notes:</strong>
                    <p>{plank.info}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <strong>Categories:</strong>
                    <Row>
                      <Col>
                        <p>Live-Edge: {getLiveEdgeStatus(plank?.live_edge)}</p>
                        <p>Furniture: {getFurnitureStatus(plank?.furniture)}</p>
                      </Col>
                      <Col>
                        <p>
                          Structural: {getStructuralStatus(plank?.structural)}
                        </p>
                        <p>General: {getGeneralStatus(plank?.general)}</p>
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                  Image 1
                  {plank.image1 && (
                    <img
                      src={plank.image1}
                      alt="Tree Image"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                  Image 2
                  {plank.image2 && (
                    <img
                      src={plank.image2}
                      alt="Tree Image"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <strong>Moisture Checks:</strong>

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

export default ReportPlank;
