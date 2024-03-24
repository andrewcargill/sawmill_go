import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Container, Grid } from "@mui/material";


const MyMapComponent = ({ tree }) => {

  const mapRef = useRef(null);

  useEffect(() => {
    if (tree?.latitude && tree?.longitude && window.google) {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: parseFloat(tree.latitude),
            lng: parseFloat(tree.longitude),
          },
          zoom: 18,
          mapTypeId: "satellite",
        });

        new window.google.maps.Marker({
          position: {
            lat: parseFloat(tree.latitude),
            lng: parseFloat(tree.longitude),
          },
          map: map,
        });
      } catch (error) {
        console.error("Error creating Google Map:", error);
      }
    } else {
      const loader = new Loader({
        apiKey: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U",
      });

      loader
        .load()
        .then(() => {
          if (tree?.latitude && tree?.longitude) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: {
                lat: parseFloat(tree.latitude),
                lng: parseFloat(tree.longitude),
              },
              zoom: 18,
              mapTypeId: "satellite",
            });

            new window.google.maps.Marker({
              position: {
                lat: parseFloat(tree.latitude),
                lng: parseFloat(tree.longitude),
              },
              map: map,
            });
          }
        })
        .catch((e) => {
          console.error("Error loading Google Maps", e);
        });
    }
  }, [tree]);

  return (
    <Grid item xs={6}>
    <div
      style={{ height: "400px", width: "100%" }}
      ref={mapRef}
      className="pb-4"
    >
      {/* Map will be rendered here */}
      {!tree.latitude || !tree.longitude ? <p>NO GPS DATA.</p> : null}
    </div>
  </Grid>
  );
};

export default MyMapComponent;
