//import React, {useEffect, useState} from "react";
import { Typography, CssBaseline, Container, Button, Stack} from '@mui/material';
import backgroundGif from './media/foodkeep.gif'
//import {serveur} from "./constantes"
import useStyles from './styles';
import { useNavigate } from "react-router-dom";
import * as React from "react";

const Home = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }
    const profile = () => {
        navigate('/profile');
    }
    return (
      <>
        <CssBaseline/>
        <main>
                <div className={classes.backgroundGif} style={{ backgroundImage: `url(${backgroundGif})` }}>
                <Container maxWidth="sm">
                        <Typography className={classes.title} align="center" variant="h1" color='#e8eaf6' gutterBottom>
                            FoodKeeper
                        </Typography>
                        <Typography className={classes.white} variant="h5" align="center" paragraph>
                            Bienvenue sur FoodKeeper. Le site numéro un pour les réservations dans le milieu de la restauration !
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                        >
                            <Button
                                style={{
                                    borderRadius: 20,
                                    backgroundColor: "#2E3B55",
                                    padding: "10px 36px",
                                }}
                                variant="contained"
                                onClick={register}>
                                S'inscrire
                            </Button>
                            <Button style={{
                                borderRadius: 20,
                                color: "white",
                                padding: "18px 36px",
                            }} variant="outlined" onClick={login}>Se connecter</Button>
                            <Button color="inherit" onClick={profile}>Profile</Button>
                        </Stack>
                </Container>
            </div>
        </main>
      </>
    );
}

export default Home;
