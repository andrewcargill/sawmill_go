import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import css from "../styles/millAddLog.module.css";
import axios from "axios";

const MillAddLogs = () => {
  const [tree, setTree] = useState("");
  const [date, setDate] = useState("");
  const [length, setLength] = useState("");
  const [diameter, setDiameter] = useState("");
  const [buck, setBuck] = useState(false);
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState(null);
  const [treeIdExists, setTreeIdExists] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/",
        {
          date,
          tree,
          length,
          buck,
          diameter,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Data created:", response.data);

      // Reset form fields after successful submission
      setDate("");
      setTree("");
      setLength("");
      setBuck(false);

      setPostId(response.data.id);
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleTreeChange = (e) => {
    const treeId = e.target.value;
    setTree(treeId);
  };

  const handleTreeBlur = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/validate/${tree}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { exists } = response.data;
      console.log("TreeIdExists:", exists);
      setTreeIdExists(exists);
    } catch (error) {
      console.error("Error validating tree ID:", error);
    }
  };

  // Navigation to Mill Home
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  const handleBuckClick = () => {
    setBuck(!buck);
  };

  return (
    <div className={css.page}>
      <div>
        <h1>Sawmill Go - Add Log</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={4}>
              <label>Date:</label>
              <input
                type="date"
                className="form-control form-control-lg"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Col>
            <Col xs={4}>
              <label>Tree ID:</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter ID"
                value={tree}
                onChange={handleTreeChange}
                onBlur={handleTreeBlur}
                required
                inputMode="numeric"
              />
              {treeIdExists !== null && !treeIdExists && (
                <div className={css.validationMessage}>ID not in system</div>
              )}
            </Col>
            <Col xs={4}>
            
                      <Button
                        id={css.button}
                        variant={buck ? "success" : "light"}
                        onClick={handleBuckClick}
                      >
                        {buck ? "BUCK LOG" : "BUCK"}
                      </Button>
                    </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <label>Length (cm):</label>
              <input
                type="number"
                className="form-control form-control-lg"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                inputMode="numeric"
                required
              />
            </Col>
            <Col xs={6}>
              <label>Diameter (cm):</label>
              <input
                type="number"
                className="form-control form-control-lg"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                inputMode="numeric"
                required
              />
            </Col>
          </Row>
         
          <Row>
            <Col xs={12}>
              <Button
                id={css.button}
                variant="dark"
                type="submit"
                disabled={!treeIdExists}
              >
                Save
              </Button>
            </Col>
          </Row>
        </form>
      </div>

      {success && (
        <Alert variant="success" className={css.alert}>
          Log added successfully with ID: {postId}
        </Alert>
      )}

      <Button
        id={css.button}
        variant="outline-dark"
        onClick={() => handleButtonClick("/mill_home")}
      >
        Back to Mill Home
      </Button>
    </div>
  );
};

export default MillAddLogs;
