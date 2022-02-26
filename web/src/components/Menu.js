import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import useStyles from '../styles';
import {useContext} from "react";
import {TokenContext} from "../App";

export default function Menu() {
    const navigate = useNavigate();
    const classes = useStyles();
    const tokenContext = useContext(TokenContext);

    const [anchorEl, setAnchorEl] = useState(null);


    const login = () => {
        navigate('/login');
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    {tokenContext.token !== '' &&
                    <>
                    <MenuItem>
                        <Link className={classes.styleRemover} to='/liste'>
                        <Typography textAlign="center"> Restaurations </Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link className={classes.styleRemover} to='/profile'>
                            <Typography textAlign="center"> Profile </Typography>
                        </Link>
                    </MenuItem>
                    </>
                    }
                    {
                    tokenContext.token === ""
                        ? (<Button color="inherit" onClick={login}>Se connecter</Button>)
                        :(
                            <div>
                                <Button onClick={logout}>Se deconnecter</Button>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                {/*<Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <Link className={classes.styleRemover} to='/profile'>
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    </Link>
                                    <MenuItem onClick={logout}>Se deconnecter</MenuItem>
                                </Menu>*/}
                            </div>
                            )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
