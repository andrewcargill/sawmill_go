import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const PlankList = () => {
  const [planks, setPlanks] = useState([]);
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
          <div>
            <h2>Planks List</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <div className="tableContainer">
          {planks && planks.length > 0 ? (
            <Table striped bordered hover>
              <thead className="tableHeader">
                <tr>
                  <th onClick={() => handleSort("id")}>
                    Ref
                  </th>
                  <th onClick={() => handleSort("date")}>Date</th>
                  <th onClick={() => handleSort("width")}>Width</th>
                  <th onClick={() => handleSort("depth")}>Depth</th>

                  <th onClick={() => handleSort("depth")}>Grade</th>
                  <th onClick={() => handleSort("depth")}>Info</th>
                  <th onClick={() => handleSort("depth")}>Operator</th>

                  <th onClick={() => handleSort("live_edge")}>Live Edge</th>
                  <th onClick={() => handleSort("live_edge")}>Furniture</th>
                  <th onClick={() => handleSort("live_edge")}>Structural</th>
                  <th onClick={() => handleSort("live_edge")}>General</th>
                </tr>
              </thead>
              <tbody>
                {planks.map((plank) => (
                  <tr key={plank.id}>
                    <td>
                      <Link to={`/plank/${plank.id}`}>{plank.id}</Link>
                    </td>
                    <td>{plank.date}</td>
                    <td>{plank.width}</td>
                    <td>{plank.depth}</td>

                    <td>{plank.wood_grade}</td>
                    <td>{plank.info}</td>
                    <td>{plank.operator}</td>

                    <td>{plank.live_edge ? "Yes" : "No"}</td>
                    <td>{plank.Furniture ? "Yes" : "No"}</td>
                    <td>{plank.Structual ? "Yes" : "No"}</td>
                    <td>{plank.General ? "Yes" : "No"}</td>
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

export default PlankList;
