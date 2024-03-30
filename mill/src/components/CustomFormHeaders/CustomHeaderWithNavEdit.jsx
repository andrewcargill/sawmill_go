import React from "react";
import {
  Grid,
  Button,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import CustomTypography from "../Typography/CustomTypography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";

const CustomHeaderWithNavEdit = ({ title, handleGoBack, handleEditClick }) => {
  return (
    <Grid container item p={2} pt={2} bgcolor={"primary.main"}>
      <Grid item xs={6}>
        <CustomTypography.navHeading color="white">
          {title}
        </CustomTypography.navHeading>
      </Grid>

      <Grid item container xs={6} justifyContent="flex-end">
        <Grid item pr={2}>
          <IconButton color="white" size="small" onClick={handleEditClick}>
            <EditIcon />
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

export default CustomHeaderWithNavEdit;
