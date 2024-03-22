import { Box, Typography } from "@mui/material";
import React from "react";
import { Container } from "react-bootstrap";
import image1 from "../../../media/images/forest.jpeg";

const TreeImage = ({ tree }) => {
    return (
        <Container width={'100%'} height={'100%'} bgcolor={'blue'} >
            <Box bgcolor={'pink'} width={'100%'} height={'100%'}>
                
         
            <img src={image1} alt="forest" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
            </Box>
          
        </Container>
    );
    };

export default TreeImage;