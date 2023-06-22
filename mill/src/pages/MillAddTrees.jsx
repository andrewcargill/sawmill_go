import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import css from "../styles/millAddPlank.module.css";
import axios from "axios";

const MillAddTrees = () => {
  
  const [date, setDate] = useState("");
  const [species, setSpecies] = useState('');
  const [reason_for_felling, setReason_for_felling] = useState('');
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/",
        {
          date,
          species,
          reason_for_felling,
        }
      );
      console.log("Data created:", response.data);

      // Reset form fields after successful submission
      setDate('');
      setSpecies('');
      setReason_for_felling('');

      setPostId(response.data.id);
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  /// Navigation to Mill Home

  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <div className={css.page}>
      <div>
        <h1>Sawmill Go - Add Tree</h1>
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
              <label htmlFor="input1">Speices:</label>

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="e.g 'Pine'"
                value={species} 
          onChange={(e) => setSpecies(e.target.value)} required 
                
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <label>N/A</label>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Not in use"
              />
            </Col>
            <Col xs={6}>
              <label>N/A</label>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Not in use"
                
                inputMode="numeric"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <label>N/A</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Not in use"
                
                inputMode="numeric"
              />
            </Col>
            <Col xs={6}>
              <label>N/A</label>
              <input
                type="text"
                className="form-control form-control-lg"
             
                placeholder="Not in use"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <label>Reason For Felling</label>
              <textarea
                className="form-control form-control-lg"
                rows="6"
                placeholder="Enter additional information"
                value={reason_for_felling} 
          onChange={(e) => setReason_for_felling(e.target.value)} required
          
              ></textarea>
            </Col>
          </Row>
          {success && (
            <Alert key="success" variant="success">
              <p>Success! Data Stored.</p>
              <div className={css.plankId}>Tree ID: {postId}</div>{" "}
            </Alert>
          )}
          <Row>
            <Col xs={12}>
              <Button id={css.button} variant="dark" type="submit">
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

export default MillAddTrees;
