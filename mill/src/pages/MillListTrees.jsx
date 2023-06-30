import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import css from "../styles/TreeList.module.css";

const TreeList = () => {
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/"
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
 
            </tr>
          </thead>
          <tbody>
            {trees.map((tree) => (
              <tr key={tree.id}>
                <td>{tree.date}</td>
                <td>{tree.species}</td>
                <td>{tree.reason_for_felling}</td>
                <td>{tree.age}</td>
                <td>{tree.lumberjack}</td>
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
