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
import Account from './pages/Account';
import PremiumPage from './pages/PremiumPage';
import AdminPage from './pages/AdminPage';
import ApproveInvoices from './pages/ApproveInvoices';

const App = () => (
  <Box>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/exercisescollections" element={<ExercisesCollections />} />
      <Route path="/exercisescollections/edit/:id" element={<ExercisesCollectionsEdit />} />
      <Route path="/exerciseroutine" element={<ExercisesRoutine />} />
      <Route path="/exerciseroutine/edit/:id" element={<ExercisesRoutineEdit />} />
      <Route path="/premium" element={<PremiumPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/approve" element={<ApproveInvoices />} />
    </Routes>
    <Footer />
  </Box>
);
export default App;
