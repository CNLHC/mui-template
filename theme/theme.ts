import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3B70E4',
            light: "#799eff",
            dark: "#0046b1"
        },
        secondary: {
            main: '#F4c543',
            light: "#fff875",
            dark: "#be9500"
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;