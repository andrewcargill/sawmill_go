import React from "react";
import GoogleMapReact from "google-map-react";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "../../styles/mapReport.module.css";
import { Container } from "@mui/material";
import CustomBox from "../../components/CustomBoxes/CustomBoxes";

const MyMapComponent = ({ tree }) => {
  const marker = {
    lat: parseFloat(tree.latitude),
    lng: parseFloat(tree.longitude),
  };

  const Marker = () => (
    <div className={css.pin}>
      <div id={css.iconContainer}>
        <FontAwesomeIcon icon={faTree} />
      </div>
      <div id={css.gps}>
      <div>{marker.lat}</div>
      <div>{marker.lng}</div>
      </div>
    </div>
  );

  return (
    <div style={{ height: "250px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U",
        }}
        center={marker}
        defaultZoom={17}
        options={{
          gestureHandling: "greedy",
        }}
      >
        <Marker />
      </GoogleMapReact>
    </div>
  );
};

export default MyMapComponent;
