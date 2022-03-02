import React, { useContext } from "react";
import { Typography, CssBaseline, Container, Button, Stack} from '@mui/material';
import backgroundGif from './media/foodkeep.gif'
import {TokenContext} from "./App";
//import {serveur} from "./constantes"
import useStyles from './styles';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const tokenContext = useContext(TokenContext); 

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }

    
    const liste = () => {
        navigate('/liste');
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
                        {tokenContext.token !== '' &&
                            <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="baseline"
                            spacing={2}
                             >
                                <Button
                                    variant="contained"
                                    onClick={liste}>
                                    Liste des restaurants
                                </Button>
                            </Stack>
                        }
                        {tokenContext.token === '' &&
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="baseline"
                                spacing={2}
                            >
                                <Button
                                    variant="contained"
                                    onClick={register}>
                                    S'inscrire
                                </Button>
                                <Button 
                                variant="outlined" 
                                onClick={login}>
                                    Se connecter
                                </Button>
                            </Stack>
                        }
                </Container>
            </div>
        </main>
      </>
    );
}

export default Home;
