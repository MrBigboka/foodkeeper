import React, { useState, useEffect } from "react";
import { Typography, CssBaseline, Container, Grid } from '@mui/material';
import serveur from './constantes';
import useStyles from './styles';
import Restaurants from "./components/Restaurants";
import {TextField} from "@material-ui/core";
const ListeRestaurants = () => {
    const [restaurants, setRestaurants] = useState([])
    const [recherche, setRecherche] = useState('');
    const [filtered, setFiltered] = useState(restaurants);
    const classes = useStyles();

    useEffect(() => {
        async function componentDidMount() {
          // obtenir les restaurants
          let url = `${serveur}/restaurants`;
          let resultatResto = await fetch(url);
          if (resultatResto.ok) {
            let data = await resultatResto.json();
            setRestaurants(data);
              setFiltered(data);
          } else {
            console.log("une erreur s'est produite lors de l'appel à /restaurants");
          }
        }
        componentDidMount().then(() => console.log("componentDidMount terminé"));
        console.log("ListeRestaurant.useEffect terminé");
      }, []);
    const handleResto = (newValue) => {
        setRecherche(newValue.target.value);
        if (newValue.target.value !== '' || recherche === '') {
            let temp = restaurants.filter((resto) =>
                resto.nomResto.toLowerCase().includes(newValue.target.value.toLowerCase())
            );
            setFiltered(temp);
        } else {
            setFiltered(restaurants);
        }
    };

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
                                <TextField className={classes.title} id="standard-basic" align="center" label="Recherche" placeholder='Nom de resto' variant="standard"
                                           style={{alignContent: 'center'}} value={recherche} onInput={handleResto}/> <br/>

                        </div>
                        <br/>
                        <div>
                        <Grid container spacing={4}>
                            {filtered.map((resto) => (
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
