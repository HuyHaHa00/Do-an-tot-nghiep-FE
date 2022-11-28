import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, TextField } from '@mui/material'
import QRCodeVCB from '../assets/images/QR-code-VCB.jpg'
import axios from 'axios'

const PremiumPage = () => {

  const win = window.sessionStorage;
  const userID = win.getItem("userID");
  const trangThaiPremium = win.getItem("trangThaiPremium");

  const [transactionCode, setTransactionCode] = useState("");
  const [method, setMethod] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if(trangThaiPremium === "yes"){
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
      return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Typography variant="h4" sx={{marginBottom: '1rem'}}>Buy Premium</Typography>
          <Typography variant="h6" sx={{marginBottom: '1rem'}}>You can buy premium to get more features</Typography>
          <Typography variant="h6" sx={{marginBottom: '1rem'}}>Premium price is 59.99$ per year</Typography>
          <Typography variant="h6" sx={{marginBottom: '1rem'}}>You can send your payment through one of these methods</Typography>
          <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setMethod("paypal")} >1. Paypal</Button>
          {method === "paypal" && renderPaypal()}
          <Button variant="text" sx={{marginBottom: '1rem', color: "blue", fontSize: "20px"}} onClick={()=> setMethod("bank")}>2. Bank Transfer</Button>     
          {method === "bank" && renderBankTransfer()} 
          <Typography variant="h6" sx={{marginBottom: '1rem'}}>After complate your transaction, please enter your transaction code</Typography>
          <TextField
            id="outlined-basic"
            label="Bill Code"
            variant="outlined"
            sx={{marginBottom: '1rem'}}
            onChange={(e) => setTransactionCode(e.target.value)}
          />
          <Button variant="contained" onClick={HandleBuyPremium}>Buy Premium</Button>
        </Box>
      )
    }
    
    const renderAlreadyPremium = () => {
        return(
          <>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Typography variant="h4" sx={{marginBottom: '1rem'}}>You are a premium user</Typography>
            <Typography variant="h6" sx={{marginBottom: '1rem'}}>You can enjoy all features</Typography>
            <Typography variant="h6" sx={{marginBottom: '1rem'}}>Thank you for using our service</Typography>
          </Box>
          <Box>
              <Typography variant="h3" sx={{marginBottom: '1rem', marginLeft: '1rem'}}>Premium Exercise Collections</Typography>
              <Stack direction="column" spacing={2} sx={{marginBottom: '1rem', marginLeft: '2rem'}}>
                <Typography variant="h4" sx={{marginBottom: '1rem', color: 'blue'}}>1. Arm focus collection</Typography>
                <Typography variant="h5" sx={{marginBottom: '1rem'}}>Exercise 1</Typography>
                <Typography variant="h5" sx={{marginBottom: '1rem'}}>Exercise 2</Typography>
                <Typography variant="h5" sx={{marginBottom: '1rem'}}>Exercise 3</Typography>
              </Stack>
              <Stack direction="column" spacing={2} sx={{marginBottom: '1rem', marginLeft: '2rem'}}>
                <Typography variant="h4" sx={{marginBottom: '1rem', color: 'blue'}}>2. Leg focus collection</Typography>
                <Typography variant="h5" sx={{marginBottom: '1rem'}}>Exercise 1</Typography>
                <Typography variant="h5" sx={{marginBottom: '1rem'}}>Exercise 2</Typography>
                <Typography variant="h5" sx={{marginBottom: '1rem'}}>Exercise 3</Typography>
              </Stack>
          </Box>
          </>
        )
      }

    const renderPaypal = () => {
      return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: 'red', borderRadius: 1, p: 2, m: 2}}>
          <Typography variant="h4" sx={{marginBottom: '1rem'}}>Paypal</Typography>
          <Typography variant="h6" sx={{marginBottom: '1rem'}}>You can pay through <a href="https://www.paypal.com/paypalme/HuyGoldGym">this</a> Paypal link</Typography>
          <Typography variant="h6" sx={{marginBottom: '1rem'}}>Paypal Name: HuyGoldGym</Typography>
        </Box>
      )
    }

    const renderBankTransfer = () => {
      return(
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: 'red', borderRadius: 1, p: 2, m: 2}}>
          <Typography variant="h4" sx={{marginBottom: '1rem'}}>Bank Transfer</Typography>
          <Typography variant="h6" sx={{marginBottom: '1rem'}}>You can pay through bank transfer</Typography>
          <Typography variant="h6" sx={{marginBottom: '1rem'}}>Bank Name: Vietcombank</Typography>
          <Box>
            <img src={QRCodeVCB} alt="QRCodeVCB" style={{width: "400px"}}/>
          </Box>
        </Box> 
      )
    }


  return (
    <Box mt="100px">
      {isPremium ? renderAlreadyPremium() : renderBuyPremium()}
    </Box>
  )
}

export default PremiumPage