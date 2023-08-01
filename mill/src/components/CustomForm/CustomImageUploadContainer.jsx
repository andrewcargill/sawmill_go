import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import CustomImageUploadButton from './CustomImageUploadButton';

const CustomImageUploadContainer = ({ title, imageLabels, imageUrls, setImageUrls }) => {
  console.log('setimageUrl:', setImageUrls);
  console.log('imageUrl:', imageUrls);
  const handleImageUpload = (imageUrl, index) => {
    console.log(`Image URL: ${imageUrl}, Index: ${index}`);
   
  console.log('title:', title);
  console.log('current imageUrls:', imageUrls);
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = imageUrl;
    console.log(`Updated URLs: ${updatedUrls}`);
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
