import React from "react";
import { CircularProgress, Grid } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      paddingBottom={40}
    >
      <CircularProgress />
    </Grid>
  );
};

export default LoadingSpinner;
