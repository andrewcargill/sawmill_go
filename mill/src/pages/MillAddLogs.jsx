import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import css from "../styles/millAddLog.module.css";
import axios from "axios";

const MillAddLogs = () => {
  const [tree, setTree] = useState('');
  const [date, setDate] = useState('');
  const [length, setLength] = useState('');
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/', {
        date,
        tree,
        length,
      });
      console.log('Data created:', response.data);
      
      // Reset form fields after successful submission
      setDate('');
      setTree('');
      setLength('');


      setPostId(response.data.id);
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };
  return (
    <div>
      <div>
        <h1>Sawmill Go - Add Log</h1>
      </div>
      <div className={css.container}>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={6}>
              <label>Date:</label>
              <input
                type="date"
                className="form-control form-control-lg"
                value={date} onChange={(e) => setDate(e.target.value)} 
                required
                
              />
            </Col>
            <Col xs={6}>
              <label>Tree:</label>
              <input
                type="number"
                className="form-control form-control-lg"
                
                value={tree} onChange={(e) => setTree(e.target.value)} 
                required
                inputMode="numeric"
              />
            </Col>
            
          </Row>
          <Row>
            <Col xs={6}>
              <label>Length:</label>
              <input
                type="number"
                className="form-control form-control-lg"
                value={length} onChange={(e) => setLength(e.target.value)} required
                inputMode="numeric"
              />
            </Col>
            <Col xs={6}>
              
            </Col>
          </Row>
         
          {success && (
            <Alert key="success" variant="success">
              <p>Success! Data Stored.</p>
              <div className={css.plankId}>Log ID: {postId}</div>{" "}
            </Alert>
          )}
          <Row>
            <Col xs={12}>
              <Button id={css.button} variant="dark" type="submit">
                save
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default MillAddLogs;
