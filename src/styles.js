import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    background: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(18, 0, 6),
        minHeight: '80vh',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'100%',
    },
    title: {
        textAlign: 'center',
    },
    white: {
        color: '#ede7f6',
    },
    footer: {
        backgroundColor: '#394a6a',
        padding: '50px 0'
    },
    mainColor: {
        color: '#2E3B55',
    },
    secondaryColor: {
        color: '',
    },
    styleRemover: {
        paddingLeft: 13, 
        textDecoration: 'none',
        color: 'white'
    },
}));

export default useStyles