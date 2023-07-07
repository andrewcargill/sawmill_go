import React, { useState, useEffect } from "react";
import {
  faTree,
  faIndustry,
  faSun,
  faLinesLeaning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutReport = ({ plank }) => {
  const [log, setLog] = useState([]);
  const [tree, setTree] = useState([]);

  useEffect(() => {
    setLog(plank.log);
    setTree(plank.log.tree);
  }, [plank]);

  console.log("about plank", plank);
  console.log("about log", log);
  console.log("about tree", tree);

  return (
    <div className="report-section-container">
      <h2>total transparancy.</h2>
      <p className="sub-header">
        Well done, you have purchased wood that comes from a small sawmill who
        has been working with a forest owner that believes in the very best
        forestry practices.
      </p>
      <p>
        This product is of the highest quaulity and processed in a respectful
        way to the envoirment.
      </p>
      <p>
        Each peice of wood has a story. And here you will learn the unique story
        of yours!
      </p>

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
            <div className="stage-label">tree</div>
          </div>
          <div>
            <div className="stage-icon">
              <FontAwesomeIcon icon={faLinesLeaning} />
            </div>
            <div className="stage-label">Logs</div>
          </div>
          <div>
            <div className="stage-icon">
              <FontAwesomeIcon icon={faIndustry} />
            </div>
            <div className="stage-label">Mill</div>
          </div>
          <div>
            <div className="stage-icon">
              <FontAwesomeIcon icon={faSun} />
            </div>
            <div className="stage-label">Dry</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutReport;
