import React, {useState, useEffect} from 'react'
import {Button, Grid, Paper, Box, Container, Avatar, TextField, Snackbar, Alert} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from "react-router-dom";
import {userLogin} from "../redux/auth/auth";
import {useDispatch, useSelector} from "react-redux";


const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {success} = useSelector(state => state.auth)

    const paperStyle = {padding: 20, height: '500px', width: 480}
    const avatarStyle = {backgroundColor: '#1bbd7e'}

    useEffect(() => {
        if (!!success) {
            setTimeout(() => {
                setOpen(true)
            }, 3000)
            navigate('/')
        }
    }, [success])

    const onSubmitLogin = (e) => {
        // console.log(username, password)
        e.preventDefault();
        dispatch(userLogin({username, password}));
    }

    return (
        <>
            <Container fixed>
                <Grid>
                    <Paper sx={{my: 6, mx: 'auto'}} elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockIcon/></Avatar>
                            <h2>Login</h2>
                        </Grid>

                        <form onSubmit={onSubmitLogin}>
                            <Box height={14}/>
                            <TextField
                                value={username}
                                onChange={(event) => {
                                    setUserName(event.target.value)
                                }}
                                name="username"
                                type="text"
                                variant="outlined"
                                color="primary"
                                label="Username"
                                fullWidth
                                required={true}
                            />
                            <Box height={14}/>
                            <TextField
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                name="password"
                                type="password"
                                variant="outlined"
                                color="primary"
                                label="Password"
                                fullWidth
                                required={true}
                            />
                            <Box height={14}/>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                            >
                                Login
                            </Button>
                            <Box height={14}/>

                            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                      open={open} >
                                <Alert severity="success">Successfuly!! Authorizated</Alert>
                            </Snackbar>
                        </form>
                    </Paper>
                </Grid>
            </Container>
        </>
    )
}

export default Login;