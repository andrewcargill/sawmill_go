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
import { Link } from "react-router-dom";

const TreeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [species, setSpecies] = useState("");
  const [reason_for_felling, setReason_for_felling] = useState("");
  const [age, setAge] = useState("");
  const [lumberjack, setLumberjack] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const fetchTreeData = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const treeData = response.data;

      setDate(treeData.date);
      setSpecies(treeData.species);
      setReason_for_felling(treeData.reason_for_felling);
      setAge(treeData.age);
      setLumberjack(treeData.lumberjack);
      setLatitude(treeData.latitude);
      setLongitude(treeData.longitude);
      if (treeData.image) {
        setImageUrl(treeData.image);
      }

      // If you need to fetch and set the image, you can do it here as well
    } catch (error) {
      console.error("Error fetching tree data:", error);
    }
  };

  // Fetch tree data on component mount
  useEffect(() => {
    fetchTreeData();
  }, []);

  // Function to update the tree data
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("date", date);
      formData.append("species", species);
      formData.append("reason_for_felling", reason_for_felling);
      formData.append("age", age);
      formData.append("lumberjack", lumberjack);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      if (image !== "") {
        formData.append("image", image);
      }

      const response = await axios.put(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Data updated:", response.data);

      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Function to navigate back to Mill Home
  const handleButtonClick = () => {
    navigate("/tree_list");
  };

  // Function to get the current GPS location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const limitedLatitude = parseFloat(
            position.coords.latitude.toFixed(14)
          );
          const limitedLongitude = parseFloat(
            position.coords.longitude.toFixed(14)
          );
          setLatitude(limitedLatitude.toString());
          setLongitude(limitedLongitude.toString());
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className={css.page}>
      <Row>
        <Col xs={8}>
          <h1>Tree {id} Edit</h1>
        </Col>
        <Col xs={4}>
          <Link to={`/tree/${id}`}>BACK</Link>
        </Col>
      </Row>
      <div className={css.container}>
        <form onSubmit={handleUpdate}>
          <Row>
            <Col xs={6}>
              <label>Date</label>
              <input
                type="date"
                className="form-control form-control-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Col>

            <Col xs={6}>
              <Form.Group controlId="species">
                <Form.Label>Species</Form.Label>
                <Form.Control
                  as="select"
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="form-control form-control-lg"
                  required
                >
                  <option value="">Select species</option>
                  <option value="Pine">Pine</option>
                  <option value="Spruce">Spruce</option>
                  <option value="Birch">Birch</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={6}>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  as="select"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="form-control form-control-lg"
                  required
                >
                  <option value="">Select age range</option>
                  <option value="30-40">30-40 yrs</option>
                  <option value="40-60">40-60 yrs</option>
                  <option value="60-80">60-80 yrs</option>
                  <option value="80-100">80-100 yrs</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="lumberjack">
                <Form.Label>Lumberjack</Form.Label>
                <Form.Control
                  as="select"
                  value={lumberjack}
                  onChange={(e) => setLumberjack(e.target.value)}
                  className="form-control form-control-lg"
                  required
                >
                  <option value="">Select lumberjack</option>
                  <option value="Andrew Cargill">Andy</option>
                  <option value="Jens Nyman">Jens</option>
                  <option value="Elin Cargill">Elin</option>
                  <option value="Charlie Cargill">Charlie</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Card className="bg-secondary mb-4">
            <Card.Body>
              <Card.Title className="text-light">GPS MODULE</Card.Title>
              <Row>
                <Col xs={6}>
                  <label>Latitude</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder=""
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </Col>

                <Col xs={6}>
                  <label>Longitude</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder=""
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Button
                    id={css.button}
                    type="button"
                    variant="warning"
                    onClick={handleGetLocation}
                    className={css.getLocationButton}
                  >
                    Get Location
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row className="mb-4">
            <Col xs={12}>
              <label>Reason For Felling</label>
              <textarea
                className="form-control form-control-lg"
                rows="6"
                value={reason_for_felling}
                onChange={(e) => setReason_for_felling(e.target.value)}
                required
              ></textarea>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={12} className="pb-4">
              <label>Update Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-lg"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Col>
            <Col xs={12}>
              {imageUrl && (
                <div className={css.imagePreview}>
                  <img
                    src={imageUrl}
                    alt="Current Tree"
                    className={css.previewImage}
                  />
                </div>
              )}
            </Col>
          </Row>
          {success && (
            <Alert key="success" variant="success">
              <p>Success! Data Updated.</p>
            </Alert>
          )}
          <Row>
            <Col xs={12}>
              <Button id={css.button} variant="dark" type="submit">
                Save
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                id={css.button}
                variant="primary"
                onClick={() => handleButtonClick("/tree_list")}
              >
                Tree List
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default TreeEdit;
