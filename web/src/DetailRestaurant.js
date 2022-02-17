import React, {useState} from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import ModalReservation from "./components/ModalReservation";
import { Typography, CssBaseline, Container, Grid, Button, Modal, Box, TextField, InputAdornment} from '@mui/material';
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
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [courriel, setCourriel] = useState('');
    const [nbPersonne, setNbPersonne] = useState(0);
    const [date, setDate] = useState(new Date());
    const [note, setNote] = useState('');




    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                    <Typography id="modal-modal-description" style={{ marginBottom: '10px' }} sx={{ mt: 1 }}>
                                      Nom du restaurant
                                    </Typography>
                                    <div>
                                      <form>
                                        <TextField
                                            required
                                            id="outlined-multiline-flexible"
                                            style={{ marginRight: '20px'}}                                              
                                            label="Nom"
                                            margin="dense"
                                            value={nom}
                                            multiline
                                            maxRows={2}
                                            onChange={
                                              e => {
                                                setNom(e.target.value)
                                              }
                                            }/>
                                        <TextField 
                                            required
                                            id="outlined-multiline-flexible"
                                            value={prenom}
                                            label="Prénom"
                                            margin="dense"
                                            multiline
                                            maxRows={2}
                                            onChange={
                                              e => {
                                                setPrenom(e.target.value)
                                              }
                                            }/>
                                        <TextField 
                                            required
                                            id="outlined-multiline-flexible"
                                            label="Courriel"
                                            style={{ marginRight: '20px'}}  
                                            margin="dense"
                                            value={courriel}
                                            multiline
                                            maxRows={2}
                                            onChange={
                                              e => {
                                                setCourriel(e.target.value)
                                              }
                                            }/>
                                        <TextField 
                                            id="outlined-multiline-flexible"
                                            label="Numéro de téléphone (optionnel)"
                                            style={{width: '31vh'}}
                                            InputProps={{
                                              startAdornment: <InputAdornment position="start">🇨🇦 +1</InputAdornment>,
                                            }}
                                            onChange={
                                              e => {
                                                setTelephone(e.target.value)
                                              }
                                            }
                                            value={telephone}
                                            margin="dense"
                                            multiline
                                            maxRows={2}/>
                                        {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>
                                          <DateTimePicker
                                            label="Date&Time picker"
                                            value={date}
                                            onChange={handleChange}
                                          />
                                        </MuiPickersUtilsProvider>*/}
                                        <TextField
                                          required
                                          id="outlined-number"
                                          margin="dense"
                                          value={nbPersonne}
                                          label="Nombre de personnes"
                                          type="number"
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          onChange={
                                            e => {
                                              setNbPersonne(e.target.value)
                                            }
                                          }
                                        />
                                            <br/>
                                          <TextField
                                            style={{ marginBottom: '20px'}}
                                            margin="dense"
                                            fullWidth
                                            value={note}
                                            id="outlined-multiline-static"
                                            label="Ajouter une note (optionnel)"
                                            multiline
                                            rows={4}
                                            onChange={
                                              e => {
                                                setNote(e.target.value)
                                              }
                                            }
                                          />
                                          <Button                                               
                                          fullWidth 
                                          variant="contained" 
                                          color="success">
                                          Confirmer la réservation
                                          </Button>
                                        </form>
                                    </div>
                                  </Box>
                                </Modal>  
                              </Grid>
                        </Grid>    
                </Container>
            </div>
        </main>
      </>
    );
}

export default DetailRestaurant;
