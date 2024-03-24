import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import css from "../styles/millHome.module.css";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";

const MillHome = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
   <PageContentContainer>
      
      <div className={css.container}>
        <Row>
          <Col xs={6} className={css.columns}  >
            <div className={css.buttonContainer}>
              <Button
                className={css.selectButton}
              
                onClick={() => handleButtonClick("/add_plank")}
              >
                + Plank
              </Button>
            </div>
          </Col>
          <Col xs={6} className={css.columns} >
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
          <Col xs={6} className={css.columns} >
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
          <Col xs={6} className={css.columns} >
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
    </PageContentContainer>
  );
};

export default MillHome;
