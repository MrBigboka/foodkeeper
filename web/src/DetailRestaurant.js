import React, {useState, useRef} from "react";
//import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
//import DateFnsUtils from '@date-io/date-fns';
import ModalReservation from "./components/ModalReservation";
import { Typography, CssBaseline, Container, Grid, Button, Modal, Box, TextField, InputAdornment} from '@mui/material';
import useStyles from './styles';
import {useParams} from "react-router-dom";

const DetailRestaurant = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const classes = useStyles(); 
    const params = useParams();


    return (
      <>
        <CssBaseline/>
        <main>
                <div className={classes.background}>
                <Container maxWidth="md">    
                        <Grid container spacing={4}>
                              <Grid item xs={8}>
                                <Typography align="left" variant="h3" gutterBottom>
                                  Nom du restaurant
                                </Typography>
                                <Typography className={classes.detailResto} variant="body1" alignItems="left" paragraph>
                                  Et Lorem fugiat ipsum non esse nisi duis nulla dolor ea deserunt id. Occaecat et magna et anim nostrud duis consectetur officia culpa qui dolor. Do ex aliqua consequat proident labore amet. Aliquip adipisicing ut eiusmod amet quis est. Ad ullamco sint tempor commodo ut occaecat ea culpa sit voluptate. Voluptate officia elit exercitation tempor ullamco ea incididunt officia ut eu sit.
                                </Typography>
                                <div className="reservation">
                                  <Button variant="contained" onClick={handleOpen} color="success">
                                    Réserver maintenant
                                  </Button>
                                </div>
                              </Grid>
                              <Grid item xs={4}>
                                <img className={classes.imageSlide} src="https://tastet.ca/wp-content/uploads/2019/04/le-filet-restaurant-montreal1.jpg" alt="restaurant image"/>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6"> 
                                  CARACTÉRISTIQUES 
                                </Typography>
                                <Typography variant="subtitle1" paragraph> 
                                  Fugiat ea adipisicing ad elit qui laborum Lorem ipsum. Laboris tempor mollit sit labore velit ea anim exercitation laborum velit ullamco. Elit cupidatat sint non ullamco duis amet id. 
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6"> 
                                  FOURCHETTE DE PRIX 
                                </Typography>
                                <Typography variant="subtitle1" paragraph> 
                                  Fugiat ea adipisicing ad elit qui laborum Lorem ipsum. Laboris tempor mollit sit labore velit ea anim exercitation laborum velit ullamco. Elit cupidatat sint non ullamco duis amet id. 
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6"> 
                                  CUISINES 
                                </Typography>
                                <Typography variant="subtitle1" paragraph> 
                                  Fugiat ea adipisicing ad elit qui laborum Lorem ipsum. Laboris tempor mollit sit labore velit ea anim exercitation laborum velit ullamco. Elit cupidatat sint non ullamco duis amet id. 
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography variant="h6"> 
                                  RÉGIMES ALIMENTAIRES SPÉCIAUX 
                                </Typography>
                                <Typography variant="subtitle1" paragraph> 
                                  Fugiat ea adipisicing ad elit qui laborum Lorem ipsum. Laboris tempor mollit sit labore velit ea anim exercitation laborum velit ullamco. Elit cupidatat sint non ullamco duis amet id. 
                                </Typography>
                              </Grid>
                              <Grid item xs={12}> 
                                <Typography variant="h6"> 
                                  REPAS 
                                </Typography>
                                <Typography variant="subtitle1" paragraph> 
                                  Fugiat ea adipisicing ad elit qui laborum Lorem ipsum. Laboris tempor mollit sit labore velit ea anim exercitation laborum velit ullamco. Elit cupidatat sint non ullamco duis amet id. 
                                </Typography>
                                {/*<===MODAL===> */}
                                <ModalReservation openModal={openModal} setOpenModal={setOpenModal}/>                         
                              </Grid>
                        </Grid>    
                </Container>
            </div>
        </main>
      </>
    );
}

export default DetailRestaurant;
