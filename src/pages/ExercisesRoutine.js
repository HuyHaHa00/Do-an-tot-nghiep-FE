import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Grid, Button, TextField, Checkbox} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ExercisesRoutine = () => {
  const [routine, setRoutine] = useState([]);//lay toan bo lich tap
  const [routineCollection, setRoutineCollection] = useState([]);//lay toan bo buoi tap cua lich tap

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

  const HandleDeleteClick = (e, idLichTap) => {
    //delete routine, use routineID
    axios.delete(`https://localhost:7090/api/TblLichTaps/${idLichTap}`)
    .then(res => {
      alert("Delete successfully!");
      console.log(res);
      setRefresh(!refresh);
    })
    .catch(err => {
      console.log(err);
      setRefresh(!refresh);
    })
    
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

    //gui 1 lenh put thay doi trang thai cua thuoc tinh trang thai buoi tap, sau do goi lai ham view de update
  const HandleCheckBoxChange = (item) => {
    //edit routine collection, use routineCollectionID
    console.log(item);
    axios.put(`https://localhost:7090/api/TblChiTietLichTaps`, {
      idChiTietLichTap: item.idChiTietLichTap,
      idLichTap: item.idLichTap,
      idDstap: item.idDstap,
      buoiTap: item.buoiTap,
      trangThaiBuoiTap: item.trangThaiBuoiTap === 1 ? 0 : 1,
    })
    .then(res => {
      console.log(res);
      HandleViewClick(null, item.idLichTap);
      setRefresh(!refresh);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const HandleStartClick = (e, item) => {
    //start routine, use routineID
    console.log(item);
    axios.put(`https://localhost:7090/api/TblLichTaps`, {
      idLichTap: item.idLichTap,
      idTaiKhoan: item.idTaiKhoan,
      tenLichTap: item.tenLichTap,
      moTaLichTap: item.moTaLichTap,
      ngayTap: new Date().toISOString(),
      trangThai: "start",
    })
    .then(res => {
      console.log(res);
      setRefresh(!refresh);
    }
    )
  }

  const HandleFinishClick = (e, item) => {
    //finish routine, use routineID
    console.log(item);
    axios.put(`https://localhost:7090/api/TblLichTaps`, {
      idLichTap: item.idLichTap,
      idTaiKhoan: item.idTaiKhoan,
      tenLichTap: item.tenLichTap,
      moTaLichTap: item.moTaLichTap,
      ngayTap: new Date().toISOString(),
      trangThai: "finish",
    })
    .then(res => {
      console.log(res);
      setRefresh(!refresh);
    }
    )
  }

  const renderRoutine = () => {
    const arr = [];
    for(let i = 0; i < 7; i++) {
      arr.push(
        <Grid container spacing={2} sx={{margin: 'auto'}} >
          <Grid item xs={2} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}} height="fit-content">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> Day {i+1} </Typography>
          </Grid>
          <Grid item xs={8} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
            <Stack spacing={2}>
              {routineCollection.filter(item => item.buoiTap === i+1).map((item) => (
              <Stack direction="row">
                <Box sx={{border: 1, borderColor: 'green', p: 1, cursor: 'pointer'}} onClick={() => {navigate("/exercisescollections")}}>
                  <Typography variant="body1" component="div"> {item.tenDstap} </Typography>
                  <Typography variant="body1" component="div"> {item.moTaDstap} </Typography>
                </Box>
                <Box sx={{ml: 3}}>
                  <Checkbox checked={item.trangThaiBuoiTap === 1} onChange={(e) => {HandleCheckBoxChange(item)}}/>
                </Box>
              </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>)
    }
    return arr;
  }


  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%'}}>
      <Typography variant="h3" sx={{ flexGrow: 1, margin: 'auto', mt: '20px' }}>Exercises Routine</Typography>
      <Stack width='fit-content' alignItems="center" justifyContent="center" sx={{border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2}}>
        <Typography variant="h4" sx={{mb: 5}}>Create new routine</Typography>
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
        <Grid item xs={10} lg={5} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
          {routine.map((item) => (
            <Box key={item.idLichTap} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {item.tenLichTap} 
              </Typography>
                {
                  item.trangThai === "start" 
                  && <Typography variant="body1" component="div" color="red" sx={{ flexGrow: 1 }}>Started at {item.ngayTap}</Typography> 
                }
                {
                  item.trangThai === "finish"
                  && <Typography variant="body1" component="div" color="green" sx={{ flexGrow: 1 }}>Finished at {item.ngayTap}</Typography>
                }
              <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                {item.moTaLichTap}
              </Typography>
              <Button variant="contained" sx={{ m: 1 }} onClick={(e) => HandleViewClick(e, item.idLichTap)}>View</Button>
              <Button variant="contained" sx={{ m: 1 }} onClick={(e) => HandleEditClick(e, item.idLichTap)}>Edit</Button>
              <Button variant="contained" sx={{ m: 1 }} onClick={(e) => HandleDeleteClick(e, item.idLichTap)}>Delete</Button>
              {
                item.trangThai === "start" 
                ? <Button variant="contained" sx={{ m: 1 }} color="secondary" onClick={(e) => HandleFinishClick(e, item)}>Finish</Button> 
                : <Button variant="contained" color="secondary" sx={{ m: 1 }} onClick={(e) => HandleStartClick(e, item)}>Start</Button>
              }
            </Box>
          ))}
        </Grid>
        <Grid item xs={10} lg={5} sx={{border: 2, borderColor: 'blue', borderRadius: 1, p: 2, m: 2}}>
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