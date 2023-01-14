import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, Grid, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BMI from '../components/BMI';
import { Snackbar, Alert } from '@mui/material';
import GymBackground from '../assets/images/GymBackground.jpg';

const ExercisesCollections = () => {
    const [exercisesAndData, setExercisesAndData] = useState([]);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");
    const [createCollection, setCreateCollection] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const [collectionName, setCollectionName] = useState("");
    const [collectionDescription, setCollectionDescription] = useState("");

    const win = window.sessionStorage;
    const userID = win.getItem("userID");

    const navigate = useNavigate();

    const handleCreate = () => {
        setCreateCollection(true);
    }

    useEffect(() => {
        //get collections, use userID
        axios.get(`https://localhost:7090/api/TblDstaps/taikhoan/${userID}`)
            .then(res => {
                setCollections(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [refresh]);

    const handleSelectedCollection = (id) => {
        //get exercises in collection, use collectionID
        axios.get(`https://localhost:7090/api/TblChiTietDstaps/${id}`)
            .then(res => {
                setSelectedCollection(id);
                setExercisesAndData(res.data);
            })
            .catch(err => {
                console.log(err);
                setExercisesAndData([]);
            })
    };

    const handleCreateNewCollection = () => {
        //create new collection, use userID, collectionName
        axios.post(`https://localhost:7090/api/TblDstaps`, {
            idTaiKhoan: userID,
            tenDstap: collectionName,
            moTaDstap: collectionDescription,
            loaiDstap: "Thuong"
        })
            .then(res => {
                setCreateCollection(false);
                setCollections([...collections, res.data]);
                alert("Create new collection successfully!");
                setRefresh(!refresh);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEditClick = (e, idDstap) => {
        //navigate to edit page, use history.push
        e.preventDefault();
        navigate(`/exercisescollections/edit/${idDstap}`);
    }

    const handleDeleteClick = (e, idDstap) => {
        //delete collection, use collectionID
        e.preventDefault();
        axios.delete(`https://localhost:7090/api/TblDstaps/${idDstap}`)
            .then(res => {
                setCollections([]);
                setExercisesAndData([]);
                alert("Delete collection successfully!");
                setRefresh(!refresh);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const renderCreateCollection = () => {
        return (
            <Box>
                <Stack width="400px" sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, m: 'auto' }}>
                    <Typography variant="h4" sx={{ mb: 5 }}>Create new Collection?</Typography>
                    <Button variant="contained" sx={{ mb: 5 }} onClick={handleCreate}>Create</Button>
                </Stack>
                <Stack width="500px" align="center" display={createCollection ? "block" : "none"} sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, m: 'auto', mt: '20px' }}>
                    <Typography variant="h5" align="left" sx={{ mt: 2 }}>Collection Name:</Typography>
                    <TextField fullWidth type="text" onChange={(e) => setCollectionName(e.target.value)} />
                    <Typography variant="h5" align="left" sx={{ mt: 2 }}>Collection Description:</Typography>
                    <TextField fullWidth type="text" onChange={(e) => setCollectionDescription(e.target.value)} />
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={() => setCreateCollection(false)}>Cancel</Button>
                        <Button sx={{ ml: 5 }} variant="contained" onClick={handleCreateNewCollection}>Create</Button>
                    </Box>
                </Stack>
            </Box>
        )
    }

    const renderCollections = () => {
        return (
            <Box sx={{ backgroundColor: '#F5F5F5' }}>
                <Typography variant="h4" align="center" sx={{ mb: 5 }}>Collections</Typography>
                {collections.map((collection) => (
                    <Box key={collection.idDstap} sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, mb: 2 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>{collection.tenDstap}</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{collection.moTaDstap}</Typography>
                        <Button variant="contained" sx={{ mb: 2 }} onClick={() => handleSelectedCollection(collection.idDstap)}>View</Button>
                        <Button variant="contained" sx={{ mb: 2, ml: 2 }} onClick={(e) => handleEditClick(e, collection.idDstap)}>Edit</Button>
                        <Button variant="contained" sx={{ mb: 2, ml: 2 }} onClick={(e) => handleDeleteClick(e, collection.idDstap)}>Delete</Button>
                    </Box>
                ))}
            </Box>
        )
    }

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const renderExercises = () => {
        return (
            <Box sx={{ backgroundColor: '#F5F5F5' }}>
                <Typography variant="h4" align="center" sx={{ mb: 5 }}>Exercises</Typography>
                <Button variant="contained" onClick={handleClick}>Finish Exercising!</Button>
                <Snackbar
                    //color="success"
                    sx={{ width: '100%', color: 'success.main' }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '50%', fontSize: 25, backgroundColor: "greenyellow" }}>
                        Congratulation! You have finished exercising!
                    </Alert>
                </Snackbar>
                <Typography variant="h5" sx={{ mb: 2 }}>Selected Collection: </Typography>
                {(selectedCollection !== "") ? (
                    exercisesAndData.map((exercise) => (
                        <Box key={exercise.idBaiTap} sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, mb: 2, minWidth: 500 }}>
                            <Typography variant="h4" sx={{ mb: 2 }}>{exercise.tenBaiTap}</Typography>
                            <Typography variant="h5" sx={{ mb: 2 }}>Rep: x{exercise.soLanTap}</Typography>
                            <Grid container spacing={2}>
                                <Grid item width="50%">
                                    <Typography sx={{ mb: 3 }}>Equipment: {exercise.tbsuDung}</Typography>
                                    <Typography sx={{ mb: 3 }}>Target Muscles: {exercise.nhomCo}</Typography>
                                    <Typography sx={{ mb: 3 }}>Body Part: {exercise.bpCoThe}</Typography>
                                </Grid>
                                <Grid item >
                                    <img src={exercise.urlanh} width="60%" alt="GIF" />
                                </Grid>
                            </Grid>
                        </Box>
                    ))) :
                    (<>
                        <Typography variant="h6" sx={{ mb: 2 }}>No collection selected or this collection don't have any exercise</Typography>
                    </>)}
            </Box>
        )
    }

    return (
        <Box>
            <Typography variant="h2" align="center" sx={{ mt: 10, mb: 5 }}>Exercises Collections</Typography>
            <BMI />
            {renderCreateCollection()}
            <Grid container spacing={2} sx={{ mt: 10, ml: 10 }} overflow="auto" maxHeight="1000px">
                <Grid item xs={10} lg={5} ml={10}>
                    {renderCollections()}
                </Grid>
                <Grid item xs={10} lg={5} overflow="auto" maxHeight="1000px">
                    {renderExercises()}
                </Grid>
            </Grid>
        </Box>
    )
}

export default ExercisesCollections