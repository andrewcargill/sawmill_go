import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Tooltip, Typography } from "@mui/material";
import LoadingSpinner from "../../../../components/ApiDataComponents/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const PlankSiblings = ({ logId, currentPlank }) => {
  const [planks, setPlanks] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const fetchPlanksByLog = async () => {
    console.log("logID", logId);
    if (!logId) return "no id";

    try {
      const response = await axios.get(
        `${API_BASE_URL}/planks/by_log/?log_id=${logId}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setPlanks(response.data || []);
      console.log("data: ", response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchPlanksByLog();
  }, [logId]);

  const calculateWidthPercentage = (width) => {
    const minWidth = 2;
    const maxWidth = 25;
    const minPercentage = 40;
    const maxPercentage = 250;

    if (width <= minWidth) return `${minPercentage}px`;
    if (width >= maxWidth) return `${maxPercentage}px`;

    const percentage =
      minPercentage +
      ((width - minWidth) / (maxWidth - minWidth)) *
        (maxPercentage - minPercentage);
    return `${percentage}px`;
  };

  const calculateHeight = (depth) => {
    const minDepth = 2;
    const maxDepth = 25;
    const minHeight = 40;
    const maxHeight = 250;

    if (depth <= minDepth) return `${minHeight}px`;
    if (depth >= maxDepth) return `${maxHeight}px`;

    const height =
      minHeight +
      ((depth - minDepth) / (maxDepth - minDepth)) * (maxHeight - minHeight);
    return `${height}px`;
  };

  const handlePlankClick = (id) => {
    navigate(`/plank/${id}`);
  };

  return (
    <div>
      {planks.length > 0 ? (
        <div>
          <Grid
            container
            sm={12}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"5% 5%"}
          >
            {planks.map((plank, index) => {
              const currentIndex = planks.findIndex(
                (p) => p.id === currentPlank
              );
              const isBookMatched =
                index === currentIndex - 1 || index === currentIndex + 1;

              return (
                <Tooltip
                  title={
                    plank.id === currentPlank
                      ? "This Plank"
                      : `W=${plank.width} | D=${plank.depth} | Grade=${plank.wood_grade}`
                  }
                >
                  <Grid
                    item
                    container
                    key={plank.id}
                    m={1}
                    borderRadius={"5px"}
                    style={{
                      border: "3px solid black",
                      backgroundColor:
                        plank.id === currentPlank
                          ? "lightgrey"
                          : isBookMatched
                          ? "#79c001"
                          : "orange",
                      color: "black",
                      height: calculateHeight(plank?.depth),
                      width: calculateWidthPercentage(plank?.width),
                      cursor: "pointer",
                    }}
                    onClick={() => handlePlankClick(plank.id)}
                  >
                    <Grid item sm={2}>
                      <Typography variant="h6" pl={2}>
                        {plank.id}
                      </Typography>
                    </Grid>
                  </Grid>
                </Tooltip>
              );
            })}
          </Grid>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default PlankSiblings;
