import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [nomResto, setNomResto] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            username,
            password,
            isRestaurateur: checked ,
        });
        if (checked)
            console.log(nomResto);
        register();
    };
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    async function register() {
        if (checked) {console.log(nomResto);}
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            body: JSON.stringify({ password:password, username:username, type:checked, nomResto }),
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
        });
        if (response.ok) {
            const data = await response.json();
            // context.setToken(data.token);
            console.log(data);
            alert('Inscription faite, veuillez vous connecter');
            navigate("/login");
        } else {
            console.error(response.statusText);
            alert('Mauvais register!');
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Créer un compte FoodKeeper
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Nom"
                                    autoFocus value={username} onInput={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe "
                                    type="password"
                                    id="password"
                                    autoComplete="new-password" value={password} onInput={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={checked}
                                                       onChange={handleChange}
                                                       name="isRestaurateur" id="isRestaurateur" value="true" color="primary" />}
                                    label="Je voudrais m'inscrire en tant que restaurateur."
                                />
                            </Grid>
                            { checked &&
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="nomResto"
                                        label="Nom du restaurant "
                                        type="name"
                                        id="nomResto" value={nomResto} onInput={e => setNomResto(e.target.value)}
                                    />
                                </Grid>}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Déjà un compte? Se connecter"}
                                </Link>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
