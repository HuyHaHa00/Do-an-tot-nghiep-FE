import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Grid, Button, TextField} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ExercisesRoutine = () => {
  const [routine, setRoutine] = useState([]);//lay toan bo lich tap
  const [routineCollection, setRoutineCollection] = useState([]);//lay toan bo dstap cua lich tap

  const [createRoutine, setCreateRoutine] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [routineDescription, setRoutineDescription] = useState("");

  const [refresh, setRefresh] = useState(false);

  const win = window.sessionStorage;
  const userID = win.getItem("userID");

  const navigate = useNavigate();

  useEffect(() => {
    //get routine, use userID
    axios.get(`https://localhost:7090/api/TblLichTaps/taikhoan/${userID}`)
    .then(res => {
      setRoutine(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [refresh]);

  const HandleViewClick = (e, id) => {
    //get routine collection, use routineID
    axios.get(`https://localhost:7090/api/TblChiTietLichTaps/lichtap/${id}`)
    .then(res => {
      setRoutineCollection(res.data);
    })
    .catch(err => {
      console.log(err);
      setRoutineCollection([]);
    })
    setRefresh(!refresh);
  }

  const HandleEditClick = (e, idLichTap) => {
    //edit routine, use routineID
    e.preventDefault();
    navigate(`/exerciseroutine/edit/${idLichTap}`);
  }

  const handleCreateNewRoutine = () => {
    //create new routine, use userID, routineName
    axios.post(`https://localhost:7090/api/TblLichTaps`, {
      idTaiKhoan: userID,
      tenLichTap: routineName,
      moTaLichTap: routineDescription,
      ngayTap: null,
      trangThai: null,
    })
    .then(res => {
      alert("Create new routine successfully!");
      setCreateRoutine(false);
      setRefresh(!refresh);
    })
    .catch(err => {
      console.log(err);
    })
    }

  const renderRoutine = () => {
    const arr = [];
    for(let i = 1; i < 8; i++) {
      arr.push(
        <Grid container spacing={2} sx={{margin: 'auto'}} >
          <Grid item xs={2} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}} height="fit-content">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Day {i} </Typography>
          </Grid>
          <Grid item xs={8} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
            <Stack spacing={2}>
              {routineCollection.filter(item => item.buoiTap === i).map((item) => (
              <>
                <Typography variant="body1" component="div"> {item.tenDstap} </Typography>
                <Typography variant="body1" component="div"> {item.moTaDstap} </Typography>
              </>
              ))}
            </Stack>
          </Grid>
        </Grid>)
    }
    return arr;
  }


  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>Exercises Routine</Typography>
      <Stack width='fit-content' sx={{border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, mb: 2, ml: 2}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Create new routine</Typography>
        <Button variant="contained" onClick={() => setCreateRoutine(true)}>Create</Button>
      </Stack>
      <Stack width="500px" align="center" display={createRoutine? "block" : "none" } sx={{border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, mb: 2, ml: 2}}>
          <Typography variant="h5" align="left" sx={{mt: 2}}>Routine Name:</Typography>
              <TextField fullWidth type="text" onChange={(e)=>setRoutineName(e.target.value)}/>
          <Typography variant="h5" align="left" sx={{mt: 2}}>Routine Description:</Typography>
              <TextField fullWidth type="text" onChange={(e)=>setRoutineDescription(e.target.value)}/>
          <Box sx={{mt: 2}}>
              <Button variant="contained" onClick={() => setCreateRoutine(false)}>Cancel</Button>
              <Button sx={{ml: 5}} variant="contained" onClick={handleCreateNewRoutine}>Create</Button>
          </Box>
      </Stack> 
      <Grid container spacing={2} sx={{margin: 'auto', justifyContent: 'center'}} >
        <Grid item xs={5} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
          {routine.map((item) => (
            <Box key={item.idLichTap} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {item.tenLichTap}
              </Typography>
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                {item.moTaLichTap}
              </Typography>
              <Button variant="contained" sx={{ m: 1 }} onClick={(e) => HandleViewClick(e, item.idLichTap)}>View</Button>
              <Button variant="contained" sx={{ m: 1 }} onClick={(e) => HandleEditClick(e, item.idLichTap)}>Edit</Button>
              <Button variant="contained" sx={{ m: 1 }}>Delete</Button>
            </Box>
          ))}
        </Grid>
        <Grid item xs={5} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
          <Stack spacing={2}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Routine and Collection </Typography>
            {renderRoutine()}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ExercisesRoutine;