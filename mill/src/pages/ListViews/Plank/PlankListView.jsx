import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Grid, IconButton, TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomTypography from '../../../components/Typography/CustomTypography';
import TemporaryDrawer from './TemporaryDrawer';
import CustomBox from '../../../components/CustomBoxes/CustomBoxes';
import ExpandableCard from './ExpandableCard';
import { fetchMoreData } from "../../../paginationUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import "../../../styles/plankList.css";
import PageContentContainer from '../../../components/CustomBoxes/PageContentContainer';

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
            console.log('Step 3: Fetching more data...');
            fetchMoreData(plankData.next, setPlankData);
        }
    };

    /* Drawer open and close state */
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    /* Reset all filters */
    const handleResetFilters = () => {
        setOrderBy(0);
        setGradeFilter("");
        setLogIdFilter("");
        setSpeciesFilter("");
        setMinWidthFilter("");
        setMaxWidthFilter("");
        setMinDepthFilter("");
        setMaxDepthFilter("");
        setGeneralFilter("");
        setLive_edgeFilter("");
        setFurnitureFilter("");
        setStructuralFilter("");
        fetchData();
    };
    return (
        
        <PageContentContainer>
            
            <div classname="stuck" style={{position: 'sticky', top: '55px', left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                <CustomBox variant="primary" sx={{ marginBottom: '32px' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CustomTypography.heading>
                                Lumber Stock
                            </CustomTypography.heading>
                        </Grid>
                        <Grid container xs={12} spacing={1} alignItems="center" justifyContent="center" ml="0px">
                        <Grid item xs={4}>
                            Results: {resultCount}
                                </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="search-input"
                                    label="Search"
                                    type="search"
                                    variant="standard"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton size="small" type="submit" aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                        ),
                                    }}
                                />

                            </Grid>
                                <Grid item xs={4}>
                                <Button size="md" variant="contained" color="primary" onClick={handleDrawerOpen}>
                                    filter <FilterAltIcon />
                                </Button>
                                <TemporaryDrawer open={drawerOpen} onClose={handleDrawerClose} onSubmit={handleFilterSubmit} onResetFilters={handleResetFilters} />
                            </Grid>
                        </Grid>
                    </Grid>
                   
                </CustomBox>
            </div>
            <Container> {/* Add padding to create space */}
                <InfiniteScroll
                    dataLength={plankData.results.length}
                    next={fetchMorePlanks}
                    hasMore={!!plankData.next}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No more planks to load.</p>}
                    scrollThreshold={0.8}
                    style={{ height: 'calc(100% - 55px)', overflowY: 'auto',  zIndex: 1 }}
                >
                    <Grid container spacing={2}>
                        {plankData.results.map((data) => (
                            <Grid item xs={12} key={data.id}>
                                <ExpandableCard data={data} />
                            </Grid>
                        ))}
                    </Grid>

                </InfiniteScroll>
            </Container>

        </PageContentContainer>
    );
};

export default PlankListView;
