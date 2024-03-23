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
import StarIcon from "@mui/icons-material/Star";
import ArticleIcon from "@mui/icons-material/Article";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import WaterIcon from "@mui/icons-material/Water";
import { useNavigate } from "react-router";
import { faBlackboard } from "@fortawesome/free-solid-svg-icons";
import customTheme from "../../../customTheme";
import CustomTypography from "../../../components/Typography/CustomTypography";

const ExpandableCardContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  backgroundColor: theme.palette.white.main,
  border: "black 1px solid",
  borderRadius: "10px",

  "@media (max-width: 600px)": {
    marginBottom: theme.spacing(1),
  },
}));

const ExpandableCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.white.main,
}));

const PlankListResultsContent = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);

  /* Handles card expanding */
  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  /* Handles image preview */
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  const wholeLength = Math.floor(data.log.length);
  const wholeDepth = Math.floor(data.depth);
  const wholeWidth = Math.floor(data.width);

  /* Card Click */
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/plank/${data.id}/edit`);
  };

  const handleReportClick = () => {
    navigate(`/report/${data.id}`);
  };

  /* Image loading */
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImage2Load = () => {
    setImage2Loaded(true);
  };

  const calculateWidthPercentage = (width) => {
    const minWidth = 2;
    const maxWidth = 25;
    const minPercentage = 30; // Minimum width percentage
    const maxPercentage = 180; // Maximum width percentage

    if (width <= minWidth) return `${minPercentage}px`;
    if (width >= maxWidth) return `${maxPercentage}px`;

    // Calculate percentage for values between minWidth and maxWidth
    const percentage =
      minPercentage +
      ((width - minWidth) / (maxWidth - minWidth)) *
        (maxPercentage - minPercentage);
    return `${percentage}px`;
  };

  const calculateHeight = (depth) => {
    const minDepth = 2;
    const maxDepth = 25;
    const minHeight = 30; // Minimum height in pixels
    const maxHeight = 180; // Maximum height in pixels

    if (depth <= minDepth) return `${minHeight}px`;
    if (depth >= maxDepth) return `${maxHeight}px`;

    // Calculate height for values between minDepth and maxDepth
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
        onClick={handleCardClick}
      >
        <CustomTypography.subReportHeading>
          {data.log.tree.species} {data.id}
        </CustomTypography.subReportHeading>
      </Grid>
    </Tooltip>
  );
};

export default PlankListResultsContent;
