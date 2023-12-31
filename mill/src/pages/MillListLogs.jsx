import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchData();
    observeScroll();
  }, [currentPage, orderBy]);

  const fetchData = async () => {
    try {
      const params = {
        page: currentPage,
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (orderBy) {
        params.ordering = orderBy;
      }

      const response = await axios.get(
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/",
        {
          params,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLogs(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      <Row className="pb-4">
        <Col xs={12}>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Col>
      </Row>
   </div>
      <Row>
        <div className="tableContainer">
          <InfiniteScroll
            dataLength={logs.length}
            next={loadMoreData}
            hasMore={!!currentPage}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more logs to load.</p>}
            className="scrollable"
          >
            {logs && logs.length > 0 ? (
              <Table striped bordered hover>
                <thead className="tableHeader">
                  <tr>
                    <th onClick={() => handleSort("id")}>
                      Ref
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
          </InfiniteScroll>
        </div>
        <div id="scrollObserver" style={{ height: "10px" }}></div>
      </Row>
    </div>
  );
};

export default LogList;
