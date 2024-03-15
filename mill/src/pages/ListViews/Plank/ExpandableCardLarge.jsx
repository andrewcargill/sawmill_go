import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, styled, Rating, Grid, CircularProgress, Dialog, DialogContent, DialogTitle, Box, Paper, Avatar, Tooltip, ButtonBase, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import WaterIcon from '@mui/icons-material/Water';
import { useNavigate } from "react-router";
import { faBlackboard } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from 'react-image-gallery';
import customTheme from '../../../customTheme';


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

const ExpandableCardLarge= ({ data }) => {
    const [expanded, setExpanded] = useState(false);
    const [openImageDialog, setOpenImageDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image2Loaded, setImage2Loaded] = useState(false);

    const [imageIndex, setImageIndex] = useState(0);

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

    const images = [
        {
            original: data.image1,
            thumbnail: data.image1,
        },
        {
            original: data.image2,
            thumbnail: data.image2,
        },
        // Add more images as needed
    ];

    const handleOpenImageDialog = (index) => {
        setOpenImageDialog(true);
        setImageIndex(index);
    };



  
        return (
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        {/* Textual Information Column */}
                        <Grid item md={6}>
                            
                            <Typography variant="h5">{data.log.tree.species}{data.id}</Typography>
                            ---
                            <Typography variant="body2">Length: {Math.floor(data.log.length)}</Typography>
                            <Typography variant="body2">Width: {Math.floor(data.width)}</Typography>
                            <Typography variant="body2">Depth: {Math.floor(data.depth)}</Typography>
                            <Typography variant="body2">Operator: {data.operator}</Typography>
                            <Typography variant="body2">Notes: {data.info}</Typography>
                            <Typography variant="body2">Date: {data.date}</Typography>
                            <Typography variant="body2">Log Id: {data.log.id}</Typography>
                            ---

                            <Typography variant="body2">Tree Id: {data.log.tree.id}</Typography>
                            <Typography variant="body2">Tree Date: {data.log.tree.date}</Typography>
                            <Typography variant="body2">Tree Age: {data.log.tree.age}</Typography>
                            <Typography variant="body2">Tree Lumberjack: {data.log.tree.lumberjack}</Typography>
                            ----


                            {/* Other details */}
                        </Grid>
    
                        {/* Image Gallery Column */}
                        <Grid item md={6} container spacing={1}>
                            {images.map((img, index) => (
                                <Grid item xs={6} key={index}>
                                    <ButtonBase onClick={() => handleOpenImageDialog(index)}>
                                        <img src={img.thumbnail} alt={`Thumbnail ${index}`} style={{ width: '100%', height: 'auto' }} />
                                    </ButtonBase>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
    
                {/* Edit and Report Icons */}
                <Grid container justifyContent="flex-end" spacing={1}>
                    <Grid item>
                        <Tooltip title="Edit (requires login)">
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Customer Report Preview">
                            <IconButton>
                                <ArticleIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
    
                {/* Image Gallery Dialog */}
                <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)} maxWidth="lg">
                    <ImageGallery items={images} startIndex={imageIndex} showPlayButton={false} onSlide={(currentIndex) => setImageIndex(currentIndex)} />
                </Dialog>
            </Card>
        );
    };

export default ExpandableCardLarge;
