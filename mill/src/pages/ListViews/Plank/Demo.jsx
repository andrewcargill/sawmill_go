import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Grid, IconButton, TextField, Button, Box, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CustomTypography from '../../../components/Typography/CustomTypography';
import TemporaryDrawer from './TemporaryDrawer';
import CustomBox from '../../../components/CustomBoxes/CustomBoxes';
import ExpandableCard from './ExpandableCard';
import { fetchMoreData } from "../../../paginationUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../../styles/plankList.css";
import PageContentContainer from '../../../components/CustomBoxes/PageContentContainer';
import ExpandableCardLarge from './ExpandableCardLarge';





const Demo = () => {

    /* Pagination */
    const [plankData, setPlankData] = useState({
        results: [],
        count: 0,
        next: null,
    });

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));


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
    const [loading, setLoading] = useState(false);

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
     
    };

    /* New UseEffect and Fetch Data */
    useEffect(() => {
        fetchDataWithFilters();
      }, [searchQuery, gradeFilter, logIdFilter, speciesFilter, minWidthFilter, maxWidthFilter, minDepthFilter, maxDepthFilter, generalFilter, live_edgeFilter, furnitureFilter, structuralFilter]);
    
      const fetchDataWithFilters = async () => {
        try {
            setLoading(true);
          // Create your params object based on the filter parameters
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
    
          // Fetch data using the updated params
          const response = await axios.get(
            "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/",
            {
              params,
              headers: {
                "Content-Type": "application/json",
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
        } finally {
            setLoading(false);
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
        
    };
    return (

        <PageContentContainer id="page_container">

            <div classname="stuck" style={{ position: 'sticky', top: '55px', left: 0, right: 0, bottom: 0, zIndex: 1 }}>
                <CustomBox variant="white" sx={{ marginBottom: '32px' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CustomTypography.listHeading>
                                Lumber Stock
                            </CustomTypography.listHeading>
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
                                    variant="outlined"
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
                                <Button size="md" variant="outlined" color="primary" onClick={handleDrawerOpen}

                                >
                                    <FilterAltIcon /> Filter
                                </Button>
                                <TemporaryDrawer open={drawerOpen} onClose={handleDrawerClose} onSubmit={handleFilterSubmit} onResetFilters={handleResetFilters} />
                            </Grid>
                        </Grid>
                    </Grid>
                </CustomBox>
            </div>
            <Container> {/* Add padding to create space */}
            {loading &&       
             <CircularProgress />

            }
                {/* Check if 'plankData.results' is defined before rendering the InfiniteScroll */}
                <InfiniteScroll
                    dataLength={plankData.results.length}
                    next={fetchMorePlanks}
                    hasMore={!!plankData.next}
                    loader={<CircularProgress />}
                    endMessage={<p></p>}
                    scrollThreshold={0.8}
                    style={{ height: 'calc(100% - 55px)', overflowY: 'auto', zIndex: 1 }}
                >
                    <Grid container spacing={2} minHeight={50}>
                        {plankData.results.map((data) => (
                            <Grid item xs={12} key={data.id}>
                            
                            {!matches && <ExpandableCard data={data} />}
                            {matches && <ExpandableCardLarge data={data} />}
                            </Grid>
                        ))}
                    </Grid>

                </InfiniteScroll>
            </Container>

        </PageContentContainer>
    );
};

export default Demo;
