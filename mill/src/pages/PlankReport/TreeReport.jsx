import React, { useState, useEffect } from "react";
import {
  faTree,
  faIndustry,
  faSun,
  faLinesLeaning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyMapComponent from "./MapReport";

const TreeReport = ({ plank }) => {
  const [log, setLog] = useState([]);
  const [tree, setTree] = useState([]);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    setLog(plank.log);
    setTree(plank.log.tree);
    setLatitude(plank.log.tree.latitude);
    setLongitude(plank.log.tree.longitude);
  }, [plank]);

  console.log("about plank", plank);
  console.log("about log", log);
  console.log("about tree", tree);

  return (
    <div className="report-section-container">
      <h2>{tree.species}_{plank.id} was {tree.age} years old.</h2>
      <p className="sub-header">
        The GPS location of the tree was recorded before felling.
      </p>


      <div className="report-section-container-dark">
      <h2>Reason for Felling</h2>
      <p>{tree.reason_for_felling}</p>
      </div>
      <MyMapComponent tree={tree} />
   


      <div>
        <div>
          <p>
            {" "}
            <strong> The stages of forestry:</strong>{" "}
          </p>{" "}
        </div>
        <div className="cycle-container">
          <div>
            <div className="stage-icon">
              <FontAwesomeIcon icon={faTree} />
            </div>
            <div className="stage-label">{tree.date}</div>
          </div>
          <div>
            <div className="stage-icon">
              <FontAwesomeIcon icon={faLinesLeaning} />
            </div>
            <div className="stage-label">{tree.lumberjack}</div>
          </div>
          <div>
            <div className="stage-icon">
              <FontAwesomeIcon icon={faIndustry} />
            </div>
            <div className="stage-label">{tree.age}YRS</div>
          </div>
          <div>
            <div className="stage-icon">
              <FontAwesomeIcon icon={faSun} />
            </div>
            <div className="stage-label">{tree.species}</div>
          </div>
        </div>
      </div>
      {/* <Row className="border border-3">
          <Col xs={12}>
            <h4>The Tree</h4>
          </Col>
          <Col xs={6} className="border">
            Date: {treeDate}
          </Col>
          <Col xs={6} className="border">
            LumberJack: {lumberjack}
          </Col>
          <Col xs={12}>
            <p>
              This {species} was estimated to be {age} years old when it was
              removed by {lumberjack} on {treeDate}. The unqiue reference for
              this tree was {species}_{treeId}.
            </p>

            <p>
              Below you will see more detailed information about the tree and
              why it was removed from the forest.
            </p>
          </Col>

          <Col xs={12} className="border">
            <h5>Lumberjack {lumberjack}'s notes:</h5>
            <p>{reason_for_felling}</p>
          </Col>

          <Col xs={12} className="border">
            <p>
              Image of {species}_{treeId}
            </p>
            <div>
              {treeImage && (
                <img
                  src={treeImage}
                  alt="Tree Image"
                  style={{ maxWidth: "300px", height: "auto" }}
                />
              )}
            </div>
          </Col>
          <Col xs={12} className="border">
            <div>
              GPS location of {species}_{treeId}.
            </div>

            {latitude && longitude ? (
              <div style={{ height: "400px", width: "100%" }} className="pb-4">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U",
                  }}
                  defaultCenter={{
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude),
                  }}
                  defaultZoom={18}
                  options={{ mapTypeId: "satellite" }}
                >
                  <Marker
                    lat={parseFloat(latitude)}
                    lng={parseFloat(longitude)}
                  />
                </GoogleMapReact>
              </div>
            ) : (
              <p>NO GPS DATA.</p>
            )}
          </Col>
        </Row> */}
    </div>
  );
};

export default TreeReport;
