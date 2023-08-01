// src/customTheme.js

import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#79c001', // Light green
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffb500', // Orange
            contrastText: '#286140',

        },
        white: {
            main: '#ffffff', // white
            dark: '#efefef', // black
            contrastText: '#000000',
        },
        dark: {
            main: '#286140', // Dark Green
            contrastText: '#ffffff',
        }

        // You can customize other colors here as well
    },

    typography: {
        fontFamily: 'roboto, sans-serif',
        // fontSize: 12, // Adjust the font size as needed
       
       
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: 250,
                    transitionDuration: '1000ms',
                },
            },
        },
    },
    
});

export default customTheme;