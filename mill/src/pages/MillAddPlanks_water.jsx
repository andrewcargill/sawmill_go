import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import css from "../styles/millAddPlank.module.css";
import axios from "axios";

const MillAddPlanks = () => {
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
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState(null);
  const [moistureCheck, setMoistureCheck] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("date", date);
      formData.append("log", log);
      formData.append("width", width);
      formData.append("depth", depth);
      formData.append("wood_grade", wood_grade);
      formData.append("live_edge", live_edge);
      formData.append("furniture", furniture);
      formData.append("structural", structural);
      formData.append("general", general);
      formData.append("operator", operator);
      formData.append("info", info);

      if (imageOne !== "") {
        formData.append("image1", imageOne);
      }

      if (imageTwo !== "") {
        formData.append("image2", imageTwo);
      }

      const plankResponse = await axios.post(
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const plankId = plankResponse.data.id; // Get the ID of the newly created plank entry

      const moistureCheckData = {
        plank: plankId,
        date: date,
        water_percentage: moistureCheck,
      };

      const moistureCheckResponse = await axios.post(
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/",
        moistureCheckData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Plank Data created:", plankResponse.data);
      console.log("MoistureCheck Data created:", moistureCheckResponse.data);

      // Reset the form or provide feedback to the user about successful submission
      setLog("");
      setWidth("");
      setDepth("");
      setWood_grade("");
      setDate("");
      setLive_edge(false);
      setFurniture(false);
      setStructural(false);
      setGeneral(false);
      setInfo("");
      setOperator("");
      setImageOne("");
      setImageTwo("");
      setMoistureCheck("");

      setPostId(plankResponse.data.id);
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error("Error creating data:", error);
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

  /// Navigation to Mill Home

  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <div className={css.page}>
      <div>
        <h1>Sawmill Go - Add Plank</h1>
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
                onChange={(e) => setImageOne(e.target.files[0])}
              />
            </Col>
            <Col xs={6}>
              <label>Image 2</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-lg"
                onChange={(e) => setImageTwo(e.target.files[0])}
              />
            </Col>
            <Col xs={6}>
              <label>Water Percentage</label>
              <input
                type="text"
                name="moistureCheckInput"
                value={moistureCheck}
                onChange={(e) => setMoistureCheck(e.target.value)}
              />
            </Col>
          </Row>
          {success && (
            <Alert key="success" variant="success">
              <p>Success! Data Stored.</p>
              <div className={css.plankId}>Plank ID: {postId}</div>{" "}
            </Alert>
          )}
          <Row>
            <Col xs={12}>
              <Button
                id={css.button}
                variant="success"
                disabled={!logIdExists}
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

export default MillAddPlanks;
