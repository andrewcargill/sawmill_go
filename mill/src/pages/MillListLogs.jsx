import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFetching, setIsFetching] = useState(false);

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

      const response = await axios.get("https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/", {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setLogs(response.data.results);
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
      // Toggle the sort order if the same field is clicked
      setOrderBy(`-${field}`);
    } else {
      // Set the new sort field and default sort order to ascending
      setOrderBy(field);
    }
    setCurrentPage(1); // Reset to first page when changing the sort field
  };

  useEffect(() => {
    if (!isFetching) return;

    fetchData().then(() => {
      setIsFetching(false);
    });
  }, [isFetching]);

  return (
    <div className="page">
      <Row className="pb-4">
        <Col xs={12}>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="number"
              value={pageSize}
              onChange={handlePageSizeChange}
              placeholder="Page Size"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <div className="tableContainer">
          {logs && logs.length > 0 ? (
            <Table striped bordered hover>
              <thead className="tableHeader">
                <tr>
                <th onClick={() => handleSort("id")}>
                <td>
                      Ref
                    </td>
                </th>
                <th onClick={() => handleSort("date")}>Date</th>
                <th onClick={() => handleSort("length")}>Length</th>
                <th onClick={() => handleSort("width")}>Width</th>
                <th onClick={() => handleSort("buck")}>Buck</th>
                
          
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>
                     
                    <Link to={`/log/${log.id}`}>{log.id}</Link>
                    </td>
                    <td>{log.date}</td>
                    <td>{log.length}</td>
                    <td>{log.diameter}</td>
                    <td>{log.buck ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No logs found.</p>
          )}
        </div>
        <div id="scrollObserver" style={{ height: "10px" }}></div>
      </Row>
    </div>
  );
};

export default LogList;
