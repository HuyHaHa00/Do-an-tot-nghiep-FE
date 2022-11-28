import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Stack, Grid, Button, TextField, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExercisesRoutineEdit = () => {
    const [routine, setRoutine] = useState([]);
    const [routineCollection, setRoutineCollection] = useState([]);
    const [collections, setCollections] = useState([]);

    const [refresh, setRefresh] = useState(false);
    const { id } = useParams();

    const arr = [
        { index: 0, value: "" },
        { index: 1, value: "" },
        { index: 2, value: "" },
        { index: 3, value: "" },
        { index: 4, value: "" },
        { index: 5, value: "" },
        { index: 6, value: "" }];
    const [selectedCollection, setSelectedCollection] = useState(arr);

    const win = window.sessionStorage;
    const userID = win.getItem("userID");

    const navigate = useNavigate();

    useEffect(() => {
        checkBelong(id);
        axios.get(`https://localhost:7090/api/TblLichTaps/${id}`)//thong tin lich tap
            .then(res => {
                setRoutine(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(`https://localhost:7090/api/TblChiTietLichTaps/lichtap/${id}`)//danh sasch tap trong lich hien tai
            .then(res => {
                setRoutineCollection(res.data);
            })
            .catch(err => {
                console.log(err);
                setRoutineCollection([]);
            })

        axios.get(`https://localhost:7090/api/TblDstaps/taikhoan/${userID}`)//toan bo danh sach tap cua tai khoan
            .then(res => {
                setCollections(res.data);
            })
            .catch(err => {
                console.log(err);
            })  
    }, [refresh]);

    const checkBelong = (routineID) => {
        axios.get(`https://localhost:7090/api/TblLichTaps/taikhoan/${userID}`)
            .then(res => {
                var arr = res.data;
                var count = 0;
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].idLichTap == routineID) {
                        count++;
                    }
                }
                if (count == 0) {
                    navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const HandleSave = () => {
        //axios post to add new collection to routine
        var listctlt = [];
        selectedCollection.forEach(element => {
            var ctlt = {
                "idLichTap": parseInt(id),
                "idDstap": parseInt(element.value) || null,
                "buoiTap": parseInt(element.index) + 1
            }
            listctlt.push(ctlt);
        });

        axios.post(`https://localhost:7090/api/TblChiTietLichTaps/AddWithList`, listctlt)
            .then(res => {
                console.log(res);
                setRefresh(!refresh);
                alert("Save successfully!");
                //redirect to /exerciseroutine page
                window.location.href = "/exerciseroutine";
            }
            )
            .catch(err => {
                alert("Save failed! Please try again!");
                console.log(err);
            }
            )
        console.log(listctlt);
    }


    const renderRoutine = () => {
        const arr = [];

        const HandleChange = (e, i) => {
            //search if the index is already in the array
            const index = selectedCollection.findIndex((item) => item.index === i);
            //if it is, update the value
            if (index > -1) {
                const newArr = [...selectedCollection];
                newArr[index].value = e.target.value;
                setSelectedCollection(newArr);
            } else {
                //if it is not, add it to the array
                setSelectedCollection([...selectedCollection, { index: i, value: e.target.value }]);
            }
            console.log(selectedCollection);
        }

        for (let i = 0; i < 7; i++) {
            arr.push(
                <Grid container spacing={2} sx={{ margin: 'auto' }} >
                    <Grid item xs={3} sx={{ margin: 'auto' }}>
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>Day {i + 1}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ margin: 'auto' }}>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Collection"
                            value={selectedCollection[i].value}
                            onChange={(e) => HandleChange(e, i)}
                        >
                            {collections.map((item) => (
                                <MenuItem value={item.idDstap}>{item.tenDstap}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>)
        }
        return arr;
    }

    return (
        <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
            <Typography variant="h3" sx={{ flexGrow: 1, margin: 'auto', mt: '20px' }}> Edit Routine </Typography>
            <Stack width="fit-content" spacing={2} margin="auto">
                <Typography variant="h6">Routine Name: {routine.tenLichTap}</Typography>
                <Typography variant="h6">Routine Description: {routine.moTaLichTap}</Typography>
            </Stack>
            <Stack spacing={2} width="100%">
                {renderRoutine()}
            </Stack>
            <Button variant="contained" onClick={HandleSave}>Save</Button>
        </Stack>
    );
}

export default ExercisesRoutineEdit