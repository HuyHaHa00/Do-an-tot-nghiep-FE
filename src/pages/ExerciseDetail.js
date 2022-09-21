import React from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const { id } = useParams();
  const [exerciseVideos, setexerciseVideos] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`;
      const exerciseDetailData = await fetchData(exerciseDbUrl, exerciseOptions);
      setExerciseDetail(exerciseDetailData);
    };

    const fetchYoutubeData = async () => {
      const youtubeSearchUrl = `https://youtube-search-and-download.p.rapidapi.com`;
      const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetail.name}`, youtubeOptions);
      console.log(exerciseVideoData);
      setexerciseVideos(exerciseVideoData);
    }

    fetchExerciseData();
    fetchYoutubeData();
  },[id])
  
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercises />
    </Box>
  )
}

export default ExerciseDetail