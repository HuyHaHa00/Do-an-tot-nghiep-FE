import React from 'react'
import { Grid, Button, Box, Typography } from '@mui/material'

const ExerciseCard2 = ({key, exercise, handle, button,}) => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={10}>
        <Box key={key} sx={{border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, mb: 2}}>
            <Typography variant="h5" sx={{mb: 2}} align="center" >{exercise.tenBaiTap}</Typography>
            <Typography variant="body1" sx={{mb: 2}}>Rep: x{exercise.soLanTap}</Typography>
            <Grid container spacing={2}>
                <Grid item width="50%">
                    <Typography sx={{mb: 3}}>Equipment: {exercise.tbsuDung}</Typography>
                    <Typography sx={{mb: 3}}>Target Muscles: {exercise.nhomCo}</Typography>
                    <Typography sx={{mb: 3}}>Body Part: {exercise.bpCoThe}</Typography>
                </Grid>
                <Grid item width="50%">
                    <img src={exercise.urlanh} width="50%" alt="GIF"/>
                </Grid>
            </Grid>
        </Box>
        </Grid>
        <Grid item sx={{margin: 'auto'}} xs={2}>
            {button === "remove" && (
                <Button variant="contained" onClick={() => handle(exercise.idChiTietDstap)}>Remove</Button>
            )}
            {button === "add" && (
                <Button variant="contained" onClick={() => handle(exercise.idBaiTap)}>Add</Button>
            )}
        </Grid>
    </Grid>
  )
}

export default ExerciseCard2