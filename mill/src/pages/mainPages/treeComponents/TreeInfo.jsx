import React, { useState } from "react";
import { Grid, Table } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Edit from "@mui/icons-material/Edit";

const TreeInfo = ({ tree }) => {

    const [editTree, setEditTree] = useState(false);

    const handleEditTree = () => {
        setEditTree(true);
    }

    const handleSaveCancelTree = () => {
        setEditTree(false);
    }


    return (
        <Grid
        className="gridContainer"
        container
        alignContent={"center"}
        justifyContent={"space-between"}
        spacing={2}
        p={1}
      >

        {!editTree ? (
            <>
        <Grid item xs={9} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'wrap'}}>
          <Table>
            <tr>
              <td>Tree ID</td>
              <td>{tree.id}</td>
            </tr>
            <tr>
              <td>Tree Type</td>
              <td>{tree.type}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{tree.date}</td>
            </tr>
            <tr>
              <td>Lumberjack</td>
              <td>{tree.lumberjack}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{tree.age}</td>
            </tr>
            <tr>
              <td>Reason for cut</td>
              <td>{tree.reason_for_cut}</td>
            </tr>
            <tr>
              <td>Logged</td>
              <td>{tree.logged ? "Yes" : "No"}</td>
            </tr>
          </Table>
        </Grid>
        <Grid item xs={3} m={0} bgcolor={'red'}>
            <Button variant="contained" color="warning" onClick={handleEditTree}>
                <Edit />
            </Button>
        </Grid>
       
        </>
        ) : (
            <>
            <Grid item xs={9} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexWrap: 'wrap'}}>
              
              <Table>
                <tr>
                  <td>Tree ID</td>
                  <td>{tree.id}</td>
                </tr>
                <tr>
                  <td>Tree Type</td>
                  <td>{tree.type}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{tree.date}</td>
                </tr>
                <tr>
                  <td>Lumberjack</td>
                  <td>{tree.lumberjack}</td>
                </tr>
                <tr>
                  <td>Age</td>
                  <td>{tree.age}</td>
                </tr>
                <tr>
                  <td>Reason for cut</td>
                  <td>{tree.reason_for_cut}</td>
                </tr>
                <tr>
                  <td>Logged</td>
                  <td>{tree.logged ? "Yes" : "No"}</td>
                </tr>
              </Table>
            </Grid>
         
            <Box style={{ position: "absolute", bottom: 0, width: "100%" }}>
              <Grid item container xs={12}>
                <Grid item xs={6} p={4}>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ width: "90%" }}
                    onClick={handleSaveCancelTree}
                  >
                   SAVE
                  </Button>
                </Grid>
                <Grid item xs={6} p={4}>
                  <Button
                    variant="contained"
                    color="warning"
                    style={{ width: "90%" }}
                    onClick={handleSaveCancelTree}
                  >
                    cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
            </>
      
     
            )}

      </Grid>
    );
    };

export default TreeInfo;