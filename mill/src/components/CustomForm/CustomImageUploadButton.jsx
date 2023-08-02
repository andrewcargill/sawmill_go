import React, { useState } from 'react';
import { Button } from '@mui/material';

const CustomImageUploadButton = ({ label, imageUrl, setImageUrl }) => {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = file;
      setImageUrl(imageDataUrl); // Update the imageUrl state in CustomImageUploadContainer
    };

    reader.readAsDataURL(file);
  };

  return (
    <label htmlFor={`upload-${label.toLowerCase()}`}>
      <Button variant="contained" color="secondary" component="span" fullWidth>
        {label}
      </Button>
      <input
        id={`upload-${label.toLowerCase()}`}
        hidden
        accept="image/*"
        type="file"
        onChange={handleFileUpload}
      />
      {imageUrl && <img src={imageUrl} alt={`Uploaded ${label}`} width="100%" />}
    </label>
  );
};

export default CustomImageUploadButton;
