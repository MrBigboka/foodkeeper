import React, { useContext } from "react";
import serveur from '../constantes'
import useStyles from '../styles';
import { useNavigate } from "react-router-dom";
import {TokenContext} from "../App";
import { Typography, Button, Card, Stack, CardContent, CardActions, Grid } from '@mui/material';

function Reservations(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    const tokenContext = useContext(TokenContext);
    const date = new Date(props.reservation.date);
    const deleteReserv = async () => {
        const bearerToken = `bearer ${tokenContext.token}`;
        const response = await fetch(`${serveur}/reservations/${props.reservation.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: bearerToken,
            },
        });
        if (response.ok) {
            console.log('Réservation annulée !')
            navigate('/profilclient')
        } else {
            console.log(response.status);
        }
    }

    const modifReserv = () => {

    }

    return (
        <Grid item key={props.reserv} xs={12} sm={12} md={12}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                        Réservation chez <b>{props.reservation.nomResto}</b>
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Nom sur la réservation :</b> {props.reservation.prenom} {props.reservation.nom}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Nombre de personnes : </b> {props.reservation.nbPersonnes} personnes
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Heure de la réservation : </b> {date.toString()}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Téléphone : </b> {props.reservation.telephone}
                    </Typography>
                    <Typography variant="subtitle1">
                        <b> Note : </b> {props.reservation.note }
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
                            <Button onClick={deleteReserv} variant='outlined' size="small" color="error">
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
