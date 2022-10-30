import React from 'react'
import Axios from 'axios'
import {useState} from 'react'
import $ from 'jquery';

import { Box, Button, Stack, TextField, Typography } from '@mui/material'



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const win = window.sessionStorage;

    const login = () => {
      var data = {
          tenDangNhap: username,
          matKhau: password,
      };
      $.ajax({
          type: "POST",
          url: 'https://localhost:7090/api/TblTaiKhoans/DangNhap',
          contentType: "application/json;charset=utf-8",
          data: JSON.stringify(data),
          success: function (result) {
            win.setItem("userID", result);
            win.setItem("userName", username);
            alert("Login successfully!");
            window.location.href = "/";
          },
          error: function (errormessage) {
              alert(errormessage.responseText);
          }
      });
  }
  

  return (
      //create a login page: 
      //create a form with a text field for email and password
      //create a button to submit the form
      //create a button to go to the signup page
    <Stack width="400px" m="auto" mt="100px">
      <Typography variant="h3">Login</Typography>
      <Box sx={{mt: '20px'}}>
        <TextField label="Username" variant="outlined" fullWidth value={username} onChange={(e)=>setUsername(e.target.value)}/>
      </Box>
      <Box sx={{mt: '20px'}}>
        <TextField label="Password" variant="outlined" fullWidth value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Box>
      <Box sx={{mt: '20px'}}>
              <Button variant="contained" fullWidth onClick={login}>Login</Button>
      </Box>
      <Box sx={{mt: '20px'}}>
        <Button variant="contained" fullWidth>Signup</Button>
      </Box>
    </Stack>
  )
}

export default LoginPage