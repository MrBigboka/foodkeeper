import React, {useState, useEffect} from "react";
import serveur from './constantes';
//import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
//import DateFnsUtils from '@date-io/date-fns';
import ModalReservation from "./components/ModalReservation";
import { Typography, CssBaseline, Container, Grid, Button,} from '@mui/material';
import useStyles from './styles';
import {useParams} from "react-router-dom";

const DetailRestaurant = () => {
    const params = useParams();
    const classes = useStyles();
    const { RestaurantId } = params;
    const [openModal, setOpenModal] = useState(false);
    const [restaurant, setRestaurant] = useState();

    const handleOpen = () => setOpenModal(true);


    useEffect(() => {
      async function componentDidMount() {
        // obtenir les restaurants
        let url = `${serveur}/restaurants/${RestaurantId}`;
        let resultatResto = await fetch(url);
        if (resultatResto.ok) {
          let data = await resultatResto.json();
          setRestaurant(data)
        } else {
          console.log("une erreur s'est produite lors de l'appel à /restaurants");
        }
      }
      componentDidMount().then(() => console.log("componentDidMount terminé"));
      console.log("ListeRestaurant.useEffect terminé");
    }, [RestaurantId]);


    return (
      <>
        <CssBaseline/>
        <main>
            { restaurant !== undefined &&
            <div className={classes.background}>
              <Container maxWidth="md">
                <Grid container spacing={4}>
                  <Grid item xs={8}>
                    <Typography align="left" variant="h3" gutterBottom>
                      {restaurant.nomResto}
                    </Typography>
                    <Typography className={classes.detailResto} variant="body1" alignItems="left" paragraph>
                      {restaurant.description}
                    </Typography>
                    <div className="reservation">
                      <Button variant="contained" onClick={handleOpen} color="success">
                        Réserver maintenant
                      </Button>
                    </div>
                      <br/>
                      <Typography align="left" variant="h6" gutterBottom>
                          Heure d'ouverture: {restaurant.ouverture.substring(11,16)} - {restaurant.fermeture.substring(11,16)}
                      </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <img className={classes.imageSlide} src={`${serveur}/images/${restaurant.photo}`} alt="restaurant" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      CARACTÉRISTIQUES
                    </Typography>
                    {restaurant.caracteristique !== null ?
                      <Typography variant="subtitle1" paragraph>
                        {restaurant.caracteristique}
                      </Typography> :
                      <Typography variant="subtitle1" paragraph>
                        Aucune information à ce sujet.
                      </Typography>
                    }
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      FOURCHETTE DE PRIX
                    </Typography>
                    {restaurant.fourchette !== null ?
                      <Typography variant="subtitle1" paragraph>
                        {restaurant.fourchette}
                      </Typography> :
                      <Typography variant="subtitle1" paragraph>
                        Aucune information à ce sujet.
                      </Typography>
                    }
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      CUISINES
                    </Typography>
                    {restaurant.cuisines !== null ?
                      <Typography variant="subtitle1" paragraph>
                        {restaurant.cuisines}
                      </Typography> :
                      <Typography variant="subtitle1" paragraph>
                        Aucune information à ce sujet.
                      </Typography>
                    }
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      RÉGIME SPÉCIFIQUE
                    </Typography>
                    {restaurant.regime !== null ?
                      <Typography variant="subtitle1" paragraph>
                        {restaurant.regime} </Typography> :
                      <Typography variant="subtitle1" paragraph>
                        Aucune information à ce sujet.
                      </Typography>
                    }
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      REPAS
                    </Typography>
                    {restaurant.repas !== null ?
                      <Typography variant="subtitle1" paragraph>
                        {restaurant.repas} </Typography> :
                      <Typography variant="subtitle1" paragraph>
                        Aucune information à ce sujet.
                      </Typography>
                    }
                    {/*<===MODAL===> */}
                    <ModalReservation restoId={RestaurantId} nomResto={restaurant.nomResto} openModal={openModal} setOpenModal={setOpenModal} />
                  </Grid>
                </Grid>
              </Container>
            </div>
            }
        </main>
      </>
    );
}

export default DetailRestaurant;
