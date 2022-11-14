import React from 'react'
import { Link } from 'react-router-dom'
import { Stack, Button } from '@mui/material'

import Logo from '../assets/images/Logo.png'

const Navbar = () => {
  const win = window.sessionStorage;
  const userID = win.getItem("userID");
  const userName = win.getItem("userName");

  return (
    <Stack direction="row" 
      justifyContent="space-around"
      sx={{ 
        gap: {sm: '122px', xs: '40px'}, 
        mt: { sm: '32px', xs: '20px'}, 
        justifyContent: 'none'}} px="20px">
        <Link to="/">
          <img src={Logo} alt="Logo" 
          style={{width: '48px',height: '48px', margin: '0 20px'}}/>
        </Link>
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
          gap="40px"
          fontSize="24px"
          alignItems="flex-end"
        >
          <Link to="/" style={{ textDecoration: 'none',color: "#3A1212", borderBottom:'3px solid #FF2625'}}>Home</Link>
          <a href="#exercises" style={{textDecoration: 'none', color: "#3A1212"}}>Exercises</a>
          {userID ? 
          <>
            <Link to="/account" style={{textDecoration: 'none', color: "#3A1212"}}>Hello, {userName}</Link>
            <Link to="/exercisescollections" style={{ textDecoration: 'none',color: "#3A1212"}}>Exercise Collection</Link>
            <Link to="/exerciseroutine" style={{ textDecoration: 'none',color: "#3A1212"}}>Exercise Routine</Link>
            <Link to="/premium" style={{ textDecoration: 'none',color: "#3A1212"}}>Premium</Link>
            <Button style={{textDecoration: 'none', color: "#3A1212"}} 
              onClick={()=>{win.removeItem("userName");win.removeItem("userID");window.location.href="/"}}>Logout</Button>
          </>: 
          <>
          <Link to="/login" style={{ textDecoration: 'none',color: "#3A1212"}}>Login</Link>
          <Link to="/signup" style={{ textDecoration: 'none',color: "#3A1212"}}>Signup</Link>
          </>}
          
        </Stack>
    </Stack>
  )
}

export default Navbar;