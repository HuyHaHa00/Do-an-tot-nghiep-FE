import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, TextField, Grid } from '@mui/material'
import QRCodeVCB from '../assets/images/QR-code-VCB.jpg'
import QRcodeMomo from '../assets/images/QR-code-Momo.jpg'
import boxer from '../assets/images/boxer-1.jpg'
import axios from 'axios'

const PremiumPage = () => {

  const win = window.sessionStorage;
  const userID = win.getItem("userID");
  const trangThaiPremium = win.getItem("trangThaiPremium");

  const [transactionCode, setTransactionCode] = useState("");
  const [method, setMethod] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (trangThaiPremium === "yes") {
      setIsPremium(true);
    }
  }, []);

  const HandleBuyPremium = () => {
    if (transactionCode === "") {
      alert("Please enter transaction code");
    }
    else {
      axios.post("https://localhost:7090/api/TblDonGds", {
        idTaiKhoan: userID,
        tgguiDon: new Date().toISOString(),
        maGd: transactionCode,
        ttpheDuyet: null,
      })
        .then((response) => {
          alert("Your request has been sent. Please wait for admin to approve your request!");
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
  }

  const renderBuyPremium = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Buy Premium</Typography>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>You can buy premium to get more features</Typography>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Premium price is 59.99$ per year</Typography>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>You can send your payment through one of these methods</Typography>
        <Button variant="text" sx={{ marginBottom: '1rem', color: "red", fontSize: "20px" }} onClick={() => setMethod("paypal")} >1. Paypal</Button>
        {method === "paypal" && renderPaypal()}
        <Button variant="text" sx={{ marginBottom: '1rem', color: "blue", fontSize: "20px" }} onClick={() => setMethod("bank")}>2. Bank Transfer</Button>
        {method === "bank" && renderMomoTransfer()}
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>After complate your transaction, please enter your transaction code</Typography>
        <TextField
          id="outlined-basic"
          label="Bill Code"
          variant="outlined"
          sx={{ marginBottom: '1rem' }}
          onChange={(e) => setTransactionCode(e.target.value)}
        />
        <Button variant="contained" onClick={HandleBuyPremium}>Buy Premium</Button>
      </Box>
    )
  }

  const renderAlreadyPremium = () => {
    return (
      <>
        <Typography variant='h3' textAlign="center">Premium Routine 2.0</Typography>
        <Grid container spacing={2} mt="20px">
          <Grid item xs={12} sm={5} ml="20px" mt="20px" sx={{backgroundColor: '#F5F5F5'}}>
            <img src={boxer} alt="boxer" style={{ width: "30%",}} />
            <Typography variant='h5' >
              Repetition Speed: <br />
              1 Second Down, 1 Second Pause, 1 Second Up, 1 Second Pause
              Rest Times: <br />
              2-3 Minutes between sets. <br />
              5 Minutes between separate exercises (i.e. Pushups, Leg Raises, etc.) <br />
              <br />Adjust these as needed! For example, after finishing the first set of pushups, a user will wait 2-3 minutes before starting their next set. After they finished 2-3 sets of pushups, they’ll wait 5 minutes before starting on Leg Raises.
              <br />
              This program <b>works the entire body</b> and is designed to cover all the most common goals in fitness:
              <br />
              Gain muscle
              <br />
              Gain strength
              <br />
              Lose fat
              <br />
              When in doubt, start here!
            </Typography>
            <Typography variant='h4' >
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} ml="20px">
            <Typography variant='h5' >
              <ul><b>Day 1</b><br />
                <li><b>Pushups</b><br />3 sets of 10 reps</li>
                <li><b>Leg Raises</b><br />3 sets of 10 reps</li>
                <li><b>Plank</b><br />3 sets of 30 seconds</li>
              </ul><br />

              <ul><b>Day 2</b><br />
                <li><b>Squats</b><br />3 sets of 10 reps</li>
                <li><b>Crunches</b><br />3 sets of 10 reps</li>
                <li><b>Side Plank</b><br />3 sets of 30 seconds</li>
              </ul><br />

              <ul><b>Day 3</b><br />
                <li><b>Pushups</b><br />3 sets of 10 reps</li>
                <li><b>Leg Raises</b><br />3 sets of 10 reps</li>
                <li><b>Plank</b><br />3 sets of 30 seconds</li>
              </ul><br />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant='h5' >
              <ul><b>Day 4</b><br />
                <li><b>Squats</b><br />3 sets of 10 reps</li>
                <li><b>Crunches</b><br />3 sets of 10 reps</li>
                <li><b>Side Plank</b><br />3 sets of 30 seconds</li>
              </ul><br />

              <ul><b>Day 5</b><br />
                <li><b>Pushups</b><br />3 sets of 10 reps</li>
                <li><b>Leg Raises</b><br />3 sets of 10 reps</li>
                <li><b>Plank</b><br />3 sets of 30 seconds</li>
              </ul><br />

              <ul><b>Day 6</b><br />
                <li><b>Squats</b><br />3 sets of 10 reps</li>
                <li><b>Crunches</b><br />3 sets of 10 reps</li>
                <li><b>Side Plank</b><br />3 sets of 30 seconds</li>
              </ul><br />

              <ul><b>Day 7</b><br />
                <li><b>Rest</b><br />Take a break!</li>
              </ul><br />
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  }

  const renderPaypal = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: 'red', borderRadius: 1, p: 2, m: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Paypal</Typography>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>You can pay through <a href="https://www.paypal.com/paypalme/HuyGoldGym">this</a> Paypal link</Typography>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Paypal Name: HuyGoldGym</Typography>
      </Box>
    )
  }

  const renderMomoTransfer = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: 'red', borderRadius: 1, p: 2, m: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Bank Transfer</Typography>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>You can pay through Momo transfer</Typography>
        <Typography variant="h6" sx={{ marginBottom: '1rem' }}></Typography>
        <Box>
          <img src={QRcodeMomo} alt="QRcodeMomo" style={{ width: "400px" }} />
        </Box>
      </Box>
    )
  }


  return (
    <Box mt="50px">
      {isPremium ? renderAlreadyPremium() : renderBuyPremium()}
    </Box>
  )
}

export default PremiumPage