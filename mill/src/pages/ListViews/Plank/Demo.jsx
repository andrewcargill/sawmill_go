import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  IconButton,
  TextField,
  Button,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CustomTypography from "../../../components/Typography/CustomTypography";
import TemporaryDrawer from "./TemporaryDrawer";
import CustomBox from "../../../components/CustomBoxes/CustomBoxes";
import ExpandableCard from "./ExpandableCard";
import { fetchMoreData } from "../../../paginationUtilsNoAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../../styles/plankList.css";
import PageContentContainer from "../../../components/CustomBoxes/PageContentContainer";
import ExpandableCardLarge from "./ExpandableCardLarge";
import AllResultsText from "../../../components/ApiDataComponents/AllResultsText";
import LoadingSpinner from "../../../components/ApiDataComponents/LoadingSpinner";

const Demo = () => {
  /* Pagination */
  const [plankData, setPlankData] = useState({
    results: [],
    count: 0,
    next: null,
  });

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

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

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  /* Updates states from temp drawer */
  const handleFilterSubmit = (
    sort,
    grade,
    logId,
    species,
    minWidth,
    maxWidth,
    minDepth,
    maxDepth,
    general,
    liveEdge,
    Furniture,
    Structural
  ) => {
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
  }, [
    searchQuery,
    gradeFilter,
    logIdFilter,
    speciesFilter,
    minWidthFilter,
    maxWidthFilter,
    minDepthFilter,
    maxDepthFilter,
    generalFilter,
    live_edgeFilter,
    furnitureFilter,
    structuralFilter,
  ]);

  const fetchDataWithFilters = async () => {
    try {
      setLoading(true);
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
        // Include other filters as necessary
      };

      if (generalFilter) params.general = true;
      if (structuralFilter) params.structural = true;
      if (live_edgeFilter) params.live_edge = true;
      if (furnitureFilter) params.furniture = true;

      const response = await axios.get(
        `${API_BASE_URL}/api/plank/`,
        {
          params,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Check if response.data and response.data.results exist
      if (response.data && response.data.results) {
        setPlankData({
          results: response.data.results,
          count: response.data.count,
          next: response.data.next,
        });
        setResultCount(response.data.count);
      } else {
        // Handle the case where data is not in the expected format
        console.error(
          "Data was not received in the expected format:",
          response.data
        );
        setPlankData({ results: [], count: 0, next: null }); // Reset or handle accordingly
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state appropriately, perhaps resetting state or showing a user-friendly message
    } finally {
      setLoading(false);
    }
  };

  const fetchMorePlanks = () => {
    if (plankData.next) {
      console.log("Step 3: Fetching more data...");
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
      <div
        classname="stuck"
        style={{
          position: "sticky",
          top: "55px",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <CustomBox variant="white" sx={{ marginBottom: "32px" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CustomTypography.listHeading>
                Lumber Stock
              </CustomTypography.listHeading>
            </Grid>
            <Grid
              container
              xs={12}
              spacing={1}
              alignItems="center"
              justifyContent="center"
              ml="0px"
            >
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
                      <IconButton
                        size="small"
                        type="submit"
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  size="md"
                  variant="outlined"
                  color="primary"
                  onClick={handleDrawerOpen}
                >
                  <FilterAltIcon /> Filter
                </Button>
                <TemporaryDrawer
                  open={drawerOpen}
                  onClose={handleDrawerClose}
                  onSubmit={handleFilterSubmit}
                  onResetFilters={handleResetFilters}
                />
              </Grid>
            </Grid>
          </Grid>
        </CustomBox>
      </div>
      
      <div style={{minHeight: 200, paddingBottom: '100px' }}>
        {" "}
        {/* Add padding to create space */}
        {loading && <LoadingSpinner />}
        {/* Check if 'plankData.results' is defined before rendering the InfiniteScroll */}
     
        <InfiniteScroll
          dataLength={plankData.results.length}
          next={fetchMorePlanks}
          hasMore={!!plankData.next}
          loader={<LoadingSpinner />}
          endMessage={<AllResultsText />}
          // scrollThreshold={0.8}
          // style={{ height: "calc(100% - 55px)", overflowY: "auto", zIndex: 1 }}
         
        >
         <Grid container spacing={2} paddingTop={2}>
            {plankData.results.map((data) => (
              <Grid item xs={12} key={data.id}>
                {!matches && <ExpandableCard data={data} />}
                {matches && <ExpandableCardLarge data={data} />}
              </Grid>
            ))}
        </Grid>
        </InfiniteScroll>
   
      </div>
    </PageContentContainer>
  );
};

export default Demo;
