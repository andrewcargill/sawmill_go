import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
  Box,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TemporaryDrawer from "./TemporaryDrawer";
import { fetchMoreData } from "../../../paginationUtils";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../../styles/plankList.css";
import PageContentContainer from "../../../components/CustomBoxes/PageContentContainer";

const DemoDesktop = () => {
  // Your state definitions and useEffect hooks remain unchanged
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
  const [loading, setLoading] = useState(false);

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
  const columnsTemplate = [
    {
      label: "ID",
      dataKey: "id",
    },
    {
      label: "Species",
      dataKey: "log.tree.species", // Assuming nested access is required
    },
    {
      label: "Width",
      dataKey: "width",
    },
    {
      label: "Depth",
      dataKey: "depth",
    },
    {
      label: "Grade",
      dataKey: "wood_grade",
    },
    {
      label: "Length",
      dataKey: "log.length",
    },
    {
      label: "Sawmill Info",
      dataKey: "info",
    },
    {
      label: "Date Milled",
      dataKey: "date",
    },
    {
      label: "Operator",
      dataKey: "operator",
    },
    {
      label: "Tree ID",
      dataKey: "log.tree.id",
    },
    {
      label: "Log ID",
      dataKey: "log.id",
    },
    {
      label: "Date Felled",
      dataKey: "log.tree.date",
    },
    {
      label: "reason Felled",
      dataKey: "log.tree.reason_for_felling",
    },
    {
      label: "Tree Age",
      dataKey: "log.tree.age",
    },
  ];

  // Function to dynamically access nested object properties
  const getValueByPath = (object, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], object);
  };

  // Function to render table rows based on the columns template
  const renderTableRows = (data) => {
    return (
      <TableRow key={data.id}>
      {columnsTemplate.map(({ label, dataKey }, index) => (
        console.log("TableIndex", index),
        
        <TableCell 
          key={label} 
          align="left" 
          style={{
            whiteSpace: 'nowrap',
            padding: '8px 16px',
          }}
         
          className={index === 0 ? "stickyColumn" : ""} // Apply stickyColumn class to the first cell
        >
          {getValueByPath(data, dataKey)}
        </TableCell>
      
      ))}
    </TableRow>
    );
  };

  return (
    <PageContentContainer id="page_container">
      {/* Filter UI and loading indicator here */}
      <Box display="flex" p={'50px 0'} justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h1">
         Header
        </Typography>
        </Box>
      <Container>
        {loading && <CircularProgress />}
        <InfiniteScroll
          dataLength={plankData.results.length}
          next={fetchMorePlanks}
          hasMore={!!plankData.next}
          loader={<CircularProgress />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>All data loaded</b>
            </p>
          }
          scrollableTarget="scrollableDiv" // Ensure this matches the ID of the TableContainer
        >
          {loading && <CircularProgress />}
          <TableContainer
            component={Paper}
            style={{ height: "80vh", overflowY: "auto" }}
            id="scrollableDiv"
          >
            <Table stickyHeader aria-label="sticky table" style={{ minWidth: '1200px' }}>
              <TableHead>
                <TableRow>
                  {columnsTemplate.map(({ label }, index) => (
                     console.log("TableHeader", index),
                    <TableCell 
                    key={label} 
                    align="left" 
                    style={{
                     
                      textOverflow: 'ellipsis',
                    }}
                    className={index === 0 ? "stickyColumnHeader" : "tableHeader"} // Apply stickyColumn class to the first cell
                  >
                    {label}
                  </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{plankData.results.map(renderTableRows)}</TableBody>
            </Table>
          </TableContainer>
        </InfiniteScroll>
      </Container>
    </PageContentContainer>
  );
};

export default DemoDesktop;
