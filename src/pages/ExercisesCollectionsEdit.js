import React from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Grid, Box, Stack, Typography, Button, TextField } from '@mui/material';
import {Pagination} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ExerciseCard2 from '../components/ExerciseCard2'

const ExercisesCollectionsEdit = () => {
  const { id } = useParams();
  const [allExercises, setAllExercises] = useState([]);//toan bo bai tap
  const [collection, setCollection] = useState([]);//danh sach tap dang chon
  const [exercises, setExercises] = useState([]);//bai tap trong danh sach tap dang chon

  const [refresh, setRefresh] = useState(false);//de reload

  const navigate = useNavigate();
  const win = window.sessionStorage;
  const userID = win.getItem("userID");

  //doan nay de phan trang
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = allExercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  }

  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if(search) {
      const searchedExercises = allExercises.filter(exercise => exercise.tenBaiTap.toLowerCase().includes(search) 
                                                                || exercise.nhomCo.toLowerCase().includes(search)
                                                                || exercise.tbsuDung.toLowerCase().includes(search)
                                                                || exercise.bpCoThe.toLowerCase().includes(search)
                                                    );
      setSearch('');
      setAllExercises(searchedExercises);
    }
  }

  useEffect(() => {
    const fetchExercisesData = async () => {
      await axios.get(`https://localhost:7090/api/TblChiTietDstaps/${id}`)
        .then(res => {
          setExercises(res.data);
        })
        .catch(err => {
          console.log(err);
          setExercises([]);
        })
      await axios.get('https://localhost:7090/api/TblBaiTaps')
        .then(res => {
          setAllExercises(res.data);
        })
        .catch(err => {
          console.log(err);
          setAllExercises([]);
        })
      const CollectionData = await axios.get(`https://localhost:7090/api/TblDstaps/dstap/${id}`);
      setCollection(CollectionData.data[0]);
    };
    checkBelong(id);
    fetchExercisesData();
    //check if the collection being edited is in the user's collection
    //if not, redirect to the home page
  }, [refresh]);


  const checkBelong = (CollectionID) => {
    axios.get(`https://localhost:7090/api/TblDstaps/taikhoan/${userID}`)
        .then(res => {
            var arr = res.data;
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].idDstap == CollectionID) {
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
  
  const handleAdd = (idBaiTap, rep) => {
    //axios post with body
    axios.post(`https://localhost:7090/api/TblChiTietDstaps`, {
            idDstap: parseInt(id),
            idBaiTap: parseInt(idBaiTap),
            soLanTap: rep || 15,
            thoiGianTap: null,
        })
        .then(res => {
            alert("Added to the collection successfully!");
            setRefresh(!refresh);
        })
        .catch(err => {
            console.log(err);
        })
  }

  const handleRemove = (idChiTietDstap) => {
    //axios delete with body
    axios.delete(`https://localhost:7090/api/TblChiTietDstaps/${idChiTietDstap}`)
        .then(res => {
            alert("Removed from the collection successfully!");
            setRefresh(!refresh);
        })
        .catch(err => {
            console.log(err);
        })
  }

  return (
    <Box>
      <Typography variant="h4" sx={{textAlign: 'center', mt: 5, mb: 3}}>You are editing {collection.tenDstap}</Typography>
      <Grid container spacing={2} sx={{margin: 'auto', justifyContent: 'center'}} >
        <Grid item xs={5} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
          <Stack spacing={2}>
            <Typography variant="h4" sx={{fontWeight: 'bold'}} textAlign="center">
              {collection.tenDstap}
            </Typography>
            <Typography variant="h6" sx={{fontWeight: 'bold'}} textAlign="center">
              {collection.moTaDstap}
            </Typography>
            <Stack>
              {exercises.map((exercise, index) => (
                <ExerciseCard2 key={index} exercise={exercise} handle={handleRemove} button="remove"/>
              ))}
              </Stack>
          </Stack>
        </Grid>
        <Grid item xs={5} sx={{border: 2, borderColor: 'red', borderRadius: 1, p: 2, m: 2}}>
          <Stack spacing={2} sx={{mr: "20px"}}>
            <TextField
              width="50%"
              label="Search"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch}>Search</Button>
            <Button variant="contained" onClick={() => setRefresh(!refresh)}>Refresh</Button>
            <Grid container spacing={2}>
              <Stack direction="row" flexWrap="wrap" justifyContent="center">
                {currentExercises.map((exercise, index) => (
                  <ExerciseCard2 key={index} exercise={exercise} handle={handleAdd} button="add"/>
                ))}
                <Stack mt="100px" alignItems="center" height="100px">
                    <Pagination
                      color="standard"
                      shape="rounded"
                      defaultPage={1} 
                      count={Math.ceil(allExercises.length / 6)}
                      page={currentPage}
                      onChange={paginate}
                      size="large"
                      />
                </Stack>
              </Stack>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
};


export default ExercisesCollectionsEdit