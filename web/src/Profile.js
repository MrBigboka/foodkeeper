import React, {useEffect, useState, useContext} from "react";
import {Typography, CssBaseline, Container, Button, Alert} from '@mui/material';
import useStyles from './styles';
import { useNavigate } from "react-router-dom";
import {TokenContext} from "./App";
import {TextField} from "@material-ui/core";
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
const Profile = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const tokenContext = useContext(TokenContext);
    if (tokenContext.token === 0) {
        navigate("/");
    }

    const [ouverture, setOuverture] = React.useState('2014-08-18T08:00:00');
    function dashboard() {navigate('/dashboard')}
    const handleChange = (newValue) => {
        // data.restaurant.ouverture = data.restaurant.ouverture.substring(11, 16);
        setOuverture(newValue);
    };
    const handleFermeture = (newValue) => {
        setFermeture(newValue);
    };

    const [profile, setProfile] = useState(null);
    const [nomResto, setNomResto] = useState('');
    const [nbTables, setNbTables] = useState('');
    const [fermeture, setFermeture] = React.useState('2014-08-18T22:00:00')
    const [capacites, setCapacites] = useState('');
    const [description, setDescription] = useState('');

    const [caracteristique, setCaract] = useState('');
    const [fourchette, setFourc] = useState('');
    const [cuisines, setCuisine] = useState('');
    const [regime, setRegim] = useState('');
    const [repas, setRepas] = useState('');
    const [succes, setSucces] = useState(null);
    async function update() {
        const bearerToken = `bearer ${tokenContext.token}`;
        const response = await fetch('http://localhost:3000/profile', {
            method: 'POST',
            body: JSON.stringify({ nomResto, nbTables, capacites, description, ouverture, fermeture, caracteristique, fourchette, cuisines, regime, repas}),
            headers: { 'Content-Type': 'application/json; charset=utf-8',
                Authorization: bearerToken,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setSucces(data);
        } else {
            console.error(response.statusText);
        }
    }
    async function postImage() {
        var formData = new FormData();

        // HTML file input, chosen by user
        formData.append("image", document.getElementById('input').files[0]);
        // JavaScript file-like object
        // var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
        // var blob = new Blob([content], { type: "text/xml"});
        //
        // formData.append("webmasterfile", blob);
        //
        // var request = new XMLHttpRequest();
        // request.open("POST", "http://foo.com/submitform.php");
        // request.send(formData);
        //
        // console.log();
        const bearerToken = `bearer ${tokenContext.token}`;
        const response = await fetch('http://localhost:3000/profile/upload', {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'application/json; charset=utf-8',
                Authorization: bearerToken,
            },
        });
        if (response.ok) {
            alert('Succes');
            navigate("/");
        } else {
            console.error(response.statusText);
        }
    }
    useEffect(() => {
        async function componentDidMount() {
            console.log('token', tokenContext.token);
            // Obtenir les valeurs actuelles des zones de liste habitat, species et poketypes
            const bearerToken = `bearer ${tokenContext.token}`;
            const response = await fetch('http://localhost:3000/profile', {
                method: 'GET',
                headers: {
                    Authorization: bearerToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data.restaurant.ouverture) {
                    setOuverture(data.restaurant.ouverture);
                }
                if (data.restaurant.fermeture) {
                    setFermeture(data.restaurant.fermeture);
                }
                // data.restaurant.ouverture = data.restaurant.ouverture.substring(11, 16);
                // data.restaurant.fermeture = data.restaurant.fermeture.substring(11, 16);
                setProfile(data);
            } else {
                console.log(response.status);
                navigate("/");
            }
        }
        console.log("useEffect called");
        componentDidMount();
        console.log(ouverture);
    }, ['tokenContext.token'])

    return (
        <>
            <CssBaseline/>
            <main>
                {profile !== null &&
                <div>
                    <Container maxWidth="sm">
                        <br/><br/>
                        <Typography className={classes.title} align="center" variant="h3" color='black' gutterBottom>
                            Profile du restaurant
                        </Typography>
                        <div align="center">
                        <Button variant="contained" onClick={dashboard}>Gérer les réservations</Button><br/>
                        </div>
                        <Typography className={classes.white} variant="h6" color='black' align="center" paragraph>
                            Nom d'utilisateur: {profile.user.username} <br/>
                        </Typography>
                        <img style={{marginLeft: "auto", marginRight: "auto", display: "block", maxWidth: 100, height: 'auto'}} src={'http://localhost:3000/images/'+profile.restaurant.photo} alt={'Image de votre restaurant ici'}/> <br/>
                        <Typography className={classes.white} variant="h7" color='black' align="center" paragraph>
                            Nom du restaurant: {profile.restaurant.nomResto} <br/>
                            Capacité: {profile.restaurant.capacites} <br/>
                            Nombre de tables: {profile.restaurant.nbTables} <br/>
                            Description: {profile.restaurant.description} <br/>
                            Caractéristique: {profile.restaurant.caracteristique} <br/>
                            Description: {profile.restaurant.description} <br/>
                            Fourchette: {profile.restaurant.fourchette} <br/>
                            Cuisines: {profile.restaurant.cuisines} <br/>
                            Régime: {profile.restaurant.regime} <br/>
                            Repas: {profile.restaurant.repas} <br/>
                        </Typography>
                        <Typography className={classes.white} variant="h5" color='black' align="center" paragraph>
                            Modifier les informations du restaurant
                        </Typography>
                        <div align="center">
                            <input type="file" id="input"/> <br/><br/>
                            <Button variant="contained" onClick={postImage}>Changer l'image</Button><br/>
                            { succes !== null &&
                                <>
                                    <Alert severity="success">{succes}</Alert><br/>
                                </>
                            }
                            <TextField id="standard-basic" label="Description" variant="standard"
                                       value={description} onInput={e => setDescription(e.target.value)}/> <br/>
                            <TextField id="standard-basic" label="Nom du restaurant" variant="standard"
                                       value={nomResto} onInput={e => setNomResto(e.target.value)}/> <br/>
                            <TextField id="standard-basic" label="Capacité disponible" variant="standard"
                                       value={capacites} onInput={e => setCapacites(e.target.value)}/> <br/>
                            <TextField id="standard-basic" label="Nombre de tables" variant="standard"
                                       value={nbTables} onInput={e => setNbTables(e.target.value)}/> <br/> <br/>
                            <TextField id="standard-basic" label="Caracteristique" variant="standard"
                                       value={caracteristique} onInput={e => setCaract(e.target.value)}/> <br/> <br/>
                            <TextField id="standard-basic" label="Fourchettes de prix" variant="standard"
                                       value={fourchette} onInput={e => setFourc(e.target.value)}/> <br/> <br/>
                            <TextField id="standard-basic" label="Type de cuisines" variant="standard"
                                       value={cuisines} onInput={e => setCuisine(e.target.value)}/> <br/> <br/>
                            <TextField id="standard-basic" label="Régime" variant="standard"
                                       value={regime} onInput={e => setRegim(e.target.value)}/> <br/> <br/>
                            <TextField id="standard-basic" label="Repas" variant="standard"
                                       value={repas} onInput={e => setRepas(e.target.value)}/> <br/> <br/>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {/*<Typography>Heure d'ouverture: {ouverture}</Typography> <br/> <br/>*/}
                            <TimePicker
                              label="Heure d'ouverture"
                              value={ouverture}
                              onChange={handleChange}
                              renderInput={(params) => <TextField {...params} />}
                            /><br/><br/>
                                <TimePicker
                                  label="Heure de fermeture"
                                  value={fermeture}
                                  onChange={handleFermeture}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                                <br/>
                            </LocalizationProvider>
                            <br/>
                            <Alert severity="warning">Les changements incorrects seront ignorés. <br/>ex. Change le nom du resto à un qui existe déjà.</Alert> <br/>
                            <Button variant="contained" onClick={update}>Faire les changements</Button>
                        </div>
                        <br/>
                    </Container>
                </div>
                }
            </main>
        </>
    );
}

export default Profile;
