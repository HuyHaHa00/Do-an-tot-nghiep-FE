import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({exercise}) => {
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.idBaiTap}`}>
    <img src={exercise.urlanh} alt={exercise.tenBaiTap} loading="lazy" />
    <Stack direction="row">
      <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
        {exercise.bpCoThe}
      </Button>
      <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
        {exercise.nhomCo}
      </Button>
    </Stack>
    <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
      {exercise.tenBaiTap}
    </Typography>
  </Link>
  )
}

export default ExerciseCard