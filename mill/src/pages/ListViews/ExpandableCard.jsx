import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, styled, Rating, Grid, Dialog, DialogContent, DialogTitle, Box, Paper, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import image1 from '../../media/images/cloud.jpeg';
import image2 from '../../media/images/forest.jpeg';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';

const ExpandableCardContainer = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    backgroundColor: theme.palette.white.main, // Use primary color for the card header background

    '@media (max-width: 600px)': {
        marginBottom: theme.spacing(1), // Reduce bottom margin on mobile devices
    },
}));

const CustomStarIcon = ({ value }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon fontSize="small" sx={{ marginRight: 1 }} />
            <Typography variant="body2">{value}</Typography>
        </div>
    );
};

const ExpandableCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.white.main, // Use secondary color for the card content background
}));

const ExpandableCard = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    /* Handles card expanding */
    const handleCardClick = () => {
        setExpanded(!expanded);
    };

    /* Handles image preview */
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpenImageDialog(true);
    };

    const handleCloseImageDialog = () => {
        setOpenImageDialog(false);
    };

  


    return (
        <ExpandableCardContainer onClick={handleCardClick}>
            <CardHeader

                title={
                    <Typography variant="body1" sx={{ marginRight: 1 }}>
                        ID: {data.id} | {data.species.toUpperCase()} | {data.dimensions}
                    </Typography>
                }
                action={
                    <div sx={{ display: 'flex', height: '50px', alignItems: 'center', bgcolor: 'black', padding: '5px' }}>
                        <ArticleIcon fontSize="small" sx={{ marginRight: 1 }} />
                        <EditIcon fontSize="small" />
                    </div>
                }
                sx={{
                    color: 'primary.contrastText',
                    backgroundColor: 'dark.main',
                    fontWeight: 'bold',
                    paddingLeft: '10px',
                    paddingRight: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '40px'
                }}
            />

            <ExpandableCardContent>
                <Grid container spacing={2}>
                    {/* Column 1 */}
                    <Grid item xs={4}>

                        <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                            {data.date}
                        </Typography>

                        {/* <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                            Op:  {data.operator}
                        </Typography> */}

                    </Grid>

                    {/* Column 2 */}
                    <Grid item xs={4}>
                        <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>

                            Grade: {data.grade}
                        </Typography>
                        {/* 
                        <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                            Tree ID: {data.treeid}
                        </Typography> */}
                    </Grid>

                    {/* Column 3 */}
                    <Grid item xs={4}>
                        <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>

                            Water:  {data.water}%
                        </Typography>

                        {/* <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                            Log ID:  {data.logid}
                        </Typography> */}
                    </Grid>
                </Grid>
            </ExpandableCardContent>

            {expanded && (
                <CardContent>

                    <Paper elevation={3} style={{ padding: '10px', margin: '2px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                                    Op:  {data.operator}
                                </Typography>

                            </Grid>
                            <Grid item xs={6}>

                                <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                                    Tree ID: {data.treeid}
                                </Typography>
                                <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                                    Log ID:  {data.logid}
                                </Typography>

                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={3} style={{ padding: '10px', margin: '2px' }}>
                        <Grid item xs={12}>
                            <Typography variant="body2">Operator Notes:</Typography>
                            <Typography variant="body2">{data.info}</Typography>

                        </Grid>

                    </Paper>

                    <Paper elevation={3} style={{ padding: '10px', margin: '2px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Live Edge: {data.live_edge ? 'Yes' : 'No'}</Typography>
                                <Typography variant="body2">Structural: {data.structural ? 'Yes' : 'No'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">Furniture: {data.furniture ? 'Yes' : 'No'}</Typography>
                                <Typography variant="body2">General: {data.general ? 'Yes' : 'No'}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>


                    <Paper elevation={3} style={{ padding: '10px', margin: '2px' }}>
                        <Grid container spacing={1} >
                            <Grid item xs={6}>
                                {/* Thumbnail of Image1 */}
                                <img
                                    src={image1}
                                    alt="Image 1"
                                    width="100%"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleImageClick(image1)}
                                />
                            </Grid>

                            {/* Column 3 */}
                            <Grid item xs={6} >
                                {/* Thumbnail of Image2 */}
                                <img
                                    src={image2}
                                    alt="Image 2"
                                    width="100%"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleImageClick(image2)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                </CardContent>
            )}

            {/* Dialog for displaying bigger image */}
            <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="md" BackdropProps={{ onClick: handleCloseImageDialog }}>
                <DialogContent>
                    <DialogTitle>Image Preview</DialogTitle>
                    <Box display="flex" justifyContent="center">
                        <img src={selectedImage} alt="Preview" style={{ width: '100%', height: 'auto' }} onClick={handleCloseImageDialog} />
                    </Box>
                </DialogContent>
            </Dialog>

        </ExpandableCardContainer>
    );
};

export default ExpandableCard;
