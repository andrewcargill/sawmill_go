import React from 'react';
import { Box, Grid, TextField, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const FormHeaderContainer = styled(Box)({
    position: 'sticky',
    top: '55px',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  });

export default FormHeaderContainer; 