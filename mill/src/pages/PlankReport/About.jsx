import React, { useState, useEffect } from "react";

const AboutReport = ({ plank }) => {
  const [log, setLog] = useState([]);
  const [tree, setTree] = useState([]);

  useEffect(() => {
    setLog(plank.log);
    setTree(plank.log.tree);
  }, [plank]);

  console.log('about plank', plank);
  console.log('about log', log);
  console.log('about tree', tree);

  return (
    <div className="report-section-container">
        <h2>
            You have brought a wood product with total transparancy. 
        </h2>
        <p>
            This wood comes from a small sawmill who has been working with a forest owner that believes
            in the very best forestry practices.
            
        </p>
        <p>
            This product is of the highest quaulity and processed in a respectful way to 
            the envoirment.
        </p>
        <p>
            Each peice of wood has a story. And here you will learn the unique story of your wood.
        </p>

        <div>
            
        <div><p> The stages of forestry:</p> </div>
        <div className="cycle-container">
            <div>
                TREE
            </div>
            <div>Log</div>
            <div>Milling</div>
            <div>Drying</div>
        </div>
      Testing About Content
      {plank.data}, {log.date}, {tree.species}.
    
    </div>
    </div>
  );
};

export default AboutReport;
