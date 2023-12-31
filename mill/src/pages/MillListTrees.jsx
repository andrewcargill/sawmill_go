import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import css from "../styles/TreeList.module.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const TreeList = () => {
  const [trees, setTrees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/",
        {
          params,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTrees(response.data.results);
      console.log(trees);
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
              onKeyDown={handleSearchKeyPress}
            />

            <input
              type="number"
              value={idSearchQuery}
              onChange={(e) => setIdSearchQuery(e.target.value)}
              onKeyDown={handleIdSearchKeyPress}
              placeholder="Search by ID"
            />
            <input
              type="number"
              value={pageSize}
              onChange={handlePageSizeChange}
              placeholder="Page Size"
            />

            <button onClick={handleReset}>Reset</button>
          </div>
        </Col>
      </Row>
      <Row>
        <div className={css.tableContainer}>
          {trees && trees.length > 0 ? (
            <Table striped bordered hover>
              <thead className={css.tableHeader}>
                <tr>
                  <th onClick={() => handleSort("id")}>Ref</th>
                  <th onClick={() => handleSort("date")}>Date</th>
                  <th onClick={() => handleSort("species")}>Species</th>
                  <th onClick={() => handleSort("age")}>Age</th>
                  <th onClick={() => handleSort("lumberjack")}>Lumberjack</th>
                  <th>Reason for Felling</th>
                </tr>
              </thead>
              <tbody>
                {trees.map((tree) => (
                  <tr key={tree.id}>
                    <td>
                      <Link to={`/tree/${tree.id}`}>{tree.id}</Link>
                    </td>
                    <td>{tree.date}</td>
                    <td>{tree.species}</td>
                    <td>{tree.age}</td>
                    <td>{tree.lumberjack}</td>
                    <td>{tree.reason_for_felling}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No trees found.</p>
          )}
        </div>
      </Row>
    </div>
  );
};

export default TreeList;
