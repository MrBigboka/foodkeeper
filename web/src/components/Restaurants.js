import React, { useState } from "react";
import {Link} from "react-router-dom";
import serveur from '../constantes'
import useStyles from '../styles';
import { Typography, Button, Card, CardMedia, CardContent, CardActions, Grid } from '@mui/material';
import ModalReservation from "./ModalReservation";

function Restaurants(props) {
    const classes = useStyles(); 
    const image = `${serveur}/images/${props.resto.photo}`
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);


    return (
        <Grid item key={props.resto} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={image} title={props.resto.title} />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                        {props.resto.nomResto}
                    </Typography>
                    <Typography>
                        {props.resto.description}
                    </Typography>
                    <CardActions>
                    <Button onClick={handleOpen} 
                            style={{ background:'#2E3B55'}} 
                            size="small" 
                            variant="contained">
                                Réserver
                    </Button>
                    <ModalReservation openModal={openModal} setOpenModal={setOpenModal} />                         
                    <Link className={classes.styleRemover} to={`/detailresto/${props.resto.id}`}>
                        <Button size="small" color="primary">
                            Voir plus d'information.. 
                        </Button>
                    </Link>
                    </CardActions>
                </CardContent>
            </Card>
       </Grid>
    )
}   

export default Restaurants