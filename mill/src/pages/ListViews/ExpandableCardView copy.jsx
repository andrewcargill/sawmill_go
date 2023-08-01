import React, { useState, useEffect } from 'react';
import { Container, Grid, IconButton, TextField, Button } from '@mui/material';
import ExpandableCard from './ExpandableCard';
import CustomFormHeading from '../styles/CustomForm/CustomFormHeading';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CustomBox from '../styles/CustomBoxes/CustomBoxes';
import CustomTypography from '../styles/CustomTypography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomButton from '../styles/CustomButtons';
import TemporaryDrawer from './TemporaryDrawer';

const testData = [
    { id: 2, species: 'pine', grade: 2, dimensions: '30 x 2 x 400', date: '2023-06-22', logid: 2, treeid: 3, operator: 'andy cargill', info: 'perfect plank for making a table', live_edge: false, structural: true, furniture: false, general: true, image1: 'dave.jpg', image2: 'frank.jpg', water: 10 },
    { id: 3, species: 'pine', grade: 3, dimensions: '30x2x400', date: '2023-06-22', logid: 2, treeid: 3, operator: 'andy cargill', info: 'perfect plank for making a table', live_edge: false, structural: true, furniture: false, general: true, image1: 'dave.jpg', image2: 'frank.jpg', water: 10 },
    { id: 300, species: 'pine', grade: 1, dimensions: '30x2x400', date: '2023-06-22', logid: 2, treeid: 3, operator: 'andy cargill', info: 'perfect plank for making a table', live_edge: false, structural: true, furniture: false, general: true, image1: 'dave.jpg', image2: 'frank.jpg', water: 10 },
    { id: 301, species: 'pine', grade: 2, dimensions: '30x2x400', date: '2023-06-22', logid: 2, treeid: 3, operator: 'andy cargill', info: 'perfect plank for making a table', live_edge: false, structural: true, furniture: false, general: true, image1: 'dave.jpg', image2: 'frank.jpg', water: 10 },
    { id: 302, species: 'pine', grade: 3, dimensions: '30x2x400', date: '2023-06-22', logid: 2, treeid: 3, operator: 'andy cargill', info: 'perfect plank for making a table', live_edge: false, structural: true, furniture: false, general: true, image1: 'dave.jpg', image2: 'frank.jpg', water: 10 },
    { id: 303, species: 'pine', grade: 1, dimensions: '30x2x400', date: '2023-06-22', logid: 2, treeid: 3, operator: 'andy cargill', info: 'perfect plank for making a table', live_edge: false, structural: true, furniture: false, general: true, image1: 'dave.jpg', image2: 'frank.jpg', water: 10 },
    { id: 3022, species: 'pine', grade: 1, dimensions: '30x2x400', date: '2023-06-22', logid: 2, treeid: 3, operator: 'andy cargill', info: 'perfect plank for making a table', live_edge: false, structural: true, furniture: false, general: true, image1: 'dave.jpg', image2: 'frank.jpg', water: 10 },

    // Add more test data entries here
];

const ExpandableCardView = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    /* Value of filter to be updated */
    const [filterValue, setFilterValue] = useState(null);
    const [gradeValue, setGradeValue] = useState(null);
    const [logIdValue, setLogIdValue] = useState(null);
    const [SpeciesValue, setSpeciesValue] = useState(null);
    const [minWidthValue, setMinWidthValue] = useState(''); 
    const [maxWidthValue, setMaxWidthValue] = useState(''); 
    const [minDepthValue, setMinDepthValue] = useState(''); 
    const [maxDepthValue, setMaxDepthValue] = useState(''); 
    const [generalValue, setGeneralValue] = useState(false);
    const [furniturelValue, setFurnitureValue] = useState(false);
    const [liveEdgeValue, setLiveEdgelValue] = useState(false);
    const [structuralValue, setStructuralValue] = useState(false);


    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    /* Updates states from temp draw */

 
    const handleFilterSubmit = (sort, grade, logId, species, minWidth, maxWidth, minDepth, maxDepth, general, liveEdge, Furniture, Structural) => {
        setFilterValue(sort);
        setGradeValue(grade);
        setLogIdValue(logId);
        setSpeciesValue(species);
        setMinWidthValue(minWidth);
        setMaxWidthValue(maxWidth);
        setMinDepthValue(minDepth);
        setMaxDepthValue(maxDepth);
        setGeneralValue(general);
        setLiveEdgelValue(liveEdge);
        setFurnitureValue(Furniture);
        setStructuralValue(Structural);
        handleDrawerClose();
      };
    
      useEffect(() => {
        console.log('Main: Filter', filterValue);
        console.log('Main: Grade', gradeValue); 
        console.log('Main: Log', logIdValue); 
        console.log('Main: Species', SpeciesValue);
        console.log('Main: min Width', minWidthValue);
        console.log('Main: max Width', maxWidthValue);
        console.log('Main: min depth', minDepthValue);
        console.log('Main: max depth', maxDepthValue);
        console.log('Main: G, LE, F, S', generalValue, liveEdgeValue, furniturelValue, structuralValue);
      }, [filterValue, gradeValue, logIdValue, SpeciesValue, minWidthValue, maxWidthValue, minDepthValue, maxDepthValue, generalValue, liveEdgeValue, furniturelValue, structuralValue]);

    return (
        <Container maxWidth="xl">
            <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <CustomBox variant="primary" sx={{ marginBottom: '32px' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CustomTypography.heading>
                                Lumber
                            </CustomTypography.heading>

                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="search-input"
                                label="Search"
                                type="search"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton type="submit" aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    ),
                                }}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <Button size="md" variant="contained" color="primary" onClick={handleDrawerOpen}>
                                filter <FilterAltIcon />
                            </Button>
                            <TemporaryDrawer open={drawerOpen} onClose={handleDrawerClose} onSubmit={handleFilterSubmit}/>
                        </Grid>
                    </Grid>
                </CustomBox>

            </div>
            <div style={{ overflowY: 'auto', maxHeight: 'calc(88vh - 100px)' }}>
                <Grid container spacing={2}>
                    {testData.map((data) => (
                        <Grid item xs={12} key={data.id}>
                            <ExpandableCard data={data} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};

export default ExpandableCardView;
