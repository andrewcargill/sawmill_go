import React, { useState } from 'react';
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import css from "../styles/millAddPlank.module.css";
import { useNavigate } from "react-router-dom";

const MillAddMoisture = () => {
  const [plank, setPlank] = useState('');
  const [date, setDate] = useState('');
  const [water_percentage, setWater_percentage] = useState('');
  const [success, setSuccess] = useState(false);
  const [plankIdExists, setPlankIdExists] = useState(null);
  const [plankId, setPlankId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/',
        {
          date,
          plank,
          water_percentage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      console.log('Data created:', response.data);
  
      // Reset form fields after successful submission
      setDate('');
      setPlank('');
      setWater_percentage('');
      
      setPlankId(response.data.plank);
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };
  

  const handlePlankChange = (e) => {
    const plankId = e.target.value;
    setPlank(plankId);
  };

  const handlePlankBlur = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/validate/${plank}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { exists } = response.data;
      console.log("PlankIdExists:", exists);
      setPlankIdExists(exists);
    } catch (error) {
      console.error("Error validating Plank ID:", error);
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
        <h1>Sawmill Go - Add Moisture Reading</h1>
      </div>
      <div className={css.container}>
        <form onSubmit={handleSubmit}>
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
            <label>Plank ID:</label>
          <input
            type="text"
            placeholder="Enter ID"
            value={plank}
            onChange={handlePlankChange}
            onBlur={handlePlankBlur}
            required
            inputMode="numeric"
          />
          {plankIdExists !== null && !plankIdExists && (
            <div>ID not in system</div>
          )}
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs={6}>
            <label>Moisture Content %:</label>
          <input
            type="text"
            value={water_percentage}
            onChange={(e) => setWater_percentage(e.target.value)}
            required
          />
            </Col>
            <Col xs={6}>
             
            </Col>
          </Row>
         
        
          
          {success && (
            <Alert key="success" variant="success">
              <p>Success! Moisture Reading Stored For Plank ID: {plankId}</p>{" "}
            </Alert>
          )}
          <Row>
            <Col xs={12}>
              <Button id={css.button} variant="dark" type="submit"
              disabled={!plankIdExists}
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

export default MillAddMoisture;
