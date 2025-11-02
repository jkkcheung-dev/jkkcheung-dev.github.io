import { createTheme } from '@mui/material/styles';

// check what MUI theme properties are available by default: https://mui.com/material-ui/customization/default-theme/

// To extend MUI theme with your own properties that are not included by default
// e.g., adding a 'exphighlight' color to the background palette, you need to use module augmentation
// as shown below:
declare module '@mui/material/styles' {
    interface TypeBackground {
        exphighlight: string;
    }
}

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#b48334ff',
        },
        background: {
            default: '#767b9aff',
            paper: '#c6c9c6ff',
            exphighlight: '#bcb19dff',
        },
    },
    typography: {
        fontFamily: '"fkGrotesk", "Noto Sans JP", sans-serif',
    },
});