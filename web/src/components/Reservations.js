import React, { useState } from "react";
import {Link} from "react-router-dom";
import serveur from '../constantes'
import useStyles from '../styles';
import { Typography, Button, Card, CardMedia, CardContent, CardActions, Grid } from '@mui/material';

function Reservations(props) {
    const classes = useStyles(); 

    return (
        <Grid item key={props.reserv} xs={12} sm={12} md={12}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                        Réservation chez NomResto
                    </Typography>
                    <Typography variant="subtitle2">
                        Nom sur la réservation : Nom, Prenom
                    </Typography>
                    <Typography variant="subtitle2">
                        Nombre de personnes : NbPersonnes
                    </Typography>
                    <Typography variant="subtitle2">
                        Heure de la réservation : Date
                    </Typography>
                    <Typography variant="subtitle2">
                        Heure de la réservation : Date
                    </Typography>
                    <Typography variant="subtitle2">
                        Heure de la réservation : Date
                    </Typography>
                    <CardActions style={{display: 'flex'}}>
                    <Button 
                        //onClick={handleDelete}
                        style={{ background:'#2E3B55', alignItems: 'right'}} 
                        size="small"
                        variant="contained">
                        Modifier ma réservation
                    </Button>
                    <Button size="small" style={{ color: "#ba000d" }}>
                        Supprimer ma réservation
                    </Button>
                    </CardActions>
                </CardContent>
            </Card>
       </Grid>
    )
}   


export default Reservations