import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

// p = 82 l = 59
// p = 88 l = 61


const PlankSiblings = ({ logId, currentPlank }) => {
  const [planks, setPlanks] = useState([]);
  // const logId = 61;
  // const currentPlank = 87;

  const fetchPlanksByLog = async () => {
    console.log('logID', logId);
    if (!logId) return 'no id'; // Guard clause to ensure logId is present

    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/planks/by_log/?log_id=${logId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setPlanks(response.data || []); 
      console.log('data: ', response.data)// Ensure to default to an empty array
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchPlanksByLog();
  }, [logId]); // Depend on logId to refetch when it changes

  return (
    <div>
      {planks.length > 0 ? (
        <div>
         
          <Grid container sm={12} alignItems={'center'} justifyContent={'center'} padding={'5% 5%'}>
          {planks.map((plank, index) => {
            const currentIndex = planks.findIndex(p => p.id === currentPlank);
            const isBookMatched = index === currentIndex - 1 || index === currentIndex + 1;

            return (
             
              <Grid item container
                sm={12}
                key={plank.id}
                p={0.5}
                m={0.2}
                justifyContent={'center'}
                borderRadius={'5px'}
                style={{
                  border: '1px solid black',
                  color: plank.id === currentPlank ? 'green' : isBookMatched ? 'blue' : 'inherit',
                  fontSize: '1rem',
                }}
              >
                <Grid item sm={2}>
                <Typography variant="h6" pl={2}>{plank.id}</Typography>
                </Grid>
                <Grid item sm={10}>
                <Typography>W={plank.width} | D={plank.depth} | Grade={plank.wood_grade}</Typography>
                </Grid>
               

             
              </Grid>
       
            );
          })}
          <Typography color={'blue'}>*Book-Matched</Typography>
                 </Grid>
                 
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlankSiblings;

