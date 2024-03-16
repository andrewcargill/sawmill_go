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
  ButtonBase,
  IconButton,
  TextField,
  FormControlLabel,
  useTheme,
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
import ImageGallery from "react-image-gallery";
import customTheme from "../../../customTheme";
import { FormControl } from "@mui/material";

const ExpandableCardContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(-1),
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

const ExpandableCardLarge = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);

  const [imageIndex, setImageIndex] = useState(0);

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

  const images = [
    {
      original: data.image1,
      thumbnail: data.image1,
    },
    {
      original: data.image2,
      thumbnail: data.image2,
    },
    // Add more images as needed
  ];

  const handleOpenImageDialog = (index) => {
    setOpenImageDialog(true);
    setImageIndex(index);
    setSelectedImage(images[index].original);
  };

  return (
    <ExpandableCardContainer elevation={5} onClick={handleCardClick}>
      {/* On Load GUI */}
      <Grid container bgcolor={"#79c001"} p={1}>
        <Grid item xs={1.5} lg={1} justifyContent="space-between">
          <Typography variant="body1" gutterBottom p={2}>
            {data.log.tree.species} {data.id}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={10.5}
          lg={11}
          justifyContent="space-between"
          sx={{ borderRadius: "10px", backgroundColor: "#ffffff" }}
        >
          <Typography variant="body1" gutterBottom p={2}>
            {wholeLength} cm x {wholeWidth} cm x {wholeDepth} cm
          </Typography>
          <Typography variant="body1" gutterBottom p={2}>
            Grade: {data.wood_grade}
          </Typography>
          <Typography variant="body1" gutterBottom p={2}>
            Live Edge: {data.live_edge ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" gutterBottom p={2}>
            Milled: {data.date}
          </Typography>
        </Grid>
      </Grid>

      {/* Expanded card content */}
      {expanded && (
        <CardContent>
          <FormControl variant="standard" fullWidth>
            <Grid container spacing={2} paddingTop={2}>
              <Grid item container xs={8}>
                <Paper elevation={3} sx={{ width: "100%", padding: "10px" }}>
                  <Typography variant="h6" component="h6">
                    Milling Details
                  </Typography>

                  <Grid item xs>
                    <TextField
                      label="Operator"
                      value={data.operator}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      fullWidth
                      size="small"
                      variant="standard"
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      label="Milled Date"
                      value={data.date}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      size="small"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.info}
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item container xs={4}>
              <Paper elevation={3} sx={{ width: "100%", padding: "10px" }}>
                {/* Edit & Report Buttons */}
                <Grid container justifyContent="flex-end" spacing={1}>
                  <Grid item>
                    <Tooltip title="Edit (requires login)">
                      <IconButton onClick={handleEditClick}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Customer Report Preview">
                      <IconButton onClick={handleReportClick}>
                        <ArticleIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Paper>
               
              </Grid>
            </Grid>
          </FormControl>

          <Grid container spacing={2} paddingTop={2}>
            {/* Tree Details */}
            <Grid item container xs={8}>
              <Paper elevation={3} sx={{ width: "100%", padding: "10px" }}>
                <Typography variant="h6" component="h6">
                  Tree Details
                </Typography>
                <Typography variant="body1" component="p">
                  Log ID: {data.log.id}
                </Typography>
                <Typography variant="body1" component="p">
                  Tree ID: {data.log.tree.id}
                </Typography>
                <Typography variant="body1" component="p">
                  Tree Age: {data.log.tree.age}
                </Typography>
                <Typography variant="body1" component="p">
                  Tree Info: {data.log.tree.reason_for_felling}
                </Typography>
                <Typography variant="body1" component="p">
                  Lumberjack: {data.log.tree.lumberjack}
                </Typography>
              </Paper>
            </Grid>

            <Grid item container xs={4}>
            <Paper elevation={1} sx={{ width: "100%", padding: "10px" }}>
                    <Grid item xs>
                <Typography variant="h6" component="h6">
                   Images
                  </Typography>
                  </Grid>
                  <Grid item container justifyContent={'space-around'} paddingBottom={4} xs>
                  {/* Image Gallery Column */}
                  {images.map((img, index) => (
                    <Grid
                      item
                      xs={4}
                      key={index}
                      sx={{ border: "solid 2px black" }}
                    >
                      <ButtonBase
                        onClick={(event) => {
                          event.stopPropagation();
                          handleOpenImageDialog(index);
                        }}
                      >
                        <img
                          src={img.thumbnail}
                          alt={`Thumbnail ${index}`}
                          style={{ maxWidth: "100%", minheight: "100%" }}
                        />
                      </ButtonBase>
                    </Grid>
                  ))}
                  </Grid>
                </Paper>
            </Grid>
          </Grid>

          {/* Other details */}
        </CardContent>
      )}

      {/* Dialog for displaying bigger image */}
      <Dialog
        open={openImageDialog}
        onClose={handleCloseImageDialog}
        maxWidth="md"
        BackdropProps={{ onClick: handleCloseImageDialog }}
      >
        <DialogContent>
          <DialogTitle></DialogTitle>
          <Box display="flex" justifyContent="center">
            <img
              src={selectedImage}
              alt="Preview"
              style={{ width: "100%", height: "auto" }}
              onClick={(event) => {
                event.stopPropagation(); // Prevents the click from propagating to the dialog's backdrop or other elements
                handleCloseImageDialog();
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>

    </ExpandableCardContainer>
  );
};

export default ExpandableCardLarge;
