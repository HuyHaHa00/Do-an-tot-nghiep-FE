import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'


import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App = () => (
  <Box>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
    <Footer />
  </Box>
);
export default App;
