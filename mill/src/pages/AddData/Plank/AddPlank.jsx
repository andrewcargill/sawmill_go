import React, { useState, useEffect } from 'react';
import { TextField, FormControl, Paper, Button, InputLabel, Select, MenuItem, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomFormHeading from '../../../components/CustomForm/CustomFormHeading';
import CustomDatePicker from '../../../components/CustomForm/CustomDatePicker';
import CustomInput from '../../../components/CustomForm/CustomInput';
import CustomDropdown from '../../../components/CustomForm/CustomDropDown';
import CustomTextArea from '../../../components/CustomForm/CustomTextArea';
import CustomImageUploadContainer from '../../../components/CustomForm/CustomImageUploadContainer'
import FormBoxMain from '../../../components/CustomForm/FormBoxMain';


const AddPlank = () => {

    /* Image upload */
    const [image1Url, setImage1Url] = useState(null);
    const [image2Url, setImage2Url] = useState(null);

    useEffect(() => {
        console.log('Image 1 URL:', image1Url);
      }, [image1Url]);
    
      useEffect(() => {
        console.log('Image 2 URL:', image2Url);
      }, [image2Url]);

    const handleFileUpload = (event, setImageUrl) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        console.log('yes');

        reader.onloadend = () => {
            console.log('Image data URL:', reader.result);
    setImageUrl(reader.result);
    console.log('Image URL set:', reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            {/* Custom header */}
                <CustomFormHeading title="+ plank" />
            <FormBoxMain>
                <form>
                    {/* Custom Date Field */}
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CustomDatePicker />
                        </Grid>

                        {/* Custom Input Field */}
                        <Grid item xs={12}>

                           <CustomInput label="Custom Input" type="number" />
                        </Grid>

                        {/* Input Field */}
                        <Grid item xs={12}>
                            <TextField
                                label="Input"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                type="email"
                                sx={{ backgroundColor: 'transparent' }}
                            />
                        </Grid>

                        {/* Custom Drop Down*/}
                        <Grid item xs={12}>
                           <CustomDropdown
                            label="Custom Operator"
                            onChange=""
                            options={[
                                { label: 'Andy', value: 'male' },
                                { label: 'Jens', value: 'female' },
                                { label: 'Other', value: 'other' },
                              ]}
                              />

                        </Grid>

                        {/* Drop Down*/}
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth margin="normal">
                                <InputLabel>Operator</InputLabel>
                                <Select label="Gender">
                                    <MenuItem value="male">Andy</MenuItem>
                                    <MenuItem value="female">Jens</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/*Custom Text Field*/}
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <CustomTextArea label="Custom Information" />
                        </Grid>

                        {/*Text Field*/}
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                label="Information"
                                multiline
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>

                        {/*Select*/}
                        <Box p={2}>
                            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                                {/*Select*/}
                                <Typography variant="h6" gutterBottom>
                                    Select Categories
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="secondary" fullWidth>
                                            Button 1
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="secondary" fullWidth>
                                            Button 2
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="secondary" fullWidth>
                                            Button 3
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="secondary" fullWidth>
                                            Button 4
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>

                         {/*Image Upload*/}
                        <Box p={2} sx={{ width: '100%' }}>
                            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                                {/*Select*/}
                                <Typography variant="h6" gutterBottom>
                                    Image Upload
                                </Typography>
                                {/*Image 1 Upload*/}
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <label htmlFor="upload-image-1">
                                            <Button variant="contained" color="secondary" component="span" fullWidth>
                                                Image 1
                                            </Button>
                                            <input
                                                id="upload-image-1"
                                                hidden
                                                accept="image/*"
                                                type="file"
                                                onChange={(event) => handleFileUpload(event, setImage1Url)}
                                            />
                                        </label>

                                        {image1Url && <img src={image1Url} alt="Uploaded Image" width="100%" />}
                                    </Grid>

                                    {/*Image 2 Upload*/}
                                    <Grid item xs={12}>
                                        <label htmlFor="upload-image-2">
                                            <Button variant="contained" color="secondary" component="span" fullWidth>
                                                Image 2
                                            </Button>
                                            <input
                                                id="upload-image-2"
                                                hidden
                                                accept="image/*"
                                                type="file"
                                                onChange={(event) => handleFileUpload(event, setImage2Url)}
                                            />
                                        </label>
                                        {image2Url && <img src={image2Url} alt="Uploaded Image" width="100%" />}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>

                        {/*Custom Submit Button*/}
                        <CustomImageUploadContainer 
                        title="Image Upload"
                        imageLabels={['Image 1', 'Image 2']}
                        imageUrls={[image1Url, image2Url]}
                        setImageUrls={[setImage1Url, setImage2Url]}
                        />

                      
                        {/*Submit Button*/}
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </FormBoxMain>
        </div>
    );
};

export default AddPlank;


