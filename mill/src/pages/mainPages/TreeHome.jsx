import React, { useState } from "react";
import PageContentContainer from "../../components/CustomBoxes/PageContentContainer";
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, Menu, MenuItem, Select, Typography } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import ClearAll from "@mui/icons-material/Clear";
import TreeDialogContainer from "./treeComponents/TreeDialogContainer";


const treeData = [
  {
    id: 1,
    type: "Pine",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "Disease",
    logged: true,
  },
  {
    id: 2,
    type: "birch",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "More light into forest",
    logged: false,
  },
  {
    id: 3,
    type: "pine",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "Disease",
    logged: true,
  },
  {
    id: 4,
    type: "Spruce",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "More light into forest",
    logged: false,
  },
  {
    id: 5,
    type: "Pine",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "Disease",
    logged: false,
  },
  {
    id: 6,
    type: "spruce",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "More light into forest",
    logged: true,
  },
  {
    id: 7,
    type: "Pine",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "Disease",
    logged: true,
  },
  {
    id: 8,
    type: "birch",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "More light into forest",
    logged: false,
  },
  {
    id: 9,
    type: "Pine",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "Disease",
    logged: true,
  },
  {
    id: 10,
    type: "spruce",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "More light into forest",
    logged: false,
  },
  {
    id: 11,
    type: "Pine",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "Disease",
    logged: false,
    },
  {
    id: 12,
    type: "Birch",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "Disease",
    logged: false,
    },
  {
    id: 13,
    type: "Birch",
    date: "2022-01-01",
    lumberjack: "John Doe",
    age: "80-100",
    reason_for_cut: "Disease",
    logged: false,
    },
];
  

const TreeHome = () => {
    const [currentTreeData, setCurrentTreeData] = useState(treeData);
    const [anchorElUnlogged, setAnchorElUnlogged] = useState(null);
    const [anchorElLogged, setAnchorElLogged] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTree, setSelectedTree] = useState(null);

    const unloggedMenuOpen = Boolean(anchorElUnlogged);
    const loggedMenuOpen = Boolean(anchorElLogged);


    // Filter trees by logged status and type
    const handleUnloggedMenuClick = (event) => {
        setAnchorElUnlogged(event.currentTarget);
    };

    const handleLoggedMenuClick = (event) => {
        setAnchorElLogged(event.currentTarget);
    };

    const handleUnloggedClose = () => {
        setAnchorElUnlogged(null);
    };

    const handleLoggedClose = () => {
        setAnchorElLogged(null);
    };

    const handleUnloggedSelect = (filterValue) => {
        if (filterValue === 'all') {
            setCurrentTreeData(treeData.filter(tree => !tree.logged));
        } else {
            setCurrentTreeData(treeData.filter(tree => tree.type.toLowerCase() === filterValue && !tree.logged));
        }
        handleUnloggedClose();
    };

    const handleLoggedSelect = (filterValue) => {
        if (filterValue === 'all') {
            setCurrentTreeData(treeData.filter(tree => tree.logged));
        } else {
            setCurrentTreeData(treeData.filter(tree => tree.type.toLowerCase() === filterValue && tree.logged));
        }
        handleUnloggedClose();
    };

    const resetData = () => {
        setCurrentTreeData(treeData);
    }

    // Dialog handlers
    const openTreeDialog = (tree) => {
        setSelectedTree(tree);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };


  return (
    <PageContentContainer style={{ marginTop: "20px" }}>
      <Box>
        <Grid container spacing={2}>
          <Grid item container xs={12} bgcolor={"primary.main"}>
            <Grid item xs={3}>
              <Typography variant="h4" style={{ color: "white" }}>
                Trees
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button
                id="unlogged-button"
                variant="contained"
                color="success"
                aria-controls={unloggedMenuOpen ? 'unlogged-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={unloggedMenuOpen ? 'true' : undefined}
                disableElevation
                onClick={handleUnloggedMenuClick}
                endIcon={<KeyboardArrowDown />}
              >
                Unlogged
              </Button>
              <Menu
                id="unlogged-menu"
                MenuListProps={{
                  'aria-labelledby': 'unlogged-button',
                }}
                anchorEl={anchorElUnlogged}
                open={unloggedMenuOpen}
                onClose={handleUnloggedClose}
              >
                <MenuItem onClick={() => handleUnloggedSelect('all')} disableRipple>
                  All
                </MenuItem>
                <MenuItem onClick={() => handleUnloggedSelect('spruce')} disableRipple>
                  Spruce
                </MenuItem>
                <MenuItem onClick={() => handleUnloggedSelect('pine')} disableRipple>
                  Pine
                </MenuItem>
                <MenuItem onClick={() => handleUnloggedSelect('birch')} disableRipple>
                  Birch
                </MenuItem>
              </Menu>
            </Grid>

            <Grid item xs={3}>
              <Button
                id="unlogged-button"
                variant="contained"
                color="warning"
                aria-controls={loggedMenuOpen ? 'unlogged-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={loggedMenuOpen ? 'true' : undefined}
                disableElevation
                onClick={handleLoggedMenuClick}
                endIcon={<KeyboardArrowDown />}
              >
                Logged
              </Button>
              <Menu
                id="unlogged-menu"
                MenuListProps={{
                  'aria-labelledby': 'unlogged-button',
                }}
                anchorEl={anchorElLogged}
                open={loggedMenuOpen}
                onClose={handleLoggedClose}
              >
                <MenuItem onClick={() => handleLoggedSelect('all')} disableRipple>
                  All
                </MenuItem>
                <MenuItem onClick={() => handleLoggedSelect('spruce')} disableRipple>
                  Spruce
                </MenuItem>
                <MenuItem onClick={() => handleLoggedSelect('pine')} disableRipple>
                  Pine
                </MenuItem>
                <MenuItem onClick={() => handleLoggedSelect('birch')} disableRipple>
                  Birch
                </MenuItem>
              </Menu>
            </Grid>
           
            <Grid item xs={2}>
              <Button variant="contained" color="info" onClick={resetData} endIcon={<ClearAll />}>
                Reset
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent={"flex-start"} alignContent={"center"}>
              {currentTreeData.map((tree) => (
                <Grid
                  item
                  container
                  xs={5}
                  sm={2}
                  lg={2}
                  key={tree.id}
                  m={1}
                  style={{
                    border: `2px solid ${tree.logged ? "orange" : "green"}`,
                    borderRadius: "5px",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => openTreeDialog(tree)}
                >
                  <Grid item>
                    <h3>{tree.id}</h3>
                  </Grid>
                  <Grid item>
                    <p>{tree.type}</p>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/* Dialog for displaying selected tree details */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth={true} maxWidth='md' style={{ }}>
            
            <DialogContent>
              {selectedTree && (
                <DialogContentText>
                    <TreeDialogContainer tree={selectedTree} />
                 
                </DialogContentText>
              )}
            </DialogContent>
          </Dialog>
      </Box>
    </PageContentContainer>
  );
};

export default TreeHome;