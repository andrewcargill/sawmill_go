import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Grid, IconButton, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomTypography from '../../../components/Typography/CustomTypography';
import TemporaryDrawer from './TemporaryDrawer';
import CustomBox from '../../../components/CustomBoxes/CustomBoxes';
import ExpandableCard from './ExpandableCard';
import { fetchMoreData } from "../../../paginationUtils";

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

const PlankListView = () => {

    /* Pagination */
    const [plankData, setPlankData] = useState({
        results: [],
        count: 0,
        next: null,
    });


    /* Open/close Temp. Drawer */
    const [drawerOpen, setDrawerOpen] = useState(false);

    // /* OLD - Value of filter to be updated */
    // const [filterValue, setFilterValue] = useState(null);
    // const [gradeValue, setGradeValue] = useState(null);
    // const [logIdValue, setLogIdValue] = useState(null);
    // const [SpeciesValue, setSpeciesValue] = useState(null);
    // const [minWidthValue, setMinWidthValue] = useState(''); 
    // const [maxWidthValue, setMaxWidthValue] = useState(''); 
    // const [minDepthValue, setMinDepthValue] = useState(''); 
    // const [maxDepthValue, setMaxDepthValue] = useState(''); 
    // const [generalValue, setGeneralValue] = useState(false);
    // const [furniturelValue, setFurnitureValue] = useState(false);
    // const [liveEdgeValue, setLiveEdgelValue] = useState(false);
    // const [structuralValue, setStructuralValue] = useState(false);

    /* States to use */
    const [searchQuery, setSearchQuery] = useState("");
    const [resultCount, setResultCount] = useState("id");


    const [orderBy, setOrderBy] = useState(0);
    const [gradeFilter, setGradeFilter] = useState("");
    const [minWidthFilter, setMinWidthFilter] = useState("");
    const [maxWidthFilter, setMaxWidthFilter] = useState("");
    const [maxDepthFilter, setMaxDepthFilter] = useState("");
    const [minDepthFilter, setMinDepthFilter] = useState("");
    const [generalFilter, setGeneralFilter] = useState("");
    const [speciesFilter, setSpeciesFilter] = useState("");
    const [structuralFilter, setStructuralFilter] = useState("");
    const [live_edgeFilter, setLive_edgeFilter] = useState("");
    const [furnitureFilter, setFurnitureFilter] = useState("");
    const [logIdFilter, setLogIdFilter] = useState("");





    /* Updates states from temp drawer */
    const handleFilterSubmit = (sort, grade, logId, species, minWidth, maxWidth, minDepth, maxDepth, general, liveEdge, Furniture, Structural) => {
        setOrderBy(sort);
        setGradeFilter(grade);
        setLogIdFilter(logId);
        setSpeciesFilter(species);
        setMinWidthFilter(minWidth);
        setMaxWidthFilter(maxWidth);
        setMinDepthFilter(minDepth);
        setMaxDepthFilter(maxDepth);
        setGeneralFilter(general);
        setLive_edgeFilter(liveEdge);
        setFurnitureFilter(Furniture);
        setStructuralFilter(Structural);
        handleDrawerClose();
        fetchData();
    };

    /* New UseEffect and Fetch Data */
    useEffect(() => {
        fetchData();
        console.log('main orderby', orderBy)
      }, [searchQuery, orderBy]);
    
      const fetchData = async () => {
        try {
          const params = {
            search: searchQuery,
            ordering: orderBy,
            wood_grade: gradeFilter,
            width_min: minWidthFilter,
            width_max: maxWidthFilter,
            depth_min: minDepthFilter,
            depth_max: maxDepthFilter,
            log_id: logIdFilter,
            species: speciesFilter,
          };
    
          if (generalFilter) {
            params.general = true;
          }
    
          if (structuralFilter) {
            params.structural = true;
          }
    
          if (live_edgeFilter) {
            params.live_edge = true;
          }
    
          if (furnitureFilter) {
            params.furniture = true;
          }
    
          const response = await axios.get(
            "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/",
            {
              params,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
    
          setPlankData({
            results: response.data.results,
            count: response.data.count,
            next: response.data.next,
          });
    
          setResultCount(response.data.count);
          console.log("UseEffect_pageload", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      const fetchMorePlanks = () => {
        if (plankData.next) {
          fetchMoreData(plankData.next, setPlankData);
        }
      };
    

    /* OLD USE EFFECT */
    // useEffect(() => {
    //     console.log('Main: Filter', orderBy);
    //     console.log('Main: Grade', gradeFilter);
    //     console.log('Main: Log', logIdFilter);
    //     console.log('Main: Species', speciesFilter);
    //     console.log('Main: min Width', minWidthFilter);
    //     console.log('Main: max Width', maxWidthFilter);
    //     console.log('Main: min depth', minDepthFilter);
    //     console.log('Main: max depth', maxDepthFilter);
    //     console.log('Main: G, LE, F, S', generalFilter, live_edgeFilter, furnitureFilter, structuralFilter);
    // }, [orderBy, gradeFilter, logIdFilter, speciesFilter, minWidthFilter, maxWidthFilter, minDepthFilter, maxDepthFilter, generalFilter, live_edgeFilter, furnitureFilter, structuralFilter]);

    /* Drawer open and close state */
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

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
                            <TemporaryDrawer open={drawerOpen} onClose={handleDrawerClose} onSubmit={handleFilterSubmit} />
                        </Grid>
                    </Grid>
                    <p>Result Count: {resultCount}</p>
                </CustomBox>

            </div>
            <div style={{ overflowY: 'auto', maxHeight: 'calc(88vh - 100px)' }}>
           
                <Grid container spacing={2}>
                    {plankData.results.map((data) => (
                        <Grid item xs={12} key={data.id}>
                            <ExpandableCard data={data} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};

export default PlankListView;
