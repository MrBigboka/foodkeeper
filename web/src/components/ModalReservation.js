/*import React from 'react'
import { Typography, Button, Modal, Box, TextField, InputAdornment } from '@mui/material';
import useStyles from './styles';


function ModalReservation() {
  const [open, setOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [courriel, setCourriel] = useState('');
  const [nbPersonne, setNbPersonne] = useState(0);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');

  return (
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
              */
            //</MuiPickersUtilsProvider>*/}
            /*<TextField
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
                                  )
}

export default ModalReservation;*/