import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import LoadingSpinner from '../../../../components/ApiDataComponents/LoadingSpinner';
import PlankSiblingsContent from '../PlankSiblingsContent';

// p = 82 l = 59
// p = 88 l = 61


const LogChildren = ({ logId, length, currentPlank }) => {
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
    <>
      {planks.length > 0 ? (
        <>
         
          <Grid container sm={12} alignItems={'flex-start'} justifyContent={'flex-start'} >
          {planks.map((plank) => {
            

            return (
             
                <Grid item p={1} >
                <PlankSiblingsContent data={plank} length={length} />
                </Grid>
       
       
            );
          })}
         
                 </Grid>
                 
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default LogChildren;

