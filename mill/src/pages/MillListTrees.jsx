import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import CustomInput from "../components/CustomForm/CustomInput";
import CustomHeaderWithNavAdd from "../components/CustomFormHeaders/CustomHeaderWithNavAdd";
import LoadingSpinner from "../components/ApiDataComponents/LoadingSpinner";

const TreeList = () => {
  const [trees, setTrees] = useState([]);
  const [idSearchQuery, setIdSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [orderBy, pageSize, idSearchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page_size: pageSize,
        ordering: orderBy,
      });

      if (idSearchQuery) params.set("id", idSearchQuery);

      const response = await axios.get(
        `${API_BASE_URL}/tree/?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTrees(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handleIdSearch = () => {
    setCurrentPage(1);
    const id = parseInt(idSearchQuery);
    setIdSearchQuery(id);
    fetchData();
  };

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrderBy(`-${field}`);
    } else {
      setOrderBy(field);
    }
    setCurrentPage(1);
  };

  const handleReset = () => {
    setIdSearchQuery("");
    setOrderBy("id");
    setCurrentPage(1);

    fetchData();
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleIdSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleIdSearch();
    }
  };

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleTreeClick = (treeId) => {
    navigate(`/tree/${treeId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddClick = () => {
    navigate("/mill_add_trees");
  };

  return (
    <PageContentContainer>
      <Grid container>
        <Grid container item>
          <CustomHeaderWithNavAdd
            title="Trees"
            addButtonText="Tree"
            handleGoBack={handleGoBack}
            handleAddClick={handleAddClick}
          />

          <Grid
            item
            container
            xs={12}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-around",
            }}
          >
            <Grid item container xs={3} sm={4} padding={"0 2px"}>
              <FormControl size="small" fullWidth>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  autoWidth
                  labelId="sort-by-label"
                  label="Sort By"
                  id="sort-by"
                  value={orderBy}
                  onChange={handleSortChange}
                >
                  <MenuItem value="id">ID (Lastest)</MenuItem>
                  <MenuItem value="-id">ID (Oldest)</MenuItem>
                  <MenuItem value="date">Date (Newest)</MenuItem>
                  <MenuItem value="-date">Date (Oldest)</MenuItem>
                  <MenuItem value="age">Age (Oldest)</MenuItem>
                  <MenuItem value="-age">Age (Youngest)</MenuItem>
                  <MenuItem value="species">Species (A-Z)</MenuItem>
                  <MenuItem value="-species">Species (Z-A)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={3}
              sm={4}
              container
              alignItems="center"
              justifyContent="flex-start"
              padding={"0 2px"}
            >
              <CustomInput
                label="Search by ID"
                size="small"
                type="number"
                fullWidth
                value={idSearchQuery}
                onChange={(e) => setIdSearchQuery(e.target.value)}
                onKeyDown={handleIdSearchKeyPress}
                placeholder="Search by ID"
              />
            </Grid>

            <Grid item container xs={3} sm={1} padding={"0 2px"}>
              <CustomInput
                label="Page Size"
                size="small"
                type="number"
                fullWidth
                value={pageSize}
                onChange={handlePageSizeChange}
                placeholder="Page Size"
              />
            </Grid>

            <Grid item container xs={3} sm={1} justifyContent={"center"}>
              <Button onClick={handleReset} variant="contained" color="primary">
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        alignContent={"center"}
      >
        {loading && <LoadingSpinner />}
        {trees && trees.length > 0 ? (
          <>
            {trees.map((tree) => (
              <Grid
                className="item-select"
                item
                container
                xs={5}
                sm={2}
                lg={2}
                key={tree.id}
                m={1}
                bgcolor={"secondary.main"}
                style={{
                  border: `2px solid ${tree.logged ? "orange" : "green"}`,
                  borderRadius: "5px",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleTreeClick(tree.id)}
              >
                <Grid item>
                  <h3>{tree.id}</h3>
                </Grid>
                <Grid item>
                  <p>{tree.species}</p>
                </Grid>
              </Grid>
            ))}
          </>
        ) : (
          <p>No trees found.</p>
        )}
      </Grid>
    </PageContentContainer>
  );
};

export default TreeList;
