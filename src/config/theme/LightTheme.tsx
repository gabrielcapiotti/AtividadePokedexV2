import { createTheme } from '@mui/material/styles';

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#860000',
            contrastText: 'rgb(255, 255, 255)',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#666666',

        },
    },
});
