import React, {useState, useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [tok, setTok] = useState(false);
    let token = (localStorage.getItem('token'))
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            setTok(true)
        } else {
            setTok(false)
            navigate('/login')
        }
    }, [token])

    useEffect(()=>{

    },[])

    const logoutFunc = () => {
        localStorage.removeItem('token');
        window.location.reload(false);
    }

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
                            <Link style={{textDecoration: "none", color: 'white'}} to={"/"}>Students</Link>
                        </Typography>
                        {!!tok ?
                            <Button variant="contained" color="error"
                                    onClick={logoutFunc}>Logout</Button> :
                            <div>
                                <Link style={{textDecoration: "none", color: 'white'}} to={"/registration"}>
                                    <Button color="inherit">Registration</Button>
                                </Link>
                                <Link style={{textDecoration: "none", color: 'white'}} to={"/login"}>
                                    <Button color="inherit">Login</Button>
                                </Link>
                            </div>}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Header;