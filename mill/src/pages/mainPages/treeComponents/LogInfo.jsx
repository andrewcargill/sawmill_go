import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Edit from "@mui/icons-material/Edit";

const logData = [
  {
    id: 1,
    length: 10,
    diameter: 20,
    miller: true,
    buch: true,
  },
  {
    id: 2,
    length: 10,
    diameter: 20,
    miller: false,
    buck: false,
  },
  {
    id: 3,
    length: 20,
    diameter: 34,
    miller: false,
    buck: false,
  },
];

const LogInfo = ({ tree }) => {

    const [openAddLog, setOpenAddLog] = useState(false);

    const handleAddLog = () => {
        setOpenAddLog(true);
    }

  return (
  
    <Grid
      className="gridContainer"
      container
      alignContent={"center"}
      justifyContent={"space-between"}
      spacing={2}
    >
          {!openAddLog ? (
    <>
      <Grid item container xs={12}>
        {logData.map((log) => (
          <Grid item container xs={12} p={2} justifyContent={"space-between"}>
            <Grid
              item
              xs={3}
              p={1}
              border={"2px black solid"}
              style={{ cursor: "pointer" }}
            >
              Log ID: {log.id}
            </Grid>
            <Grid item container xs={8} p={1}>
              <Grid item xs={4}>
                Length: {log.length}cm
              </Grid>
              <Grid item xs={4}>
                Diameter: {log.diameter}cm
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Box style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Grid item container xs={12}>
          <Grid item xs={6} p={4}>
            <Button
              variant="contained"
              color="warning"
              style={{ width: "90%" }}
            >
              VIEW ALL
            </Button>
          </Grid>
          <Grid item xs={6} p={4}>
            <Button
              variant="contained"
              color="warning"
              style={{ width: "90%" }}
              onClick={handleAddLog}
            >
              ADD LOG
            </Button>
          </Grid>
        </Grid>
      </Box>
      </>
    ) : (
        <>
        <p>ADD LOG FORM</p>
        </>
       
    )}
    </Grid>
    
  );
};

export default LogInfo;
