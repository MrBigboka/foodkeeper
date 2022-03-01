import React, {useEffect, useState, useContext} from "react";
import {Typography, CssBaseline, Container, Button, Stack, Grid} from '@mui/material';
import useStyles from './styles';
import Reservation from './components/Reservations'

const ProfilClient = () => {
  const classes = useStyles(); 
  const [reservation, setReservation] = useState([1,2,3,4]) 

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
                    <Typography variant="h4" gutterBottom> Vos réservations </Typography>
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