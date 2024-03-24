import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import { Button, Grid } from "@mui/material";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import CustomInput from "../components/CustomForm/CustomInput";
import CustomHeaderWithNavAdd from "../components/CustomFormHeaders/CustomHeaderWithNavAdd";

const TreeList = () => {
  const [trees, setTrees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, orderBy]);

  const fetchData = async () => {
    try {
      const params = {
        page: currentPage,
        page_size: pageSize,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }
      if (idSearchQuery) {
        params.id = idSearchQuery;
      }
      if (orderBy) {
        params.ordering = orderBy;
      }

      const response = await axios.get(
        `${API_BASE_URL}/tree/`,
        {
          params,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTrees(response.data.results);
      console.log("tree data: ", trees);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    setSearchQuery("");
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
            justifyContent={"flex-end"}
            alignContent={"center"}
          >
            <Grid item xs={3} m={1}>
              <CustomInput
                size="small"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyPress}
              />
            </Grid>
            <Grid item xs={3} m={1}>
              <CustomInput
                size="small"
                type="number"
                value={idSearchQuery}
                onChange={(e) => setIdSearchQuery(e.target.value)}
                onKeyDown={handleIdSearchKeyPress}
                placeholder="Search by ID"
              />
            </Grid>
            <Grid item xs={1} m={1}>
              <CustomInput
                size="small"
                type="number"
                value={pageSize}
                onChange={handlePageSizeChange}
                placeholder="Page Size"
              />
            </Grid>
            <Grid
              item
              container
              xs={2}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <Button onClick={handleReset} variant="contained" color="primary">
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Row>
        <Grid container justifyContent={"flex-start"} alignContent={"center"}>
          {trees && trees.length > 0 ? (
            <>
              {trees.map((tree) => (
                <Grid
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
      </Row>
    </PageContentContainer>
  );
};

export default TreeList;
