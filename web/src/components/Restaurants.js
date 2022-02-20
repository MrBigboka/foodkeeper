import React, { useState } from "react";
import {Link} from "react-router-dom";
import useStyles from '../styles';
import { Typography, Button, Card, CardMedia, CardContent, CardActions, Grid } from '@mui/material';
import ModalReservation from "./ModalReservation";

function Restaurants(props) {
    const classes = useStyles(); 
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);

    return (
        <Grid item key={props.resto} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={props.resto.image} title={props.resto.title} />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                        Nom du restaurant
                    </Typography>
                    <Typography>
                        Ce restaurant est un restaurant situé sur la Rive Sud. Le plat sont sublime et délicieux
                    </Typography>
                    <CardActions>
                    <Button onClick={handleOpen} 
                            style={{ background:'#2E3B55'}} 
                            size="small" 
                            variant="contained">
                                Réserver
                    </Button>
                    <ModalReservation openModal={openModal} setOpen={setOpenModal} />                         
                    <Link className={classes.styleRemover} to={`/detailresto/${props.resto}`}>
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