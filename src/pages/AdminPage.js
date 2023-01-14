import React from 'react'
import {useState, useEffect} from 'react'
import {Box, Stack, Typography, Button, TextField, Grid} from '@mui/material'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination} from '@mui/material';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const AdminPage = () => {

    const [selected, setSelected] = useState("");
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [createOrEditData, setCreateOrEditData] = useState([]);
    const [createOrEdit, setCreateOrEdit] = useState("");

    const navigate = useNavigate();

    const win = window.sessionStorage;
    const quyen = win.getItem("quyen");
    if(quyen !== "admin") {
        navigate("/");
    }

    //a function to get data from database, have 1 parameter: url
    const getData = (url) => {
        axios.get(url)
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    //paging part of table
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const renderTable = (tableName, tableRowsName, RowsName, data) => {
        return (
            <Box sx={{width: '80%', height: '100%', margin: 'auto'}}>
                <Typography variant="h5" component="div" sx={{textAlign: 'center', mt: 2, mb: 2}}> {tableName} </Typography>
                <Button variant="contained" sx={{mb: 2}} onClick={() => {setCreateOrEdit("Create"); setCreateOrEditData([])}}>Create</Button>
                <Button variant="contained" sx={{mb: 2, ml: 2}} onClick={() => {setCreateOrEdit("Edit"); setCreateOrEditData([])}}>Edit</Button>
                {createOrEdit ? renderCreateOrEdit(tableName, RowsName) : null}
                <TableContainer sx={{maxHeight: 800}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tableRowsName.map((rowName) => (
                                    <TableCell key={rowName} align="center">
                                        {rowName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={row.id}>
                                        {RowsName.map((rowName) => {
                                            const value = row[rowName];
                                            return (
                                                <TableCell key={rowName} align="center">
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="center">
                                            <Button variant="contained" onClick={()=>{HandleDelete(row)}}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            width="100%"
                        />
                    </Table>
                </TableContainer>
            </Box>
        )
    }

    const deleteRow = (url, id) => {
        axios.delete(url + "/" + id)
        .then(res => {
            console.log(res);
            alert("Delete Succesfully!");
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const HandleDelete = (row) => {
        if(selected === "baitap"){
            console.log(Object.values(row)[3]);
            //confirm box, then process
            if(window.confirm("Are you sure you want to delete this item?") === true) {
                deleteRow("https://localhost:7090/api" + selected, Object.values(row)[3]);
                setRefresh(!refresh);
            }
        }
        else {
            if(window.confirm("Are you sure you want to delete this item?") === true) {
                deleteRow("https://localhost:7090/api/" + selected, Object.values(row)[0]);
                setRefresh(!refresh);
            }
        }
    }

    const HandleCreateOrEdit = () => {
        console.log(selected);
        if(createOrEdit === "Create"){
            axios.post("https://localhost:7090/api/" + selected, createOrEditData)
            .then(res => {
                console.log(res);
                alert("Create Succesfully!");
                setRefresh(!refresh);
            })
            .catch(err => {
                console.log(err);
            })
        }
        else if(createOrEdit === "Edit"){
            axios.put("https://localhost:7090/api/" + selected, createOrEditData)
            .then(res => {
                console.log(res);
                alert("Edit Succesfully!");
                setRefresh(!refresh);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        if(selected !== ""){
            getData("https://localhost:7090/api/" + selected);
        }
        setPage(0);
        setCreateOrEditData([]);
    }, [selected, refresh])

    const renderBaitap = () => {
        const tableRowsName = ["ID", "Tên bài tập", "Bộ phận", "Thiết bị", "Link ảnh", "Nhóm cơ"];
        const RowsName = ["idBaiTap", "tenBaiTap", "bpCoThe", "tbsuDung", "urlanh", "nhomCo"];
        return renderTable("Bài tập", tableRowsName, RowsName, data);
    };

    const renderDanhsachTap = () => {
        const tableRowsName = ["ID Danh sách tập", "ID tài khoản", "Tên danh sách tập", "Mô tả", "Loại danh sách tập"];
        const RowsName = ["idDstap", "idTaiKhoan", "tenDstap", "moTaDstap", "loaiDstap"];
        return renderTable("Danh sách tập", tableRowsName, RowsName, data);
    };

    const renderChitietDanhSanhTap = () => {
        const tableRowsName = ["ID", "ID bài tập", "ID danh sách tập", "Số lần", "Thời gian tập"];
        const RowsName = ["idChiTietDstap", "idBaiTap", "idDstap", "soLanTap", "thoiGianTap"];
        return renderTable("Chi tiết danh sách tập", tableRowsName, RowsName, data);
    };

    const renderLichTap = () => {
        const tableRowsName = ["ID", "ID danh sách tập", "ID tài khoản", "Ngày tập", "Thời gian tập", "Mô tả"];
        const RowsName = ["idLichTap", "idTaiKhoan", "tenLichTap", "moTaLichTap", "ngayTap", "trangThai"];
        return renderTable("Lịch tập", tableRowsName, RowsName, data);
    };

    const renderChitietLichTap = () => {
        const tableRowsName = ["ID chi tiết", "ID lịch tập", "ID danh sách tập", "Buổi tập", "Trạng thái"];
        const RowsName = ["idChiTietLichTap", "idLichTap", "idDstap", "buoiTap", "trangThaiBuoiTap"];
        return renderTable("Chi tiết lịch tập", tableRowsName, RowsName, data);
    };

    const renderTaiKhoan = () => {
        const tableRowsName = ["ID", "Tên đăng nhập", "Mật khẩu", "Quyền", "Trạng thái Premium", "Ngày đăng ký"];
        const RowsName = ["idTaiKhoan", "tenDangNhap", "matKhau", "quyen", "trangThaiPremium", "thoiGianDk"];
        return renderTable("Tài khoản", tableRowsName, RowsName, data);
    };
    const renderThongtinTaiKhoan = () => {
        const tableRowsName = ["ID", "ID tài khoản", "Họ Tên", "Giới tính", "Tuổi", "Số điện thoại", "Email"];
        const RowsName = ["idThongTinTk", "idTaiKhoan", "hoTen", "gioiTinh", "tuoi", "sdt", "email"];
        return renderTable("Thông tin tài khoản", tableRowsName, RowsName, data);
    };
    
    const renderDonGiaoDich = () => {
        const tableRowsName = ["ID đơn giao dịch", "ID tài khoản", "Thời gian gửi đơn", "Mã giao dịch", "Trạng thái phê duyệt"];
        const Rows = ["idDonGd", "idTaiKhoan", "tgguiDon", "maGd", "ttpheDuyet"];
        return renderTable("Đơn giao dịch", tableRowsName, Rows, data);
    };

    const renderCreateOrEdit = (tableName, RowsName) => {
        return (
            <Box>
                <Typography variant="h5" component="h2" gutterBottom>
                    {tableName}
                </Typography>
                {RowsName.map((rowName, index) => {
                    return (
                        <TextField
                            key={index}
                            name={rowName}
                            value={createOrEditData[rowName] || ""}
                            onChange={(e) => setCreateOrEditData({...createOrEditData, [rowName]: e.target.value })}
                            label={rowName}
                            variant="outlined"
                            margin="normal"
                            //if index = 0, it's id, so it's disabled, but if createOrEdit = Edit, all of them are enabled
                            disabled={index === 0 && createOrEdit === "Create" ? true : false}
                            />
                    );
                }
                )}
                <Button variant="contained" color="primary" onClick={HandleCreateOrEdit}>
                    {createOrEdit === "Create" ? "Create" : "Edit"}
                </Button>
            </Box>
        );
    };

  return (
    <Box>
        <Typography variant="h4" sx={{marginBottom: '1rem'}}>Admin Page</Typography>
        <Box>
            <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setSelected("TblBaiTaps")}>1. Bài tập</Button>  
            <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setSelected("TblDstaps")}>2. Danh sách tập</Button>
            <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setSelected("TblChiTietDstaps")}>3. Chi tiết danh sách tập</Button>
            <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setSelected("TblLichTaps")}>4. Lịch tập</Button>
            <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setSelected("TblChiTietLichTaps")}>5. Chi tiết lịch tập</Button>
            <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setSelected("TblTaiKhoans")}>6. Tài khoản</Button>
            <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setSelected("TblThongTinTks")}>7. Thông tin tài khoản</Button>
            <Button variant="text" sx={{marginBottom: '1rem', color: "red", fontSize: "20px"}} onClick={()=> setSelected("TblDonGds")}>8. Đơn giao dịch</Button>
            {selected === "TblDonGds" && renderDonGiaoDich()}
            {selected === "TblBaiTaps" && renderBaitap()}
            {selected === "TblDstaps" && renderDanhsachTap()}
            {selected === "TblChiTietDstaps" && renderChitietDanhSanhTap()}
            {selected === "TblLichTaps" && renderLichTap()}
            {selected === "TblChiTietLichTaps" && renderChitietLichTap()}
            {selected === "TblTaiKhoans" && renderTaiKhoan()}
            {selected === "TblThongTinTks" && renderThongtinTaiKhoan()}

        </Box>
    </Box>
  )
}

export default AdminPage