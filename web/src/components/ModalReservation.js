import React, { useState, useContext } from "react";
import serveur from '../constantes';
import {TokenContext} from "../App";
import { Typography, Button, Modal, Box, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';


const ModalReservation = (props) => {
  const tokenContext = useContext(TokenContext);

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [nbPersonnes, setNbPersonnes] = useState(0);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');
  
  const handleClose = () => props.setOpenModal(false);

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  async function postReservation() {
    const bearerToken = `bearer ${tokenContext.token}`;
    const response = await fetch(`${serveur}/reservation`, {
        method: 'POST',
        body: JSON.stringify({ 
          restaurantId: props.restoId, 
          nom, 
          prenom,
          telephone,
          nbPersonnes,
          note,
          date,}),
        headers: {
            Authorization: bearerToken,
        },
    });
    if (response.ok) {
        const data = await response.json();
        console.log(`Réservation confirmer: ${data[0]}`)
    } else {
        console.log(response.status);
    }
  }

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

  return (
    <>
    {props.openModal ?
      <Modal
        open={props.openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <IconButton aria-label="delete">
              <CloseIcon onClick={handleClose}/>
            </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Réserver une table chez {props.nomResto}
          </Typography>
          <Typography id="modal-modal-description" style={{ marginBottom: '10px' }} sx={{ mt: 1 }}>
            Veuiller remplir les champs ci-dessous.
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
                  id="outlined-number"
                  margin="dense"
                  style={{ marginRight: '20px', marginBottom: '10px' }}                                              
                  value={nbPersonnes}
                  label="Nombre de personnes"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={
                    e => {
                      setNbPersonnes(e.target.value)
                    }
                  }
                />
                <TextField
                  id="outlined-multiline-flexible"
                  label="Numéro de téléphone (optionnel)"
                  style={{ width: '31vh' }}
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
                {
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      required
                      label="Date et heure"
                      value={date}
                      multiline
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />} 
                    />
                  </LocalizationProvider>
                }
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
                  onClick={postReservation}
                  color="success">
                  Confirmer la réservation
                </Button>
              </form>
          </div>
        </Box>
      </Modal>
    : null} </>
  )
}

export default ModalReservation;