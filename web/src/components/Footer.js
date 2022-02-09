import useStyles from '../styles';
import { Typography } from '@mui/material';

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="h6" align="center">
                FoodKeeper
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary">
                est un projet réalisé par Miguel et Alfred pour le cours de projet intégrateur
            </Typography>
        </footer>
    )
}

export default Footer;
