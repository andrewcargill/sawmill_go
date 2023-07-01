import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
              <Button
                className={css.selectButton}
                variant="success"
                onClick={() => handleButtonClick("/mill_add_planks")}
              >
                + Plank
              </Button>
            </div>
          </Col>
          <Col xs={6}>
            <div className={css.buttonContainer}>
              <Button
                className={css.selectButton}
                variant="success"
                onClick={() => handleButtonClick("/mill_add_logs")}
              >
                + Log
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <div className={css.buttonContainer}>
              <Button
                className={css.selectButton}
                variant="success"
                onClick={() => handleButtonClick("/mill_add_trees")}
              >
                + Tree
              </Button>
            </div>
          </Col>
          <Col xs={6}>
            <div className={css.buttonContainer}>
              <Button
                className={css.selectButton}
                variant="success"
                onClick={() => handleButtonClick("/mill_add_moisture")}
              >
                + Moisture Check
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <Button
              className={css.logoutButton}
              variant="dark"
              onClick={() => handleButtonClick("/logout")}
            >
              LOG OUT
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MillHome;
