import { createTheme } from '@mui/material/styles';

const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#001d65',
            contrastText: '#ffffff',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
});

export default DarkTheme;
