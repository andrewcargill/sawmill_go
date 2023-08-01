import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TextField, FormControl, Paper, Button, InputLabel, Select, MenuItem, Typography, styled, Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CustomFormHeading from '../../../components/CustomForm/CustomFormHeading';
import CustomDatePicker from '../../../components/CustomForm/CustomDatePicker';
import CustomInput from '../../../components/CustomForm/CustomInput';
import CustomDropdown from '../../../components/CustomForm/CustomDropDown';
import CustomTextArea from '../../../components/CustomForm/CustomTextArea';
import CustomImageUploadContainer from '../../../components/CustomForm/CustomImageUploadContainer'
import FormBoxMain from '../../../components/CustomForm/FormBoxMain';
import axios from "axios";
import dayjs from "dayjs";


const AddPlank = () => {

    /* FROM OLD FORM */
    const [log, setLog] = useState("");
    const [date, setDate] = useState(null);
    const [width, setWidth] = useState("");
    const [depth, setDepth] = useState("");
    const [wood_grade, setWood_grade] = useState("");
    const [logIdExists, setLogIdExists] = useState(null);
    const [live_edge, setLive_edge] = useState(false);
    const [furniture, setFurniture] = useState(false);
    const [structural, setStructural] = useState(false);
    const [general, setGeneral] = useState(false);
    const [operator, setOperator] = useState("");
    const [info, setInfo] = useState("");
    const [imageOne, setImageOne] = useState("");
    const [imageTwo, setImageTwo] = useState("");
    const [success, setSuccess] = useState(false);
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        console.log('imageOne:', imageOne);
        console.log('imageTwo:', imageTwo);
      }, [imageOne, imageTwo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        

        try {
            const accessToken = localStorage.getItem("access_token");
            const formData = new FormData();
            formData.append("date", date);
            formData.append("log", log);
            formData.append("width", width);
            formData.append("depth", depth);
            formData.append("wood_grade", wood_grade);
            formData.append("live_edge", live_edge);
            formData.append("furniture", furniture);
            formData.append("structural", structural);
            formData.append("general", general);
            formData.append("operator", operator);
            formData.append("info", info);
            console.log("adding data: ", date, log, width, depth, wood_grade, live_edge, furniture, structural, general, operator, info);

            if (imageOne !== "") {
                formData.append("image1", imageOne);
            }

            if (imageTwo !== "") {
                formData.append("image2", imageTwo);
            }

            const response = await axios.post(
                "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log("Data created:", response.data);

            setLog("");
            setWidth("");
            setDepth("");
            setWood_grade("");
            setDate("");
            setLive_edge(false);
            setFurniture(false);
            setStructural(false);
            setGeneral(false);
            setInfo("");
            setOperator("");
            setImageOne("");
            setImageTwo("");

            setPostId(response.data.id);
            setSuccess(true); // Set success status to true
        } catch (error) {
            console.error("Error creating data:", error);
        }
    };

    const handleLogChange = (e) => {
        const logId = e.target.value;
        setLog(logId);
    };

    const handleLogBlur = async () => {
        try {
            const response = await axios.get(
                `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/validate/${log}/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );

            const { exists } = response.data;
            console.log("LogIdExists:", exists);
            setLogIdExists(exists);
        } catch (error) {
            console.error("Error validating log ID:", error);
        }
    };

    const handleLiveEdgeClick = () => {
        setLive_edge(!live_edge);
    };
    const handleFurnitureClick = () => {
        setFurniture(!furniture);
    };
    const handleStructuralClick = () => {
        setStructural(!structural);
    };
    const handleGeneralClick = () => {
        setGeneral(!general);
    };

    /// Navigation to Mill Home

    const navigate = useNavigate();

    const handleButtonClick = (route) => {
        navigate(route);
    };

    /* Image upload */
    const [image1Url, setImage1Url] = useState(null);
    const [image2Url, setImage2Url] = useState(null);

    /* FROM TEMPLATE - NOT USED */
    // useEffect(() => {
    //     console.log('Image 1 URL:', image1Url);
    //   }, [image1Url]);

    //   useEffect(() => {
    //     console.log('Image 2 URL:', image2Url);
    //   }, [image2Url]);

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

    /* Update date state */
    const handleDateChange = (formattedDate) => {
        setDate(formattedDate); 
      };

    return (
        <div>
            {/* Custom header */}
            <CustomFormHeading title="+ plank" />
            <FormBoxMain>
                <form onSubmit={handleSubmit}>
                    {/* Custom Date Field */}
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                        <CustomDatePicker value={date} onChange={handleDateChange} />
                        </Grid>

                        {/* LumberJack*/}
                        <Grid item xs={12}>
                            <CustomDropdown
                                label="Operator"
                                value={operator}
                                onChange={(e) => setOperator(e.target.value)}
                                required
                                options={[
                                    { label: 'Andy', value: 'Andrew Cargill' },
                                    { label: 'Jens', value: 'Jens Nyman' },
                                    { label: 'Andy & Jens', value: 'Andrew Cargill & Jens Nyman' },
                                    { label: 'Andy & Charlie', value: 'Andrew Cargill & Charles Cargill' },
                                ]}
                            />
                        </Grid>

                        {/* Log ID */}
                        <Grid item xs={12}>
                            <CustomInput
                                label="Log ID"
                                type="number"
                                value={log}
                                onChange={handleLogChange}
                                onBlur={handleLogBlur}
                                required
                                inputMode="numeric"
                            />
                        </Grid>
                        {logIdExists !== null && !logIdExists && (
                            <Grid item xs={12}>
                                <Box >ID not in system</Box>
                            </Grid>
                        )}

                        {/* Width */}
                        <Grid item xs={12}>
                            <CustomInput
                                label="Width (cm)"
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                required
                                inputMode="numeric"
                            />
                        </Grid>
                        {/* Depth */}
                        <Grid item xs={12}>
                            <CustomInput
                                label="Depth (cm)"
                                type="number"
                                value={depth}
                                onChange={(e) => setDepth(e.target.value)}
                                required
                                inputMode="numeric"
                            />
                        </Grid>

                        {/* Grade */}
                        <Grid item xs={12}>
                            <CustomDropdown
                                label="Wood Grade"
                                value={wood_grade}
                                onChange={(e) => setWood_grade(e.target.value)}
                                required
                                options={[
                                    { label: '1', value: '1' },
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                    { label: '4', value: '4' },
                                ]}
                            />
                        </Grid>

                        {/*Info*/}
                        <Grid item xs={12}>
                            <CustomTextArea
                                label="Operator Information"
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
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
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            color={general ? "primary" : "secondary"}
                                            onClick={handleGeneralClick}
                                        >
                                            General
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color={furniture ? "primary" : "secondary"}
                                            onClick={handleFurnitureClick}
                                            fullWidth
                                        >
                                            Furniture
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color={structural ? "primary" : "secondary"}
                                            onClick={handleStructuralClick}
                                            fullWidth
                                        >
                                            Structural
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant="contained"
                                            color={live_edge ? "primary" : "secondary"}
                                            onClick={handleLiveEdgeClick}
                                            fullWidth
                                        >
                                            Live-Edge
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>



                        {/*Custom Submit Button*/}
                        <CustomImageUploadContainer
                            title="Image Upload"
                            imageLabels={['Image 1', 'Image 2']}
                            imageUrls={[imageOne, imageTwo]}
                            setImageUrls={[setImageOne, setImageTwo]}
                        />

                        {success && (
                            <Grid item xs={12}>
                                <Alert severity="success">
                                    <p>Success! Data Stored.</p>
                                    <div>Plank ID: {postId}</div>{" "}
                                </Alert>
                            </Grid>
                        )}
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


