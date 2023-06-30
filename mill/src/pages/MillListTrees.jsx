import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import css from "../styles/TreeList.module.css";

const TreeList = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
  
        const response = await axios.get(
          "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setTrees(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className={css.tableContainer}>
      <h2>Tree List</h2>
      {trees && trees.length > 0 ? (
        <Table striped bordered hover>
          <thead className={css.tableHeader}>
            <tr>
              <th>Date</th>
              <th>Species</th>
              <th>Reason for Felling</th>
              <th>Age</th>
              <th>Lumberjack</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {trees.map((tree) => (
              <tr key={tree.id}>
                <td>
                  <Link to={`/tree/${tree.id}`}>{tree.date}</Link>
                </td>
                <td>{tree.species}</td>
                <td>{tree.reason_for_felling}</td>
                <td>{tree.age}</td>
                <td>{tree.lumberjack}</td>
                <td>{tree.latitude}</td>
                <td>{tree.longitude}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No trees found.</p>
      )}
    </div>
  );
};

export default TreeList;
