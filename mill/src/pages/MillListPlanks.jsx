import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
  const [orderBy, setOrderBy] = useState("id");
  const [showFilters, setShowFilters] = useState(false);
  const [gradeFilter, setGradeFilter] = useState("");
  const [minWidthFilter, setMinWidthFilter] = useState("");
  const [maxWidthFilter, setMaxWidthFilter] = useState("");
  const [maxDepthFilter, setMaxDepthFilter] = useState("");
  const [minDepthFilter, setMinDepthFilter] = useState("");

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
      };

      const response = await axios.get("https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/", {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setPlankData({
        results: response.data.results,
        count: response.data.count,
        next: response.data.next,
      });
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

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setOrderBy("id");
    setGradeFilter("");
    setMinWidthFilter("");
    setMaxWidthFilter("");
    setMinDepthFilter("");
    setMaxDepthFilter("");
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

  const handleSearchSubmit = () => {
    fetchData();
  };

  return (
    <div id="pagePage" className="page">
      <div className="sticky-top">
        <h2>Planks List</h2>
        <Row className="pb-4">
          <Col xs={4}>
            <Form>
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
          </Col>
          <Col xs={4}>
            <Form.Control
              as="select"
              value={orderBy}
              onChange={handleOrderByChange}
            >
              <option value="id">ID (Highest)</option>
              <option value="-id">ID (Lowest)</option>
              <option value="date">Date (Oldest)</option>
              <option value="-date">Date (Newest)</option>
            </Form.Control>
          </Col>
          <Col xs={4}>
            <Button variant="link" onClick={handleFilterClick}>
              <FontAwesomeIcon icon={faFilter} regular />
            </Button>
          </Col>
        </Row>
        {showFilters && (
          <Row>
            <Col>
              <FilterSection 
                gradeFilter={gradeFilter}
                minWidthFilter={minWidthFilter}
                maxWidthFilter={maxWidthFilter}
                minDepthFilter={minDepthFilter}
                maxDepthFilter={maxDepthFilter}
                handleGradeFilterChange={handleGradeFilterChange}
                handleMinWidthFilterChange={handleMinWidthFilterChange}
                handleMaxWidthFilterChange={handleMaxWidthFilterChange}
                handleMinDepthFilterChange={handleMinDepthFilterChange}
                handleMaxDepthFilterChange={handleMaxDepthFilterChange}
                handleClearFilters={handleClearFilters}
                handleSearchSubmit={handleSearchSubmit}
              />
            </Col>
          </Row>
        )}
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
                plankData.results.map((plank, index) => (
                  <Card key={plank.id} className="mb-3">
                    <Card.Body>
                      <Card.Title>
                        <Row>
                          <Col xs={8}>
                            <Link to={`/plank/${plank.id}`}>
                              ID: {plank.id}
                            </Link>
                          </Col>
                          <Col xs={4}>G{plank.wood_grade}</Col>
                        </Row>
                      </Card.Title>
                      <Row className="pb-1">
                        <Col sx={4}>W: {plank.width}</Col>
                        <Col sx={4}>D: {plank.depth}</Col>
                        <Col sx={4}>L: {plank.depth}</Col>
                      </Row>

                      <Accordion>
                        <AccordionItem>
                          <AccordionItemHeading className="itemHeading">
                            <AccordionItemButton className="itemButton">
                              Info
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="itemPanel">
                            <Row>
                              <Col xs={6}> Date:</Col>
                              <Col xs={6}> {plank.date}</Col>
                            </Row>
                            <Row>
                              <Col xs={6}> Operator:</Col>
                              <Col xs={6}> {plank.operator}</Col>
                            </Row>
                            <Row>
                              <Col xs={6}> Images:</Col>
                              <Col xs={6}> Yes</Col>
                            </Row>
                            <Row>
                              <Col xs={6}>Milling Notes:</Col>
                            </Row>
                            <Row>
                              <Col xs={2}></Col>
                              <Col xs={10}> {plank.info}</Col>
                            </Row>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading className="itemHeading">
                            <AccordionItemButton className="itemButton">
                              Categories
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="itemPanel">
                            <Row>
                              <Col xs={6}>
                                Live Edge: {plank.live_edge ? "Yes" : "No"}
                              </Col>
                              <Col xs={6}>
                                Furniture: {plank.Furniture ? "Yes" : "No"}
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={6}>
                                Structural: {plank.Structual ? "Yes" : "No"}
                              </Col>
                              <Col xs={6}>
                                General: {plank.General ? "Yes" : "No"}
                              </Col>
                            </Row>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                    </Card.Body>
                  </Card>
                ))
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
