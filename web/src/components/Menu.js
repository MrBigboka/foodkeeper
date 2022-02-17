import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import useStyles from '../styles';

import {useContext} from "react";
import {TokenContext} from "../App";
export default function Menu() {
    const navigate = useNavigate();
    const classes = useStyles();
    const tokenContext = useContext(TokenContext);
    console.log(tokenContext.token);
    const login = () => {
        navigate('/login');
    }
    const logout = () => {
        tokenContext.token = "";
        navigate('/');
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{ background: '#2E3B55' }} position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link className={classes.styleRemover} to="/">
                            FoodKeeper
                             </Link>
                        </Typography>
                        <MenuItem>
                            <Link className={classes.styleRemover} to='/liste'>
                            <Typography textAlign="center"> Restaurations </Typography>
                            </Link>
                        </MenuItem>
                    {
                        tokenContext.token === ""
                            ? (<Button color="inherit" onClick={login}>Se connecter</Button>)
                            : (<Button color="inherit" onClick={logout}>Se deconnecter</Button>)
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
