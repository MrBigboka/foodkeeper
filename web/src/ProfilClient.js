import React, {useEffect, useState, useContext} from "react";
import {Typography, CssBaseline, Container, Grid} from '@mui/material';
import useStyles from './styles';
import {TokenContext} from "./App";
import serveur from './constantes';
import Reservation from './components/Reservations'
import { compose } from "@mui/system";
import Restaurants from "./components/Restaurants";
import { useNavigate } from "react-router-dom";

const ProfilClient = () => {
  const classes = useStyles();
  const tokenContext = useContext(TokenContext);
  const navigate = useNavigate();
  const [reservation, setReservation] = useState([]) ;

  useEffect(() => {
    async function componentDidMount() {
      // obtenir les réservation du client
      const bearerToken = `bearer ${tokenContext.token}`
      const response = await fetch(`${serveur}/reservations/client`, {
        method: 'GET',
        headers: {
            Authorization: bearerToken,
        },
    });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        console.log(tokenContext);
        if (data === true) {
          return navigate('/profile');
        } else { setReservation(data) }
      } else {
        console.log("une erreur s'est produite lors de l'appel à /reservation/client");
      }
    }
    componentDidMount().then(() => console.log("componentDidMount terminé"));
  }, []);

  return (
    <>
        <CssBaseline/>
        <main>
            <Container maxWidth="md">
              <div className={classes.header}>
                <Typography className={classes.title} variant="h2" gutterBottom> Profil </Typography>
              </div>
              <div className='reservations'>
                <div>
                  <div className={classes.header}>
                    <Typography variant="h4" gutterBottom> Vos réservations: </Typography>
                  </div>
                  <div className={classes.reservationContent}>
                  { reservation !== null &&
                    <Grid container spacing={4}>
                        {reservation.map((res) => (
                            <Reservation reservation={res} key={res.id} idResto={res.restaurantId}/>
                        ))}
                    </Grid>
                  }
                  { reservation.length <= 0 &&
                    <Typography variant="overline" gutterBottom>
                      Désolée vous n'avez aucune réservation..
                    </Typography>
                  }
                  </div>
                </div>
              </div>
            </Container>
        </main>
    </>
  )
}

export default ProfilClient
