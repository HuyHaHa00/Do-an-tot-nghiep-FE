import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography} from '@mui/material'
import axios from 'axios';

import { fetchData, exerciseOptions } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  // useEffect(() => {
  //   const fetchExercises = async () => {
  //     const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
  //     //https://exercisedb.p.rapidapi.com/exercises/bodyPartList
  //     setBodyParts(["all", ...bodyPartsData]);
  //   }
  //   fetchExercises();
  // }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      setBodyParts(["all", "back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist"]);
    }
    fetchExercises();
  }, []);
  
  const handleSearch = async () => {
    if(search) {
      //const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      const exercisesData = await axios.get('https://localhost:7090/api/TblBaiTaps');
      const searchedExercises = exercisesData.filter((exercise) => exercise.TenBaiTap.toLowerCase().includes(search) 
                                                                || exercise.NhomCo.toLowerCase().includes(search)
                                                                || exercise.TBSuDung.toLowerCase().includes(search)
                                                                || exercise.BpCoThe.toLowerCase().includes(search)
                                                    );
      setSearch('');
      setExercises(searchedExercises);
    }
  }

  return (
    <Stack mt="37px" alignItems="center" 
    justifyContent="center" p="20px" sx={{
      width: "100vw"
    }}>
        <Typography fontWeight={700} sx={{fontSize: {lg: '44p', xs: '30px'}}} mb="50px" textAlign="center" >
          Awesome Exercise You <br /> Should Know 
        </Typography>
        <Box position="relative" mb="72px" alignItems="center" justifyContent="center" margin="auto">
          <TextField
            sx= {{
                  input: { fontWeight: '700px', border: 'none', borderRadius: '4px' }, 
                  width: "70vw",backgroundColor: '#fff', borderRadius: '40px', height: "75px"
                }}
                value={search} onChange={(e)=>setSearch(e.target.value.toLowerCase())} placeholder="Search Exercises" type="text"
          />

          <Button className="search-btn"
            sx={{
              bgcolor: '#ff2625',
              color: '#fff',
              textTransform: 'none',
              width: "10vw",
              fontSize: {lg : '20px', xs: '14px'},
              height: '56px',
              position: 'absolute',
              right: '0',
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>

        <Box sx={{ position: 'relative', width: '100vw', p: '20px' }}>
            <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyPart/>
        </Box>
    </Stack>
  )
}

export default SearchExercises;