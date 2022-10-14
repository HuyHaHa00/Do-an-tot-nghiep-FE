import React from 'react'
import Axios from 'axios'
import {useState, useEffect} from 'react'
import $ from 'jquery';

import { Box, Button, Stack, TextField, Typography } from '@mui/material'

const SignUpPage = () => {
    //create a signup page: 
    //create a form with a text field for username, password, age, email and phone number
    //have validation for each field
    //if validation fails, show an error message under the field
    //create a button to submit the form
    //create a button to go to the login page
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
        
    const signup = () => {
      if(!error) {
        var data = {
            username: username,
            password: password,
            age: age,
            email: email,
            phone: phone,
        };
        $.ajax({
            type: "POST",
            url: 'https://localhost:7090/api/Account',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(data),
            success: function (result) {
                console.log(result);
            },  
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
      }
      else {
        alert(error);
      }
    }

    useEffect(() => {
        var formIsValid = true;
          if (!username || username.length < 8 || username.match(/[^a-zA-Z0-9]/)) {
              formIsValid = false;
              setError('Username is too short or contains spaces');
          }
          else if (!password || password.length < 8 || password.match(/[^a-zA-Z0-9]/)) {
              formIsValid = false;
              setError('Password is too short or contains spaces');
          }
          else if (!age || age < 18 || age > 100) {
              formIsValid = false;
              setError('Age is not valid');
          }
          else if (!email) {
              formIsValid = false;
              setError('Email is required');
          }
          else if (!phone) {
              formIsValid = false;
              setError('Phone is required');
          }
          else {
              setError('');
          }
      }, [username, password, age, email, phone]);
  
  return (
    <Stack width="400px" m="auto" mt="100px">
      <Typography variant="h3">Signup</Typography>
      <Box sx={{mt: '20px'}}>
        <TextField label="Username" variant="outlined" fullWidth value={username} onChange={(e)=>setUsername(e.target.value)} autoFocus/>
      </Box>
      <Box sx={{mt: '20px'}}>
        <TextField label="Password" variant="outlined" fullWidth value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Box>
      <Box sx={{mt: '20px'}}>
        <TextField label="Age" variant="outlined" fullWidth value={age} onChange={(e)=>setAge(e.target.value)}/>
      </Box>
      <Box sx={{mt: '20px'}}>
        <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Box>
      <Box sx={{mt: '20px'}}>
        <TextField label="Phone" variant="outlined" fullWidth value={phone} onChange={(e)=>setPhone(e.target.value)}/>
      </Box>
      <Box sx={{mt: '20px'}}>
        <Button variant="contained" fullWidth onClick={signup}>Signup</Button>
      </Box>
      <Box sx={{mt: '20px'}}>
        <Button variant="contained" fullWidth>Login</Button>
      </Box>
    </Stack>
  )
}

export default SignUpPage