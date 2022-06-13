import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {styled} from '@mui/material/styles';
import {getStudents, deleteStudent, addStudent} from "../redux/sudents/students";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import {Myloader} from "../components/Myloader";
import {TextField} from "@mui/material";



const Home = () => {
    const {register, handleSubmit, reset} = useForm();

    let token = localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, students, dataStudents} = useSelector(state => state.students);
    // console.log(dataStudents)

    useEffect(() => {
        if (!!!token)
            // !!! -
            navigate('/login');
    }, [token])

    useEffect(() => {
        if (dataStudents) {
            dispatch(getStudents())
            reset();
        }

    }, [dataStudents, reset])

    useEffect(() => {
        dispatch(getStudents())
        console.log(students)
    }, [])

    const addSubmit = (val) => {
        dispatch(addStudent(val))
    }

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div>
            <Container fixed>

                <div style={{ padding: '60px 0'}}>
                    <form onSubmit={handleSubmit(addSubmit)}>
                        <TextField
                            {...register('fullName')}
                            required={true}
                            type={'text'}
                            variant="outlined"
                            color="primary"
                            label="Full Name"
                            sx={{m: 2}}
                        />
                        <TextField
                            {...register('universityName')}
                            required={true}
                            type={'text'}
                            variant="outlined"
                            color="primary"
                            label="University Name"
                            sx={{m: 2}}
                        />
                        <TextField
                            {...register('entranceYear')}
                            required={true}
                            type={'text'}
                            variant="outlined"
                            color="primary"
                            label="Entrance Year"
                            sx={{m: 2}}
                        />
                        <TextField
                            {...register('studyType')}
                            required={true}
                            type={'text'}
                            variant="outlined"
                            color="primary"
                            label="Study type"
                            sx={{m: 2}}
                        />
                        <TextField
                            {...register('organizationId')}
                            required={true}
                            type={'text'}
                            variant="outlined"
                            color="primary"
                            label="Organization Id"
                            sx={{m: 2}}
                        />
                        <Button type={'submit'} sx={{p: 1.5, m: 2}} variant="contained" color="success">Add student</Button>
                    </form>
                </div>

                {loading ? <Myloader/>:
                    <TableContainer component={Paper} sx={{my: 7}}>
                        <Table sx={{minWidth: 900,}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>№</StyledTableCell>
                                    <StyledTableCell align="right">Full Name</StyledTableCell>
                                    <StyledTableCell align="right">University Name</StyledTableCell>
                                    <StyledTableCell align="right">Entrance Year</StyledTableCell>
                                    <StyledTableCell align="right">Study Type</StyledTableCell>
                                    <StyledTableCell align="right">Organization Id</StyledTableCell>
                                    <StyledTableCell align="right">Options</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((item, i) => (
                                    <StyledTableRow key={i + 1}>
                                        <StyledTableCell component="th" scope="row">{i + 1}</StyledTableCell>
                                        <StyledTableCell align="right">{item.fullName}</StyledTableCell>
                                        <StyledTableCell align="right">{item.universityName}</StyledTableCell>
                                        <StyledTableCell align="right">{item.entranceYear}</StyledTableCell>
                                        <StyledTableCell align="right">{item.studyType}</StyledTableCell>
                                        <StyledTableCell align="right">{item.organizationId}</StyledTableCell>
                                        <StyledTableCell align="right"><Button variant="contained"><Link
                                            style={{textDecoration: "none", color: 'white'}}
                                            to={`students/${item.id}`}>Update</Link></Button></StyledTableCell>
                                        <StyledTableCell align="right"><Button variant="contained"
                                                                               color="error"
                                                                               onClick={()=> dispatch(deleteStudent(item.id))}>Delete</Button></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Container>
        </div>
    )
}
export default Home;