import React, { useState, useEffect } from "react";
import { Typography, CssBaseline, Container, Grid } from '@mui/material';
import serveur from './constantes';
import useStyles from './styles';
import Restaurants from "./components/Restaurants";

const ListeRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]) 

    const classes = useStyles();

    useEffect(() => {
        async function componentDidMount() {
          // obtenir les restaurants
          let url = `${serveur}/restaurants`;
          let resultatResto = await fetch(url);
          if (resultatResto.ok) {
            let data = await resultatResto.json();
            setRestaurants(data)
          } else {
            console.log("une erreur s'est produite lors de l'appel à /restaurants");
          }
        }
        componentDidMount().then(() => console.log("componentDidMount terminé"));
        console.log("ListeRestaurant.useEffect terminé");
      }, []);
    
    return (
        <>
            <CssBaseline />
            <main>
                <div className={classes.background}>
                    <Container className={classes.cardGrid}>
                        <div>
                            <Typography className={classes.title} align="center" variant="h4" gutterBottom>
                                Liste des restaurants disponibles
                            </Typography>
                        </div>
                        <div>
                        <Grid container spacing={4}>
                            {restaurants.map((resto) => (
                                <Restaurants resto={resto} key={resto.id}/>  
                            ))} 
                        </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </>
        )
}

export default ListeRestaurants;