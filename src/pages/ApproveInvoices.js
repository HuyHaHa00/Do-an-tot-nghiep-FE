import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Grid, Button } from '@mui/material'
import axios from 'axios';

const ApproveInvoices = () => {
    const [invoices, setInvoices] = useState([]);//lay toan bo hoa don
    const [accountData, setAccountData] = useState([]);//lay thong tin tai khoan
    const [selectedInvoice, setSelectedInvoice] = useState({});//lay hoa don duoc chon
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        //get invoices
        axios.get(`https://localhost:7090/api/TblDonGds`)
            .then(res => {
                setInvoices(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [refresh]);

    const HandleViewDetail = (e, invoice) => {
        setSelectedInvoice(invoice);
        axios.get(`https://localhost:7090/api/TblThongTinTks/taikhoan/${invoice.idTaiKhoan}`)
            .then(res => {
                setAccountData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const renderInvoices = () => {
        return invoices.map((invoice, index) => {
            return (
                <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: 1, p: 2, mb: 2 }}>
                    <Typography>Invoice ID: {invoice.idDonGd}</Typography>
                    <Typography>Account ID: {invoice.idTaiKhoan}</Typography>
                    <Typography>Invoice Time: {invoice.tgguiDon}</Typography>
                    <Typography>Invoice Code: {invoice.maGd}</Typography>
                    <Typography>Invoice State: {invoice.ttpheDuyet}</Typography>
                    <Button variant="contained" onClick={(e) => { HandleViewDetail(e, invoice) }}>View Details</Button>
                </Box>
            )
        })
    }

    const renderInvoiceDetails = () => {
        const HandleApproveInvoice = (e) => {
            //thay doi hoa don, sau do thay doi tai khoan
            //thay doi hoa don
            axios.put(`https://localhost:7090/api/TblDonGds`, {
                idDonGd: selectedInvoice.idDonGd,
                idTaiKhoan: selectedInvoice.idTaiKhoan,
                tgguiDon: selectedInvoice.tgguiDon,
                maGd: selectedInvoice.maGd,
                ttpheDuyet: "DUYET"
            })
                .then(res => {
                    console.log(res);
                    setRefresh(!refresh);
                })
                .catch(err => {
                    console.log(err);
                })

            //thay doi tai khoan
            //lay thong tin tai khoan truoc
            axios.get(`https://localhost:7090/api/TblTaiKhoans/${selectedInvoice.idTaiKhoan}`)
                .then(res => {
                    console.log(res);
                    //thay doi tai khoan
                    axios.put(`https://localhost:7090/api/TblTaiKhoans`, {
                        idTaiKhoan: selectedInvoice.idTaiKhoan,
                        tenDangNhap: res.data.tenDangNhap,
                        matKhau: res.data.matKhau,
                        quyen: res.data.quyen,
                        trangThaiPremium: "yes",
                        thoiGianDk: res.data.thoiGianDk
                    })
                        .then(res => {
                            console.log(res);
                            setRefresh(!refresh);
                            window.alert("Approve invoice successfully!");
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
            
        }

        const HandleRejectInvoice = () => {
            //thay doi hoa don
            axios.put(`https://localhost:7090/api/TblDonGds`, {
                idDonGd: selectedInvoice.idDonGd,
                idTaiKhoan: selectedInvoice.idTaiKhoan,
                tgguiDon: selectedInvoice.tgguiDon,
                maGd: selectedInvoice.maGd,
                ttpheDuyet: "KHONG"
            })
                .then(res => {
                    console.log(res);
                    setRefresh(!refresh);
                    window.alert("Reject invoice successfully!");
                })
                .catch(err => {
                    console.log(err);
                })
        }

        return (
            <Stack spacing={2}>
                <Typography>Account information</Typography>
                <Box sx={{ border: 2, borderColor: 'black', borderRadius: 1, p: 2, mb: 2, minWidth: 500 }}>
                    <Typography>Account ID: {accountData.idTaiKhoan}</Typography>
                    <Typography>Name: {accountData.hoTen}</Typography>
                    <Typography>Gender: {accountData.gioiTinh}</Typography>
                    <Typography>Email: {accountData.email}</Typography>
                    <Typography>Phone: {accountData.sdt}</Typography>
                    <Typography>Age: {accountData.tuoi}</Typography>
                    <Typography>Invoice Code: {selectedInvoice.maGd}</Typography>
                    <Typography color={selectedInvoice.ttpheDuyet === "KHONG" ? "red" : "green"}>Invoice State: {selectedInvoice.ttpheDuyet}</Typography>
                    <Button variant="contained" ml="20px" onClick={(e) => { HandleApproveInvoice() }}>Approve</Button>
                    <Button variant="contained" color="secondary" ml="20px" onClick={(e) => { HandleRejectInvoice() }}>Reject</Button>
                </Box>
            </Stack>
        )
    }

    return (
        <Box sx={{ flexGrow: 1, mt: 5, ml: 5, mr: 5 }}>
            <Typography variant="h3" mt="5" mb="5" align="center">Approve Invoices</Typography>
            <Grid container spacing={2} m="auto">
                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom component="div"> Invoices </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h4" gutterBottom component="div"> Invoice Details </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Stack spacing={2} overflow="auto" maxHeight="700px">
                        {renderInvoices()}
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={2}>
                        {selectedInvoice !== null ? renderInvoiceDetails() : <Typography>Click on an invoice to view details</Typography>}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )

}

export default ApproveInvoices