import React from "react";
import GoogleMapReact from "google-map-react";
import {
  faTree,
  faIndustry,
  faSun,
  faLinesLeaning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "../../styles/mapReport.module.css";


const MyMapComponent = ({ tree }) => {
  const marker = {
    lat: 64.0531796,
    lng: 19.9174683,
  };

  console.log(tree);
  console.log(tree.latitude)
  const Marker = (props) => (
    <div className={css.pin}>
      <FontAwesomeIcon icon={faTree}  />
    </div>
  );

  return (
    <div>
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U" }} // Replace with your Google Maps API key
          defaultCenter={marker}
          defaultZoom={17}
        >
          <Marker lat={marker.lat} lng={marker.lng} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
};


export default MyMapComponent;
