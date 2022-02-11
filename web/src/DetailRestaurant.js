import React, {useState} from "react";
import { Typography, CssBaseline, Container, Grid, Button, Modal, Box, Stack, TextField } from '@mui/material';
import useStyles from './styles';
import {useParams} from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

const DetailRestaurant = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const classes = useStyles(); 
    let params = useParams();
    let {RestaurantId} = params;

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
                                  <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={style}>
                                      <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Réserver une table
                                      </Typography>
                                      <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                                        Nom du restaurant
                                      </Typography>
                                      <form> </form>
                                        <div></div>
                                        <TextField 
                                          id="outlined-multiline-flexible"
                                          label="Nom"
                                          multiline
                                          maxRows={2}/>
                                       <TextField 
                                          id="outlined-multiline-flexible"
                                          label="Prénom"
                                          multiline
                                          maxRows={2}/>
                                        <TextField 
                                          id="outlined-multiline-flexible"
                                          label="Multiline"
                                          multiline
                                          maxRows={2}/>
                                    </Box>
                                  </Modal>
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
                              </Grid>
                        </Grid>    
                </Container>
            </div>
        </main>
      </>
    );
}

export default DetailRestaurant;
