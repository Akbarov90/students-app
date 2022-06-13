import React, {useState, useEffect} from 'react';
import {Button, Grid, Paper, Box, Container, Avatar, TextField, Typography} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import {Link} from "react-router-dom";
import {userRegister} from "../redux/auth/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    let token  = localStorage.getItem('token');
    const {regSuccess} = useSelector(state => state.auth);
    const [fullName, setFullname] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const paperStyle = {padding: 20, height: '500px', width: 480}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
    const submitForm = (e) => {
        e.preventDefault();

        console.log(fullName, username, password, phone)
        dispatch(userRegister({fullName, username, password, phone}))

    }
    useEffect(() => {
        if (!!regSuccess) {
            toast.success("Registration Succcess!!")
            navigate('/login');
        }
    }, [regSuccess])

    useEffect(() => {
        if (token)
            navigate('/')
    }, [token])

    return (
        <>
            <Container fixed>
                <Grid>
                    <Paper sx={{my: 6, mx: 'auto'}} elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockIcon/></Avatar>
                            <h2>Registration</h2>
                        </Grid>

                        <form onSubmit={submitForm}>
                            <TextField
                                required={true}
                                type="text"
                                variant="outlined"
                                color="primary"
                                label="Full Name"
                                value={fullName}
                                onChange={(e) => {
                                    setFullname(e.target.value)
                                }}
                                fullWidth
                            />
                            <Box height={14}/>
                            <TextField
                                required={true}
                                value={username}
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }}
                                type="text"
                                variant="outlined"
                                color="primary"
                                label="Username"
                                fullWidth
                            />
                            <Box height={14}/>
                            <TextField
                                required={true}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                type="password"
                                variant="outlined"
                                color="primary"
                                label="Password"
                                fullWidth
                            />
                            <Box height={14}/>
                            <TextField
                                required={true}
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                }}
                                type="number"
                                variant="outlined"
                                color="primary"
                                label="Telephone number"
                                fullWidth

                            />
                            <Box height={14}/>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                Sign up
                            </Button>
                            <Box height={14}/>
                        </form>

                        <Typography style={{textAlign: "center"}}> Do you have an account ?
                            <Link style={{textDecoration: "none", color: '#1976d2'}} to={"/login"}>
                                Login
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Container>

        </>
    )
}

export default Register;