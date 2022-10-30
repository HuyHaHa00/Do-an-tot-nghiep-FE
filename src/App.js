import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'


import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ExercisesCollections from './pages/ExercisesCollections';
import ExercisesCollectionsEdit from './pages/ExercisesCollectionsEdit';
import ExercisesRoutine from './pages/ExercisesRoutine';
import ExercisesRoutineEdit from './pages/ExercisesRoutineEdit';

const App = () => (
  <Box>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/exercisescollections" element={<ExercisesCollections />} />
      <Route path="/exercisescollections/edit/:id" element={<ExercisesCollectionsEdit />} />
      <Route path="/exerciseroutine" element={<ExercisesRoutine />} />
      <Route path="/exerciseroutine/edit/:id" element={<ExercisesRoutineEdit />} />
    </Routes>
    <Footer />
  </Box>
);
export default App;
