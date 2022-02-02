//import React, {useEffect, useState} from "react";
import { Typography, CssBaseline, Container} from '@mui/material';
//import {serveur} from "./constantes"

const Home = () => {
    return (
      <>
        <CssBaseline/>
        <main>
            <div>
                <Container maxWidth="sm">
                    <Typography align="center" variant="h1">
                        FoodKeeper
                    </Typography>
                </Container>
            </div>
        </main>
      </>
    );
}

export default Home;
