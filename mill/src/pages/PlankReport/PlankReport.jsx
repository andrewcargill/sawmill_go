import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import css from "../../styles/testApiGps.module.css";
import styles from "../../styles/PlankReport.module.css";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Nav,
  Image,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LogsByTree from "../../components/LogsbyTree";
import WaterByPlank from "../../components/WaterByPlank";
import AboutReport from "./About";
import TreeReport from "./TreeReport";

const PlankReport = () => {
  const { id } = useParams();
  const [plank, setPlank] = useState(null);
  const [length, setLength] = useState(null);
  const [treeId, setTreeId] = useState(null);
  const [treeDate, setTreeDate] = useState(null);
  const [reason_for_felling, setReason_for_felling] = useState(null);
  const [age, setAge] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [lumberjack, setLumberjack] = useState(null);
  const [treeImage, setTreeImage] = useState(null);
  const [species, setSpecies] = useState(null);
  const [log, setLog] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const [activeTab, setActiveTab] = useState("about");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlank = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/report/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("image", response.data);
        setPlank(response.data);

        setLength(response.data.log.length);
        setLog(response.data.log);
        setTreeDate(response.data.log.tree.date);
        setSpecies(response.data.log.tree.species);
        setReason_for_felling(response.data.log.tree.reason_for_felling);
        setAge(response.data.log.tree.age);
        setLongitude(response.data.log.tree.longitude);
        setLatitude(response.data.log.tree.latitude);
        setLumberjack(response.data.log.tree.lumberjack);
        setTreeImage(response.data.log.tree.image);
        setTreeId(response.data.log.tree.id);
        setTreeData(response.data.log.tree);

        console.log("treeData", treeData);
        console.log("logData", log);
        console.log("response.data", response.data);
        
        
      } catch (error) {
        console.error("Error fetching plank:", error);
      }
    };

    fetchPlank();
  }, [id]);

  if (!plank) {
    return <p>Loading...</p>;
  }

  const getLiveEdgeStatus = (live_edge) => {
    return live_edge ? "Yes" : "No";
  };

  const getFurnitureStatus = (furniture) => {
    return furniture ? "Yes" : "No";
  };

  const getStructuralStatus = (structural) => {
    return structural ? "Yes" : "No";
  };

  const getGeneralStatus = (general) => {
    return general ? "Yes" : "No";
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTabSelect = (tab) => {
    console.log(activeTab);
    setActiveTab(tab);
  };

  return (
    <div className="">
      {/*Report Start */}

      <div className="textContainer">
        <h1>
          Life cycle of wood product:{" "}
          <span className="textHighlight">
            {" "}
            {species}_{id}
          </span>
        </h1>
        {/* <p>
              In this report you will learn about the unique story behind the
              wood that your have purchased.
            </p> */}
      </div>
      <div id="tree-image">
        <div>
          <Image src={treeImage} rounded />
        </div>
        <div>
          (This is an actual picture of {species}_{id}!)
        </div>
      </div>

      <div id={styles.reportContainer}>
        <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
          <Nav.Item>
            <Nav.Link eventKey="about"
            className={activeTab === "about" ? "active" : ""}
            >About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tree"
            className={activeTab === styles.tree ? "active" : ""}
            >Tree</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="logging"
            className={activeTab === "logging" ? "active" : ""}
            >Logging</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="milling"
            className={activeTab === "milling" ? "active" : ""}
            >Milling</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="drying"
            className={activeTab === "drying" ? "active" : ""}
            >Drying</Nav.Link>
          </Nav.Item>
        </Nav>

        <div
          id="tree"
          style={{ display: activeTab === "about" ? "block" : "none" }}
        >
          <AboutReport plank={plank} />
        </div>
        <div
          id="tree"
          style={{ display: activeTab === "tree" ? "block" : "none" }}
        >
          <TreeReport plank={plank} />
        </div>
        <div
          id="logging"
          style={{ display: activeTab === "logging" ? "block" : "none" }}
        >
          Content for logging
        </div>
        <div
          id="milling"
          style={{ display: activeTab === "milling" ? "block" : "none" }}
        >
          Content for milling
        </div>
        <div
          id="drying"
          style={{ display: activeTab === "drying" ? "block" : "none" }}
        >
          Content for drying
        </div>
      </div>

      <Container className="pb-4 border border-5">
        {/*Report Title */}
        {/* <Row className="border border-3">
          <Col>
            <h3>
              Welcome to the report on the wood product {species}_{id}
            </h3>
            <p>
              In this report you will learn about the unique story behind the
              wood that your have purchased.
            </p>
          </Col>
        </Row> */}
        {/*Report Tree */}
       
        {/*Report Milling */}
        {/* <Row className="border border-3">
          <Col xs={12} className="border">
            <h4>Logging, Milling and Drying</h4>
            <p>
              In this section we share the the next step in the journey. The
              Tree is logged, then taken to the sawmill where it is milled and
              dried.{" "}
            </p>
          </Col>
          <Col xs={12} className="border">
            <h5>Logging of the Tree</h5>
            <p>
              The tree was logged on {log.date} to a length of {log.length}cm
              and given the id of {species}_{log.id}.
            </p>
            <p>(The tree was divided up into a totle of /number of logs/!)</p>
          </Col>

          <Col xs={12} className="border">
            <h5>Milling and Drying</h5>
            <p>
              The log was milled on {plank.date} by {plank.operator} at Selet15
              Sawmill.
            </p>
            <p>Below is the data we have from that day.</p>
          </Col>
          <Col xs={6} className="border">
            Milled dimensions: (width){plank.width}cm x (depth){plank.depth}cm x
            (length){log.length}cm
          </Col>
          <Col xs={6} className="border">
            Operator: {plank.operator}
          </Col>
          <Col xs={6} className="border">
            Wood Grade: {plank.wood_grade}
          </Col>
          <Col xs={12} className="border">
            Operator ({plank.operator}) Notes:
            <p>{plank.info}</p>
          </Col>
          <Col xs={6} className="border">
            Image 1
            {plank.image1 && (
              <img
                src={plank.image1}
                alt="Tree Image"
                style={{ maxWidth: "150px", height: "auto" }}
              />
            )}
          </Col>
          <Col xs={6} className="border">
            Image 2
            {plank.image2 && (
              <img
                src={plank.image2}
                alt="Tree Image"
                style={{ maxWidth: "150px", height: "auto" }}
              />
            )}
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

const Marker = () => <div className={css.marker}></div>;

export default PlankReport;
