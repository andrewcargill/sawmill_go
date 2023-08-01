import React, { useState } from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import CustomImageUploadButton from './CustomImageUploadButton';

const CustomImageUploadContainer = ({ title, imageLabels, imageUrls, setImageUrls }) => {
  const handleImageUpload = (imageUrl, index) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = imageUrl;
    setImageUrls(updatedUrls);
  };

  return (
    <Box p={2} sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {imageLabels.map((label, index) => (
            <Grid item xs={6} key={index}>
              <CustomImageUploadButton label={label} onChange={(imageUrl) => handleImageUpload(imageUrl, index)} />
              {imageUrls[index] && <img src={imageUrls[index]} alt={`Uploaded ${label}`} width="100%" />}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default CustomImageUploadContainer;
