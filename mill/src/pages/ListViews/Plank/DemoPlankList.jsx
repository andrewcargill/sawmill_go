import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TemporaryDrawer from "./TemporaryDrawer";
import CustomBox from "../../../components/CustomBoxes/CustomBoxes";
import { fetchMoreData } from "../../../paginationUtilsNoAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../../styles/plankList.css";
import PageContentContainer from "../../../components/CustomBoxes/PageContentContainer";
import AllResultsText from "../../../components/ApiDataComponents/AllResultsText";
import LoadingSpinner from "../../../components/ApiDataComponents/LoadingSpinner";
import PlankListResultsContent from "./PlankListResultsContent";
import { useNavigate } from "react-router-dom";
import CustomHeaderWithNavAdd from "../../../components/CustomFormHeaders/CustomHeaderWithNavAdd";

const DemoPlankList = () => {
  /* Pagination */
  const [plankData, setPlankData] = useState({
    results: [],
    count: 0,
    next: null,
  });

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xl"));

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
  const containerRef = React.useRef(null);

  const navigate = useNavigate();

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
      };

      if (generalFilter) params.general = true;
      if (structuralFilter) params.structural = true;
      if (live_edgeFilter) params.live_edge = true;
      if (furnitureFilter) params.furniture = true;

      const response = await axios.get(`${API_BASE_URL}/plank/`, {
        params,
        headers: { "Content-Type": "application/json" },
      });

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

  // const fetchMorePlanks = () => {
  //   if (plankData.next) {
  //     console.log("Step 3: Fetching more data...");
  //     fetchMoreData(plankData.next, setPlankData);
  //   }
  // };

  const fetchMorePlanks = () => {
    if (plankData.next && !loading) {
      setLoading(true);
      console.log("Fetching more data...");
      fetchMoreData(plankData.next, setPlankData).then(() => setLoading(false));
    }
  };

  const checkIfContainerIsFilled = () => {
    // Placeholder check, implement your own logic based on your UI
    if (containerRef.current) {
      return (
        containerRef.current.scrollHeight > containerRef.current.clientHeight
      );
    }
    return false;
  };

  useEffect(() => {
    const checkAndFetchMore = () => {
      if (!checkIfContainerIsFilled() && !loading) {
        fetchMorePlanks();
      }
    };

    // Initial check
    checkAndFetchMore();
    // Set up event listeners for window resize or orientation change
    window.addEventListener("resize", checkAndFetchMore);
    window.addEventListener("orientationchange", checkAndFetchMore);

    // Clean up event listeners when component unmounts or rerenders
    return () => {
      window.removeEventListener("resize", checkAndFetchMore);
      window.removeEventListener("orientationchange", checkAndFetchMore);
    };
  }, [plankData.results, loading]); // Make sure to list all dependencies here

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

  /* Add and Back button click */
  const handleAddClick = () => {
    navigate("/add_plank");
  };

  const handleGoBack = () => {
    navigate(-1);
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
        <CustomHeaderWithNavAdd
          title="Planks"
          addButtonText="Plank"
          handleGoBack={handleGoBack}
          handleAddClick={handleAddClick}
        />

        <CustomBox variant="white" sx={{ marginBottom: "32px", opacity: 0.9 }}>
          <Grid container spacing={1}>
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

      <div
        ref={containerRef}
        style={{ minHeight: 200, paddingBottom: "100px" }}
      >
        {" "}
        {/* Add padding to create space */}
        {loading && <LoadingSpinner />}
        <InfiniteScroll
          dataLength={plankData.results.length}
          next={fetchMorePlanks}
          hasMore={!!plankData.next}
          loader={<LoadingSpinner />}
          endMessage={<AllResultsText />}
        >
          <Grid
            container
            spacing={0}
            paddingTop={2}
            bgcolor={"dark.main"}
            justifyContent={"center"}
            alignContent={"center"}
            p={2}
            height={"100%"}
          >
            {plankData.results.map((data) => (
              <>
                {!matches && <PlankListResultsContent data={data} />}
                {matches && <PlankListResultsContent data={data} />}
              </>
            ))}
          </Grid>
        </InfiniteScroll>
      </div>
    </PageContentContainer>
  );
};

export default DemoPlankList;
