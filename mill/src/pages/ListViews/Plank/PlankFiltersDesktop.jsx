import React, { useState, useEffect } from 'react';
import { SwipeableDrawer, List, ListItem, ListItemText, Grid, Button, TextField, Typography, IconButton, Paper, FormGroup, FormControlLabel, Checkbox, Container } from '@mui/material';
import CustomDropdown from '../../../components/CustomForm/CustomDropDown';
import FilterListIcon from '@mui/icons-material/FilterList';



const PlankFiltersDesktop = ({ open, onClose, onSubmit, onResetFilters }) => {
  const [selectedSortValue, setSelectedSortValue] = useState(0);
  const [gradeValue, setGradeValue] = useState("");
  const [logIdValue, setLogIdValue] = useState("");
  const [speciesValue, setSpeciesValue] = useState("");
  const [minWidth, setMinWidth] = useState("");
  const [maxWidth, setMaxWidth] = useState("");
  const [minDepth, setMinDepth] = useState("");
  const [maxDepth, setMaxDepth] = useState("");
  const [generalValue, setGeneralValue] = useState("");
  const [FurnitureValue, setFurnitureValue] = useState("");
  const [liveEdgeValue, setLiveEdgeValue] = useState("");
  const [StructuralValue, setStructuralValue] = useState("");


  /* Resets Form when requested */
  const formRef = React.useRef(null);

  /* Sort Filter */
  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    console.log('Selected Value:', selectedValue);
    setSelectedSortValue(selectedValue);
  };

  /* Grade Filter */
  const handleGradeFilter = (event) => {
    const selectedGradeValue = event.target.value;
    console.log('Selected Grade:', selectedGradeValue);
    setGradeValue(selectedGradeValue);
  };

  /* Log ID Filter */
  const handleLogIdfilter = (event) => {
    const selectedLogIdValue = event.target.value;
    console.log('Selected Log:', selectedLogIdValue);
    setLogIdValue(selectedLogIdValue);
  };

  /* Log ID Filter */
  const handleSpeciesFilter = (event) => {
    const selectedSpeciesValue = event.target.value;
    console.log('Selected Species:', selectedSpeciesValue);
    setSpeciesValue(selectedSpeciesValue);
  };

  /* Width Filters */
  const handleMinWidth = (event) => {
    const selectedWidth = event.target.value;
    console.log('selected Min Width:', selectedWidth);
    setMinWidth(selectedWidth);
  }

  const handleMaxWidth = (event) => {
    const selectedWidth = event.target.value;
    console.log('selected Max Width:', selectedWidth);
    setMaxWidth(selectedWidth);
  }

  /* Depth Filters */
  const handleMinDepth = (event) => {
    const selectedDepth = event.target.value;
    console.log('selected Min Depth:', selectedDepth);
    setMinDepth(selectedDepth);
  }

  const handleMaxDepth = (event) => {
    const selectedDepth = event.target.value;
    console.log('selected Max Width:', selectedDepth);
    setMaxDepth(selectedDepth);
  }

  /* Category Filters */
  const handleGeneralValue= (event) => {
    const selectedValue = event.target.checked;
    console.log('selected Gen Value', selectedValue);
    setGeneralValue(selectedValue);
  }

  const handleFurntiureValue= (event) => {
    const selectedValue = event.target.checked;
    console.log('selected Furn Value', selectedValue);
    setFurnitureValue(selectedValue);
  }
  const handleLiveEdgeValue= (event) => {
    const selectedValue = event.target.checked;
    console.log('selected LE Value', selectedValue);
    setLiveEdgeValue(selectedValue);
  }
  const handleStructuralValue= (event) => {
    const selectedValue = event.target.checked;
    console.log('selected Structural Value', selectedValue);
    setStructuralValue(selectedValue);
  }

  /* Reset and Submit */
  const handleReset = () => {
    setSelectedSortValue("");
    setGradeValue(null);
    setLogIdValue(null);
    setSpeciesValue('');
    setMinWidth('');
    setMaxWidth('');
    setMinDepth('');
    setMaxDepth('');
    setGeneralValue(false);
    setFurnitureValue(false);
    setLiveEdgeValue(false);
    setStructuralValue(false);
    formRef.current.reset();

    //Reset filters on main component
    onResetFilters();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedSortValue, gradeValue, logIdValue, speciesValue, minWidth, maxWidth, minDepth, maxDepth, generalValue, FurnitureValue, liveEdgeValue, StructuralValue);
  
  };

  return (
   
      <div>
        <form ref={formRef}>
         
          <Grid className='contentContainer' item xs={12} sx={{ padding: '5px' }}>
            {/* Sort Filter */}
            {/* Title and Filter Icon */}
           
            <CustomDropdown
              label="Sort"
              value={selectedSortValue}
              onChange={handleSortChange}
              size="small"
              options={[
                { label: 'ID (Lowest)', value: "id" },
                { label: 'ID (Highest)', value: "-id" },
                { label: 'Date (Newest)', value: "-date" },
                { label: 'Date (Oldest)', value: "date" },
              ]}
            />
            {/* Grade */}
            <CustomDropdown
              label="Grade"
              onChange={handleGradeFilter}
              value={gradeValue}
              size="small"
              options={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ]}
            />

            {/* Species */}
            <CustomDropdown
              label="Species"
              onChange={handleSpeciesFilter}
              value={speciesValue}
              size="small"
              options={[
                { label: 'Pine', value: 'pine' },
                { label: 'Birch', value: 'birch' },
                { label: 'Spruce', value: 'spruce' },
              ]}
            />

            {/* Log ID */}
            <TextField
              label="Log ID"
              variant="outlined"
              onChange={handleLogIdfilter}
              value={logIdValue}
              fullWidth
              margin="normal"
              type="number"
              size="small"
              inputMode="numeric"
              sx={{ backgroundColor: 'transparent' }} // Set the background color to transparent
            />
            <Grid container xs={12}>
              {/*  Width */}
              <Grid item xs={6}>

                {/* Min Width */}
                <TextField
                  label="Min Width"
                  variant="outlined"
                  onChange={handleMinWidth}
                  fullWidth
                  margin="normal"
                  type="number"
                  size="small"
                  inputMode="numeric"
                  sx={{ backgroundColor: 'transparent' }} // Set the background color to transparent
                />
              </Grid>
              <Grid item xs={6}>

                {/* Max Width */}
                <TextField
                  label="Max Width"
                  variant="outlined"
                  onChange={handleMaxWidth}
                  inputMode="numeric"
                  fullWidth
                  margin="normal"
                  type="number"
                  size="small"
                  sx={{ backgroundColor: 'transparent' }} // Set the background color to transparent
                />
              </Grid>
            </Grid>
            {/* Depth */}
            <Grid container xs={12}>
              <Grid item xs={6}>

                {/* Min Depth */}
                <TextField
                  label="Min Depth"
                  variant="outlined"
                  onChange={handleMinDepth}
                  fullWidth
                  margin="normal"
                  type="number"
                  size="small"
                  inputMode="numeric"
                  sx={{ backgroundColor: 'transparent' }} // Set the background color to transparent
                />
              </Grid>
              <Grid item xs={6}>

                {/* Max Depth */}
                <TextField
                  label="Max Depth"
                  variant="outlined"
                  onChange={handleMaxDepth}
                  inputMode="numeric"
                  fullWidth
                  margin="normal"
                  type="number"
                  size="small"
                  sx={{ backgroundColor: 'transparent' }} // Set the background color to transparent
                />
              </Grid>
              {/* Categories */}
              <Grid container item xs={12} spacing={2} sx={{ m: 1 }}>

                <Grid xs={6}>
                  <FormControlLabel
                    control={<Checkbox checked={generalValue} onChange={handleGeneralValue} />}
                    
                    label={<Typography variant="subtitle2">General</Typography>}
                    sx={{ mr: 1 }}
                  />
                </Grid>
                <Grid xs={6}>
                  <FormControlLabel
                    control={<Checkbox checked={FurnitureValue} onChange={handleFurntiureValue} />}
                    label={<Typography variant="subtitle2">Furniture</Typography>}
                    sx={{ mr: 1 }}
                  />
                </Grid>
                <Grid xs={6}>
                  <FormControlLabel
                    control={<Checkbox checked={liveEdgeValue} onChange={handleLiveEdgeValue}/>}
                    label={<Typography variant="subtitle2">Live Edge</Typography>}
                    sx={{ mr: 1 }}
                  />
                </Grid>
                <Grid xs={6}>
                  <FormControlLabel
                    control={<Checkbox checked={StructuralValue} onChange={handleStructuralValue} />}
                    label={<Typography variant="subtitle2">Structural</Typography>}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Reset Button */}
            <Grid container xs={12} sx={{ mt: 2 }}>
              <Button variant="contained" color="secondary" fullWidth onClick={handleReset}>
                Reset Filters
              </Button>
            </Grid>

            {/*Submit Button*/}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" fullWidth type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>

          </Grid>

        </form>
      </div>

  );
};

export default PlankFiltersDesktop;
