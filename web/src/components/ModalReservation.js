import React, {useState, useRef, useContext, useEffect} from "react";
import { Typography, ClickAwayListener, Button, Modal, Box, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import useStyles from '../styles';
import {TokenContext} from "../App";
import { useNavigate } from "react-router-dom";

const ModalReservation = (props) => {
  const tokenContext = useContext(TokenContext);
  const navigate = useNavigate();

  const modalRef = useRef();
  const [nomResto, setNomResto] = useState('Nom de resto');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [courriel, setCourriel] = useState('');
  const [nbPersonnes, setNbPersonnes] = useState(0);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');

  const handleClose = () => props.setOpenModal(false);

  const handleChange = (newValue) => {
    setDate(newValue);
  };
  async function componentDidMount() {
    console.log('yo', props.resto);
    setNomResto(props.resto.nomResto);
  }
  async function reserver() {
    if (tokenContext.token === '') {
      return alert("Vous n'etes pas connecter.");
    }
    console.log(tokenContext.token);
    console.log(date.toString());
    const bearerToken = `bearer ${tokenContext.token}`;
    console.log({
      "restaurantId": props.resto,
      "nom": nom,
      "prenom": prenom,
      "telephone": telephone,
      "nbPersonnes": nbPersonnes,
      "note": note,
      "date": date
    });
    const response = await fetch('http://localhost:3000/reservations', {
      method: 'POST',
      body: JSON.stringify({
          "restaurantId": props.resto,
          "nom": nom,
          "prenom": prenom,
          "telephone": telephone,
          "nbPersonnes": nbPersonnes,
          "note": note,
          "date": date
      }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: bearerToken,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error(response.statusText);
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
  useEffect(() => {
    console.log("useEffect called a modal", props.restoId);
    componentDidMount();
  }, ['tokenContext.token'])
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
            Réserver une table
          </Typography>
          <Typography id="modal-modal-description" style={{ marginBottom: '10px' }} sx={{ mt: 1 }}>
            {nomResto}
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
                      onChange={
                        // e => {
                        //   setDate(e.target.value)
                        // }
                        handleChange
                      }
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
                color="success" onClick={reserver}>
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