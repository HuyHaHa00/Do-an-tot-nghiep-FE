import React, {useState} from 'react'
import { Box } from '@mui/material'
import "../App.css"

import HeroBanner from '../components/HeroBanner'
import SearchExercises from '../components/SearchExcercises'
import Exercises from '../components/Excercises'

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box>
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercises setExercises={setExercises} bodyPart={bodyPart} exercises={exercises} />
    </Box>
  )
}

export default Home