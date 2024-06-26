// MillEditPlank.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import css from "../styles/millAddPlank.module.css";
import axios from "axios";
import LoadingSpinner from "../components/ApiDataComponents/LoadingSpinner";

const MillEditPlank = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State variables
  // ... (add all the necessary state variables here)
  const [log, setLog] = useState("");
  const [date, setDate] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [wood_grade, setWood_grade] = useState("");
  const [logIdExists, setLogIdExists] = useState(null);
  const [live_edge, setLive_edge] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const [structural, setStructural] = useState(false);
  const [general, setGeneral] = useState(false);
  const [operator, setOperator] = useState(false);
  const [info, setInfo] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Effect to fetch the plank data when the component mounts
  useEffect(() => {
    // Fetch the plank data using the 'id' parameter from the URL
    const fetchPlankData = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        // Set the state variables with the fetched data
        const plankData = response.data;
        setDate(response.data.date);
        setDepth(response.data.depth);
        setWidth(response.data.width);
        setLog(response.data.log.id);
        setWood_grade(response.data.wood_grade);
        setLive_edge(response.data.live_edge);
        setFurniture(response.data.furniture);
        setStructural(response.data.structural);
        setGeneral(response.data.general);
        setOperator(response.data.operator);
        setInfo(response.data.info);
        setImage1(response.data.image1);
        setImage2(response.data.image2);
      } catch (error) {
        console.error("Error fetching plank data:", error);
        // Handle error if needed
      }
    };
    
    fetchPlankData();
  }, [id]);

  // Function to handle form submission for updating the plank
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await axios.put(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/${id}/`,
        {
        log,
        width,
        depth,
        wood_grade,
        date,
        log,
        live_edge,
        furniture,
        structural,
        general,
        operator,
        info,
        image1,
        image2,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setSuccess(true);
    } catch (error) {
      console.error("Error creating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogChange = (e) => {
    const logId = e.target.value;
    setLog(logId);
  };

  const handleLogBlur = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/validate/${log}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { exists } = response.data;
      console.log("LogIdExists:", exists);
      setLogIdExists(exists);
    } catch (error) {
      console.error("Error validating log ID:", error);
    }
  };

  // Function to handle changes in form inputs
  // ... (add all the necessary handle functions for input changes)
  const handleLiveEdgeClick = () => {
    setLive_edge(!live_edge);
  };
  const handleFurnitureClick = () => {
    setFurniture(!furniture);
  };
  const handleStructuralClick = () => {
    setStructural(!structural);
  };
  const handleGeneralClick = () => {
    setGeneral(!general);
  };

  // Function to handle button click and navigate back to the plank detail page
  const handleButtonClick = () => {
    navigate(`/plank/${id}`);
  };

  return (
    <div className={css.page}>
      <div>
        <h1>Sawmill Go - Edit Plank</h1>
      </div>
      <div className={css.container}>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              <label>Date:</label>
              <input
                type="date"
                className="form-control form-control-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Col>
            <Col xs={6}>
              <label>Log ID:</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search tree by ID"
                value={log}
                onChange={handleLogChange}
                onBlur={handleLogBlur}
                required
                inputMode="numeric"
              />
              {logIdExists !== null && !logIdExists && (
                <div className={css.validationMessage}>ID not in system</div>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <label>Width:</label>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Width in cm"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
                inputMode="numeric"
              />
            </Col>
            <Col xs={6}>
              <label>Depth:</label>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Depth in cm"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                required
                inputMode="numeric"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <label>Grade</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Grade number"
                value={wood_grade}
                onChange={(e) => setWood_grade(e.target.value)}
                required
                inputMode="numeric"
              />
            </Col>
            <Col xs={6}>
              <Form.Group controlId="lumberjack">
                <Form.Label>Operator:</Form.Label>
                <Form.Control
                  as="select"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="form-control form-control-lg"
                  required
                >
                  <option value="Andrew Cargill">Andy</option>
                  <option value="Andrew Cargill & Jens Nyman">
                    Andy & Jens
                  </option>
                  <option value="Jens Nyman">Jens</option>
                  <option value="Elin Cargill">Elin</option>
                  <option value="Charlie Cargill">Charlie</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={12}>
              <label>Information</label>
              <textarea
                className="form-control form-control-lg"
                id="largeTextInput"
                rows="6"
                placeholder="Enter additional information"
                type="text"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              ></textarea>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Card className="bg-secondary">
                <Card.Body>
                  <Card.Title className="text-light">Categories</Card.Title>
                  <Row>
                    <Col xs={6}>
                      <Button
                        id={css.button}
                        variant={general ? "warning" : "light"}
                        onClick={handleGeneralClick}
                      >
                        General
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button
                        id={css.button}
                        variant={furniture ? "warning" : "light"}
                        onClick={handleFurnitureClick}
                      >
                        Furniture
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <Button
                        id={css.button}
                        variant={structural ? "warning" : "light"}
                        onClick={handleStructuralClick}
                      >
                        Structural
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button
                        id={css.button}
                        variant={live_edge ? "warning" : "light"}
                        onClick={handleLiveEdgeClick}
                      >
                        Live-Edge
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={6}>
              <label>Image 1</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-lg"
                onChange={(e) => setImage1(e.target.files[0])}
              />
            </Col>
            <Col xs={6}>
              <label>Image 2</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-lg"
                onChange={(e) => setImage2(e.target.files[0])}
              />
            </Col>
          </Row>
          {success && (
            <Alert key="success" variant="success">
              <p>Success! Data Updated.</p>
            
            </Alert>
          )}
          {loading && (
            <Alert key="loading" variant="info">
              <p>Saving Chanes, Please wait.</p>
              <LoadingSpinner />
             
            </Alert>
          )}
          <Row>
            <Col xs={12}>
              <Button
                id={css.button}
                variant="success"
                disabled={loading || logIdExists?.exists}
                type="submit"
              >
                save
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                id={css.button}
                variant="primary"
                onClick={() => handleButtonClick("/mill_home")}
              >
                Mill Home
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default MillEditPlank;
