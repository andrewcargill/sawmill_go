import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import css from "../styles/millHome.module.css";

const MillHome = () => {

  
    const navigate = useNavigate();
  
    const handleButtonClick = (route) => {
      navigate(route);
    };

  return (
    <div className="mainContainer">
      <div>
        <h1>Sawmill Go</h1>
      </div>
      <div className={css.container}>
        <Row>
          <Col xs={6}>
            <div className={css.buttonContainer}>
              <button className={css.selectButton}
              onClick={() => handleButtonClick('/mill_add_planks')}
              >+ Plank
              </button>
            </div>
          </Col>
          <Col xs={6}>
          <div className={css.buttonContainer}>
              <button className={css.selectButton}
              onClick={() => handleButtonClick('/mill_add_logs')}
              >+ Log</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
          <div className={css.buttonContainer}>
              <button className={css.selectButton}
               onClick={() => handleButtonClick('/mill_add_trees')}
              >+ Tree</button>
            </div>
          </Col>
          <Col xs={6}>
          
          <div className={css.buttonContainer}>
              <button className={css.selectButton}
               onClick={() => handleButtonClick('/mill_add_moisture')}
              >+ Moisture Check</button>
            </div>
          </Col>
        </Row>
        INFO SECTION
        <Row>
          <Col xs={12}>LOG IN</Col>
        </Row>
      </div>
    </div>
  );
};

export default MillHome;
