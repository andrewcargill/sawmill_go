import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import css from "../styles/testApiGps.module.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogsByTree from "../components/LogsbyTree";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import { Grid, Typography } from "@mui/material";
import { Loader } from "@googlemaps/js-api-loader";

const TreeDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const mapRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setTree(response.data);
        console.log("single tree data: ", response.data);
      } catch (error) {
        console.error("Error fetching tree:", error);
      }
    };

    fetchTree();
  }, [id]);

  useEffect(() => {
    if (tree?.latitude && tree?.longitude && window.google) {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: parseFloat(tree.latitude), lng: parseFloat(tree.longitude) },
          zoom: 18,
          mapTypeId: "satellite",
        });
    
        new window.google.maps.Marker({
          position: { lat: parseFloat(tree.latitude), lng: parseFloat(tree.longitude) },
          map: map,
        });
      } catch (error) {
        console.error("Error creating Google Map:", error);
      }
    } else {
      const loader = new Loader({
        apiKey: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U", // Replace with your actual API key
      
      });
  
      loader.load().then(() => {
        if (tree?.latitude && tree?.longitude) {
          const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: parseFloat(tree.latitude), lng: parseFloat(tree.longitude) },
            zoom: 18,
            mapTypeId: "satellite",
          });
      
          new window.google.maps.Marker({
            position: { lat: parseFloat(tree.latitude), lng: parseFloat(tree.longitude) },
            map: map,
          });
        }
      }).catch(e => {
        console.error("Error loading Google Maps", e);
      });
    }
  }, [tree]); // Depend on "tree" to ensure it's loaded
  
  

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/tree/${id}/edit`);
  };

  if (!tree) {
    return <p>Loading...</p>;
  }

  return (
    <PageContentContainer>
      <Grid container pt={2}>
        {/* Other UI elements */}

        <Grid item xs={12}>
          <div style={{ height: "400px", width: "100%" }} ref={mapRef} className="pb-4">
            {/* Map will be rendered here */}
            {!tree.latitude || !tree.longitude ? <p>NO GPS DATA.</p> : null}
          </div>
        </Grid>

        {/* Other UI elements */}
      </Grid>
    </PageContentContainer>
  );
};

export default TreeDetail;
