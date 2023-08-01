import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { Offcanvas } from "react-bootstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import "../styles/plankList.css";

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchMoreData } from "../paginationUtils";
import FilterSection from "../components/FilterSection";

const PlankList = () => {
  const [plankData, setPlankData] = useState({
    results: [],
    count: 0,
    next: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState(0);
  const [resultCount, setResultCount] = useState("id");
  const [showFilters, setShowFilters] = useState(false);
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

  useEffect(() => {
    fetchData();
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


  /* NOT NEEDED IN NEW CODE */
  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  /* NOT NEEDED IN NEW CODE */
  const handleClearFilters = () => {
    setSearchQuery("");
    setOrderBy("id");
    setGradeFilter("");
    setMinWidthFilter("");
    setMaxWidthFilter("");
    setMinDepthFilter("");
    setMaxDepthFilter("");
    setGeneralFilter("");
    setLive_edgeFilter("");
    setFurnitureFilter("");
    setStructuralFilter("");
    setLogIdFilter("");
    setSpeciesFilter("");
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOrderByChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleGradeFilterChange = (e) => {
    setGradeFilter(e.target.value);
  };

  const handleMinWidthFilterChange = (e) => {
    setMinWidthFilter(e.target.value);
  };

  const handleMaxWidthFilterChange = (e) => {
    setMaxWidthFilter(e.target.value);
  };

  const handleMinDepthFilterChange = (e) => {
    setMinDepthFilter(e.target.value);
  };

  const handleMaxDepthFilterChange = (e) => {
    setMaxDepthFilter(e.target.value);
  };

  const handleLogIdFilterChange = (e) => {
    setLogIdFilter(e.target.value);
  };

  const handleSpeciesFilterChange = (e) => {
    setSpeciesFilter(e.target.value);
  };

  // const handleGeneralFilterChange = (e) => {
  //   const value = e.target.value === 'true' ? 'True' : 'False'; // Convert string value to Python boolean
  //   setGeneralFilter(value);
  //   console.log('GeneralFilter', generalFilter);
  //   console.log('value', value);
  // };

  const handleGeneralFilterChange = () => {
    setGeneralFilter(!generalFilter);
  };

  const handleLiveEdgeFilterChange = () => {
    setLive_edgeFilter(!live_edgeFilter);
  };

  const handleSturcturalFilterChange = () => {
    setStructuralFilter(!structuralFilter);
  };

  const handleFurnitureFilterChange = () => {
    setFurnitureFilter(!furnitureFilter);
  };

  const handleSearchSubmit = () => {
    fetchData();
    setShowFilters(!showFilters);
  };

  const navigate = useNavigate();

  return (
    <div id="pagePage" className="page">
      <div className="sticky-top">
        <h2>Planks List</h2>
        <div className="bottomComponentContainer">
          <div className="search-container">
          <div>
            <Form>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
          </div>
          <div>
            <Form.Control
              as="select"
              value={orderBy}
              onChange={handleOrderByChange}
            >
              <option value="id">ID (Lowest)</option>
              <option value="-id">ID (Highest)</option>
              <option value="date">Date (Oldest)</option>
              <option value="-date">Date (Newest)</option>
            </Form.Control>
          </div>
          <div>
            <Button variant="link" onClick={handleFilterClick}>
              <FontAwesomeIcon icon={faFilter} regular />
            </Button>
          </div>
          </div>
        </div>

        {showFilters && (
          <Row>
            <Col>
              <FilterSection
                gradeFilter={gradeFilter}
                minWidthFilter={minWidthFilter}
                maxWidthFilter={maxWidthFilter}
                minDepthFilter={minDepthFilter}
                maxDepthFilter={maxDepthFilter}
                logIdFilter={logIdFilter}
                speciesFilter={speciesFilter}
                handleGradeFilterChange={handleGradeFilterChange}
                handleMinWidthFilterChange={handleMinWidthFilterChange}
                handleMaxWidthFilterChange={handleMaxWidthFilterChange}
                handleMinDepthFilterChange={handleMinDepthFilterChange}
                handleMaxDepthFilterChange={handleMaxDepthFilterChange}
                handleLogIdFilterChange={handleLogIdFilterChange}
                handleSpeciesFilterChange={handleSpeciesFilterChange}
                handleClearFilters={handleClearFilters}
                handleSearchSubmit={handleSearchSubmit}
                handleGeneralFilterChange={handleGeneralFilterChange}
                generalFilter={generalFilter}
                handleLiveEdgeFilterChange={handleLiveEdgeFilterChange}
                live_edgeFilter={live_edgeFilter}
                handleFurnitureFilterChange={handleFurnitureFilterChange}
                furnitureFilter={furnitureFilter}
                handleSturcturalFilterChange={handleSturcturalFilterChange}
                structuralFilter={structuralFilter}
              />
            </Col>
          </Row>
        )}
        <Row>
          <p>Result Count: {resultCount}</p>
        </Row>
      </div>

      <InfiniteScroll
        dataLength={plankData.results.length}
        next={fetchMorePlanks}
        hasMore={!!plankData.next}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more planks to load.</p>}
        className="scrollable"
      >
        <Row>
          <Col xs={12}>
            <div className="cardContainer">
              {plankData &&
              plankData.results &&
              plankData.results.length > 0 ? (
                plankData.results.map((plank, index) => {
                  // Calculate the whole length using Math.floor() or Math.round() as needed
                  const wholeLength = Math.floor(plank.log.length); // or use Math.round() if you want rounding
                  const wholeDepth = Math.floor(plank.depth); // or use Math.round() if you want rounding
                  const wholeWidth = Math.floor(plank.width); // or use Math.round() if you want rounding
                  const handleCardClick = () => {
                    navigate(`/plank/${plank.id}`);
                  };
                  return (
                    <Card
                      key={plank.id}
                      className="mb-3 custom-card"
                      onClick={handleCardClick}
                    >
                      <Card.Body className="custom-card-body">
                        <Card.Title className="custom-card-title">
                          <Row className="vertical-align-center">
                            <Col sx={4}>ID: {plank.id}</Col>
                            <Col sx={4}>{plank.log.tree.species}</Col>
                            <Col sx={4}>Grade: {plank.wood_grade}</Col>
                          </Row>
                        </Card.Title>
                        <Row className="pb-1 ">
                        <Col sx={4}>
                        
                        </Col>
                          <Col sx={4} className="dimensions-container">
                            {wholeWidth} x {wholeDepth} x {wholeLength}
                          </Col>
                          <Col sx={4} className="category-container">
                            {plank.live_edge ? (
                              <span className="category-tab">LE</span>
                            ) : null}

                            {plank.furniture ? (
                              <span className="category-tab">F</span>
                            ) : null}

                            {plank.structural ? (
                              <span className="category-tab">S</span>
                            ) : null}

                            {plank.general ? (
                              <span className="category-tab">G</span>
                            ) : null}
                          </Col>
                        
                        </Row>
                      </Card.Body>
                    </Card>
                  );
                })
              ) : (
                <p>No planks found.</p>
              )}
            </div>
          </Col>
        </Row>
      </InfiniteScroll>
    </div>
  );
};

export default PlankList;
