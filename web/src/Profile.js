import React, {useEffect, useState, useContext} from "react";
import {Typography, CssBaseline, Container, Button, Stack, Alert} from '@mui/material';
import backgroundGif from './media/foodkeep.gif'
// import {serveur} from "./constantes"
import useStyles from './styles';
import { useNavigate } from "react-router-dom";
import {TokenContext} from "./App";
import Toolbar from "@mui/material/Toolbar";
import {TextField} from "@material-ui/core";

const Profile = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const tokenContext = useContext(TokenContext);
    if (tokenContext.token === 0) {
        navigate("/");
    }
    const [profile, setProfile] = useState(null);
    const [nomResto, setNomResto] = useState('');
    const [nbTables, setNbTables] = useState('');
    const [capacites, setCapacites] = useState('');
    const [description, setDescription] = useState('');
    const [succes, setSucces] = useState(null);
    async function update() {
        console.log();
        const bearerToken = `bearer ${tokenContext.token}`;
        const response = await fetch('http://localhost:3000/profile', {
            method: 'POST',
            body: JSON.stringify({ nomResto, nbTables, capacites, description}),
            headers: { 'Content-Type': 'application/json; charset=utf-8',
                Authorization: bearerToken,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setSucces(data);
            console.log(data);
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
                console.log(data);
                setProfile(data);
            } else {
                console.log(response.status);
                navigate("/");
            }
        }
        console.log("useEffect called");
        componentDidMount();
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
                        <Typography className={classes.white} variant="h6" color='black' align="center" paragraph>
                            Nom d'utilisateur: {profile.user.username} <br/>
                        </Typography>
                        <Typography className={classes.white} variant="h7" color='black' align="center" paragraph>
                            Nom du restaurant: {profile.restaurant.nomResto} <br/>
                            Capacité: {profile.restaurant.capacites} <br/>
                            Nombre de tables: {profile.restaurant.nbTables} <br/>
                            Description: {profile.restaurant.description} <br/>
                        </Typography>
                        <Typography className={classes.white} variant="h5" color='black' align="center" paragraph>
                            Modifier les informations du restaurant
                        </Typography>
                        <div align="center">
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
