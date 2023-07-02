import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";

const PlankList = () => {
  const [planks, setPlanks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFetching, setIsFetching] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    fetchData();
    observeScroll();
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

      if (orderBy) {
        params.ordering = orderBy;
      }

      const response = await axios.get(
        "http://127.0.0.1:8000/api/plank/",
        {
          params,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setPlanks(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value);
    setPageSize(size);
    setCurrentPage(1);
  };

  const observeScroll = () => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching) {
        loadMoreData();
      }
    }, options);

    observer.observe(document.getElementById("scrollObserver"));
  };

  const loadMoreData = () => {
    setIsFetching(true);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrderBy(`-${field}`);
    } else {
      setOrderBy(field);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!isFetching) return;

    fetchData().then(() => {
      setIsFetching(false);
    });
  }, [isFetching]);

  const toggleAccordion = (index) => {
    const expandedIndex = expandedItems.indexOf(index);
    let newExpandedItems = [];

    if (expandedIndex === -1) {
      // Expand the accordion item
      newExpandedItems = [...expandedItems, index];
    } else {
      // Collapse the accordion item
      newExpandedItems = expandedItems.filter((item) => item !== index);
    }

    setExpandedItems(newExpandedItems);
  };

  return (
    <div className="page">
      <Row className="pb-4">
        <Col xs={12}>
          <Form>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Form.Control
              type="number"
              value={pageSize}
              onChange={handlePageSizeChange}
              placeholder="Page Size"
            />
          </Form>
          <h2>Planks List</h2>
        </Col>
      </Row>
      <Row>
        <div className="cardContainer">
          {planks && planks.length > 0 ? (
            planks.map((plank, index) => (
              <Card key={plank.id} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    <Link to={`/plank/${plank.id}`}>{plank.id}</Link>
                  </Card.Title>
                  <Card.Text>Date: {plank.date}</Card.Text>
                  <Card.Text>Width: {plank.width}</Card.Text>
                  <Card.Text>Depth: {plank.depth}</Card.Text>
                  <Card.Text>Grade: {plank.wood_grade}</Card.Text>
                  <Card.Text>Info: {plank.info}</Card.Text>
                  <Accordion>
                    <AccordionItem>
                      <AccordionItemHeading>
                        <AccordionItemButton onClick={() => toggleAccordion(index)}>
                          Extra Details
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel expanded={expandedItems.includes(index)}>
                        <Card.Text>Operator: {plank.operator}</Card.Text>
                        <Card.Text>
                          Live Edge: {plank.live_edge ? "Yes" : "No"}
                        </Card.Text>
                        <Card.Text>
                          Furniture: {plank.Furniture ? "Yes" : "No"}
                        </Card.Text>
                        <Card.Text>
                          Structural: {plank.Structual ? "Yes" : "No"}
                        </Card.Text>
                        <Card.Text>
                          General: {plank.General ? "Yes" : "No"}
                        </Card.Text>
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
        <div id="scrollObserver" style={{ height: "10px" }}></div>
      </Row>
    </div>
  );
};

export default PlankList;
