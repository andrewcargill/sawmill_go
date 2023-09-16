import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, styled, Rating, Grid, CircularProgress, Dialog, DialogContent, DialogTitle, Box, Paper, Avatar, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { faBlackboard } from '@fortawesome/free-solid-svg-icons';


const ExpandableCardContainer = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    backgroundColor: theme.palette.white.main,
    border: 'black 1px solid',
    borderRadius: '10px',

    '@media (max-width: 600px)': {
        marginBottom: theme.spacing(1),
    },
}));

const ExpandableCardContent = styled(CardContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.white.main,
}));

const ExpandableCard = ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image2Loaded, setImage2Loaded] = useState(false);

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

    const wholeLength = Math.floor(data.log.length);
    const wholeDepth = Math.floor(data.depth);
    const wholeWidth = Math.floor(data.width);

    /* Card Click */
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/plank/${data.id}/edit`);
    };

    const handleReportClick = () => {
        navigate(`/report/${data.id}`);
    };

    /* Image loading */
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImage2Load = () => {
        setImage2Loaded(true);
    };



    return (
        <ExpandableCardContainer elevation={5} onClick={handleCardClick}>
            <CardHeader
                title={
                    <Typography variant="body1" sx={{ marginRight: 1 }}>
                        {data.log.tree.species}{data.id} {wholeLength}x{wholeDepth}x{wholeWidth}
                    </Typography>
                }
                action={
                    <div sx={{ display: 'flex', height: '50px', alignItems: 'center', bgcolor: 'black', padding: '5px' }}>
                        <Tooltip title="Customer Report Preview" placement="bottom-end">
                            <ArticleIcon fontSize="small" sx={{ marginRight: 1 }} onClick={handleReportClick} />
                        </Tooltip>
                        <Tooltip title="EDIT" placement="bottom-end">
                            <EditIcon fontSize="small" onClick={handleEditClick} />
                        </Tooltip>
                    </div>
                }
                sx={{
                    color: 'primary.contrastText',
                    backgroundColor: 'primary.main',
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
                <Grid container spacing={1}>
                    {/* Column 1 */}
                    <Grid item xs={3}>

                        <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                            {data.date}
                        </Typography>

                    </Grid>

                    {/* Column 2 */}
                    <Grid item xs={2}>
                        <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>

                            Grade: {data.wood_grade}
                        </Typography>

                    </Grid>

                    {/* Column 3 */}
                    <Grid item xs={3}>
                        <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>

                            Water:  10%
                        </Typography>
                    </Grid>
                </Grid>
            </ExpandableCardContent>

            {expanded && (
                <CardContent>

                    <Paper elevation={1} style={{ padding: '10px', margin: '2px' }}>
                        {/* Operator / tree / Log */}
                        <Grid container spacing={2} pb={2} pt={2}>
                            <Grid item xs={6}>
                                <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                                    Op:  {data.operator}
                                </Typography>

                            </Grid>
                            <Grid item xs={6}>

                                <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center', textTransform: 'capitalize' }}>
                                    Tree ID: {data.log.tree.id}
                                </Typography>
                                <Typography variant="body1" fontSize="small" sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                                    Log ID:  {data.log.id}
                                </Typography>

                            </Grid>
                        </Grid>

                        <Grid container spacing={2} pb={2}>
                            {/* Operator notes */}
                            <Grid item xs={12}>
                                <Typography variant="body2">Operator Notes:</Typography>
                                <Typography variant="body2">{data.info}</Typography>

                            </Grid>
                        </Grid>


                        {/* Category */}

                        <Grid container spacing={2} pb={2}>
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


                    <Paper elevation={1} style={{ padding: '10px', margin: '2px' }}>
                        <Grid container spacing={1} >
                            <Grid item xs={6}>
                                {/* Thumbnail of Image1 */}
                                {/* <img
                                    src={data.image1}
                                    alt="Image 1"
                                    width="100%"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleImageClick(data.image1)}
                                /> */}
                                {/* Show loading indicator while the image is not loaded */}
                                {!imageLoaded && <CircularProgress />}

                                {/* Show the image when it's loaded */}
                                <img
                                    src={data.image1}
                                    alt="Image 1"
                                    width="100%"
                                    style={{ cursor: 'pointer', display: imageLoaded ? 'block' : 'none' }}
                                    onLoad={handleImageLoad} // Call handleImageLoad when the image loads
                                    onClick={() => handleImageClick(data.image1)}
                                />
                            </Grid>

                            {/* Column 3 */}
                            <Grid item xs={6} >
                                {/* Thumbnail of Image2 */}
                                {!imageLoaded && <CircularProgress />}

                                {/* Show the image when it's loaded */}
                                <img
                                    src={data.image2}
                                    alt="Image 2"
                                    width="100%"
                                    style={{ cursor: 'pointer', display: imageLoaded ? 'block' : 'none' }}
                                    onLoad={handleImage2Load} // Call handleImageLoad when the image loads
                                    onClick={() => handleImageClick(data.image2)}
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
