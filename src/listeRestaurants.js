import React, { useState } from "react";
import { Typography, CssBaseline, Container, Button, Card, CardMedia, CardContent, CardActions, Grid } from '@mui/material';
import useStyles from './styles';

const ListeRestaurants = () => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9] //test ça va devenir restaurants qui va falloir loop
    const [restaurants, setRestaurants] = useState([])
    const classes = useStyles(); 

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
                            {cards.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardMedia className={classes.cardMedia} image={restaurants.image} title={restaurants.title} />
                                            <CardContent className={classes.cardContent}>
                                                <Typography gutterBottom variant="h5">
                                                    Nom du restaurant
                                                </Typography>
                                                <Typography>
                                                    Ce restaurant est un restaurant situé sur la Rive Sud. Le plat sont sublime et délicieux
                                                </Typography>
                                                <CardActions>
                                                <Button style={{ background:'#2E3B55'}} size="small" variant="contained">Réserver</Button>
                                                    <Button size="small" color="primary">Voir plus d'information.. </Button>
                                                </CardActions>
                                            </CardContent>
                                        </Card>
                                </Grid>
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