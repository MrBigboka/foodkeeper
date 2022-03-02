import React, { useState, useContext } from "react";
import {Link} from "react-router-dom";
import serveur from '../constantes'
import useStyles from '../styles';
import { Typography, Button, Card, Stack, CardContent, CardActions, Grid } from '@mui/material';

function Reservations(props) {
    const classes = useStyles(); 


    return (
        <Grid item key={props.reserv} xs={12} sm={12} md={12}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                        Réservation chez <b>NomResto</b>
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Nom sur la réservation :</b> Nom, Prenom
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Nombre de personnes : </b> x personnes
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Heure de la réservation : </b> Date
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Téléphone : </b> 514-222-2222
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Note : </b> Loremblablabla
                    </Typography>
                    <CardActions>
                    <Stack
                        className={classes.flexClass}
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={1}
                    >   
                            <Button 
                                //onClick={handleDelete}
                                style={{ background:'#2E3B55' }} 
                                size="small"
                                variant="contained">
                                Modifier ma réservation
                            </Button>
                            <Button style={{float: 'right'}} variant='outlined' size="small" color="error">
                                Supprimer ma réservation
                            </Button>
                        </Stack>
                    </CardActions>
                </CardContent>
            </Card>
       </Grid>
    )
}   


export default Reservations