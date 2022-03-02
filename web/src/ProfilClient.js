import React, {useEffect, useState, useContext} from "react";
import {Typography, CssBaseline, Container, Grid} from '@mui/material';
import useStyles from './styles';
import {TokenContext} from "./App";
import serveur from './constantes';
import Reservation from './components/Reservations'

const ProfilClient = () => {
  const classes = useStyles(); 
  const tokenContext = useContext(TokenContext);

  const [reservation, setReservation] = useState([]) 

  useEffect(() => {
    async function componentDidMount() {
      // obtenir les réservation du client
      const bearerToken = `bearer ${tokenContext.token}`
      const response = await fetch(`${serveur}/reservation/client/${tokenContext}`, {
        method: 'GET',
        headers: {
            Authorization: bearerToken,
        },
    });
      if (response.ok) {
        let data = await response.json();
        setReservation(data)
      } else {
        console.log("une erreur s'est produite lors de l'appel à /reservation/client");
      }
    }
    componentDidMount().then(() => console.log("componentDidMount terminé"));
    console.log("ListeRestaurant.useEffect terminé");
  }, []);

  return (
    <>
        <CssBaseline/>
        <main>
            <Container maxWidth="md">
              <div className={classes.header}>
                <Typography className={classes.title} variant="h2" gutterBottom> Profil de username </Typography>
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
                            <Reservation reservation={res} key={res}/>  
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