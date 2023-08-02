import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import CustomImageUploadButton from './CustomImageUploadButton';

const CustomImageUploadContainer = ({ title, imageLabels, imageUrls, setImageUrls }) => {
  console.log('setimageUrl:', setImageUrls);
  console.log('imageUrl:', imageUrls);

  const handleImageUpload = (imageUrl, index) => {
    console.log(`Image URL: ${imageUrl}, Index: ${index}`);
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = imageUrl;
    console.log(`Updated URLs: ${updatedUrls}`);
    
    // setImageUrls(updatedUrls);
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
              {/* <CustomImageUploadButton label={label} onChange={(imageUrl) => handleImageUpload(imageUrl, index)} /> */}
              <CustomImageUploadButton
        label={label}
        imageUrl={imageUrls[index]} // Use the correct imageUrl for each image
        setImageUrl={(imageUrl) => handleImageUpload(imageUrl, index)} // Pass the individual setImageUrl function for each image
      />
              
              {imageUrls[index] && <img src={imageUrls[index]} alt={`Uploaded ${label}`} width="100%" />}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default CustomImageUploadContainer;
