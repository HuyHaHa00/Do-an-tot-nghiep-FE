import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Stack, Grid, Button, TextField } from '@mui/material';

const BMI = () => {
    const [bmi, setBmi] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    const handleCalculate = (e) => {
        e.preventDefault();
        setBmi(weight / ((height/100) * (height/100)));
    }

    const renderBMIResult = () => {
        var num = Number(bmi);
        num = num.toFixed(2);
        var arr = [];
        if (bmi < 18.5) {
            arr.push(<Typography variant="h4" component="h1" gutterBottom color="red">{num}: Underweight </Typography>);
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            arr.push(<Typography variant="h4" component="h1" gutterBottom color="green">{num}: Normal </Typography>);
        } else if (bmi >= 25 && bmi <= 29.9) {
            arr.push(<Typography variant="h4" component="h1" gutterBottom color="greenyellow">{num}: Overweight </Typography>);
        } else if (bmi >= 30) {
            arr.push(<Typography variant="h4" component="h1" gutterBottom color="red">{num}: Obese </Typography>);
        }
        arr.push(<Typography variant="h6" component="h1" gutterBottom>We recommend you should start with these exercise:</Typography>);
        return arr;
    }

  return (
    <Box width="500px" border="1px solid black" p="10px" m="auto" mb="20px">
        <Typography variant="h4" component="h1" gutterBottom> BMI Calculator </Typography>
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" label="Height (cm)" variant="outlined" value={height} onChange={(e) => setHeight(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" label="Weight (kg)" variant="outlined" value={weight} onChange={(e) => setWeight(e.target.value)}/>
                </Grid>
            </Grid>
            <Button variant="contained" onClick={(e) => handleCalculate(e)}>Calculate</Button>
        </Stack>
        {bmi !== 0 && renderBMIResult()}
    </Box>
  )
}

export default BMI