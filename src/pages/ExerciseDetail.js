import React from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData'
import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const { id } = useParams();
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      //const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      const exerciseDetailData = await axios.get(`https://localhost:7090/api/TblBaiTaps/${id}`);
      setExerciseDetail(exerciseDetailData.data);

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.data.tenBaiTap} exercise`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);

      //const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.nhomCo}`, exerciseOptions);
      const targetMuscleExercisesData = await axios.get(`https://localhost:7090/api/TblBaiTaps/NhomCo/${exerciseDetailData.data.nhomCo}`);
      setTargetMuscleExercises(targetMuscleExercisesData.data);

      //const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      const equimentExercisesData = await axios.get(`https://localhost:7090/api/TblBaiTaps/TbsuDung/${exerciseDetailData.data.tbsuDung}`);
      setEquipmentExercises(equimentExercisesData.data);
    };

    fetchExercisesData();
  }, [id]);
  
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.tenBaiTap}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExerciseDetail