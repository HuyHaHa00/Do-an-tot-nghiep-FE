import React, {useState, useEffect} from 'react'
import Pagination from '@mui/material/Pagination';
import {Box, Stack, Typography, Grid} from '@mui/material'
import axios from 'axios';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  }

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesList = [];

      if (bodyPart === 'all') {
        //exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        //use axios to get data from the https://localhost:7090/api/TblBaiTaps
        let exercisesData = await axios.get('https://localhost:7090/api/TblBaiTaps');
        exercisesList = exercisesData.data;
      } else {
        let exercisesData = await axios.get(`https://localhost:7090/api/TblBaiTaps/BpCoThe/${bodyPart}`);
        exercisesList = exercisesData.data;
        //exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }
      
      //cho nay dang test chuyendu lieu exercise ve server -> thanh cong
      //use axios send exercisesData to https://localhost:7090/api/Exercise 
      //and console.log the response
      /*axios.post('https://localhost:7090/api/TblBaiTaps', exercisesData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      ---DA CHUYEN THANH CONG DU LIEU VE SERVER---
      */
      setExercises(exercisesList);
    };

    fetchExercisesData();
    setCurrentPage(1);
  }, [bodyPart])

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px" minWidth="100%">
        <Typography variant="h3" mb="46px">
          Showing Results for {bodyPart}
        </Typography>
        <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
          {currentExercises.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise}/>
          ))}
        </Stack>
        <Stack mt="100px" alignItems="center">
            {exercises.length > 9 && (
              <Pagination
                color="standard"
                shape="rounded"
                defaultPage={1} 
                count={Math.ceil(exercises.length / 9)}
                page={currentPage}
                onChange={paginate}
                size="large"
                />
              )}
        </Stack>
    </Box>
  )
}

export default Exercises