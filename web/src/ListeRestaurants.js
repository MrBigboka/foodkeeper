import React, { useState, useEffect } from "react";
import { Typography, CssBaseline, Container, Grid } from '@mui/material';
import useStyles from './styles';
import Restaurants from "./components/Restaurants";

const ListeRestaurants = () => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9] //test ça va devenir restaurants qui va falloir loop
    const [restaurants, setRestaurants] = useState([])
    const classes = useStyles();

    /*useEffect(() => {
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
      }, []);*/
    
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
                            {cards.map((resto) => (
                                <Restaurants resto={resto} key={resto}/>  
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