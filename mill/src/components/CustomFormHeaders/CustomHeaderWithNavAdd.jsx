import React from "react";
import { Grid, Button, Typography, IconButton } from "@mui/material";
import CustomTypography from "../Typography/CustomTypography";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CustomHeaderWithNavAdd = ({
  title,
  addButtonText,
  handleGoBack,
  handleAddClick,
}) => {
  return (
    <Grid container item p={2} pt={2} bgcolor={"primary.main"}>
      <Grid item xs={6}>
        <CustomTypography.navHeading color="white">
          {title}
        </CustomTypography.navHeading>
      </Grid>

      <Grid item container xs={6} justifyContent="flex-end">
        <Grid item pr={2}>
          <IconButton color="white" size="small" onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="white" size="small" onClick={handleGoBack}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomHeaderWithNavAdd;
