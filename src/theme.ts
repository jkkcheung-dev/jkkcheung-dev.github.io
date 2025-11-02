import { createTheme } from '@mui/material/styles';

// check what properties are available by default: https://mui.com/material-ui/customization/default-theme/
// To add custom properties to the MUI theme that are not included by default
// e.g., adding a 'highlight' color to the background palette
declare module '@mui/material/styles' {
    interface TypeBackground {
        exphighlight: string;
    }
}

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#b47e25ff',
        },
        background: {
            default: '#96b5b9ff',
            paper: '#ffffffff',
            exphighlight: '#ced5f7ff',
        },
    },
    typography: {
        fontFamily: '"Consolas", "Noto Sans JP", sans-serif',
    },
});