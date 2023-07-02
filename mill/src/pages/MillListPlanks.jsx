import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";


import "react-accessible-accordion/dist/fancy-example.css";
import "../styles/plankList.css";



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

      const response = await axios.get("http://127.0.0.1:8000/api/plank/", {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
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


  return (
    <div id="pagePage" className="page">
      <div className="sticky-top">
      <h2>Planks List</h2>
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
         
        </Col>
      </Row>
      </div>

      <Row id="scrollable">
        <div className="cardContainer">
          {planks && planks.length > 0 ? (
            planks.map((plank, index) => (
              <Card key={plank.id} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col xs={8}><Link to={`/plank/${plank.id}`}>ID: {plank.id}</Link></Col>
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
                          Info</AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="itemPanel">
                <Row>
                  <Col xs={6}> Date:</Col>
                  <Col xs={6}> {plank.date}</Col>
                </Row>
                <Row>
                  <Col xs={6}> Operator:</Col>
                  <Col xs={6}>     {plank.operator}</Col>
                </Row>
                <Row>
                  <Col xs={6}> Images:</Col>
                  <Col xs={6}>    Yes</Col>
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
                         <Col xs={6}>Live Edge: {plank.live_edge ? "Yes" : "No"}</Col>
                         <Col xs={6}>Furniture: {plank.Furniture ? "Yes" : "No"}</Col>
                         </Row>
                     <Row>
                         <Col xs={6}>Structural: {plank.Structual ? "Yes" : "No"}</Col>
                         <Col xs={6}>General: {plank.General ? "Yes" : "No"}</Col>
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
        <div id="scrollObserver" style={{ height: "10px" }}></div>
      </Row>
    </div>
  );
};

export default PlankList;
