import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Grid, Button, TextField, Select, MenuItem} from '@mui/material'
import axios from 'axios';

//a component to view and change the user's account information
//user can change their name, age, email, phone number, and password
const Account = () => {

    const win = window.sessionStorage;
    const userID = win.getItem("userID");

    const [account, setAccount] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("Please check your input again");
    const [refresh, setRefresh] = useState(false);

    var formIsValid = true;

    useEffect(() => {
        //use axios
        axios.get(`https://localhost:7090/api/TblThongTinTks/taikhoan/${userID}`)
            .then(res => {
                const data = res.data;
                console.log(data);
                setAccount(data);
                setName(data.hoTen);
                setAge(data.tuoi);
                setGender(data.gioiTinh);
                setEmail(data.email);
                setPhone(data.sdt);
            })
            .catch(err => {
                console.log(err);
            }
        )
    }, [refresh]);

    useEffect(() => {
        checkError();
    }, [name, age, gender, email, phone]);


    const HandleSavePI = () => {
        checkError();
        if(formIsValid) {
            axios.put(`https://localhost:7090/api/TblThongTinTks/${userID}`, {
                idThongTinTk: account.idThongTinTk,
                idTaiKhoan: userID,
                hoTen: name,
                gioiTinh: gender,
                tuoi: age,
                sdt: phone,
                email: email,
            })
            .then(res => {
                alert("Update personal information successfully!");
                setRefresh(!refresh);
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            alert(error);
        }
    }

    const HandleSavePW = () => {
        if(!currentPassword || !newPassword || !confirmNewPassword) {
            alert("Please fill in all password fields");
        }
        else if(newPassword !== confirmNewPassword) {
            alert("New password and confirm new password do not match");
        }
        else {
            axios.get(`https://localhost:7090/api/TblTaiKhoans/${userID}`)
            .then(res => {
                const data = res.data;
                if(data.matKhau !== currentPassword) {
                    alert("Current password is incorrect");
                }
                else {
                    axios.put(`https://localhost:7090/api/TblTaiKhoans/${userID}`, {
                        idTaiKhoan: userID,
                        tenDangNhap: data.tenDangNhap,
                        matKhau: newPassword,
                        quyen: data.quyen,
                        trangThaiPremium: data.trangThaiPremium,
                        thoiGianDk: data.thoiGianDk,
                    })
                    .then(res => {
                        console.log(res);
                        alert("Update password successfully!");
                        setRefresh(!refresh);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const checkError = () => {
        if (name === "") {
            formIsValid = false
            setError("Name cannot be empty!");
        }
        else if (!age || age < 18 || age > 100) {
            formIsValid = false;
            setError('Age is not valid');
        }
        else if (!gender && gender !== "Nam" && gender !== "Nu" && gender !== "Nữ" && gender !== "Male" && gender !== "Female") {
            formIsValid = false;
            setError('Gender is not valid');
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
            formIsValid = true;
            setError('');
        }
        console.log(error);
    }

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', p: 1, m: 1, borderRadius: 1 }}>
            <Stack spacing={2} width="50vw" m="auto">
                <Typography variant="h4" component="div" gutterBottom>Account</Typography>
                <Typography variant="h6" component="div" gutterBottom>Personal Information</Typography>
                    <TextField
                        required id="name" name="name" label="Name" fullWidth autoComplete="name" value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required id="age" name="age" label="Age" fullWidth autoComplete="age" value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <MenuItem value="Nam">Male</MenuItem>
                        <MenuItem value="Nu">Female</MenuItem>
                    </Select>
                    <TextField
                        required id="phone" name="phone" label="Phone Number" fullWidth autoComplete="phone" value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        required id="email" name="email" label="Email" fullWidth autoComplete="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                <Button variant="contained" onClick={() => {HandleSavePI()}}>Save</Button>
            </Stack>

            <Stack spacing={2} width="50vw" m="auto" mt="70px">
                <Typography variant="h6" component="div" gutterBottom>Change Password</Typography>
                    <TextField 
                        required id="currentPassword" name="currentPassword" label="Current Password" fullWidth autoComplete="current-password" value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        required id="newPassword" name="newPassword" label="New Password" fullWidth autoComplete="New password" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        required id="confirmNewPassword" name="confirmNewPassword" label="Confirm New Password" fullWidth autoComplete="confirmNewPassword" value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                <Button variant="contained" onClick={() => {HandleSavePW()}}>Save</Button>
            </Stack>
        </Box>
    )
}

export default Account