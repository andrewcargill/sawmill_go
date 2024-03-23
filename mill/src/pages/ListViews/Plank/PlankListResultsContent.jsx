import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  styled,
  Rating,
  Grid,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Paper,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router";
import CustomTypography from "../../../components/Typography/CustomTypography";


const PlankListResultsContent = ({ data }) => {

  const navigate = useNavigate();

  const wholeLength = Math.floor(data.log.length);
  const wholeDepth = Math.floor(data.depth);
  const wholeWidth = Math.floor(data.width);

  const calculateWidthPercentage = (width) => {
    const minWidth = 2;
    const maxWidth = 25;
    const minPercentage = 30;
    const maxPercentage = 180; 

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
    const minHeight = 30; 
    const maxHeight = 180; 

    if (depth <= minDepth) return `${minHeight}px`;
    if (depth >= maxDepth) return `${maxHeight}px`;

    const height =
      minHeight +
      ((depth - minDepth) / (maxDepth - minDepth)) * (maxHeight - minHeight);
    return `${height}px`;
  };

  const toolTipContent = (
    <>
      <Typography variant="body1">
        L={wholeLength} | W={wholeWidth} | D={wholeDepth}
      </Typography>
    </>
  );

    const handlePlankClick = () => {
    navigate(`/plank/${data.id}`);
    };


  return (
    <Tooltip title={toolTipContent} arrow>
      <Grid
        item
        container
        bgcolor={"secondary.main"}
       
        p={1}
        borderRadius={"5px"}
       
        sx={{
          width: calculateWidthPercentage(data.width),
          height: calculateHeight(data.depth),
          cursor: "pointer",
        }}
        onClick={handlePlankClick}
      >
        <CustomTypography.subReportHeading>
          {data.log.tree.species} {data.id}
        </CustomTypography.subReportHeading>
      </Grid>
    </Tooltip>
  );
};

export default PlankListResultsContent;
